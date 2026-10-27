"use client";

import { motion } from "framer-motion";
import { CircleCheck, Copy, Mail, RotateCcw, Send } from "lucide-react";
import { useState } from "react";
import { ButtonLink, Button } from "@/components/ui/Button";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppFloat";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Success screen. When the server delivered the request (email/webhook configured),
 * WhatsApp is offered as an optional faster channel. When no delivery channel is
 * configured, the visitor is asked to send the prepared message to complete it.
 */
export function SubmissionResult({
  reference,
  delivered,
  message,
  subject,
  onReset,
  resetLabel = "Start a new request",
}: {
  reference: string;
  delivered: boolean;
  message: string;
  subject: string;
  onReset: () => void;
  resetLabel?: string;
}) {
  const [copied, setCopied] = useState(false);
  const plain = message.replace(/\*/g, "");
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`${subject} (${reference})`)}&body=${encodeURIComponent(plain)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
      role="status"
      aria-live="polite"
    >
      <motion.div
        initial={{ scale: 0.4, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
        className="mx-auto grid size-18 place-items-center rounded-full bg-forest-50 text-forest-600"
      >
        {delivered ? <CircleCheck className="size-9" /> : <Send className="size-8" />}
      </motion.div>
      <h3 className="mt-6 font-display text-3xl text-forest-900">
        {delivered ? "Request received — thank you!" : "Almost there — send it to our team"}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mist">
        {delivered
          ? "Our travel team will review your request and contact you to confirm availability, pricing and ticketing. Nothing is booked or charged until you approve it."
          : "Your request is ready. Tap below to send it to Flynova on WhatsApp (or email) — our team will reply to confirm availability, pricing and ticketing."}
      </p>
      <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream px-4 py-1.5 text-xs font-semibold tracking-wide text-forest-800">
        Reference <span className="font-mono text-sun-600">{reference}</span>
      </p>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href={whatsappUrl(message)} variant="whatsapp" size="lg">
          <WhatsAppGlyph className="size-5" />
          {delivered ? "Follow up on WhatsApp" : "Send via WhatsApp"}
        </ButtonLink>
        <ButtonLink href={mailto} variant="light" size="lg" className="ring-1 ring-forest-900/10">
          <Mail className="size-5" /> {delivered ? "Email us" : "Send by email"}
        </ButtonLink>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(plain);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            } catch {
              /* clipboard unavailable */
            }
          }}
        >
          <Copy className="size-4" /> {copied ? "Copied!" : "Copy details"}
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="size-4" /> {resetLabel}
        </Button>
      </div>
    </motion.div>
  );
}
