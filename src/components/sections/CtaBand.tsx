import { ArrowRight, Phone } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/Button";
import { TextReveal, Reveal } from "@/components/motion/Reveal";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppFloat";
import { Clouds } from "@/components/motion/Clouds";
import { brandImages } from "@/lib/images";
import { site } from "@/lib/site";
import { whatsappUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";

export function CtaBand({ title = "Ready when you are.", text = "Tell us where you want to go. We’ll take care of the rest — fares, tickets, visas and everything in between." }: { title?: string; text?: string }) {
  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8" aria-label="Start planning">
      <div className="relative isolate mx-auto max-w-[88rem] overflow-hidden rounded-[40px] bg-forest-950 px-6 py-20 text-center text-white sm:px-12 lg:py-28">
        <SmartImage src={brandImages.sunsetFlight} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-55" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_50%_100%,rgb(1_23_12/0.3),rgb(1_23_12/0.85))]" />
        <Clouds className="-z-10" tone="warm" />
        <h2 className="mx-auto max-w-3xl font-display text-4xl leading-[1.02] font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl">
          <TextReveal text={title} />
        </h2>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-white/80 sm:text-lg">{text}</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/book" size="lg">Book a Flight <ArrowRight className="size-5" /></ButtonLink>
          <ButtonLink href={whatsappUrl(defaultWhatsAppMessage)} variant="whatsapp" size="lg"><WhatsAppGlyph className="size-5" /> WhatsApp us</ButtonLink>
          <ButtonLink href={`tel:${site.phones[0].tel}`} variant="outline-light" size="lg"><Phone className="size-5" /> {site.phones[0].display}</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
