import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { InquiryFormFromQuery } from "@/components/forms/PrefilledForms";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppFloat";
import { brandImages } from "@/lib/images";
import { mapsUrl, site } from "@/lib/site";
import { whatsappUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact Flynova Travel Agency in Juba. Call ${site.phones[0].display} or ${site.phones[1].display}, WhatsApp us, email ${site.email}, or visit us at Dable Energy Petrol Station, Tombura Road.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const channels = [
    { icon: Phone, label: "Call us", lines: site.phones.map((p) => ({ text: p.display, href: `tel:${p.tel}` })) },
    { icon: WhatsAppGlyph, label: "WhatsApp", lines: [{ text: site.whatsappDisplay, href: whatsappUrl(defaultWhatsAppMessage) }] },
    { icon: Mail, label: "Email", lines: [{ text: site.email, href: `mailto:${site.email}` }] },
  ];
  return (
    <>
      <PageHero
        eyebrow="Contact Flynova"
        title="Let’s plan your"
        accent="next journey."
        intro="Call, WhatsApp, email or visit our office in Juba — or send us a message below and we’ll get back to you."
        image={brandImages.windowTraveller}
        crumbs={[{ href: "/contact", label: "Contact" }]}
      />

      <section className="relative z-10 -mt-12">
        <div className="container-page">
          <Stagger className="grid gap-4 md:grid-cols-3">
            {channels.map((c) => (
              <StaggerItem key={c.label} className="rounded-[28px] bg-white p-6 shadow-lift ring-1 ring-forest-900/5">
                <span className="grid size-12 place-items-center rounded-2xl bg-forest-700 text-sun-300"><c.icon className="size-5" /></span>
                <p className="mt-5 text-xs font-bold tracking-[0.2em] text-sun-600 uppercase">{c.label}</p>
                {c.lines.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-1 block font-display text-xl break-all text-forest-900 transition-colors hover:text-forest-600 sm:text-2xl"
                  >
                    {l.text}
                  </a>
                ))}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="inquiry" className="scroll-mt-24 py-20 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <Reveal className="rounded-[32px] bg-white p-6 shadow-soft ring-1 ring-forest-900/5 sm:p-10">
            <h2 className="font-display text-3xl text-forest-900 sm:text-4xl">Send us a message</h2>
            <p className="mt-2 mb-8 text-sm text-mist">For flight requests you can also use our <Link href="/book" className="font-semibold text-forest-700 underline underline-offset-4">booking request form</Link>.</p>
            <Suspense fallback={<InquiryForm />}>
              <InquiryFormFromQuery />
            </Suspense>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-5">
            <div className="relative overflow-hidden rounded-[32px] bg-forest-900 p-8 text-white">
              <svg className="absolute inset-0 h-full w-full opacity-[0.12]" viewBox="0 0 400 400" aria-hidden="true">
                <path d="M0 120 H400 M0 260 H400 M120 0 V400 M290 0 V400 M0 0 L400 400" stroke="#fff" strokeWidth="10" fill="none" />
                <path d="M40 360 C 140 300, 220 200, 380 60" stroke="#f4941c" strokeWidth="6" fill="none" strokeDasharray="4 14" strokeLinecap="round" />
              </svg>
              <div className="relative">
                <span className="grid size-14 place-items-center rounded-full bg-sun-400 text-forest-950 shadow-glow"><MapPin className="size-6" /></span>
                <p className="mt-6 text-xs font-bold tracking-[0.2em] text-sun-300 uppercase">Our office</p>
                <address className="mt-2 font-display text-2xl leading-snug not-italic">
                  {site.address.line1},<br />
                  {site.address.line2},<br />
                  {site.address.city}, {site.address.country}
                </address>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white hover:text-forest-900">
                  Open in Google Maps <ArrowUpRight className="size-4" />
                </a>
                <p className="mt-4 text-xs text-white/55">Call ahead and we’ll guide you to the office.</p>
              </div>
            </div>
            <div className="rounded-[32px] bg-sand p-8">
              <Clock className="size-6 text-sun-500" />
              <p className="mt-4 font-display text-2xl text-forest-900">24/7 support</p>
              <p className="mt-1 text-sm text-mist">Assistance whenever you need it, wherever you are. For urgent travel matters, call or WhatsApp us.</p>
              <a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-semibold text-[#128c3e] hover:underline">
                <WhatsAppGlyph className="size-5" /> Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
