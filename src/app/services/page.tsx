import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { services } from "@/lib/data/services";
import { photos, brandImages } from "@/lib/images";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Travel Services",
  description:
    "Air ticketing, travel consultation, corporate travel management, holiday & tour packages and visa assistance from Flynova Travel Agency in Juba.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Five services."
        accent="One dedicated team."
        intro="From your first question to your return flight — Flynova brings ticketing, planning, visas and holidays together."
        image={photos.airliner}
        fallback={brandImages.sunsetFlight}
        crumbs={[{ href: "/services", label: "Services" }]}
      >
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {services.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="shrink-0 rounded-full border border-white/25 px-4 py-2 text-sm font-medium text-white/85 backdrop-blur transition-colors hover:bg-white hover:text-forest-900">
              {s.title}
            </a>
          ))}
        </div>
      </PageHero>

      <div className="py-20 lg:py-28">
        <div className="container-page space-y-24 lg:space-y-32">
          {services.map((s, i) => (
            <section key={s.slug} id={s.slug} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20" aria-labelledby={`${s.slug}-title`}>
              <Reveal className={cn("relative", i % 2 === 1 && "lg:order-2")}>
                <Link href={`/services/${s.slug}`} className="group relative block aspect-[5/4] overflow-hidden rounded-[36px] shadow-lift" tabIndex={-1} aria-hidden="true">
                  <SmartImage src={s.image} fallback={s.fallback} alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                </Link>
                <span className={cn("absolute -top-6 font-display text-[7rem] leading-none text-sun-400 italic drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] sm:text-[9rem]", i % 2 ? "-right-2" : "-left-2")} aria-hidden="true">
                  {s.number}
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="eyebrow">Service {s.number}</p>
                <h2 id={`${s.slug}-title`} className="mt-4 font-display text-4xl text-forest-900 sm:text-5xl">{s.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-mist">{s.intro}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {s.benefits.map((b) => (
                    <li key={b.title} className="flex gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-forest-700 text-white"><Check className="size-3.5" /></span>
                      <span>
                        <strong className="block text-sm text-forest-900">{b.title}</strong>
                        <span className="text-sm text-mist">{b.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={s.cta.href}>{s.cta.label} <ArrowRight className="size-4" /></ButtonLink>
                  <ButtonLink href={`/services/${s.slug}`} variant="ghost" className="ring-1 ring-forest-900/15">Service details</ButtonLink>
                </div>
              </Reveal>
            </section>
          ))}
        </div>
      </div>
      <CtaBand title="Let’s plan your next trip." />
      <div className="h-16" />
    </>
  );
}
