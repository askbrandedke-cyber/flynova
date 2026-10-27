"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { destinations, regions, type Region } from "@/lib/data/destinations";
import { cn } from "@/lib/utils";

export function DestinationExplorer() {
  const [region, setRegion] = useState<Region | "All">("All");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations.filter(
      (d) =>
        (region === "All" || d.region === region) &&
        (!q || [d.city, d.country, d.tagline, ...d.bestFor].some((s) => s.toLowerCase().includes(q))),
    );
  }, [region, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0" role="group" aria-label="Filter by region">
          {(["All", ...regions] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              aria-pressed={region === r}
              className={cn(
                "relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                region === r ? "text-white" : "text-forest-800 ring-1 ring-forest-900/12 hover:bg-white",
              )}
            >
              {region === r && <motion.span layoutId="region-pill" className="absolute inset-0 rounded-full bg-forest-700" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="relative">{r}</span>
            </button>
          ))}
        </div>
        <label className="relative block w-full lg:w-80">
          <span className="sr-only">Search destinations</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-mist" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city, country or trip style"
            className="h-12 w-full rounded-full border border-forest-900/12 bg-white pr-10 pl-11 text-sm outline-none focus:border-forest-500 focus:ring-4 focus:ring-forest-500/10"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-mist hover:text-forest-900">
              <X className="size-4" />
            </button>
          )}
        </label>
      </div>

      <p className="mt-6 text-sm text-mist" aria-live="polite">
        Showing {results.length} destination{results.length === 1 ? "" : "s"}
      </p>

      <motion.ul layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {results.map((d, i) => (
            <motion.li
              key={d.slug}
              layout
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: Math.min(i, 6) * 0.04 }}
            >
              <DestinationCard destination={d} className="h-full" priority={i < 3} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {results.length === 0 && (
        <div className="mt-6 rounded-3xl bg-white p-10 text-center shadow-soft">
          <p className="font-display text-2xl text-forest-900">Not listed? We can still get you there.</p>
          <p className="mt-2 text-mist">Flynova books domestic and international flights to destinations worldwide.</p>
        </div>
      )}
    </div>
  );
}
