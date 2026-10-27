import { ArrowRight, Building2, ClipboardCheck, UsersRound, Wallet } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { brandImages, photos } from "@/lib/images";

const features = [
  { icon: Wallet, title: "Cost-effective booking", text: "Strategies built around your travel budget." },
  { icon: ClipboardCheck, title: "Policy compliance", text: "Bookings that follow your travel policy." },
  { icon: UsersRound, title: "Group & delegation travel", text: "Teams, delegations and events coordinated." },
  { icon: Building2, title: "Dedicated support", text: "One team that knows your organization." },
];

export function CorporateSection() {
  return (
    <section className="relative py-20 lg:py-28" aria-label="Corporate travel">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-2 lg:order-1">
          <Parallax offset={50} className="aspect-[4/5] rounded-[36px] shadow-lift sm:aspect-[5/5]">
            <SmartImage src={photos.corporate} fallback={brandImages.loungeTraveller} alt="Business travellers planning a trip together" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </Parallax>
          <div className="absolute -right-3 -bottom-8 w-[230px] rounded-3xl bg-white p-5 shadow-lift ring-1 ring-forest-900/5 sm:-right-8">
            <p className="text-xs font-bold tracking-[0.18em] text-sun-600 uppercase">We serve</p>
            <ul className="mt-3 space-y-2 text-sm text-forest-900">
              <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-sun-400" /> Corporate organizations</li>
              <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-sun-400" /> Government institutions</li>
              <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-sun-400" /> NGOs & delegations</li>
            </ul>
          </div>
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Corporate travel management"
            title="Business travel,"
            accent="handled."
            intro="Tailored travel solutions that help companies and institutions manage travel efficiently — so your people arrive ready to work."
          />
          <Stagger className="mt-10 grid gap-x-6 gap-y-7 sm:grid-cols-2">
            {features.map((f) => (
              <StaggerItem key={f.title} className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-forest-700 text-sun-300">
                  <f.icon className="size-5" />
                </span>
                <span>
                  <h3 className="font-semibold text-forest-900">{f.title}</h3>
                  <p className="mt-1 text-sm text-mist">{f.text}</p>
                </span>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/corporate" variant="secondary">Explore corporate travel <ArrowRight className="size-4" /></ButtonLink>
            <ButtonLink href="/corporate#corporate-inquiry" variant="ghost" className="ring-1 ring-forest-900/15">Request a proposal</ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
