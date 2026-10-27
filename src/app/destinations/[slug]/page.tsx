import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, PlaneTakeoff, Sparkles } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppFloat";
import { destinations, getDestination } from "@/lib/data/destinations";
import { whatsappUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  return {
    title: `${d.city}, ${d.country}`,
    description: `${d.tagline}. ${d.description} Plan flights and holidays to ${d.city} with Flynova Travel Agency.`,
    alternates: { canonical: `/destinations/${d.slug}` },
  };
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();
  const place = `${d.city}, ${d.country}`;
  const bookHref = `/book?${new URLSearchParams({ to: `${d.city} (${d.airport})` }).toString()}`;
  const related = destinations.filter((o) => o.slug !== d.slug && o.region === d.region).slice(0, 3);
  const more = related.length < 3 ? [...related, ...destinations.filter((o) => o.slug !== d.slug && !related.includes(o)).slice(0, 3 - related.length)] : related;

  return (
    <>
      <PageHero
        eyebrow={`${d.region} · ${d.country}`}
        title={d.city}
        intro={d.tagline}
        image={d.image}
        fallback={d.fallback}
        crumbs={[
          { href: "/destinations", label: "Destinations" },
          { href: `/destinations/${d.slug}`, label: d.city },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={bookHref} size="lg"><PlaneTakeoff className="size-5" /> Request flights to {d.city}</ButtonLink>
          <ButtonLink href="#inquiry" variant="outline-light" size="lg">Plan a trip here</ButtonLink>
        </div>
      </PageHero>

      <section className="py-20 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">Why visit</p>
              <p className="mt-5 font-display text-3xl leading-snug text-forest-900 sm:text-4xl">{d.description}</p>
            </Reveal>
            <Stagger as="ul" className="mt-10 grid gap-3 sm:grid-cols-2">
              {d.highlights.map((h) => (
                <StaggerItem as="li" key={h} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft">
                  <span className="grid size-8 place-items-center rounded-full bg-sun-50 text-sun-500"><Sparkles className="size-4" /></span>
                  <span className="font-medium text-forest-900">{h}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal delay={0.15} className="self-start rounded-[32px] bg-forest-900 p-8 text-white lg:sticky lg:top-28">
            <p className="flex items-center gap-2 text-sm text-white/70"><MapPin className="size-4 text-sun-400" /> {place}</p>
            <p className="mt-6 text-xs font-bold tracking-[0.2em] text-sun-300 uppercase">Great for</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {d.bestFor.map((b) => (
                <li key={b} className="rounded-full bg-white/10 px-3 py-1 text-sm">{b}</li>
              ))}
            </ul>
            <p className="mt-6 text-xs font-bold tracking-[0.2em] text-sun-300 uppercase">How Flynova helps</p>
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              {["Flights from Juba and beyond", "Visa documentation guidance", "Customized holiday package", "24/7 support while you travel"].map((x) => (
                <li key={x} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-sun-400" /> {x}</li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3">
              <ButtonLink href={bookHref} className="w-full">Request flights <ArrowRight className="size-4" /></ButtonLink>
              <ButtonLink href={whatsappUrl(`Hello Flynova! I’m interested in travelling to ${place}. Can you help me with flights and options?`)} variant="whatsapp" className="w-full">
                <WhatsAppGlyph className="size-5" /> Ask on WhatsApp
              </ButtonLink>
            </div>
            <p className="mt-5 text-xs text-white/50">Suggested destination — routes, fares and availability are confirmed per request.</p>
          </Reveal>
        </div>
      </section>

      <section id="inquiry" className="scroll-mt-24 bg-sand/60 py-20 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow">Plan your trip</p>
            <h2 className="mt-4 font-display text-4xl text-forest-900 sm:text-5xl">Travel to {d.city} with Flynova</h2>
            <p className="mt-4 text-mist">Tell us when you’d like to go and who’s travelling — we’ll come back with options for flights and, if you like, a full holiday package.</p>
          </div>
          <div className="rounded-[32px] bg-white p-6 shadow-lift sm:p-10">
            <InquiryForm prefill={{ topic: "Destination inquiry", destination: place }} submitLabel="Send trip inquiry" />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-page">
          <h2 className="font-display text-3xl text-forest-900 sm:text-4xl">More places to explore</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((o) => (
              <li key={o.slug}><DestinationCard destination={o} className="h-full" /></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
