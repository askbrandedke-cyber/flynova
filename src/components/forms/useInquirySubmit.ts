"use client";

import { useState } from "react";
import type { InquiryPayload, InquiryResponse } from "@/lib/schemas";
import { makeReference } from "@/lib/reference";

/** Static HTML builds have no server, so requests go straight to the WhatsApp/email hand-off. */
const STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string; delivered: boolean }
  | { status: "error"; message: string };

export function useInquirySubmit() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  async function submit(payload: InquiryPayload) {
    setState({ status: "submitting" });
    if (STATIC_EXPORT) {
      const reference = makeReference();
      setState({ status: "success", reference, delivered: false });
      return { ok: true as const, reference, delivered: false, channels: [] };
    }
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => null)) as InquiryResponse | null;
      if (body?.ok) {
        setState({ status: "success", reference: body.reference, delivered: body.delivered });
        return body;
      }
      setState({ status: "error", message: body && !body.ok ? body.error : "Something went wrong. Please try again." });
    } catch {
      setState({ status: "error", message: "We couldn’t reach our server. Please check your connection or send your request on WhatsApp." });
    }
    return null;
  }

  return { state, submit, reset: () => setState({ status: "idle" }) };
}
