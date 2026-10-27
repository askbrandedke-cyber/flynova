"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Phone, PlaneTakeoff } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/** Sticky booking CTA on small screens, shown once the visitor scrolls past the hero. */
export function MobileBookBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 520;
      setShow(window.scrollY > window.innerHeight * 0.7 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname === "/book") return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 z-40 flex h-14 items-center gap-1 rounded-full bg-forest-900/95 p-1.5 pr-1.5 shadow-lift backdrop-blur lg:hidden print:hidden"
          style={{ right: "5.25rem" }}
        >
          <Link
            href="/book"
            className="flex h-full flex-1 items-center justify-center gap-2 rounded-full bg-sun-400 px-4 text-sm font-bold text-forest-950"
          >
            <PlaneTakeoff className="size-4" /> Book a Flight
          </Link>
          <a
            href={`tel:${site.phones[0].tel}`}
            aria-label={`Call Flynova on ${site.phones[0].display}`}
            className="grid aspect-square h-full place-items-center rounded-full text-white"
          >
            <Phone className="size-5" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
