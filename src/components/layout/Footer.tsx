import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { PlaneIcon } from "@/components/ui/PlaneIcon";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppFloat";
import { mapsUrl, navLinks, site } from "@/lib/site";
import { services } from "@/lib/data/services";
import { whatsappUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-white">
      <div className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full border-[40px] border-sun-400/10" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 size-[360px] rounded-full border-[28px] border-forest-600/30" aria-hidden="true" />

      <div className="container-page relative pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Logo light className="w-[170px]!" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
              Personalized and reliable air travel services from Juba — making travel planning easy, affordable and stress-free for individuals, businesses and organizations.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={whatsappUrl(defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-11 place-items-center rounded-full bg-white/8 transition-colors hover:bg-[#25d366]"
                aria-label="WhatsApp Flynova"
              >
                <WhatsAppGlyph className="size-5" />
              </a>
              <a href={`mailto:${site.email}`} className="grid size-11 place-items-center rounded-full bg-white/8 transition-colors hover:bg-sun-400 hover:text-forest-950" aria-label="Email Flynova">
                <Mail className="size-5" />
              </a>
              <a href={`tel:${site.phones[0].tel}`} className="grid size-11 place-items-center rounded-full bg-white/8 transition-colors hover:bg-sun-400 hover:text-forest-950" aria-label="Call Flynova">
                <Phone className="size-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs font-bold tracking-[0.2em] text-sun-300 uppercase">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {[...navLinks, { href: "/corporate", label: "Corporate Travel" }, { href: "/book", label: "Book a Flight" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold tracking-[0.2em] text-sun-300 uppercase">Services</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-white/70 transition-colors hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-[0.2em] text-sun-300 uppercase">Visit or call</h2>
            <ul className="mt-5 space-y-4 text-sm text-white/75">
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-sun-400" />
                <span className="flex flex-col gap-1">
                  {site.phones.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="hover:text-white">
                      {p.display}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-sun-400" />
                <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-sun-400" />
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="group hover:text-white">
                  {site.address.line1},<br />
                  {site.address.line2}, {site.address.city}
                  <ArrowUpRight className="ml-1 inline size-3.5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative mt-16 flex items-center gap-4" aria-hidden="true">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20" />
          <PlaneIcon className="size-5 text-sun-400" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-white/20" />
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-xs text-white/50 sm:flex-row">
          <p>© <CurrentYear /> {site.name}. All rights reserved.</p>
          <p>Flight requests are inquiries — availability, fares and ticketing are confirmed by our team.</p>
        </div>
      </div>
    </footer>
  );
}
