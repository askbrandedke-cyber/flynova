"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

/** Interactive service explorer: a numbered timeline (echoing the company profile) driving a detail panel. */
export function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const s = services[active];

  return (
    <section className="relative overflow-hidden bg-sand/60 py-20 lg:py-28" aria-labelledby="services-title">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-page relative">
        <SectionHeading eyebrow="Our core services" title="Everything your trip needs," accent="in one place." intro="Five services, one dedicated team — from the first question to the moment you land." />
        <span id="services-title" className="sr-only">Our services</span>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div role="tablist" aria-label="Services" aria-orientation="vertical" className="relative flex flex-col">
            <span className="absolute top-6 bottom-6 left-[27px] w-px bg-forest-900/12" aria-hidden="true" />
            {services.map((svc, i) => {
              const selected = i === active;
              return (
                <button
                  key={svc.slug}
                  role="tab"
                  id={`svc-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="svc-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                      e.preventDefault();
                      const next = (i + (e.key === "ArrowDown" ? 1 : -1) + services.length) % services.length;
                      setActive(next);
                      document.getElementById(`svc-tab-${next}`)?.focus();
                    }
                  }}
                  className={cn("group relative flex items-center gap-5 rounded-3xl py-4 pr-4 pl-2 text-left transition-colors", selected ? "bg-white shadow-soft" : "hover:bg-white/50")}
                >
                  <span
                    className={cn(
                      "relative z-10 grid size-10 shrink-0 place-items-center rounded-full border-2 font-display text-sm font-semibold transition-all duration-300 ml-2",
                      selected ? "border-sun-400 bg-sun-400 text-forest-950 scale-110" : "border-forest-900/15 bg-cream text-forest-700",
                    )}
                  >
                    {svc.number}
                  </span>
                  <span className="min-w-0">
                    <span className={cn("block font-display text-xl transition-colors sm:text-2xl", selected ? "text-forest-900" : "text-forest-900/60")}>{svc.title}</span>
                    <span className={cn("block text-sm text-mist transition-all", selected ? "opacity-100" : "opacity-0 max-sm:hidden")}>{svc.short}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${active}`} className="relative min-h-[540px] overflow-hidden rounded-[32px] bg-forest-900 text-white shadow-lift">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <SmartImage src={s.image} fallback={s.fallback} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-forest-950/10" />
              </motion.div>
            </AnimatePresence>
            <div className="relative flex h-full min-h-[540px] flex-col justify-end p-7 sm:p-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={s.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }}>
                  <p className="font-display text-6xl text-sun-400/90 italic">{s.number}</p>
                  <h3 className="mt-2 font-display text-3xl sm:text-4xl">{s.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">{s.intro}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.highlights.map((h) => (
                      <li key={h} className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 text-sm backdrop-blur">
                        <Check className="size-4 text-sun-400" /> {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <ButtonLink href={s.cta.href}>{s.cta.label} <ArrowRight className="size-4" /></ButtonLink>
                    <Link href={`/services/${s.slug}`} className="inline-flex h-12 items-center px-2 text-sm font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline">
                      Learn more
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
