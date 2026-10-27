import "server-only";
import { site } from "@/lib/site";
import { flightInquiryText, inquiryText } from "@/lib/whatsapp";
import type { InquiryPayload } from "@/lib/schemas";

type DeliveryResult = { channels: string[]; failures: string[] };

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function subjectFor(payload: InquiryPayload, reference: string) {
  if (payload.type === "flight") {
    const first = payload.data.legs[0];
    return `[${reference}] Flight inquiry: ${first.from} → ${first.to} — ${payload.data.fullName}`;
  }
  const label = payload.data.kind === "corporate" ? "Corporate inquiry" : "Inquiry";
  return `[${reference}] ${label}: ${payload.data.topic} — ${payload.data.fullName}`;
}

/** Sends the notification email through Resend's REST API when RESEND_API_KEY is configured. */
async function sendEmail(payload: InquiryPayload, reference: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const to = (process.env.INQUIRY_TO_EMAIL ?? site.email).split(",").map((s) => s.trim());
  const from = process.env.INQUIRY_FROM_EMAIL ?? "Flynova Website <onboarding@resend.dev>";
  const plain = text.replace(/\*/g, "");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.data.email,
      subject: subjectFor(payload, reference),
      text: plain,
      html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#0d1f15"><pre style="font-family:inherit;white-space:pre-wrap">${escapeHtml(plain)}</pre></div>`,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  return true;
}

/** Posts the structured inquiry to a webhook (CRM, Zapier/Make, a database API...). */
async function sendWebhook(payload: InquiryPayload, reference: string) {
  const url = process.env.INQUIRY_WEBHOOK_URL;
  if (!url) return false;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.INQUIRY_WEBHOOK_SECRET) headers["X-Flynova-Secret"] = process.env.INQUIRY_WEBHOOK_SECRET;
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ reference, receivedAt: new Date().toISOString(), ...payload }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  return true;
}

export async function deliverInquiry(payload: InquiryPayload, reference: string): Promise<DeliveryResult> {
  const text = payload.type === "flight" ? flightInquiryText(payload.data, reference) : inquiryText(payload.data, reference);
  const result: DeliveryResult = { channels: [], failures: [] };
  const attempts: Array<[string, () => Promise<boolean>]> = [
    ["email", () => sendEmail(payload, reference, text)],
    ["webhook", () => sendWebhook(payload, reference)],
  ];
  await Promise.all(
    attempts.map(async ([name, run]) => {
      try {
        if (await run()) result.channels.push(name);
      } catch (err) {
        console.error(`[inquiry ${reference}] ${name} delivery failed`, err);
        result.failures.push(name);
      }
    }),
  );
  return result;
}
