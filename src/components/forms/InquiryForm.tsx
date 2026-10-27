"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, TriangleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { Field, Honeypot, Input, Select, Textarea } from "@/components/forms/fields";
import { SubmissionResult } from "@/components/forms/SubmissionResult";
import { useInquirySubmit } from "@/components/forms/useInquirySubmit";
import { Button } from "@/components/ui/Button";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppFloat";
import { services } from "@/lib/data/services";
import { inquirySchema, type Inquiry } from "@/lib/schemas";
import { inquiryText, whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const generalTopics = [
  ...services.map((s) => s.title),
  "Destination inquiry",
  "Holiday package quote",
  "Group booking",
  "Something else",
];

const corporateNeeds = [
  "Staff flights",
  "Group & delegation travel",
  "Travel policy setup",
  "Visa processing",
  "Conference & event travel",
  "Monthly travel reporting",
];

export type InquiryPrefill = {
  topic?: string;
  destination?: string;
  packageName?: string;
  message?: string;
};

export function InquiryForm({
  kind = "general",
  prefill,
  className,
  submitLabel,
}: {
  kind?: Inquiry["kind"];
  prefill?: InquiryPrefill;
  className?: string;
  submitLabel?: string;
}) {
  const corporate = kind === "corporate";
  const defaultValues: Inquiry = {
    kind,
    fullName: "",
    email: "",
    phone: "",
    topic: prefill?.topic ?? (corporate ? "Corporate Travel Management" : prefill?.destination ? "Destination inquiry" : prefill?.packageName ? "Holiday package quote" : ""),
    message: prefill?.message ?? "",
    destination: prefill?.destination ?? "",
    packageName: prefill?.packageName ?? "",
    travelMonth: "",
    travellers: "",
    company: "",
    companySize: "",
    travelFrequency: "",
    needs: [],
    website: "",
  };
  const { register, handleSubmit, formState, getValues, reset } = useForm<Inquiry>({
    resolver: zodResolver(inquirySchema),
    defaultValues,
    mode: "onTouched",
  });
  const { errors } = formState;
  const { state, submit, reset: resetSubmit } = useInquirySubmit();

  if (state.status === "success") {
    return (
      <div className={cn("py-4", className)}>
        <SubmissionResult
          reference={state.reference}
          delivered={state.delivered}
          message={inquiryText(getValues(), state.reference)}
          subject={corporate ? "Corporate travel inquiry" : `Inquiry: ${getValues("topic")}`}
          resetLabel="Send another message"
          onReset={() => {
            reset(defaultValues);
            resetSubmit();
          }}
        />
      </div>
    );
  }

  const topics = prefill?.topic && !generalTopics.includes(prefill.topic) ? [prefill.topic, ...generalTopics] : generalTopics;

  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => submit({ type: "inquiry", data }))}
      className={cn("relative grid gap-4 sm:grid-cols-2", className)}
    >
      <Honeypot {...register("website")} />
      <input type="hidden" {...register("kind")} />

      {corporate && (
        <>
          <Field id={`${kind}-company`} label="Organization" required error={errors.company?.message} className="sm:col-span-2">
            <Input id={`${kind}-company`} autoComplete="organization" placeholder="Company, NGO or government institution" error={errors.company?.message} {...register("company")} />
          </Field>
          <Field id={`${kind}-size`} label="Team size">
            <Select id={`${kind}-size`} {...register("companySize")}>
              <option value="">Select…</option>
              <option>1–10 travellers</option>
              <option>11–50 travellers</option>
              <option>51–200 travellers</option>
              <option>200+ travellers</option>
            </Select>
          </Field>
          <Field id={`${kind}-frequency`} label="How often do you travel?">
            <Select id={`${kind}-frequency`} {...register("travelFrequency")}>
              <option value="">Select…</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>A few times a year</option>
              <option>One-off event or trip</option>
            </Select>
          </Field>
          <fieldset className="sm:col-span-2">
            <legend className="mb-2 text-[0.8rem] font-semibold tracking-wide text-forest-900">What do you need help with?</legend>
            <div className="flex flex-wrap gap-2">
              {corporateNeeds.map((n) => (
                <label key={n} className="cursor-pointer">
                  <input type="checkbox" value={n} className="peer sr-only" {...register("needs")} />
                  <span className="block rounded-full border border-forest-900/12 bg-white px-3.5 py-2 text-sm text-forest-800 transition-colors peer-checked:border-forest-700 peer-checked:bg-forest-700 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-sun-400">
                    {n}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </>
      )}

      <Field id={`${kind}-name`} label={corporate ? "Your name" : "Full name"} required error={errors.fullName?.message}>
        <Input id={`${kind}-name`} autoComplete="name" error={errors.fullName?.message} {...register("fullName")} />
      </Field>
      <Field id={`${kind}-phone`} label="Phone / WhatsApp" required error={errors.phone?.message}>
        <Input id={`${kind}-phone`} type="tel" autoComplete="tel" inputMode="tel" placeholder="+211 …" error={errors.phone?.message} {...register("phone")} />
      </Field>
      <Field id={`${kind}-email`} label="Email" required error={errors.email?.message} className={corporate ? "sm:col-span-2" : undefined}>
        <Input id={`${kind}-email`} type="email" autoComplete="email" inputMode="email" error={errors.email?.message} {...register("email")} />
      </Field>
      {corporate ? (
        <input type="hidden" {...register("topic")} />
      ) : (
        <Field id={`${kind}-topic`} label="How can we help?" required error={errors.topic?.message}>
          <Select id={`${kind}-topic`} error={errors.topic?.message} {...register("topic")}>
            <option value="">Choose a topic…</option>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </Field>
      )}

      {!corporate && (prefill?.destination || prefill?.packageName) && (
        <div className="grid gap-4 sm:col-span-2 sm:grid-cols-2">
          {prefill?.destination && (
            <Field id={`${kind}-destination`} label="Destination">
              <Input id={`${kind}-destination`} {...register("destination")} />
            </Field>
          )}
          {prefill?.packageName && (
            <Field id={`${kind}-package`} label="Package">
              <Input id={`${kind}-package`} {...register("packageName")} />
            </Field>
          )}
        </div>
      )}
      {!corporate && (
        <>
          <Field id={`${kind}-month`} label="When are you planning to travel?">
            <Input id={`${kind}-month`} placeholder="e.g. December, or 10–20 March" {...register("travelMonth")} />
          </Field>
          <Field id={`${kind}-travellers`} label="Number of travellers">
            <Input id={`${kind}-travellers`} placeholder="e.g. 2 adults, 1 child" {...register("travellers")} />
          </Field>
        </>
      )}

      <Field id={`${kind}-message`} label={corporate ? "Tell us about your travel needs" : "Message"} required error={errors.message?.message} className="sm:col-span-2">
        <Textarea
          id={`${kind}-message`}
          rows={5}
          placeholder={corporate ? "Typical routes, number of trips, approval process, anything we should know…" : "Share your plans, questions or budget and we’ll get back to you."}
          error={errors.message?.message}
          {...register("message")}
        />
      </Field>

      {state.status === "error" && (
        <div role="alert" className="flex flex-col gap-3 rounded-2xl bg-red-50 p-4 text-sm text-red-800 ring-1 ring-red-200 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex gap-2"><TriangleAlert className="size-5 shrink-0" /> {state.message}</span>
          <a href={whatsappUrl(inquiryText(getValues()))} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#128c3e] hover:underline">
            <WhatsAppGlyph className="size-4" /> Send on WhatsApp instead
          </a>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-1 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-mist">We usually reply by phone, WhatsApp or email. Your details are only used to answer your request.</p>
        <Button type="submit" size="lg" className="w-full shrink-0 sm:w-auto" disabled={state.status === "submitting"}>
          {state.status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              {submitLabel ?? "Send inquiry"} <Send className="size-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
