"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { PackageCard } from "@/components/cards/PackageCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { packages } from "@/lib/data/packages";

export function FeaturedPackages() {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 360) + 20), behavior: "smooth" });
  };

  return (
    <section className="relative py-20 lg:py-28" aria-labelledby="packages-title">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Holiday & tour packages"
            title="Holidays shaped"
            accent="around you."
            intro="Family vacations, honeymoons and group tours — every package is customized and quoted for your dates, travellers and budget."
          />
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => scroll(-1)} aria-label="Previous packages" className="grid size-12 place-items-center rounded-full ring-1 ring-forest-900/15 transition-colors hover:bg-forest-700 hover:text-white">
              <ArrowLeft className="size-5" />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Next packages" className="grid size-12 place-items-center rounded-full bg-forest-700 text-white transition-colors hover:bg-forest-600">
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
        <h2 id="packages-title" className="sr-only">Featured holiday packages</h2>
      </div>
      <ul
        ref={track}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-6 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
        {packages.map((p) => (
          <li key={p.slug} className="w-[85vw] max-w-[380px] shrink-0 snap-start sm:w-[360px]">
            <PackageCard pkg={p} className="h-full" />
          </li>
        ))}
        <li className="w-[85vw] max-w-[320px] shrink-0 snap-start sm:w-[300px]">
          <div className="flex h-full flex-col justify-between rounded-[28px] bg-gradient-to-br from-sun-300 to-sun-500 p-7 text-forest-950">
            <p className="font-display text-3xl leading-tight">Have something else in mind?</p>
            <div>
              <p className="text-sm text-forest-950/80">Tell us the destination and dates — we’ll design the package for you.</p>
              <ButtonLink href="/packages" variant="secondary" className="mt-5">
                See all packages <ArrowRight className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </li>
      </ul>
      <p className="container-page mt-2 text-xs text-mist">Package ideas for inspiration. Prices and inclusions are confirmed in your personal quote.</p>
    </section>
  );
}
