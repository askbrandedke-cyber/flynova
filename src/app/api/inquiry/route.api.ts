import { NextResponse } from "next/server";
import { createFlightInquirySchema, inquirySchema, type InquiryPayload, type InquiryResponse } from "@/lib/schemas";
import { deliverInquiry } from "@/lib/server/deliver";
import { makeReference } from "@/lib/reference";

const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

/** Best-effort per-instance rate limit; use a shared store (e.g. Upstash) for strict limits. */
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function json(body: InquiryResponse, status = 200) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return json({ ok: false, error: "Too many requests. Please wait a few minutes or contact us on WhatsApp." }, 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const type = (body as { type?: string })?.type;
  const data = (body as { data?: unknown })?.data;
  let payload: InquiryPayload;

  if (type === "flight") {
    // Allow "yesterday" in UTC so visitors ahead of UTC are never rejected for choosing today.
    const minDate = new Date(Date.now() - 36 * 3600_000).toISOString().slice(0, 10);
    const parsed = createFlightInquirySchema(minDate).safeParse(data);
    if (!parsed.success) {
      return json({ ok: false, error: "Please check the highlighted details.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> }, 422);
    }
    payload = { type, data: parsed.data };
  } else if (type === "inquiry") {
    const parsed = inquirySchema.safeParse(data);
    if (!parsed.success) {
      return json({ ok: false, error: "Please check the highlighted details.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> }, 422);
    }
    payload = { type, data: parsed.data };
  } else {
    return json({ ok: false, error: "Unknown inquiry type." }, 400);
  }

  const reference = makeReference();

  // Honeypot filled: pretend success without delivering anything.
  if (payload.data.website) {
    return json({ ok: true, reference, delivered: false, channels: [] });
  }

  const { channels } = await deliverInquiry(payload, reference);
  return json({ ok: true, reference, delivered: channels.length > 0, channels });
}
