import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { tripTypeLabels, type FlightInquiry, type Inquiry } from "@/lib/schemas";

export function whatsappUrl(message?: string, number: string = site.whatsapp) {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsAppMessage =
  "Hello Flynova! 👋 I’d like help planning a trip. Could you assist me with flights and travel options?";

function passengers(d: FlightInquiry) {
  const parts = [`${d.adults} adult${d.adults === 1 ? "" : "s"}`];
  if (d.children) parts.push(`${d.children} child${d.children === 1 ? "" : "ren"}`);
  if (d.infants) parts.push(`${d.infants} infant${d.infants === 1 ? "" : "s"}`);
  return parts.join(", ");
}

export function flightInquiryText(d: FlightInquiry, reference?: string) {
  const lines = [
    "✈️ *Flight Inquiry — Flynova Travel*",
    reference ? `Ref: ${reference}` : "",
    "",
    `*Trip:* ${tripTypeLabels[d.tripType]}`,
    ...d.legs.map((leg, i) =>
      d.legs.length > 1
        ? `*Flight ${i + 1}:* ${leg.from} → ${leg.to} on ${formatDate(leg.date)}`
        : `*Route:* ${leg.from} → ${leg.to}\n*Depart:* ${formatDate(leg.date)}`,
    ),
    d.tripType === "round-trip" && d.returnDate ? `*Return:* ${formatDate(d.returnDate)}` : "",
    `*Passengers:* ${passengers(d)}`,
    `*Class:* ${d.cabin}`,
    d.flexibleDates ? "*Dates:* Flexible (±3 days)" : "",
    "",
    `*Name:* ${d.fullName}`,
    `*Email:* ${d.email}`,
    `*Phone:* ${d.phone}`,
    `*Preferred contact:* ${d.contactMethod}`,
    d.preferences ? `\n*Preferences:* ${d.preferences}` : "",
    "",
    "Please confirm availability, fares and ticketing. Thank you!",
  ];
  return lines.filter((l, i, arr) => l !== "" || arr[i - 1] !== "").join("\n").trim();
}

export function inquiryText(d: Inquiry, reference?: string) {
  const lines = [
    d.kind === "corporate" ? "🏢 *Corporate Travel Inquiry — Flynova*" : "🌍 *Travel Inquiry — Flynova*",
    reference ? `Ref: ${reference}` : "",
    "",
    `*Topic:* ${d.topic}`,
    d.destination ? `*Destination:* ${d.destination}` : "",
    d.packageName ? `*Package:* ${d.packageName}` : "",
    d.travelMonth ? `*When:* ${d.travelMonth}` : "",
    d.travellers ? `*Travellers:* ${d.travellers}` : "",
    d.company ? `*Organization:* ${d.company}` : "",
    d.companySize ? `*Team size:* ${d.companySize}` : "",
    d.travelFrequency ? `*Travel frequency:* ${d.travelFrequency}` : "",
    d.needs?.length ? `*Needs:* ${d.needs.join(", ")}` : "",
    "",
    `*Name:* ${d.fullName}`,
    `*Email:* ${d.email}`,
    `*Phone:* ${d.phone}`,
    "",
    d.message,
  ];
  return lines.filter((l, i, arr) => l !== "" || arr[i - 1] !== "").join("\n").trim();
}
