import type { MetadataRoute } from "next";
export const dynamic = "force-static";

import { site } from "@/lib/site";
import { services } from "@/lib/data/services";
import { destinations } from "@/lib/data/destinations";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/destinations", "/packages", "/corporate", "/contact", "/book"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...destinations.map((d) => ({ url: `${site.url}/destinations/${d.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
