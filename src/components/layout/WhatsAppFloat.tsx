"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/lib/whatsapp";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="currentColor">
      <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A12.94 12.94 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.6c-2.03 0-4.01-.55-5.74-1.58l-.41-.24-3.96 1.04 1.06-3.86-.27-.4A10.58 10.58 0 0 1 5.4 16c0-5.86 4.77-10.62 10.64-10.62A10.62 10.62 0 0 1 26.64 16c0 5.86-4.76 10.6-10.6 10.6Zm5.82-7.94c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.72.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.85-1.59-1.9-1.78-2.21-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.08 1.3 3.29c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.2 2 .12.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export { WhatsAppGlyph };

export function WhatsAppFloat() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const context =
    pathname === "/" ? "" : ` I’m on your website (${pathname.replace(/^\//, "").replace(/-/g, " ").replace(/\//g, " › ")}).`;
  const message = `Hello Flynova! 👋${context} I’d like some help with my travel plans.`;
  return (
    <motion.a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Flynova on WhatsApp"
      initial={reduce ? false : { scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      className="group fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6 print:hidden"
    >
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25d366]" aria-hidden="true" />
      <span className="relative grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.65)] transition-transform duration-300 group-hover:scale-110 sm:size-[60px]">
        <WhatsAppGlyph className="size-7 sm:size-8" />
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute top-1/2 right-full mr-3 hidden -translate-y-1/2 translate-x-2 rounded-full bg-forest-900 px-4 py-2 text-sm font-semibold whitespace-nowrap text-white opacity-0 shadow-lift transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block"
      >
        Chat with Flynova
      </span>
    </motion.a>
  );
}
