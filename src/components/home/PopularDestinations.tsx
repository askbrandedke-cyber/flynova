import { ArrowRight } from "lucide-react";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { getDestination } from "@/lib/data/destinations";

const featured = ["dubai", "kenya-safari", "zanzibar", "istanbul", "cairo"].map((s) => getDestination(s)!);

export function PopularDestinations() {
  return (
    <section className="relative py-20 lg:py-28" aria-labelledby="destinations-heading">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Destinations to explore"
            title="Where will you"
            accent="go next?"
            intro="Inspiration for your next trip — from safaris next door to skylines across the world. Tell us where you’d like to go and we’ll plan the route."
          />
          <ButtonLink href="/destinations" variant="ghost" className="self-start ring-1 ring-forest-900/15 lg:self-end">
            All destinations <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
        <span id="destinations-heading" className="sr-only">Popular destinations</span>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          <StaggerItem className="sm:col-span-2 lg:row-span-2">
            <DestinationCard destination={featured[0]} size="lg" className="h-full" />
          </StaggerItem>
          {featured.slice(1).map((d) => (
            <StaggerItem key={d.slug}>
              <DestinationCard destination={d} className="h-full" />
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-6 text-xs text-mist">
          Destinations shown for inspiration. Routes, fares and availability are confirmed by Flynova for each request.
        </p>
      </div>
    </section>
  );
}
