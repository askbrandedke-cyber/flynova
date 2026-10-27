import type { Metadata } from "next";
import { Baby, Heart, Info, UsersRound } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { PackageExplorer } from "@/components/sections/PackageExplorer";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { photos, brandImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Holiday & Tour Packages",
  description:
    "Customized family vacations, honeymoon packages and group tours from Flynova Travel Agency, Juba. Request a personal quote for any destination.",
  alternates: { canonical: "/packages" },
};

const styles = [
  { icon: Baby, title: "Family vacations", text: "Kid-friendly pacing, family rooms and activities everyone enjoys." },
  { icon: Heart, title: "Honeymoon packages", text: "Romantic stays and special touches for your first trip together." },
  { icon: UsersRound, title: "Group tours", text: "Coordinated travel for friends, communities, churches and teams." },
];

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Holiday & tour packages"
        title="Holidays, designed"
        accent="just for you."
        intro="Flynova curates customized travel packages for leisure travellers. Start with an idea below, or tell us your dream trip."
        image={photos.resortPool}
        fallback={brandImages.safari}
        crumbs={[{ href: "/packages", label: "Holiday Packages" }]}
      />
      <section className="py-16 lg:py-20">
        <div className="container-page">
          <Stagger className="grid gap-4 md:grid-cols-3">
            {styles.map((s) => (
              <StaggerItem key={s.title} className="flex gap-4 rounded-[24px] bg-white p-6 shadow-soft">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sun-50 text-sun-500"><s.icon className="size-5" /></span>
                <span>
                  <h2 className="font-display text-xl text-forest-900">{s.title}</h2>
                  <p className="mt-1 text-sm text-mist">{s.text}</p>
                </span>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-10 flex gap-3 rounded-2xl bg-forest-50 p-4 text-sm text-forest-900">
            <Info className="mt-0.5 size-5 shrink-0 text-forest-600" />
            <p>
              These are package ideas to inspire you. Every Flynova holiday is customized — prices, inclusions and availability are confirmed in a personal quote for your dates and group.
            </p>
          </Reveal>
          <div className="mt-14">
            <PackageExplorer />
          </div>
        </div>
      </section>
      <section id="custom" className="scroll-mt-24 bg-sand/60 py-20 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow">Custom package</p>
            <h2 className="mt-4 font-display text-4xl text-forest-900 sm:text-5xl">Design your own holiday</h2>
            <p className="mt-4 text-mist">Tell us the destination, dates, who’s travelling and your budget. We’ll put together a package and send you a quote.</p>
          </div>
          <div className="rounded-[32px] bg-white p-6 shadow-lift sm:p-10">
            <InquiryForm prefill={{ topic: "Holiday package quote" }} submitLabel="Request a quote" />
          </div>
        </div>
      </section>
    </>
  );
}
