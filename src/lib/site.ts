export const site = {
  name: "Flynova Travel Agency Ltd",
  shortName: "Flynova",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://flynova-kappa.vercel.app",
  tagline: "Personalized & Reliable Air Travel Services",
  description:
    "Flynova Travel Agency Ltd in Juba, South Sudan — air ticketing, travel consultation, corporate travel management, holiday & tour packages and visa assistance for individuals, businesses and organizations.",
  phones: [
    { display: "+211 989 655 700", tel: "+211989655700" },
    { display: "+211 920 19936", tel: "+21192019936" },
  ],
  /** Digits only, international format, as required by wa.me links. */
  whatsapp: "211989655700",
  whatsappDisplay: "+211 989 655 700",
  email: "flynova211@gmail.com",
  address: {
    line1: "Dable Energy Petrol Station",
    line2: "Tombura Road",
    city: "Juba",
    country: "South Sudan",
  },
  mission:
    "To provide exceptional travel services through innovation, reliability, and customer-centric solutions, making travel accessible and stress-free for all our clients.",
  vision:
    "To become a leading travel agency recognized for excellence in air ticketing, customer service, and travel management solutions across regional and international markets.",
  commitment:
    "At Flynova Travel Agency Ltd, we believe that travel should be exciting, not stressful. We are committed to handling every detail of your journey with professionalism and care, allowing you to focus on enjoying your travel experience.",
  about: [
    "Flynova Travel Agency Ltd is a dynamic and customer-focused travel solutions provider specializing in air ticketing and comprehensive travel services. Established with a vision to simplify travel planning and enhance customer experiences, Flynova is committed to delivering reliable, efficient, and affordable travel solutions for individuals, businesses, and organizations.",
    "We pride ourselves on combining industry expertise with personalized service to ensure every journey is seamless, convenient and memorable.",
  ],
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Dable Energy Petrol Station, Tombura Road, Juba, South Sudan",
)}`;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/destinations", label: "Destinations" },
  { href: "/packages", label: "Holiday Packages" },
  { href: "/contact", label: "Contact" },
] as const;

export const values = [
  { title: "Integrity", text: "We operate with honesty and transparency." },
  { title: "Excellence", text: "We strive for the highest standards in service delivery." },
  { title: "Innovation", text: "We embrace technology to improve travel experiences." },
  { title: "Commitment", text: "We are dedicated to meeting and exceeding customer expectations." },
] as const;

export const whyChoose = [
  { title: "Customer-Centric Approach", text: "We prioritize our clients’ needs and satisfaction." },
  { title: "Competitive Pricing", text: "Access to affordable fares and exclusive travel deals." },
  { title: "Professional Expertise", text: "A knowledgeable team with industry experience." },
  { title: "Reliability", text: "Timely service delivery and dependable support." },
  { title: "24/7 Support", text: "Assistance whenever you need it, wherever you are." },
] as const;

export const targetClients = [
  "Individual travelers",
  "Corporate organizations",
  "Government institutions",
  "Tour groups and families",
] as const;
