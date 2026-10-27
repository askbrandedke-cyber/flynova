import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { DestinationExplorer } from "@/components/sections/DestinationExplorer";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { brandImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Destinations to Explore",
  description:
    "Find inspiration for your next trip from Juba — Dubai, Kenya safaris, Zanzibar, Cairo, Istanbul, London, Paris and more. Request flights and holiday quotes from Flynova.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Destinations to explore"
        title="The world is closer"
        accent="than you think."
        intro="Browse ideas for your next journey. Every destination can be combined with flights, visa assistance and a tailored holiday package."
        image={brandImages.worldLandmarks}
        crumbs={[{ href: "/destinations", label: "Destinations" }]}
      >
        <ButtonLink href="/book" size="lg">Request a flight <ArrowRight className="size-5" /></ButtonLink>
      </PageHero>
      <section className="py-16 lg:py-24">
        <div className="container-page">
          <DestinationExplorer />
          <p className="mt-10 max-w-3xl text-xs text-mist">
            These destinations are suggestions to inspire your travel and are not confirmed Flynova offers. Routes, fares, availability and entry requirements are confirmed for each individual request.
          </p>
        </div>
      </section>
      <CtaBand title="Dreaming of somewhere else?" text="If you can name it, we can help you get there. Tell us your destination and travel dates." />
      <div className="h-16" />
    </>
  );
}
