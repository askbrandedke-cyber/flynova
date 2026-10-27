import type { Metadata } from "next";
import { ArrowRight, BarChart3, Briefcase, CalendarClock, ClipboardCheck, Headphones, Plane, Stamp, UsersRound, Wallet } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ButtonLink } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { Parallax } from "@/components/motion/Parallax";
import { photos, brandImages } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Corporate Travel Management",
  description:
    "Business travel solutions for companies, NGOs and government institutions in South Sudan: cost-effective bookings, travel policy compliance, group bookings and employee travel coordination.",
  alternates: { canonical: "/corporate" },
};

const solutions = [
  { icon: Plane, title: "Business travel solutions", text: "Domestic and international flights booked around meetings, missions and deadlines." },
  { icon: Briefcase, title: "Travel management", text: "Cost-effective booking strategies aligned with your travel policy and approvals." },
  { icon: UsersRound, title: "Group bookings", text: "Delegations, conferences, trainings and events coordinated as one booking." },
  { icon: CalendarClock, title: "Employee travel coordination", text: "Itinerary changes, rebookings and multi-traveller trips handled for your team." },
  { icon: Stamp, title: "Visa support for staff", text: "Documentation guidance, application support and appointment scheduling." },
  { icon: Headphones, title: "24/7 traveller support", text: "Assistance whenever your people need it, wherever they are." },
];

const steps = [
  { title: "Discovery", text: "We learn your routes, travel volume, policy and approval process." },
  { title: "Set-up", text: "We agree how requests, approvals and invoicing will work for your team." },
  { title: "Booking & support", text: "Your travellers request trips; we book, ticket and support them end to end." },
  { title: "Review", text: "We review travel with you to keep improving cost and convenience." },
];

export default function CorporatePage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate travel management"
        title="Smarter business travel"
        accent="for your organization."
        intro="Tailored travel solutions that help companies, NGOs and government institutions manage travel efficiently, compliantly and cost-effectively."
        image={photos.corporate}
        fallback={brandImages.loungeTraveller}
        crumbs={[{ href: "/corporate", label: "Corporate Travel" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#corporate-inquiry" size="lg">Request a proposal <ArrowRight className="size-5" /></ButtonLink>
          <ButtonLink href={`tel:${site.phones[0].tel}`} variant="outline-light" size="lg">Call {site.phones[0].display}</ButtonLink>
        </div>
      </PageHero>

      <section className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="What we handle" title="One partner for" accent="all your company travel." />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s, i) => (
              <StaggerItem key={s.title} className={`group rounded-[28px] p-7 transition-all duration-500 hover:-translate-y-1 ${i === 0 ? "bg-forest-800 text-white" : "bg-white shadow-soft ring-1 ring-forest-900/5 hover:shadow-lift"}`}>
                <span className={`grid size-13 place-items-center rounded-2xl ${i === 0 ? "bg-sun-400 text-forest-950" : "bg-forest-50 text-forest-700 group-hover:bg-forest-700 group-hover:text-sun-300"} transition-colors`}>
                  <s.icon className="size-6" />
                </span>
                <h3 className={`mt-6 font-display text-2xl ${i === 0 ? "" : "text-forest-900"}`}>{s.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${i === 0 ? "text-white/75" : "text-mist"}`}>{s.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-forest-900 py-20 text-white lg:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading tone="light" eyebrow="How it works" title="Simple for your team," accent="sorted by ours." />
            <ol className="mt-10 space-y-6">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.08} className="flex gap-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-sun-400/60 font-display text-lg text-sun-300">{i + 1}</span>
                  <span>
                    <strong className="font-display text-xl">{s.title}</strong>
                    <p className="text-sm text-white/70">{s.text}</p>
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal className="relative">
            <Parallax offset={40} className="aspect-[4/5] rounded-[36px]">
              <SmartImage src={photos.team} fallback={brandImages.windowTraveller} alt="Team collaborating in an office" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </Parallax>
            <div className="absolute -bottom-6 -left-4 grid gap-3 rounded-3xl bg-white p-5 text-forest-900 shadow-lift sm:-left-10">
              <p className="flex items-center gap-3 text-sm font-semibold"><Wallet className="size-5 text-sun-500" /> Cost-effective booking strategies</p>
              <p className="flex items-center gap-3 text-sm font-semibold"><ClipboardCheck className="size-5 text-sun-500" /> Travel policy compliance</p>
              <p className="flex items-center gap-3 text-sm font-semibold"><BarChart3 className="size-5 text-sun-500" /> Dedicated account support</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="corporate-inquiry" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow">Corporate inquiry</p>
            <h2 className="mt-4 font-display text-4xl text-forest-900 sm:text-5xl">Let’s talk about your organization’s travel</h2>
            <p className="mt-4 text-mist">Share a few details and our corporate desk will contact you to discuss a travel arrangement that fits your organization.</p>
            <ul className="mt-8 space-y-2 text-sm text-forest-900">
              <li>📞 {site.phones.map((p) => p.display).join(" · ")}</li>
              <li>✉️ {site.email}</li>
            </ul>
          </div>
          <div className="rounded-[32px] bg-white p-6 shadow-lift ring-1 ring-forest-900/5 sm:p-10">
            <InquiryForm kind="corporate" submitLabel="Request a proposal" />
          </div>
        </div>
      </section>
    </>
  );
}
