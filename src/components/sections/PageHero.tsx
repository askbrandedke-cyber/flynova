import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { TextReveal, Reveal } from "@/components/motion/Reveal";
import { Clouds } from "@/components/motion/Clouds";
import { PlaneIcon } from "@/components/ui/PlaneIcon";

export function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  image,
  fallback,
  crumbs = [],
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  image: string;
  fallback?: string;
  crumbs?: { href: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-950 pt-36 pb-20 text-white sm:pt-44 sm:pb-28">
      <SmartImage src={image} fallback={fallback} alt="" fill priority sizes="100vw" className="-z-20 animate-kenburns object-cover opacity-60" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(1_23_12/0.95)_0%,rgb(0_54_26/0.75)_50%,rgb(0_54_26/0.3)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-forest-950/60 to-transparent" />
      <Clouds className="-z-10 opacity-70" />
      <svg className="absolute right-0 bottom-0 -z-10 hidden h-full w-1/2 md:block" viewBox="0 0 600 400" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path d="M0 380 C 200 360, 380 260, 600 40" stroke="#f4941c" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="2 10" strokeLinecap="round" />
      </svg>
      <div className="container-page">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-white/60">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            {crumbs.map((c) => (
              <li key={c.href} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5" />
                <Link href={c.href} className="hover:text-white">{c.label}</Link>
              </li>
            ))}
          </ol>
        </nav>
        <Reveal>
          <p className="mt-8 inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-sun-300 uppercase">
            <PlaneIcon className="size-4 text-sun-400" /> {eyebrow}
          </p>
        </Reveal>
        <h1 className="mt-4 max-w-4xl font-display text-[2.6rem] leading-[1.02] font-medium tracking-[-0.025em] text-balance sm:text-6xl lg:text-7xl">
          <TextReveal text={title} immediate />
          {accent && (
            <>
              {" "}
              <TextReveal text={accent} immediate delay={0.25} className="text-sun-400 italic" />
            </>
          )}
        </h1>
        {intro && (
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{intro}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.4} className="mt-9">{children}</Reveal>}
      </div>
    </section>
  );
}
