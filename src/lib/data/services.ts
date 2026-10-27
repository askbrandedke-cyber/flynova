import { brandImages, photos } from "@/lib/images";

export type ServiceSlug =
  | "air-ticketing"
  | "travel-consultation"
  | "corporate-travel-management"
  | "holiday-tour-packages"
  | "visa-assistance";

export type Service = {
  slug: ServiceSlug;
  number: string;
  title: string;
  short: string;
  intro: string;
  highlights: string[];
  benefits: { title: string; text: string }[];
  image: string;
  fallback: string;
  cta: { label: string; href: string };
};

export const services: Service[] = [
  {
    slug: "air-ticketing",
    number: "01",
    title: "Air Ticketing",
    short: "Domestic and international flights with competitive pricing and flexible options.",
    intro:
      "We offer competitive pricing and flexible options for both domestic and international flights. Tell us where you want to go — our team searches for the best available fares, handles the reservation and issues your ticket quickly.",
    highlights: ["Best available fares", "Efficient booking and reservation services", "Quick ticket issuance"],
    benefits: [
      { title: "Fare comparison done for you", text: "We look across options to find the best available fare for your dates and preferences." },
      { title: "Flexible routing", text: "One-way, round-trip and multi-city journeys, domestic or international." },
      { title: "Fast ticket issuance", text: "Once you confirm, we move quickly to reserve and issue your ticket." },
      { title: "A real person to call", text: "Speak to the Flynova team by phone or WhatsApp at any stage." },
    ],
    image: photos.airliner,
    fallback: brandImages.sunsetFlight,
    cta: { label: "Request a flight", href: "/book" },
  },
  {
    slug: "travel-consultation",
    number: "02",
    title: "Travel Consultation",
    short: "Expert guidance on routes, airlines and advisories so you can plan with confidence.",
    intro:
      "Our experienced travel consultants provide expert guidance to help you plan your trip effectively — from choosing the right route and airline to understanding the travel advisories that apply to your journey.",
    highlights: ["Route planning", "Airline recommendations", "Travel advisories"],
    benefits: [
      { title: "Smarter routes", text: "Connections and layovers planned around your time, budget and comfort." },
      { title: "Airline recommendations", text: "Honest advice on which carriers and fares suit your trip." },
      { title: "Up-to-date advisories", text: "Guidance on entry rules and travel advisories before you go." },
      { title: "Personal attention", text: "A conversation about your plans, not a one-size-fits-all package." },
    ],
    image: brandImages.windowTraveller,
    fallback: brandImages.windowTraveller,
    cta: { label: "Book a consultation", href: "/contact?topic=Travel%20Consultation" },
  },
  {
    slug: "corporate-travel-management",
    number: "03",
    title: "Corporate Travel Management",
    short: "Tailored travel solutions that help organizations manage travel efficiently.",
    intro:
      "We deliver tailored travel solutions for businesses, helping companies manage travel efficiently with cost-effective booking strategies, travel policy compliance and dedicated support for your travellers.",
    highlights: ["Cost-effective booking strategies", "Travel policy compliance", "Dedicated support"],
    benefits: [
      { title: "Cost-effective booking", text: "Booking strategies designed around your organization’s budget." },
      { title: "Policy compliance", text: "Travel arranged in line with your company’s travel policy." },
      { title: "Group and team travel", text: "Coordinated bookings for delegations, teams and events." },
      { title: "Dedicated point of contact", text: "One team that knows your organization and its travellers." },
    ],
    image: photos.corporate,
    fallback: brandImages.loungeTraveller,
    cta: { label: "Talk to our corporate desk", href: "/corporate#corporate-inquiry" },
  },
  {
    slug: "holiday-tour-packages",
    number: "04",
    title: "Holiday & Tour Packages",
    short: "Customized packages for families, honeymooners and groups.",
    intro:
      "Flynova curates customized travel packages for leisure travellers. Whether it’s a family vacation, a honeymoon or a group tour, we shape the trip around who you’re travelling with and what you love.",
    highlights: ["Family vacations", "Honeymoon packages", "Group tours"],
    benefits: [
      { title: "Built around you", text: "Every package is customized — nothing off-the-shelf." },
      { title: "Flights and more", text: "We coordinate flights alongside the rest of your holiday plans." },
      { title: "Families and groups", text: "Experience planning for travelling families and tour groups." },
      { title: "Clear quotes", text: "You receive a tailored quote before anything is booked." },
    ],
    image: photos.beach,
    fallback: brandImages.safari,
    cta: { label: "Explore packages", href: "/packages" },
  },
  {
    slug: "visa-assistance",
    number: "05",
    title: "Visa Assistance",
    short: "Documentation guidance, application support and appointment scheduling.",
    intro:
      "Visa paperwork can be the most stressful part of a trip. We assist with the visa application process by guiding you on documentation, supporting your application and helping schedule appointments.",
    highlights: ["Documentation guidance", "Application support", "Appointment scheduling"],
    benefits: [
      { title: "Know what you need", text: "Clear guidance on the documents your application requires." },
      { title: "Application support", text: "Help preparing and reviewing your application before submission." },
      { title: "Appointment scheduling", text: "Assistance booking the appointments your application needs." },
      { title: "Joined-up planning", text: "Visa timelines considered alongside your flight plans." },
    ],
    image: photos.travelPlanning,
    fallback: brandImages.worldLandmarks,
    cta: { label: "Get visa assistance", href: "/contact?topic=Visa%20Assistance" },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
