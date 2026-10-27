import { brandImages, photos } from "@/lib/images";
import { getDestination } from "@/lib/data/destinations";

export type HolidayPackage = {
  slug: string;
  name: string;
  destination: string;
  destinationSlug?: string;
  style: "Family vacation" | "Honeymoon" | "Group tour";
  duration: string;
  description: string;
  ideas: string[];
  image: string;
  fallback: string;
  /** Leave undefined until Flynova confirms a published price. */
  price?: string;
};

const img = (slug: string) => getDestination(slug)?.image ?? brandImages.sunsetFlight;

/**
 * Package ideas reflecting the trip styles in Flynova's profile (family vacations,
 * honeymoons, group tours). Every package is customised and quoted on request.
 */
export const packages: HolidayPackage[] = [
  {
    slug: "dubai-family-escape",
    name: "Dubai Family Escape",
    destination: "Dubai, UAE",
    destinationSlug: "dubai",
    style: "Family vacation",
    duration: "5–7 days (flexible)",
    description: "City sights, theme parks, a desert evening and beach time — paced for travelling families.",
    ideas: ["Return flights", "Family-friendly hotel", "Desert safari", "City tour"],
    image: img("dubai"),
    fallback: brandImages.sunsetFlight,
  },
  {
    slug: "zanzibar-honeymoon",
    name: "Zanzibar Honeymoon",
    destination: "Zanzibar, Tanzania",
    destinationSlug: "zanzibar",
    style: "Honeymoon",
    duration: "6–8 days (flexible)",
    description: "Barefoot beaches, Stone Town evenings and a sunset dhow cruise for two.",
    ideas: ["Return flights", "Beachfront stay", "Stone Town walk", "Sunset cruise"],
    image: img("zanzibar"),
    fallback: brandImages.sunsetFlight,
  },
  {
    slug: "kenya-safari-group",
    name: "Kenya Safari Group Tour",
    destination: "Nairobi & Maasai Mara, Kenya",
    destinationSlug: "kenya-safari",
    style: "Group tour",
    duration: "4–6 days (flexible)",
    description: "A short-haul safari adventure for friends, colleagues or community groups.",
    ideas: ["Group flights", "Safari lodge", "Game drives", "Nairobi stopover"],
    image: brandImages.safari,
    fallback: brandImages.safari,
  },
  {
    slug: "maldives-honeymoon",
    name: "Maldives Island Retreat",
    destination: "Maldives",
    destinationSlug: "maldives",
    style: "Honeymoon",
    duration: "5–7 days (flexible)",
    description: "Overwater villas, reef snorkelling and complete privacy — honeymoon perfection.",
    ideas: ["Return flights", "Island resort", "Seaplane or speedboat transfer", "Spa time"],
    image: img("maldives"),
    fallback: brandImages.sunsetFlight,
  },
  {
    slug: "cairo-heritage",
    name: "Cairo & the Nile Heritage Tour",
    destination: "Cairo, Egypt",
    destinationSlug: "cairo",
    style: "Group tour",
    duration: "5–8 days (flexible)",
    description: "Pyramids, museums and a Nile cruise — ideal for curious families and study groups.",
    ideas: ["Return flights", "Guided Giza visit", "Museum tour", "Optional Nile cruise"],
    image: img("cairo"),
    fallback: brandImages.worldLandmarks,
  },
  {
    slug: "cape-town-family",
    name: "Cape Town Coast & Winelands",
    destination: "Cape Town, South Africa",
    destinationSlug: "cape-town",
    style: "Family vacation",
    duration: "6–9 days (flexible)",
    description: "Table Mountain, penguins at Boulders Beach and scenic coastal drives for all ages.",
    ideas: ["Return flights", "City stay", "Cape Peninsula tour", "Winelands day"],
    image: img("cape-town"),
    fallback: photos.mountainLake,
  },
];

export const packageStyles = ["Family vacation", "Honeymoon", "Group tour"] as const;
