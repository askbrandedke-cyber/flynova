"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, MessageCircle, Phone, X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { navLinks, site } from "@/lib/site";
import { services } from "@/lib/data/services";
import { whatsappUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const first = panel.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab" && panel.current) {
        const focusables = Array.from(panel.current.querySelectorAll<HTMLElement>("a,button"));
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-forest-800"
      >
        Skip to content
      </a>
      <div
        className={cn(
          "transition-all duration-500",
          solid
            ? "border-b border-forest-900/5 bg-cream/85 shadow-[0_8px_30px_-12px_rgba(1,23,12,0.18)] backdrop-blur-xl"
            : "bg-gradient-to-b from-forest-950/50 to-transparent",
        )}
      >
        <nav className={cn("container-page flex items-center justify-between transition-all duration-500", scrolled ? "h-16 lg:h-[72px]" : "h-20 lg:h-24")} aria-label="Main">
          <Link href="/" className="relative z-10 shrink-0" aria-label="Flynova home">
            <Logo light={!solid} priority className={cn("transition-all duration-500", scrolled && "sm:w-[136px]")} />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              const isServices = link.href === "/services";
              return (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={isServices ? () => setServicesOpen(true) : undefined}
                  onMouseLeave={isServices ? () => setServicesOpen(false) : undefined}
                >
                  <div className="flex items-center">
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors xl:px-4",
                        solid ? "text-forest-900 hover:text-forest-600" : "text-white/90 hover:text-white",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className={cn("absolute inset-0 -z-10 rounded-full", solid ? "bg-forest-700/8" : "bg-white/12")}
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      {link.label}
                    </Link>
                    {isServices && (
                      <button
                        type="button"
                        aria-label="Show services"
                        aria-expanded={servicesOpen}
                        aria-controls="services-menu"
                        onClick={() => setServicesOpen((v) => !v)}
                        className={cn("-ml-2 rounded-full p-1.5", solid ? "text-forest-900" : "text-white/80")}
                      >
                        <ChevronDown className={cn("size-4 transition-transform", servicesOpen && "rotate-180")} />
                      </button>
                    )}
                  </div>
                  {isServices && (
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          id="services-menu"
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.22 }}
                          className="absolute top-full left-1/2 w-[560px] -translate-x-1/2 pt-3"
                          onKeyDown={(e) => e.key === "Escape" && setServicesOpen(false)}
                        >
                          <div className="grid grid-cols-[1fr_200px] overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-forest-900/5">
                            <ul className="p-3">
                              {services.map((s) => (
                                <li key={s.slug}>
                                  <Link
                                    href={`/services/${s.slug}`}
                                    className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-cream focus-visible:bg-cream"
                                  >
                                    <span className="font-display text-sm text-sun-500 italic">{s.number}</span>
                                    <span>
                                      <span className="block text-sm font-semibold text-forest-900">{s.title}</span>
                                      <span className="mt-0.5 block text-xs leading-snug text-mist">{s.short}</span>
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-col justify-between bg-forest-800 p-5 text-white">
                              <p className="font-display text-xl leading-snug">Travelling for work?</p>
                              <p className="text-xs text-white/70">Cost-effective, policy-compliant travel for organizations.</p>
                              <Link href="/corporate" className="inline-flex items-center gap-1.5 text-sm font-semibold text-sun-300 hover:text-sun-200">
                                Corporate travel <ArrowUpRight className="size-4" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${site.phones[0].tel}`}
              className={cn(
                "hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium xl:inline-flex",
                solid ? "text-forest-800" : "text-white/90",
              )}
            >
              <Phone className="size-4" /> {site.phones[0].display}
            </a>
            <ButtonLink href="/book" size="sm" className="hidden sm:inline-flex">
              Book Now
            </ButtonLink>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "relative z-10 grid size-11 place-items-center rounded-full transition-colors lg:hidden",
                solid ? "bg-forest-700 text-white" : "bg-white/15 text-white backdrop-blur",
              )}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-0 -z-10 flex flex-col overflow-y-auto bg-forest-900 px-6 pt-28 pb-10 text-white lg:hidden"
          >
            <motion.ul
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
            >
              {[...navLinks, { href: "/corporate", label: "Corporate Travel" }].map((link) => (
                <motion.li key={link.href} variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}>
                  <Link
                    href={link.href}
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between border-b border-white/10 py-4 font-display text-3xl",
                      isActive(pathname, link.href) ? "text-sun-300 italic" : "text-white",
                    )}
                  >
                    {link.label}
                    <ArrowUpRight className="size-5 opacity-50" />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-auto grid gap-3 pt-10">
              <ButtonLink href="/book" size="lg" className="w-full">
                Book a Flight
              </ButtonLink>
              <ButtonLink href={whatsappUrl(defaultWhatsAppMessage)} variant="whatsapp" size="lg" className="w-full">
                <MessageCircle className="size-5" /> WhatsApp {site.whatsappDisplay}
              </ButtonLink>
              <p className="pt-2 text-center text-sm text-white/60">{site.email}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
