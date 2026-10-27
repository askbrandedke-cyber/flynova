import { z } from "zod";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const PHONE = /^\+?[0-9\s\-()]{7,20}$/;

export const tripTypes = ["round-trip", "one-way", "multi-city"] as const;
export const cabinClasses = ["Economy", "Premium Economy", "Business", "First"] as const;
export const contactMethods = ["WhatsApp", "Phone call", "Email"] as const;

export const tripTypeLabels: Record<(typeof tripTypes)[number], string> = {
  "round-trip": "Round-trip",
  "one-way": "One-way",
  "multi-city": "Multi-city",
};

const contactFields = {
  fullName: z.string().trim().min(2, "Please enter your full name").max(80, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(120),
  phone: z
    .string()
    .trim()
    .regex(PHONE, "Enter a valid phone number, e.g. +211 989 655 700"),
  /** Honeypot: real visitors never see or fill this field. */
  website: z.string().max(0).optional(),
};

const legSchema = z.object({
  from: z.string().trim().min(2, "Where are you flying from?").max(80),
  to: z.string().trim().min(2, "Where are you flying to?").max(80),
  date: z.string().regex(ISO_DATE, "Choose a departure date"),
});

/**
 * The flight inquiry schema takes the earliest allowed date so the browser can
 * validate against the visitor's local "today" and the server can allow for timezones.
 */
function createTripSchema(minDate: string) {
  return z
    .object({
      tripType: z.enum(tripTypes),
      legs: z.array(legSchema).min(1).max(5),
      returnDate: z.string().optional(),
      adults: z.number({ message: "Required" }).int().min(1, "At least 1 adult").max(9),
      children: z.number().int().min(0).max(8),
      infants: z.number().int().min(0).max(4),
      cabin: z.enum(cabinClasses),
      flexibleDates: z.boolean(),
    })
    .superRefine((v, ctx) => {
      v.legs.forEach((leg, i) => {
        if (leg.from && leg.to && leg.from.toLowerCase() === leg.to.toLowerCase()) {
          ctx.addIssue({ code: "custom", path: ["legs", i, "to"], message: "Destination must differ from departure" });
        }
        if (leg.date < minDate) {
          ctx.addIssue({ code: "custom", path: ["legs", i, "date"], message: "Date can’t be in the past" });
        }
        const prev = v.legs[i - 1];
        if (prev && leg.date < prev.date) {
          ctx.addIssue({ code: "custom", path: ["legs", i, "date"], message: "Must be on or after the previous flight" });
        }
      });
      if (v.tripType !== "multi-city" && v.legs.length !== 1) {
        ctx.addIssue({ code: "custom", path: ["legs"], message: "Only one route is needed for this trip type" });
      }
      if (v.tripType === "multi-city" && v.legs.length < 2) {
        ctx.addIssue({ code: "custom", path: ["legs"], message: "Add at least two flights for a multi-city trip" });
      }
      if (v.tripType === "round-trip") {
        if (!v.returnDate || !ISO_DATE.test(v.returnDate)) {
          ctx.addIssue({ code: "custom", path: ["returnDate"], message: "Choose a return date" });
        } else if (v.legs[0] && v.returnDate < v.legs[0].date) {
          ctx.addIssue({ code: "custom", path: ["returnDate"], message: "Return must be on or after departure" });
        }
      }
      if (v.infants > v.adults) {
        ctx.addIssue({ code: "custom", path: ["infants"], message: "Each infant must travel with an adult" });
      }
      if (v.adults + v.children + v.infants > 9) {
        ctx.addIssue({ code: "custom", path: ["adults"], message: "For 10 or more travellers, please send a group request via Contact or WhatsApp" });
      }
    });
}

const travellerSchema = z.object({
  ...contactFields,
  contactMethod: z.enum(contactMethods),
  preferences: z.string().trim().max(1000, "Please keep this under 1,000 characters").optional(),
});

/**
 * Trip rules and traveller details are validated independently (an intersection),
 * so trip-level checks run on step one even before contact details are filled in.
 * The earliest allowed date is passed in so the browser can validate against the
 * visitor's local "today" and the server can allow for timezones.
 */
export function createFlightInquirySchema(minDate: string) {
  return z.intersection(createTripSchema(minDate), travellerSchema);
}

export type FlightInquiry = z.infer<ReturnType<typeof createFlightInquirySchema>>;

export const inquiryKinds = ["general", "corporate"] as const;

export const inquirySchema = z
  .object({
    kind: z.enum(inquiryKinds),
    ...contactFields,
    topic: z.string().trim().min(2, "Choose what you need help with").max(80),
    message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(2000),
    destination: z.string().trim().max(120).optional(),
    packageName: z.string().trim().max(120).optional(),
    travelMonth: z.string().trim().max(40).optional(),
    travellers: z.string().trim().max(40).optional(),
    company: z.string().trim().max(120).optional(),
    companySize: z.string().trim().max(40).optional(),
    travelFrequency: z.string().trim().max(40).optional(),
    needs: z.array(z.string().max(60)).max(10).optional(),
  })
  .superRefine((v, ctx) => {
    if (v.kind === "corporate" && (!v.company || v.company.length < 2)) {
      ctx.addIssue({ code: "custom", path: ["company"], message: "Enter your organization’s name" });
    }
  });

export type Inquiry = z.infer<typeof inquirySchema>;

export type InquiryPayload =
  | { type: "flight"; data: FlightInquiry }
  | { type: "inquiry"; data: Inquiry };

export type InquiryResponse =
  | { ok: true; reference: string; delivered: boolean; channels: string[] }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };
