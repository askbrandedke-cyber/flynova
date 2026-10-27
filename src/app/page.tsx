import { Hero } from "@/components/home/Hero";
import { BookingSection } from "@/components/home/BookingSection";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { WhyChoose } from "@/components/home/WhyChoose";
import { FeaturedPackages } from "@/components/home/FeaturedPackages";
import { CorporateSection } from "@/components/home/CorporateSection";
import { ConsultationSection } from "@/components/home/ConsultationSection";
import { Testimonials } from "@/components/home/Testimonials";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { CtaBand } from "@/components/sections/CtaBand";
import { FlightPath } from "@/components/motion/FlightPath";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FlightPath>
        <BookingSection />
        <PopularDestinations />
        <ServicesShowcase />
        <WhyChoose />
        <FeaturedPackages />
        <CorporateSection />
        <ConsultationSection />
        <Testimonials />
        <AboutTeaser />
        <CtaBand />
      </FlightPath>
      <div className="h-16" />
    </>
  );
}
