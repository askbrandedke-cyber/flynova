"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PackageCard } from "@/components/cards/PackageCard";
import { packages, packageStyles } from "@/lib/data/packages";
import { cn } from "@/lib/utils";

export function PackageExplorer() {
  const [style, setStyle] = useState<(typeof packageStyles)[number] | "All">("All");
  const list = packages.filter((p) => style === "All" || p.style === style);
  return (
    <div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4" role="group" aria-label="Filter by trip style">
        {(["All", ...packageStyles] as const).map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={style === s}
            onClick={() => setStyle(s)}
            className={cn("relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors", style === s ? "text-forest-950" : "text-forest-800 ring-1 ring-forest-900/12 hover:bg-white")}
          >
            {style === s && <motion.span layoutId="style-pill" className="absolute inset-0 rounded-full bg-sun-400" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            <span className="relative">{s === "All" ? "All packages" : `${s}s`}</span>
          </button>
        ))}
      </div>
      <motion.ul layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.li key={p.slug} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.45 }}>
              <PackageCard pkg={p} className="h-full" />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
