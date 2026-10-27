"use client";

import { useSearchParams } from "next/navigation";
import { BookingForm, type BookingPrefill } from "@/components/forms/BookingForm";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { tripTypes } from "@/lib/schemas";

function clean(v: string | null, max = 120) {
  return v ? v.slice(0, max) : undefined;
}

/** Booking form that reads ?from=&to=&trip=&notes= so CTAs across the site can carry context. */
export function BookingFormFromQuery({ fallback }: { fallback?: BookingPrefill }) {
  const params = useSearchParams();
  const trip = params.get("trip");
  const prefill: BookingPrefill = {
    from: clean(params.get("from")) ?? fallback?.from,
    to: clean(params.get("to")) ?? fallback?.to,
    tripType: (tripTypes as readonly string[]).includes(trip ?? "") ? (trip as BookingPrefill["tripType"]) : fallback?.tripType,
    preferences: clean(params.get("notes"), 500) ?? fallback?.preferences,
  };
  return <BookingForm key={params.toString()} prefill={prefill} />;
}

/** Contact form that reads ?topic=&destination=&package= from links such as "Request a quote". */
export function InquiryFormFromQuery() {
  const params = useSearchParams();
  return (
    <InquiryForm
      key={params.toString()}
      prefill={{
        topic: clean(params.get("topic"), 80),
        destination: clean(params.get("destination")),
        packageName: clean(params.get("package")),
        message: clean(params.get("message"), 500),
      }}
    />
  );
}
