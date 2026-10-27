import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Building, Eye, Gem, Landmark, Lightbulb, Rocket, Target, User, UsersRound, HeartHandshake } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { brandImages } from "@/lib/images";
import { site, targetClients, values, whyChoose } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Flynova Travel Agency Ltd is a customer-focused travel solutions provider in Juba specializing in air ticketing and comprehensive travel services. Learn about our mission, vision and values.",
  alternates: { canonical: "/about" },
};

const valueIcons = [HeartHandshake, Target, Lightbulb, Gem];
const clientIcons = [User, Building, Landmark, UsersRound];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Flynova"
        title="Making travel simple,"
        accent="reliable and memorable."
        intro="A dynamic, customer-focused travel solutions provider specializing in air ticketing and comprehensive travel services."
        image={brandImages.worldLandmarks}
        crumbs={[{ href: "/about", label: "About" }]}
      />

      <section className="py-20 lg:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Who we are" title="Industry expertise," accent="personal service." />
            {site.about.map((p, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <p className="mt-6 text-lg leading-relaxed text-mist">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] shadow-lift">
              <Image src={brandImages.loungeTraveller} alt="Relaxed traveller waiting for a flight at the airport" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-4 rounded-3xl bg-sun-400 p-6 text-forest-950 shadow-glow sm:-left-10">
              <p className="font-display text-4xl">24/7</p>
              <p className="text-sm font-semibold">support, wherever you are</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-forest-900 py-20 text-white lg:py-28">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {[
            { icon: Rocket, label: "Mission", text: site.mission },
            { icon: Eye, label: "Vision", text: site.vision },
          ].map((b, i) => (
            <Reveal key={b.label} delay={i * 0.12} className="relative overflow-hidden rounded-[32px] bg-white/[0.06] p-8 ring-1 ring-white/10 sm:p-12">
              <b.icon className="size-9 text-sun-400" />
              <h2 className="mt-6 font-display text-4xl">
                <span className="text-sun-300 italic">Our</span> {b.label}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/80">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Our values" title="What guides" accent="every journey." />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <StaggerItem key={v.title} className={`group relative overflow-hidden rounded-[28px] p-8 text-center shadow-soft ring-1 ring-forest-900/5 transition-transform duration-500 hover:-translate-y-1.5 ${i % 2 ? "bg-white" : "bg-white"}`}>
                  <span className={`mx-auto grid size-20 rotate-45 place-items-center rounded-3xl text-white shadow-soft transition-transform duration-500 group-hover:rotate-[135deg] ${i % 2 ? "bg-gradient-to-br from-sun-300 to-sun-500" : "bg-gradient-to-br from-forest-400 to-forest-600"}`}>
                    <Icon className="size-8 -rotate-45 transition-transform duration-500 group-hover:-rotate-[135deg]" />
                  </span>
                  <h3 className="mt-8 font-display text-2xl text-forest-900">{v.title}</h3>
                  <p className="mt-2 text-sm text-mist">{v.text}</p>
                  <span className={`absolute inset-x-0 bottom-0 h-1.5 ${i % 2 ? "bg-sun-400" : "bg-forest-500"}`} />
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="bg-sand/60 py-20 lg:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Our commitment" title="Exciting," accent="not stressful." />
            <Reveal delay={0.1}>
              <blockquote className="mt-8 border-l-4 border-sun-400 pl-6 font-display text-2xl leading-snug text-forest-900">{site.commitment}</blockquote>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {whyChoose.map((w) => (
                  <li key={w.title} className="rounded-2xl bg-white p-4 shadow-soft">
                    <p className="font-semibold text-forest-900">{w.title}</p>
                    <p className="text-sm text-mist">{w.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div>
            <SectionHeading eyebrow="Who we serve" title="Travellers of" accent="every kind." />
            <Stagger as="ul" className="mt-10 grid gap-4">
              {targetClients.map((c, i) => {
                const Icon = clientIcons[i];
                return (
                  <StaggerItem as="li" key={c} className="flex items-center gap-5 rounded-[24px] bg-white p-5 shadow-soft">
                    <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-forest-700 text-sun-300"><Icon className="size-6" /></span>
                    <span className="font-display text-xl text-forest-900">{c}</span>
                  </StaggerItem>
                );
              })}
            </Stagger>
            <Reveal delay={0.2} className="mt-10">
              <ButtonLink href="/services" variant="secondary">Explore our services <ArrowRight className="size-4" /></ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="py-6"><CtaBand /></div>
      <div className="h-16" />
    </>
  );
}
