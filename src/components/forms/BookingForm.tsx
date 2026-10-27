"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  CalendarDays,
  Info,
  Loader2,
  Minus,
  Pencil,
  Plus,
  PlaneLanding,
  PlaneTakeoff,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { Controller, useFieldArray, useForm, useWatch, type FieldPath } from "react-hook-form";
import { AirportInput } from "@/components/forms/AirportInput";
import { Field, Honeypot, Input, Select, Textarea } from "@/components/forms/fields";
import { SubmissionResult } from "@/components/forms/SubmissionResult";
import { useInquirySubmit } from "@/components/forms/useInquirySubmit";
import { Button } from "@/components/ui/Button";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppFloat";
import {
  cabinClasses,
  contactMethods,
  createFlightInquirySchema,
  tripTypeLabels,
  tripTypes,
  type FlightInquiry,
} from "@/lib/schemas";
import { flightInquiryText, whatsappUrl } from "@/lib/whatsapp";
import { cn, formatDate, todayISO } from "@/lib/utils";

export type BookingPrefill = { from?: string; to?: string; tripType?: FlightInquiry["tripType"]; preferences?: string };

const steps = [
  { id: "trip", label: "Your trip" },
  { id: "details", label: "Your details" },
  { id: "review", label: "Review" },
] as const;

const stepFields: Record<number, FieldPath<FlightInquiry>[]> = {
  0: ["tripType", "legs", "returnDate", "adults", "children", "infants", "cabin"],
  1: ["fullName", "email", "phone", "contactMethod", "preferences"],
};

const subscribeNoop = () => () => {};

