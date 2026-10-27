import { ArrowRight, Compass, Map, PlaneTakeoff } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppFloat";
import { whatsappUrl } from "@/lib/whatsapp";

const steps = [
  { icon: Compass, title: "Tell us your plans", text: "Share where, when and who’s travelling — by form, phone or WhatsApp." },
  { icon: Map, title: "We plan the route", text: "Route planning, airline recommendations and the travel advisories that apply." },
  { icon: PlaneTakeoff, title: "You travel with confidence", text: "We confirm fares, issue tickets and stay on hand 24/7." },
];

export function ConsultationSection() {
  return (
    <section className="relative px-4 py-6 sm:px-6 lg:px-8" aria-label="Travel consultation">
      <div className="relative mx-auto max-w-[88rem] overflow-hidden rounded-[40px] bg-sand px-6 py-16 sm:px-12 lg:px-16 lg:py-24">
        <svg className="pointer-events-none absolute -top-10 right-0 h-[120%] w-1/2 text-forest-700/10" viewBox="0 0 400 600" fill="none" aria-hidden="true">
          <path d="M380 0C140 120 60 300 260 600" stroke="currentColor" strokeWidth="60" />
          <path d="M400 40C220 160 150 320 320 600" stroke="#f4941c" strokeOpacity=".25" strokeWidth="18" />
        </svg>
        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Travel consultation"
              title="Not sure where to start?"
              accent="Talk to us."
              intro="Our experienced travel consultants help you plan your trip effectively — the right route, the right airline and the latest travel advisories."
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact?topic=Travel%20Consultation#inquiry" variant="secondary">
                Book a consultation <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href={whatsappUrl("Hello Flynova! I’d like a travel consultation to help plan my trip.")} variant="whatsapp">
                <WhatsAppGlyph className="size-5" /> Ask on WhatsApp
              </ButtonLink>
            </div>
          </div>
          <Stagger as="ol" className="relative grid gap-4">
            {steps.map((s, i) => (
              <StaggerItem as="li" key={s.title} className="relative flex items-center gap-5 rounded-[26px] bg-white p-5 shadow-soft sm:p-6">
                <span className="font-display text-5xl leading-none text-sun-400/80 italic">{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <h3 className="font-display text-xl text-forest-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-mist">{s.text}</p>
                </span>
                <span className="hidden size-12 shrink-0 place-items-center rounded-full bg-forest-50 text-forest-700 sm:grid">
                  <s.icon className="size-5" />
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
