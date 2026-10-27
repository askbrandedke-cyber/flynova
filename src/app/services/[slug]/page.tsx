import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Suspense } from "react";
import { FormSkeleton } from "@/components/forms/FormSkeleton";
import { BookingForm } from "@/components/forms/BookingForm";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { getService, services } from "@/lib/data/services";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: `${s.short} ${s.highlights.join(", ")}. Flynova Travel Agency, Juba.`,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

const process = [
  { title: "Share your request", text: "Use the form, call or WhatsApp — tell us what you need." },
  { title: "We prepare options", text: "Our team reviews your request and prepares the best options." },
  { title: "Confirm & travel", text: "You approve, we finalise the details and stay on hand 24/7." },
];

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  return (
    <>
      <PageHero
        eyebrow={`Service ${s.number}`}
        title={s.title}
        intro={s.short}
        image={s.image}
        fallback={s.fallback}
        crumbs={[
          { href: "/services", label: "Services" },
          { href: `/services/${s.slug}`, label: s.title },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#inquiry" size="lg">{s.slug === "air-ticketing" ? "Request a flight" : "Send an inquiry"} <ArrowRight className="size-5" /></ButtonLink>
          <ButtonLink href={whatsappUrl(`Hello Flynova! I’d like help with ${s.title.toLowerCase()}.`)} variant="outline-light" size="lg">
            <MessageCircle className="size-5" /> WhatsApp
          </ButtonLink>
        </div>
      </PageHero>

      <section className="py-20 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">Overview</p>
              <p className="mt-5 font-display text-2xl leading-snug text-forest-900 sm:text-3xl">{s.intro}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-8 space-y-3">
                {s.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-forest-900">
                    <span className="grid size-7 place-items-center rounded-full bg-sun-400 text-forest-950"><Check className="size-4" /></span>
                    <span className="font-medium">{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {s.benefits.map((b, i) => (
              <StaggerItem key={b.title} className={`rounded-[26px] p-6 ${i === 0 ? "bg-forest-800 text-white" : "bg-white shadow-soft ring-1 ring-forest-900/5"}`}>
                <span className={`font-display text-sm italic ${i === 0 ? "text-sun-300" : "text-sun-500"}`}>0{i + 1}</span>
                <h2 className={`mt-2 font-display text-xl ${i === 0 ? "text-white" : "text-forest-900"}`}>{b.title}</h2>
                <p className={`mt-2 text-sm ${i === 0 ? "text-white/75" : "text-mist"}`}>{b.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-sand/60 py-16">
        <div className="container-page">
          <ol className="grid gap-6 md:grid-cols-3">
            {process.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.1} className="relative flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white font-display text-xl text-forest-700 shadow-soft">{i + 1}</span>
                <span>
                  <strong className="block font-display text-xl text-forest-900">{p.title}</strong>
                  <span className="text-sm text-mist">{p.text}</span>
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="inquiry" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow">Get started</p>
            <h2 className="mt-4 font-display text-4xl text-forest-900 sm:text-5xl">
              {s.slug === "air-ticketing" ? "Request your flight" : `Ask about ${s.title.toLowerCase()}`}
            </h2>
            <p className="mt-4 text-mist">
              Send your request and the Flynova team will get back to you. Prefer to talk? Call or WhatsApp us any time.
            </p>
            <div className="mt-8 space-y-3">
              {site.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-3 font-semibold text-forest-900 hover:text-forest-600">
                  <span className="grid size-10 place-items-center rounded-full bg-forest-50 text-forest-700"><Phone className="size-4" /></span>
                  {p.display}
                </a>
              ))}
            </div>
            <div className="mt-10 rounded-3xl bg-cream p-6">
              <p className="text-xs font-bold tracking-[0.18em] text-sun-600 uppercase">Other services</p>
              <ul className="mt-3 space-y-1">
                {services.filter((o) => o.slug !== s.slug).map((o) => (
                  <li key={o.slug}>
                    <Link href={`/services/${o.slug}`} className="group flex items-center justify-between py-2 font-medium text-forest-900 hover:text-forest-600">
                      {o.title} <ArrowUpRight className="size-4 opacity-40 transition-all group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-[32px] bg-white shadow-lift ring-1 ring-forest-900/5">
            {s.slug === "air-ticketing" ? (
              <Suspense fallback={<FormSkeleton />}>
                <BookingForm />
              </Suspense>
            ) : (
              <div className="p-6 sm:p-10">
                <InquiryForm kind={s.slug === "corporate-travel-management" ? "corporate" : "general"} prefill={{ topic: s.title }} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