function Stepper({ label, hint, value, min, max, onChange, id }: { label: string; hint: string; value: number; min: number; max: number; onChange: (n: number) => void; id: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-forest-900/10 bg-white px-4 py-2.5">
      <div>
        <p id={id} className="text-sm font-semibold text-forest-900">{label}</p>
        <p className="text-xs text-mist">{hint}</p>
      </div>
      <div className="flex items-center gap-2" role="group" aria-labelledby={id}>
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Fewer ${label.toLowerCase()}`}
          className="grid size-9 place-items-center rounded-full border border-forest-900/15 text-forest-800 transition-colors hover:bg-forest-50 disabled:opacity-30"
        >
          <Minus className="size-4" />
        </button>
        <output aria-live="polite" className="w-6 text-center font-semibold text-forest-900 tabular-nums">
          {value}
        </output>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`More ${label.toLowerCase()}`}
          className="grid size-9 place-items-center rounded-full border border-forest-900/15 text-forest-800 transition-colors hover:bg-forest-50 disabled:opacity-30"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}

export function BookingForm({ prefill, className }: { prefill?: BookingPrefill; className?: string }) {
  const today = useSyncExternalStore(subscribeNoop, todayISO, () => "");
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const { state, submit, reset: resetSubmit } = useInquirySubmit();

  const defaultValues: FlightInquiry = {
    tripType: prefill?.tripType ?? "round-trip",
    legs: [{ from: prefill?.from ?? "Juba (JUB)", to: prefill?.to ?? "", date: "" }],
    returnDate: "",
    adults: 1,
    children: 0,
    infants: 0,
    cabin: "Economy",
    flexibleDates: false,
    fullName: "",
    email: "",
    phone: "",
    contactMethod: "WhatsApp",
    preferences: prefill?.preferences ?? "",
    website: "",
  };

  const form = useForm<FlightInquiry>({
    // Build the schema at validation time so "today" is the visitor's current local date.
    resolver: (values, context, options) => zodResolver(createFlightInquirySchema(todayISO()))(values, context, options),
    defaultValues,
    mode: "onTouched",
  });
  const { control, register, handleSubmit, setValue, getValues, trigger, formState, reset } = form;
  const { errors } = formState;
  const { fields, append, remove, replace } = useFieldArray({ control, name: "legs" });
  const values = useWatch({ control }) as FlightInquiry;
  const tripType = values.tripType;

  function changeTripType(next: FlightInquiry["tripType"]) {
    const legs = getValues("legs");
    setValue("tripType", next);
    if (next === "multi-city" && legs.length < 2) {
      replace([...legs, { from: legs[0]?.to ?? "", to: "", date: "" }]);
    } else if (next !== "multi-city" && legs.length > 1) {
      replace([legs[0]]);
    }
  }

  function go(to: number) {
    setDirection(to > step ? 1 : -1);
    setStep(to);
    document.getElementById("booking-form-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function next() {
    const ok = await trigger(stepFields[step], { shouldFocus: true });
    if (ok) go(step + 1);
  }

  const onSubmit = handleSubmit(
    async (data) => {
      await submit({ type: "flight", data });
    },
    (errs) => {
      // Send the visitor back to the first step that needs attention.
      const tripKeys = stepFields[0] as string[];
      go(Object.keys(errs).some((k) => tripKeys.includes(k)) ? 0 : 1);
    },
  );

  if (state.status === "success") {
    return (
      <div className={cn("p-6 sm:p-10", className)}>
        <SubmissionResult
          reference={state.reference}
          delivered={state.delivered}
          message={flightInquiryText(getValues(), state.reference)}
          subject="Flight inquiry"
          onReset={() => {
            reset(defaultValues);
            resetSubmit();
            setStep(0);
          }}
        />
      </div>
    );
  }

  const legErrors = errors.legs;
  const totalPax = (values.adults ?? 0) + (values.children ?? 0) + (values.infants ?? 0);

  return (
    <form onSubmit={onSubmit} noValidate className={cn("relative", className)} aria-labelledby="booking-form-title">
      <div id="booking-form-top" className="scroll-mt-28" />
      <Honeypot {...register("website")} />

      {/* Progress */}
      <div className="border-b border-forest-900/8 px-5 pt-5 pb-4 sm:px-8 sm:pt-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 id="booking-form-title" className="font-display text-2xl text-forest-900 sm:text-[1.7rem]">
              Request a flight
            </h2>
            <p className="mt-1 text-sm text-mist">Tell us your plans — we’ll find the best available fare.</p>
          </div>
          <ol className="flex items-center gap-1.5" aria-label="Form progress">
            {steps.map((s, i) => (
              <li key={s.id} className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => i < step && go(i)}
                  disabled={i > step}
                  aria-current={i === step ? "step" : undefined}
                  className={cn(
                    "flex items-center gap-2 rounded-full py-1 pr-3 pl-1 text-xs font-semibold transition-colors",
                    i === step ? "bg-forest-700 text-white" : i < step ? "bg-forest-50 text-forest-700 hover:bg-forest-100" : "text-mist",
                  )}
                >
                  <span className={cn("grid size-6 place-items-center rounded-full text-[0.7rem]", i === step ? "bg-sun-400 text-forest-950" : i < step ? "bg-forest-600 text-white" : "bg-forest-900/8")}>
                    {i + 1}
                  </span>
                  <span className={cn(i !== step && "hidden sm:inline")}>{s.label}</span>
                </button>
                {i < steps.length - 1 && <span className="h-px w-3 bg-forest-900/15 sm:w-5" aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-forest-900/6">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-forest-600 to-sun-400" animate={{ width: `${((step + 1) / steps.length) * 100}%` }} transition={{ duration: 0.5 }} />
        </div>
      </div>

      <div className="relative overflow-hidden px-5 py-6 sm:px-8 sm:py-8">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <div className="space-y-6">
                <fieldset>
                  <legend className="sr-only">Trip type</legend>
                  <div className="inline-flex rounded-full bg-cream p-1 ring-1 ring-forest-900/6">
                    {tripTypes.map((t) => (
                      <label key={t} className="relative cursor-pointer">
                        <input type="radio" className="peer sr-only" value={t} checked={tripType === t} onChange={() => changeTripType(t)} name="tripType" />
                        {tripType === t && <motion.span layoutId="trip-pill" className="absolute inset-0 rounded-full bg-white shadow-soft" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                        <span className={cn("relative block rounded-full px-3.5 py-2 text-sm font-semibold transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-sun-400 sm:px-5", tripType === t ? "text-forest-900" : "text-mist hover:text-forest-800")}>
                          {tripTypeLabels[t]}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="space-y-4">
                  {fields.map((field, i) => (
                    <motion.div
                      key={field.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(tripType === "multi-city" && "rounded-3xl border border-dashed border-forest-900/15 bg-cream/50 p-4")}
                    >
                      {tripType === "multi-city" && (
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-xs font-bold tracking-[0.18em] text-sun-600 uppercase">Flight {i + 1}</p>
                          {fields.length > 2 && (
                            <button type="button" onClick={() => remove(i)} className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50">
                              <Trash2 className="size-3.5" /> Remove
                            </button>
                          )}
                        </div>
                      )}
                      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-start">
                        <Field id={`leg-${i}-from`} label="From" required error={legErrors?.[i]?.from?.message}>
                          <Controller
                            control={control}
                            name={`legs.${i}.from`}
                            render={({ field: f }) => (
                              <AirportInput id={`leg-${i}-from`} value={f.value} onChange={f.onChange} onBlur={f.onBlur} inputRef={f.ref} placeholder="City or airport" error={legErrors?.[i]?.from?.message} icon={<PlaneTakeoff className="size-4" />} />
                            )}
                          />
                        </Field>
                        <button
                          type="button"
                          onClick={() => {
                            const leg = getValues(`legs.${i}`);
                            setValue(`legs.${i}.from`, leg.to, { shouldValidate: !!leg.to });
                            setValue(`legs.${i}.to`, leg.from, { shouldValidate: !!leg.from });
                          }}
                          aria-label="Swap departure and destination"
                          className="mx-auto grid size-10 place-items-center rounded-full border border-forest-900/12 bg-white text-forest-700 shadow-soft transition-transform hover:rotate-180 md:mt-7"
                        >
                          <ArrowLeftRight className="size-4" />
                        </button>
                        <Field id={`leg-${i}-to`} label="To" required error={legErrors?.[i]?.to?.message}>
                          <Controller
                            control={control}
                            name={`legs.${i}.to`}
                            render={({ field: f }) => (
                              <AirportInput id={`leg-${i}-to`} value={f.value} onChange={f.onChange} onBlur={f.onBlur} inputRef={f.ref} placeholder="Where to?" error={legErrors?.[i]?.to?.message} icon={<PlaneLanding className="size-4" />} />
                            )}
                          />
                        </Field>
                      </div>
                      <div className={cn("mt-4 grid gap-4", tripType === "round-trip" ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
                        <Field id={`leg-${i}-date`} label={tripType === "multi-city" ? "Date" : "Departure date"} required error={legErrors?.[i]?.date?.message}>
                          <Input
                            id={`leg-${i}-date`}
                            type="date"
                            min={(i > 0 ? values.legs?.[i - 1]?.date : "") || today || undefined}
                            icon={<CalendarDays className="size-4" />}
                            error={legErrors?.[i]?.date?.message}
                            {...register(`legs.${i}.date`, { deps: tripType === "round-trip" ? ["returnDate"] : undefined })}
                          />
                        </Field>
                        {tripType === "round-trip" && i === 0 && (
                          <Field id="returnDate" label="Return date" required error={errors.returnDate?.message}>
                            <Input id="returnDate" type="date" min={values.legs?.[0]?.date || today || undefined} icon={<CalendarDays className="size-4" />} error={errors.returnDate?.message} {...register("returnDate")} />
                          </Field>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {tripType === "multi-city" && (
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="ring-1 ring-forest-900/15"
                        disabled={fields.length >= 5}
                        onClick={() => append({ from: getValues(`legs.${fields.length - 1}.to`) ?? "", to: "", date: "" })}
                      >
                        <Plus className="size-4" /> Add another flight
                      </Button>
                      <span className="text-xs text-mist">Up to 5 flights</span>
                    </div>
                  )}
                  {legErrors?.root?.message && <p className="text-xs font-medium text-red-600">{legErrors.root.message}</p>}
                </div>

                <label className="flex w-fit cursor-pointer items-center gap-3 text-sm text-forest-900">
                  <input type="checkbox" className="size-5 rounded-md accent-forest-700" {...register("flexibleDates")} />
                  My dates are flexible (±3 days) — show me better fares
                </label>

                <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
                  <fieldset className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-3">
                    <legend className="mb-2 text-[0.8rem] font-semibold tracking-wide text-forest-900">
                      Passengers <span className="font-normal text-mist">· {totalPax} total</span>
                    </legend>
                    <Stepper id="pax-adults" label="Adults" hint="12+ years" value={values.adults ?? 1} min={1} max={9} onChange={(n) => setValue("adults", n, { shouldValidate: true })} />
                    <Stepper id="pax-children" label="Children" hint="2–11 years" value={values.children ?? 0} min={0} max={8} onChange={(n) => setValue("children", n, { shouldValidate: true })} />
                    <Stepper id="pax-infants" label="Infants" hint="Under 2" value={values.infants ?? 0} min={0} max={4} onChange={(n) => setValue("infants", n, { shouldValidate: true })} />
                    {(errors.adults || errors.infants) && (
                      <p role="alert" className="text-xs font-medium text-red-600 sm:col-span-3">{errors.adults?.message ?? errors.infants?.message}</p>
                    )}
                  </fieldset>
                  <Field id="cabin" label="Travel class" required>
                    <Select id="cabin" {...register("cabin")}>
                      {cabinClasses.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </Select>
                  </Field>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="fullName" label="Full name (as on passport)" required error={errors.fullName?.message} className="sm:col-span-2">
                    <Input id="fullName" autoComplete="name" placeholder="e.g. Mary Akol Deng" error={errors.fullName?.message} {...register("fullName")} />
                  </Field>
                  <Field id="email" label="Email" required error={errors.email?.message}>
                    <Input id="email" type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" error={errors.email?.message} {...register("email")} />
                  </Field>
                  <Field id="phone" label="Phone / WhatsApp" required error={errors.phone?.message}>
                    <Input id="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+211 9XX XXX XXX" error={errors.phone?.message} {...register("phone")} />
                  </Field>
                </div>
                <fieldset>
                  <legend className="mb-2 text-[0.8rem] font-semibold tracking-wide text-forest-900">How should we contact you?</legend>
                  <div className="flex flex-wrap gap-2">
                    {contactMethods.map((m) => (
                      <label key={m} className="cursor-pointer">
                        <input type="radio" value={m} className="peer sr-only" {...register("contactMethod")} />
                        <span className="block rounded-full border border-forest-900/12 bg-white px-4 py-2 text-sm font-medium text-forest-800 transition-colors peer-checked:border-forest-700 peer-checked:bg-forest-700 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-sun-400">
                          {m}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <Field id="preferences" label="Additional travel preferences" hint="Preferred airline, baggage, seating, meals, special assistance, budget…" error={errors.preferences?.message}>
                  <Textarea id="preferences" rows={4} placeholder="Anything that helps us find the right flight for you" error={errors.preferences?.message} {...register("preferences")} />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div className="rounded-3xl bg-cream p-5 ring-1 ring-forest-900/6 sm:p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold tracking-[0.18em] text-sun-600 uppercase">{tripTypeLabels[tripType]}</p>
                    <button type="button" onClick={() => go(0)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 hover:text-forest-900">
                      <Pencil className="size-3.5" /> Edit trip
                    </button>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {values.legs?.map((leg, i) => (
                      <li key={i} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="font-display text-xl text-forest-900">{leg.from}</span>
                        <span className="flex items-center gap-1 text-sun-500" aria-label="to">
                          <span className="h-px w-6 bg-sun-400" />
                          <ArrowRight className="size-4" />
                        </span>
                        <span className="font-display text-xl text-forest-900">{leg.to}</span>
                        <span className="w-full text-sm text-mist sm:ml-auto sm:w-auto">{formatDate(leg.date)}</span>
                      </li>
                    ))}
                    {tripType === "round-trip" && values.returnDate && (
                      <li className="text-sm text-mist">Return on <strong className="text-forest-900">{formatDate(values.returnDate)}</strong></li>
                    )}
                  </ul>
                  <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-forest-900/8 pt-4 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="text-xs text-mist">Passengers</dt>
                      <dd className="font-semibold text-forest-900">
                        {values.adults} adult{values.adults === 1 ? "" : "s"}
                        {values.children ? `, ${values.children} child${values.children === 1 ? "" : "ren"}` : ""}
                        {values.infants ? `, ${values.infants} infant${values.infants === 1 ? "" : "s"}` : ""}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-mist">Class</dt>
                      <dd className="font-semibold text-forest-900">{values.cabin}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-mist">Dates</dt>
                      <dd className="font-semibold text-forest-900">{values.flexibleDates ? "Flexible ±3 days" : "Fixed"}</dd>
                    </div>
                  </dl>
                </div>
                <div className="rounded-3xl bg-white p-5 ring-1 ring-forest-900/8 sm:p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold tracking-[0.18em] text-sun-600 uppercase">Contact</p>
                    <button type="button" onClick={() => go(1)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 hover:text-forest-900">
                      <Pencil className="size-3.5" /> Edit details
                    </button>
                  </div>
                  <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                    <div><dt className="text-xs text-mist">Name</dt><dd className="font-semibold break-words text-forest-900">{values.fullName}</dd></div>
                    <div><dt className="text-xs text-mist">Preferred contact</dt><dd className="font-semibold text-forest-900">{values.contactMethod}</dd></div>
                    <div><dt className="text-xs text-mist">Email</dt><dd className="font-semibold break-all text-forest-900">{values.email}</dd></div>
                    <div><dt className="text-xs text-mist">Phone</dt><dd className="font-semibold text-forest-900">{values.phone}</dd></div>
                    {values.preferences && (
                      <div className="sm:col-span-2"><dt className="text-xs text-mist">Preferences</dt><dd className="whitespace-pre-line text-forest-900">{values.preferences}</dd></div>
                    )}
                  </dl>
                </div>
                <p className="flex gap-3 rounded-2xl bg-sun-50 p-4 text-sm leading-relaxed text-forest-900 ring-1 ring-sun-200">
                  <Info className="mt-0.5 size-5 shrink-0 text-sun-600" />
                  <span>
                    This is a <strong>booking request</strong>, not a confirmed ticket. Flynova will contact you to confirm availability, the final fare and ticketing. Nothing is charged until you approve.
                  </span>
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {state.status === "error" && (
          <div role="alert" className="mt-5 flex flex-col gap-3 rounded-2xl bg-red-50 p-4 text-sm text-red-800 ring-1 ring-red-200 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex gap-2"><TriangleAlert className="size-5 shrink-0" /> {state.message}</span>
            <a href={whatsappUrl(flightInquiryText(getValues()))} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#128c3e] underline-offset-4 hover:underline">
              <WhatsAppGlyph className="size-4" /> Send on WhatsApp instead
            </a>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-forest-900/8 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-5">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={() => go(step - 1)}>
            <ArrowLeft className="size-4" /> Back
          </Button>
        ) : (
          <p className="text-xs text-mist">
            <Info className="mr-1 inline size-3.5 text-sun-500" /> Inquiry only — fares are confirmed by our team.
          </p>
        )}
        {/* Distinct keys stop React reusing the "Continue" button as the submit button mid-click. */}
        {step < 2 ? (
          <Button key="next" type="button" onClick={next} size="lg" className="w-full sm:w-auto">
            Continue <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        ) : (
          <Button key="submit" type="submit" size="lg" className="w-full sm:w-auto" disabled={state.status === "submitting"}>
            {state.status === "submitting" ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Sending request…
              </>
            ) : (
              <>
                Submit booking request <PlaneTakeoff className="size-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
