import { BadgeDollarSign, Clock4, HeartHandshake, Award, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { Clouds } from "@/components/motion/Clouds";
import { whyChoose } from "@/lib/site";

const icons = [HeartHandshake, BadgeDollarSign, Award, ShieldCheck, Clock4];

export function WhyChoose() {
  return (
    <section className="grain relative isolate overflow-hidden bg-forest-800 py-20 text-white lg:py-28" aria-label="Why choose Flynova">
      <div className="absolute -top-32 -right-24 -z-10 size-[460px] rounded-full bg-sun-400/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-20 -z-10 size-[420px] rounded-full bg-forest-500/30 blur-3xl" aria-hidden="true" />
      <Clouds className="-z-10 opacity-40" />
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              tone="light"
              eyebrow="Why choose Flynova"
              title="Travel that feels"
              accent="effortless."
              intro="We believe travel should be exciting, not stressful. That’s why we handle every detail of your journey with professionalism and care."
            />
            <Reveal delay={0.2}>
              <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-white/15 pt-8">
                <div>
                  <dt className="text-xs text-white/60">Core services</dt>
                  <dd className="font-display text-5xl text-sun-400"><Counter to={5} /></dd>
                </div>
                <div>
                  <dt className="text-xs text-white/60">Support</dt>
                  <dd className="font-display text-5xl text-sun-400"><Counter to={24} suffix="/7" /></dd>
                </div>
                <div>
                  <dt className="text-xs text-white/60">Traveller groups served</dt>
                  <dd className="font-display text-5xl text-sun-400"><Counter to={4} /></dd>
                </div>
              </dl>
            </Reveal>
          </div>
          <Stagger as="ol" className="grid gap-4">
            {whyChoose.map((item, i) => {
              const Icon = icons[i];
              return (
                <StaggerItem
                  as="li"
                  key={item.title}
                  className={`group flex items-start gap-5 rounded-[26px] bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.1] hover:ring-sun-400/40 sm:p-7 ${i % 2 ? "lg:ml-14" : "lg:mr-14"}`}
                >
                  <span className="grid size-14 shrink-0 rotate-45 place-items-center rounded-2xl bg-gradient-to-br from-sun-300 to-sun-500 text-forest-950 shadow-glow transition-transform duration-500 group-hover:rotate-[225deg]">
                    <Icon className="size-6 -rotate-45 transition-transform duration-500 group-hover:-rotate-[225deg]" />
                  </span>
                  <span>
                    <span className="font-display text-sm text-sun-300 italic">0{i + 1}</span>
                    <h3 className="font-display text-2xl">{item.title}</h3>
                    <p className="mt-1 text-white/70">{item.text}</p>
                  </span>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
