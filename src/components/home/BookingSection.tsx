import { Suspense } from "react";
import { BookingForm } from "@/components/forms/BookingForm";
import { FormSkeleton } from "@/components/forms/FormSkeleton";
import { Reveal } from "@/components/motion/Reveal";
import { Headphones, ShieldCheck, Ticket } from "lucide-react";

const assurances = [
  { icon: Ticket, title: "Best available fares", text: "We compare options for your dates." },
  { icon: ShieldCheck, title: "No payment online", text: "We confirm everything with you first." },
  { icon: Headphones, title: "24/7 support", text: "Call or WhatsApp whenever you need us." },
];

export function BookingSection() {
  return (
    <section id="book" className="relative z-20 -mt-36 scroll-mt-20 pb-6 sm:-mt-40 lg:pb-10" aria-label="Flight booking request">
      <div className="container-page">
        <Reveal y={60}>
          <div className="mx-auto max-w-5xl overflow-visible rounded-[32px] bg-white shadow-[0_40px_100px_-40px_rgba(1,23,12,0.45)] ring-1 ring-forest-900/5">
            <Suspense fallback={<FormSkeleton />}>
              <BookingForm />
            </Suspense>
          </div>
        </Reveal>
        <ul className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-3">
          {assurances.map((a, i) => (
            <Reveal as="li" key={a.title} delay={0.1 * i} className="flex items-start gap-3 px-2">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-forest-50 text-forest-700">
                <a.icon className="size-5" />
              </span>
              <span>
                <strong className="block text-sm text-forest-900">{a.title}</strong>
                <span className="text-sm text-mist">{a.text}</span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
