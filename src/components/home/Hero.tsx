"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Headphones, Stamp } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/Button";
import { TextReveal } from "@/components/motion/Reveal";
import { Clouds } from "@/components/motion/Clouds";
import { PlaneIcon } from "@/components/ui/PlaneIcon";
import { brandImages, photos } from "@/lib/images";

const FLIGHT = "M -120 860 C 320 850, 640 800, 860 560 S 1180 140, 1580 40";

function HeroFlight({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="contrail" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f9b75f" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path d={FLIGHT} fill="none" stroke="url(#contrail)" strokeWidth="2" strokeDasharray="2 12" strokeLinecap="round" />
      <g>
        <g transform="translate(-26 -26) scale(0.82)">
          <path
            fill="#fff"
            d="M61.5 32c0-1.9-1.6-3.4-3.6-3.4H41.2L27.4 6.3c-.4-.6-1-1-1.8-1h-4.4c-.9 0-1.5.8-1.3 1.6l5.7 21.7h-9.9l-4.6-6.4c-.3-.4-.8-.7-1.4-.7H5.9c-.8 0-1.4.8-1.2 1.6L7.4 32l-2.7 8.9c-.2.8.4 1.6 1.2 1.6h3.8c.6 0 1.1-.3 1.4-.7l4.6-6.4h9.9l-5.7 21.7c-.2.8.4 1.6 1.3 1.6h4.4c.8 0 1.4-.4 1.8-1l13.8-22.3h16.7c2 0 3.6-1.5 3.6-3.4Z"
          />
        </g>
        {reduce ? (
          <animateMotion dur="0.01s" fill="freeze" rotate="auto" path={FLIGHT} keyPoints="0.62;0.62" keyTimes="0;1" calcMode="linear" />
        ) : (
          <animateMotion dur="11s" begin="0.8s" repeatCount="indefinite" rotate="auto" path={FLIGHT} keyPoints="0;1" keyTimes="0;1" keySplines="0.45 0 0.55 1" calcMode="spline" />
        )}
      </g>
    </svg>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[680px] items-center overflow-hidden bg-forest-950 pt-28 pb-44 text-white sm:pb-52 lg:h-[100svh] lg:min-h-[760px]">
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-20">
        <div className="absolute inset-0 animate-kenburns">
          {/* Local backdrop: visible even if the remote photo or JavaScript is unavailable. */}
          <Image src={brandImages.sunsetFlight} alt="" fill priority sizes="100vw" className="object-cover" />
          <SmartImage src={photos.heroWing} fallback={brandImages.sunsetFlight} alt="" fill priority sizes="100vw" className="object-cover" quality={75} />
        </div>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(1_23_12/0.92)_0%,rgb(0_54_26/0.72)_42%,rgb(0_54_26/0.15)_75%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_85%_10%,rgb(244_148_28/0.35),transparent_70%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-forest-950 to-transparent" />
      <Clouds className="-z-10" />
      <div className="absolute inset-0 -z-10">
        <HeroFlight reduce={reduce} />
      </div>

      <motion.div style={{ y: contentY, opacity: fade }} className="container-page relative grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 py-1.5 pr-4 pl-1.5 text-xs font-semibold tracking-wide backdrop-blur-md sm:text-sm"
          >
            <span className="grid size-7 place-items-center rounded-full bg-sun-400 text-forest-950">
              <PlaneIcon className="size-4" />
            </span>
            Personalized & reliable air travel · Juba, South Sudan
          </motion.p>
          <h1 className="font-display text-[2.9rem] leading-[0.98] font-medium tracking-[-0.03em] text-balance sm:text-7xl lg:text-[5.6rem]">
            <TextReveal text="Your Journey Begins With" immediate delay={0.2} />{" "}
            <TextReveal text="Flynova." immediate delay={0.5} className="text-sun-400 italic" />
          </h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            Discover new destinations, book your flights, and experience seamless travel with a team dedicated to making every journey extraordinary.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href="#book" size="lg">
              Book a Flight <ArrowRight className="size-5 transition-transform group-hover/btn:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/destinations" variant="outline-light" size="lg">
              Explore Destinations
            </ButtonLink>
          </motion.div>
        </div>

        {/* Floating boarding pass */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden justify-self-end lg:block"
          aria-hidden="true"
        >
          <div className="animate-float">
            <div className="w-[330px] overflow-hidden rounded-[28px] bg-white/95 text-forest-950 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur">
              <div className="flex items-center justify-between bg-forest-700 px-6 py-3 text-white">
                <span className="text-[0.65rem] font-bold tracking-[0.25em] uppercase">Boarding pass</span>
                <PlaneIcon className="size-4 text-sun-400" />
              </div>
              <div className="px-6 pt-5 pb-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[0.65rem] tracking-[0.2em] text-mist uppercase">From</p>
                    <p className="font-display text-4xl leading-none">JUB</p>
                    <p className="text-xs text-mist">Juba</p>
                  </div>
                  <div className="mb-4 flex flex-1 items-center gap-1 px-3 text-sun-400">
                    <span className="h-px flex-1 border-t border-dashed border-sun-400" />
                    <PlaneIcon className="size-5" />
                  </div>
                  <div className="text-right">
                    <p className="text-[0.65rem] tracking-[0.2em] text-mist uppercase">To</p>
                    <p className="font-display text-4xl leading-none italic text-forest-700">You?</p>
                    <p className="text-xs text-mist">Anywhere</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-dashed border-forest-900/15 pt-4 text-[0.7rem]">
                  <div><p className="text-mist">Passenger</p><p className="font-semibold">You</p></div>
                  <div><p className="text-mist">Class</p><p className="font-semibold">Your pick</p></div>
                  <div><p className="text-mist">Support</p><p className="font-semibold">24/7</p></div>
                </div>
              </div>
              <div className="flex h-12 items-end gap-[3px] bg-cream px-6 pb-3">
                {Array.from({ length: 38 }).map((_, i) => (
                  <span key={i} className="bg-forest-900" style={{ width: (i * 7) % 3 === 0 ? 3 : 1.5, height: 18 + ((i * 13) % 9) }} />
                ))}
              </div>
            </div>
          </div>
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute -bottom-8 -left-16 flex items-center gap-3 rounded-2xl bg-forest-900/80 px-4 py-3 shadow-lift ring-1 ring-white/10 backdrop-blur-md"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-sun-400 text-forest-950"><Headphones className="size-5" /></span>
            <span className="text-sm leading-tight"><strong className="block">24/7 support</strong><span className="text-white/65">wherever you are</span></span>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="absolute -top-10 -right-6 flex items-center gap-3 rounded-2xl bg-white/12 px-4 py-3 ring-1 ring-white/20 backdrop-blur-md"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-white text-forest-700"><Stamp className="size-5" /></span>
            <span className="text-sm leading-tight"><strong className="block">Visa assistance</strong><span className="text-white/70">documents to appointment</span></span>
          </motion.div>
        </motion.div>
      </motion.div>

      <a
        href="#book"
        className="absolute bottom-28 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] font-semibold tracking-[0.3em] text-white/60 uppercase transition-colors hover:text-white sm:flex lg:bottom-36"
      >
        Scroll
        <span className="grid h-10 w-6 justify-center rounded-full border border-white/30 pt-1.5">
          <motion.span animate={reduce ? undefined : { y: [0, 12, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ArrowDown className="size-3" />
          </motion.span>
        </span>
      </a>
    </section>
  );
}
