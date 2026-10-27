"use client";

import Link from "next/link";
import { ArrowRight, Clock, MapPin, Sparkles } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import type { HolidayPackage } from "@/lib/data/packages";
import { cn } from "@/lib/utils";

export function quoteHref(p: HolidayPackage) {
  const q = new URLSearchParams({ topic: "Holiday package quote", package: p.name, destination: p.destination });
  return `/contact?${q.toString()}#inquiry`;
}

export function PackageCard({ pkg, className }: { pkg: HolidayPackage; className?: string }) {
  return (
    <article className={cn("group flex flex-col overflow-hidden rounded-[28px] bg-white shadow-soft ring-1 ring-forest-900/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift", className)}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={pkg.image}
          fallback={pkg.fallback}
          alt={`${pkg.name} — ${pkg.destination}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-forest-800 backdrop-blur">
          <Sparkles className="size-3.5 text-sun-500" /> {pkg.style}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-mist">
          <MapPin className="size-3.5 text-sun-500" /> {pkg.destination}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight text-forest-900">{pkg.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-mist">{pkg.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {pkg.ideas.map((i) => (
            <li key={i} className="rounded-full bg-cream px-2.5 py-1 text-[0.72rem] font-medium text-forest-800">
              {i}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-forest-900/8 pt-5">
          <div>
            <p className="flex items-center gap-1.5 text-xs text-mist">
              <Clock className="size-3.5" /> {pkg.duration}
            </p>
            <p className="mt-1 text-sm font-bold text-forest-900">{pkg.price ?? "Request a Quote"}</p>
          </div>
          <Link
            href={quoteHref(pkg)}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-forest-700 px-5 text-sm font-semibold text-white transition-all hover:bg-forest-600 hover:gap-3"
            aria-label={`Request a quote for ${pkg.name}`}
          >
            Inquire <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
