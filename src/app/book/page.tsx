import type { Metadata } from "next";
import { Suspense } from "react";
import { CircleCheck, Headphones, Info, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { BookingFormFromQuery } from "@/components/forms/PrefilledForms";
import { FormSkeleton } from "@/components/forms/FormSkeleton";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppFloat";
import { photos, brandImages } from "@/lib/images";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Book a Flight",
  description:
    "Send a flight booking request to Flynova Travel Agency — one-way, round-trip or multi-city. Our team confirms availability, fares and ticketing with you.",
  alternates: { canonical: "/book" },
};

const how = [
  "Send your trip details using this form.",
  "Our team checks routes, airlines and the best available fares.",
  "We contact you with options and the confirmed price.",
  "You approve — we issue your ticket.",
];

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Flight booking request"
        title="Where would you"
        accent="like to fly?"
        intro="Tell us your route, dates and passengers. A Flynova travel consultant confirms availability, pricing and ticketing with you personally."
        image={photos.heroWing}
        fallback={brandImages.sunsetFlight}
        crumbs={[{ href: "/book", label: "Book a Flight" }]}
      />
      <section className="relative z-10 -mt-10 pb-24">
        <div className="container-page grid gap-8 lg:grid-cols-[1.45fr_0.55fr]">
          <div className="rounded-[32px] bg-white shadow-lift ring-1 ring-forest-900/5">
            <Suspense fallback={<FormSkeleton />}>
              <BookingFormFromQuery />
            </Suspense>
          </div>
          <aside className="space-y-5 lg:pt-10">
            <div className="rounded-[28px] bg-forest-900 p-7 text-white">
              <p className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-sun-300 uppercase"><Info className="size-4" /> How it works</p>
              <ol className="mt-5 space-y-4">
                {how.map((h, i) => (
                  <li key={h} className="flex gap-3 text-sm text-white/85">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold text-sun-300">{i + 1}</span>
                    {h}
                  </li>
                ))}
              </ol>
              <p className="mt-6 flex gap-2 border-t border-white/10 pt-5 text-xs text-white/60">
                <CircleCheck className="size-4 shrink-0 text-sun-400" /> We don’t show live prices or take payment online — every fare is confirmed by our team.
              </p>
            </div>
            <div className="rounded-[28px] bg-white p-7 shadow-soft">
              <Headphones className="size-6 text-sun-500" />
              <p className="mt-3 font-display text-xl text-forest-900">Prefer to talk?</p>
              <div className="mt-3 space-y-2 text-sm">
                {site.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-2 font-semibold text-forest-800 hover:text-forest-600"><Phone className="size-4" /> {p.display}</a>
                ))}
                <a href={whatsappUrl("Hello Flynova! I’d like to book a flight.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold text-[#128c3e] hover:underline">
                  <WhatsAppGlyph className="size-4" /> WhatsApp {site.whatsappDisplay}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
