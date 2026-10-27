import { brandImages, photos, unsplash } from "@/lib/images";

export type Region = "Africa" | "Middle East" | "Europe" | "Asia & Islands";

export type Destination = {
  slug: string;
  city: string;
  country: string;
  region: Region;
  airport: string;
  tagline: string;
  description: string;
  highlights: string[];
  bestFor: string[];
  image: string;
  fallback: string;
};

/**
 * Destinations to explore. These are inspiration for travellers, not confirmed
 * Flynova offers — routes, fares and availability are confirmed per inquiry.
 */
export const destinations: Destination[] = [
  {
    slug: "dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    airport: "DXB",
    tagline: "Skylines, souks and desert sunsets",
    description:
      "A global crossroads for business and leisure, Dubai pairs futuristic architecture with traditional souks, golden beaches and dune adventures.",
    highlights: ["Burj Khalifa & Downtown", "Desert safaris", "Old Dubai souks", "Beach resorts"],
    bestFor: ["Business", "Shopping", "Family"],
    image: unsplash("photo-1512453979798-5ea266f8880c"),
    fallback: brandImages.sunsetFlight,
  },
  {
    slug: "kenya-safari",
    city: "Nairobi & Maasai Mara",
    country: "Kenya",
    region: "Africa",
    airport: "NBO",
    tagline: "Big skies and the great migration",
    description:
      "From Nairobi’s energy to the open plains of the Maasai Mara, Kenya is East Africa’s classic safari escape — close to home, unforgettable on arrival.",
    highlights: ["Game drives", "Nairobi National Park", "Maasai culture", "Hot-air balloon safaris"],
    bestFor: ["Safari", "Family", "Groups"],
    image: brandImages.safari,
    fallback: brandImages.safari,
  },
  {
    slug: "zanzibar",
    city: "Zanzibar",
    country: "Tanzania",
    region: "Africa",
    airport: "ZNZ",
    tagline: "Spice island beaches and Stone Town",
    description:
      "Turquoise water, white-sand beaches and the winding lanes of UNESCO-listed Stone Town make Zanzibar a favourite for honeymoons and relaxed getaways.",
    highlights: ["Stone Town", "Nungwi & Kendwa beaches", "Spice tours", "Dhow sunset cruises"],
    bestFor: ["Honeymoon", "Beach", "Relaxation"],
    image: photos.beach,
    fallback: brandImages.sunsetFlight,
  },
  {
    slug: "cairo",
    city: "Cairo",
    country: "Egypt",
    region: "Africa",
    airport: "CAI",
    tagline: "Pyramids, the Nile and 5,000 years of history",
    description:
      "Stand before the Pyramids of Giza, cruise the Nile and wander through bustling bazaars in one of the world’s great historic capitals.",
    highlights: ["Giza Pyramids", "Grand Egyptian Museum", "Nile cruises", "Khan el-Khalili"],
    bestFor: ["History", "Culture", "Groups"],
    image: unsplash("photo-1572252009286-268acec5ca0a"),
    fallback: brandImages.worldLandmarks,
  },
  {
    slug: "cape-town",
    city: "Cape Town",
    country: "South Africa",
    region: "Africa",
    airport: "CPT",
    tagline: "Where the mountain meets the ocean",
    description:
      "Table Mountain, the Cape Winelands and dramatic coastal drives make Cape Town one of the most beautiful cities on the continent.",
    highlights: ["Table Mountain", "Cape Winelands", "Cape Point", "V&A Waterfront"],
    bestFor: ["Adventure", "Food & wine", "Honeymoon"],
    image: unsplash("photo-1580060839134-75a5edca2e99"),
    fallback: brandImages.worldLandmarks,
  },
  {
    slug: "istanbul",
    city: "Istanbul",
    country: "Türkiye",
    region: "Europe",
    airport: "IST",
    tagline: "Two continents, one unforgettable city",
    description:
      "Straddling Europe and Asia, Istanbul blends Byzantine and Ottoman landmarks with lively bazaars, Bosphorus views and world-class food.",
    highlights: ["Hagia Sophia", "Grand Bazaar", "Bosphorus cruise", "Blue Mosque"],
    bestFor: ["Culture", "Shopping", "Stopovers"],
    image: unsplash("photo-1524231757912-21f4fe3a7200"),
    fallback: brandImages.worldLandmarks,
  },
  {
    slug: "london",
    city: "London",
    country: "United Kingdom",
    region: "Europe",
    airport: "LHR",
    tagline: "Royal landmarks and world-class culture",
    description:
      "Historic palaces, free museums, theatre and diverse neighbourhoods — London rewards first-time visitors and returning travellers alike.",
    highlights: ["Westminster & Big Ben", "British Museum", "West End shows", "Royal parks"],
    bestFor: ["Business", "Study", "Culture"],
    image: unsplash("photo-1513635269975-59663e0ac1ad"),
    fallback: brandImages.worldLandmarks,
  },
  {
    slug: "paris",
    city: "Paris",
    country: "France",
    region: "Europe",
    airport: "CDG",
    tagline: "The city of light and romance",
    description:
      "Iconic boulevards, café culture and the Eiffel Tower at dusk — Paris remains a timeless choice for honeymoons and cultural breaks.",
    highlights: ["Eiffel Tower", "The Louvre", "Seine river cruise", "Montmartre"],
    bestFor: ["Honeymoon", "Culture", "Food"],
    image: unsplash("photo-1502602898657-3e91760cbb34"),
    fallback: brandImages.worldLandmarks,
  },
  {
    slug: "rome",
    city: "Rome",
    country: "Italy",
    region: "Europe",
    airport: "FCO",
    tagline: "An open-air museum of the ancient world",
    description:
      "The Colosseum, the Vatican and piazzas filled with life — Rome layers thousands of years of history into every street.",
    highlights: ["Colosseum", "Vatican City", "Trevi Fountain", "Trastevere"],
    bestFor: ["History", "Faith travel", "Food"],
    image: unsplash("photo-1552832230-c0197dd311b5"),
    fallback: brandImages.worldLandmarks,
  },
  {
    slug: "india",
    city: "New Delhi & Agra",
    country: "India",
    region: "Asia & Islands",
    airport: "DEL",
    tagline: "Monuments, markets and modern medicine",
    description:
      "From the Taj Mahal to Delhi’s historic quarters, India offers rich heritage — and is a common choice for travellers seeking medical care abroad.",
    highlights: ["Taj Mahal", "Old Delhi", "Qutub Minar", "Medical travel"],
    bestFor: ["Culture", "Medical travel", "Business"],
    image: unsplash("photo-1524492412937-b28074a5d7da"),
    fallback: brandImages.worldLandmarks,
  },
  {
    slug: "maldives",
    city: "Malé & the Atolls",
    country: "Maldives",
    region: "Asia & Islands",
    airport: "MLE",
    tagline: "Overwater villas and lagoon-blue seas",
    description:
      "Private islands, coral reefs and overwater villas — the Maldives is the definition of a once-in-a-lifetime honeymoon.",
    highlights: ["Overwater villas", "Snorkelling & diving", "Sandbank picnics", "Spa retreats"],
    bestFor: ["Honeymoon", "Luxury", "Relaxation"],
    image: unsplash("photo-1514282401047-d79a71a590e8"),
    fallback: brandImages.sunsetFlight,
  },
  {
    slug: "bali",
    city: "Bali",
    country: "Indonesia",
    region: "Asia & Islands",
    airport: "DPS",
    tagline: "Temples, rice terraces and island calm",
    description:
      "Lush rice terraces, cliff-top temples and laid-back beach towns give Bali a gentle, soulful rhythm loved by couples and families.",
    highlights: ["Ubud rice terraces", "Uluwatu temple", "Beach clubs", "Wellness retreats"],
    bestFor: ["Honeymoon", "Wellness", "Family"],
    image: unsplash("photo-1537996194471-e657df975ab4"),
    fallback: brandImages.sunsetFlight,
  },
];

export const regions: Region[] = ["Africa", "Middle East", "Europe", "Asia & Islands"];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
