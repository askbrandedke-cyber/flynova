"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import type { Destination } from "@/lib/data/destinations";
import { cn } from "@/lib/utils";

export function DestinationCard({
  destination: d,
  className,
  size = "md",
  priority,
}: {
  destination: Destination;
  className?: string;
  size?: "md" | "lg";
  priority?: boolean;
}) {
  return (
    <Link
      href={`/destinations/${d.slug}`}
      className={cn(
        "group relative isolate flex overflow-hidden rounded-[28px] bg-forest-900 text-white shadow-soft transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-lift focus-visible:-translate-y-1.5",
        size === "lg" ? "min-h-[420px] sm:min-h-[520px]" : "min-h-[340px] sm:min-h-[380px]",
        className,
      )}
    >
      <SmartImage
        src={d.image}
        fallback={d.fallback}
        alt={`${d.city}, ${d.country}`}
        fill
        priority={priority}
        sizes={size === "lg" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
        className="-z-20 object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/95 via-forest-950/35 to-transparent transition-opacity duration-500 group-hover:from-forest-950" />
      <span className="absolute top-4 left-4 rounded-full bg-white/15 px-3 py-1 text-[0.7rem] font-semibold tracking-wide backdrop-blur-md">
        {d.region}
      </span>
      <span className="absolute top-4 right-4 grid size-11 translate-y-1 place-items-center rounded-full bg-sun-400 text-forest-950 opacity-0 shadow-glow transition-all duration-500 group-hover:translate-y-0 group-hover:rotate-45 group-hover:opacity-100 group-focus-visible:opacity-100">
        <ArrowUpRight className="size-5 -rotate-45" />
      </span>
      <div className="mt-auto w-full p-6 sm:p-7">
        <p className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.18em] text-sun-300 uppercase">
          <MapPin className="size-3.5" /> {d.country}
        </p>
        <h3 className={cn("mt-2 font-display leading-[1.05] tracking-tight", size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl")}>{d.city}</h3>
        <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="pt-3 text-sm leading-relaxed text-white/80">{d.tagline}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sun-300">
              Discover more <ArrowUpRight className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
