import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { brandImages } from "@/lib/images";
import { site, values } from "@/lib/site";

export function AboutTeaser() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28" aria-label="About Flynova">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal className="relative mx-auto aspect-square w-full max-w-[520px]">
          <div className="absolute inset-[6%] rounded-full border-[18px] border-forest-700 border-r-transparent border-b-transparent -rotate-12" aria-hidden="true" />
          <div className="absolute inset-[2%] rounded-full border-[10px] border-sun-400 border-t-transparent border-l-transparent rotate-12" aria-hidden="true" />
          <div className="absolute inset-[14%] overflow-hidden rounded-full shadow-lift ring-8 ring-white">
            <Image src={brandImages.windowTraveller} alt="Traveller watching a plane take off from the airport terminal" fill sizes="(min-width: 1024px) 40vw, 80vw" className="object-cover" />
          </div>
          <div className="absolute right-[2%] bottom-[6%] size-[34%] overflow-hidden rounded-full shadow-lift ring-8 ring-white">
            <Image src={brandImages.sunsetFlight} alt="" fill sizes="200px" className="object-cover" />
          </div>
        </Reveal>
        <div>
          <SectionHeading eyebrow="About Flynova" title="A travel partner" accent="you can rely on." />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-mist">{site.about[0]}</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-cream p-6">
              <p className="font-display text-xl text-forest-900"><span className="text-sun-500 italic">Our</span> Mission</p>
              <p className="mt-2 text-sm leading-relaxed text-mist">{site.mission}</p>
            </div>
            <div className="rounded-3xl bg-cream p-6">
              <p className="font-display text-xl text-forest-900"><span className="text-sun-500 italic">Our</span> Vision</p>
              <p className="mt-2 text-sm leading-relaxed text-mist">{site.vision}</p>
            </div>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {values.map((v) => (
              <span key={v.title} className="flex items-center gap-2 text-sm font-semibold text-forest-800">
                <span className="size-2 rotate-45 bg-sun-400" /> {v.title}
              </span>
            ))}
          </Reveal>
          <Reveal delay={0.25} className="mt-10">
            <ButtonLink href="/about" variant="secondary">More about us <ArrowRight className="size-4" /></ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
