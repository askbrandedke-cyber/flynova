import { MessageSquareHeart, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppFloat";
import { testimonials } from "@/lib/data/testimonials";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Shows genuine reviews from lib/data/testimonials.ts. Until reviews are added,
 * it presents Flynova's own commitment (clearly attributed) and invites feedback.
 */
export function Testimonials() {
  return (
    <section className="relative py-20 lg:py-28" aria-label="Traveller stories">
      <div className="container-page">
        <SectionHeading align="center" eyebrow="Traveller stories" title="Journeys worth" accent="talking about." />
        {testimonials.length > 0 ? (
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem as="article" key={t.name} className="flex flex-col rounded-[28px] bg-white p-7 shadow-soft ring-1 ring-forest-900/5">
                <Quote className="size-8 text-sun-400" />
                <blockquote className="mt-4 flex-1 text-forest-900">“{t.quote}”</blockquote>
                <p className="mt-6 font-semibold text-forest-900">{t.name}</p>
                <p className="text-sm text-mist">{t.trip}</p>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <div className="mt-14 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <Reveal className="relative overflow-hidden rounded-[32px] bg-forest-900 p-8 text-white sm:p-12">
              <Quote className="absolute -top-4 -right-4 size-40 text-white/5" aria-hidden="true" />
              <p className="text-xs font-bold tracking-[0.2em] text-sun-300 uppercase">Our promise to every traveller</p>
              <blockquote className="mt-6 font-display text-2xl leading-snug text-balance sm:text-[2rem]">“{site.commitment}”</blockquote>
              <p className="mt-8 flex items-center gap-3 text-sm text-white/70">
                <span className="h-px w-8 bg-sun-400" /> The Flynova team
              </p>
            </Reveal>
            <Reveal delay={0.15} className="flex flex-col justify-between rounded-[32px] bg-white p-8 shadow-soft ring-1 ring-forest-900/5 sm:p-10">
              <div>
                <span className="grid size-14 place-items-center rounded-2xl bg-sun-50 text-sun-500">
                  <MessageSquareHeart className="size-7" />
                </span>
                <h3 className="mt-6 font-display text-2xl text-forest-900">Travelled with Flynova?</h3>
                <p className="mt-2 text-mist">
                  We’re collecting stories from our travellers to share here. Tell us how your journey went — your feedback helps us improve.
                </p>
              </div>
              <ButtonLink href={whatsappUrl("Hello Flynova! I’d like to share feedback about my recent trip: ")} variant="whatsapp" className="mt-8 self-start">
                <WhatsAppGlyph className="size-5" /> Share your experience
              </ButtonLink>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
