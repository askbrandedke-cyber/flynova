import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { MobileBookBar } from "@/components/layout/MobileBookBar";
import { HydrationFlag } from "@/components/layout/HydrationFlag";
import { site } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Flynova Travel Agency Ltd — Flights, Holidays & Travel Services in Juba",
    template: "%s | Flynova Travel Agency",
  },
  description: site.description,
  applicationName: site.shortName,
  keywords: [
    "Flynova",
    "travel agency Juba",
    "South Sudan travel agency",
    "air ticketing Juba",
    "flight booking South Sudan",
    "visa assistance Juba",
    "corporate travel management",
    "holiday packages",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    title: "Flynova Travel Agency Ltd — Your Journey Begins With Flynova",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#004721",
};

/** If the app hasn't hydrated within 2.5s, reveal animated content statically (see globals.css). */
const motionFallbackScript =
  "setTimeout(function(){if(!window.__fnReady)document.documentElement.classList.add('motion-fallback')},2500)";
const noScriptStyle =
  '[style*="opacity:0"]{opacity:1!important;transform:none!important}[style*="translateY(105%)"]{transform:none!important}';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: site.name,
  url: site.url,
  logo: `${site.url}/images/brand/flynova-logo.png`,
  email: site.email,
  telephone: site.phones.map((p) => p.tel),
  description: site.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    addressCountry: "SS",
  },
  areaServed: ["South Sudan", "East Africa", "International"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${fraunces.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFallbackScript }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: noScriptStyle }} />
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col">
        <HydrationFlag />
        <MotionConfig reducedMotion="user">
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileBookBar />
          <WhatsAppFloat />
        </MotionConfig>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
