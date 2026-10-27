# Flynova Travel Agency Ltd — Website

A premium, interactive website for **Flynova Travel Agency Ltd** (Juba, South Sudan), built with
Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Framer Motion, Lucide icons, React Hook Form and Zod.

Company content (services, mission, vision, values, target clients, contacts) comes from the
Flynova Company Profile. The logo and several photos were extracted from that profile and live in
`public/images/brand/`.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional: fill in email / webhook settings
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run lint
```

## Plain HTML version (static hosting)

```bash
npm run build:static     # writes plain HTML to out/  (out/index.html is the homepage)
npm run preview:static   # preview it at http://localhost:4000
```

Upload the **contents** of `out/` to the root of any static host (cPanel `public_html`,
Netlify, GitHub Pages with a custom domain, Cloudflare Pages, S3…). Every page is a folder with an
`index.html` (`out/about/index.html`, `out/contact/index.html`, …).

Notes:
- Serve it from a web server at the domain root. Double-clicking `index.html` from your computer
  won't load styles or scripts, because pages use site-root paths like `/_next/…`.
- There's no server in this mode, so the email/webhook delivery is not available. Booking and
  contact forms still validate fully, then hand the formatted request to WhatsApp or email.
- `npm run build` / `npm start` still produce the full Node.js version with the `/api/inquiry` route.
  The API route file is `src/app/api/inquiry/route.api.ts` so the static build can leave it out.

## Live preview on GitHub Pages

`.github/workflows/deploy-pages.yml` builds the static version and publishes it on every push to `main`.

1. Push this project to a GitHub repository.
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Open the **Actions** tab, re-run "Deploy to GitHub Pages" if the first run happened before step 2.
4. The site appears at `https://<your-username>.github.io/<repo-name>/`.

The workflow sets `BASE_PATH` automatically so links and images work under `/<repo-name>/`.
With a custom domain, the base path is empty and the site is served from the root.

## What's included

| Route | Contents |
| --- | --- |
| `/` | Immersive hero (animated plane, drifting clouds, parallax), flight booking request form, destinations bento, interactive services explorer, why-choose + counters, packages carousel, corporate, consultation, traveller stories, about, CTA |
| `/about` | Introduction, mission, vision, values, commitment, target clients |
| `/services`, `/services/[slug]` | All five services with benefits, CTAs and an inquiry/booking form per service |
| `/destinations`, `/destinations/[slug]` | Searchable, region-filtered destination explorer; detail pages carry the destination into the flight request and inquiry form |
| `/packages` | Family / honeymoon / group package ideas (filterable), all "Request a Quote" |
| `/corporate` | Business travel solutions, process, corporate inquiry form |
| `/contact` | Phones, WhatsApp, email, office address (Google Maps link), contact form (prefilled from `?topic=&destination=&package=`) |
| `/book` | Full-page flight booking request (prefilled from `?from=&to=&trip=&notes=`) |

Also: sticky transparent→solid navbar with services menu and an accessible animated mobile menu,
floating WhatsApp button, sticky mobile "Book a Flight" bar, `sitemap.xml`, `robots.txt`, Open Graph
image, JSON-LD (`TravelAgency`), per-page metadata, and `prefers-reduced-motion` support throughout.

### The scroll flight path

`src/components/motion/FlightPath.tsx` wraps the homepage sections. It builds a smooth curved route
(Catmull-Rom → Bézier) that weaves between the page margins, measured to the real page size. As you
scroll, the plane is placed on the route at the middle of the viewport, rotated to the curve's
tangent, and a trail is drawn behind it. The trail sits behind section content so it never crosses
text; on phones the route hugs the right edge. It's disabled when reduced motion is requested.

## Booking requests — how they work

The site does **not** pretend to have live airline inventory or prices. The flight form is an
**inquiry workflow**, and the UI says so clearly:

1. The traveller fills in trip → details → **review** (every section can be edited before sending).
2. The form validates in the browser (Zod schema in `src/lib/schemas.ts`) and posts to
   `POST /api/inquiry`, which validates again on the server (plus a honeypot and a basic rate limit).
3. The server delivers the request through every channel that is configured (`src/lib/server/deliver.ts`):
   - **Email** via Resend, if `RESEND_API_KEY` is set
   - **Webhook** (database/CRM/automation), if `INQUIRY_WEBHOOK_URL` is set
4. The traveller sees a reference number (e.g. `FN-261027-AB12`) and:
   - if delivered: a confirmation, with optional "Follow up on WhatsApp"
   - if **no channel is configured** (or the network fails): a prompt to **send the prepared
     request via WhatsApp** (a fully formatted, prefilled message to +211 989 655 700) or by email.
     This fallback works with zero configuration.

### Connect email notifications

1. Sign up at [resend.com](https://resend.com) and verify a sending domain.
2. Set `RESEND_API_KEY`, `INQUIRY_TO_EMAIL` and `INQUIRY_FROM_EMAIL` (in `.env.local`, or in your
   host's environment variables, e.g. Vercel → Project → Settings → Environment Variables).
3. Redeploy. Emails arrive with `Reply-To` set to the traveller.

To use another provider (SendGrid, Postmark, SMTP), replace `sendEmail()` in
`src/lib/server/deliver.ts`. Never put API keys in client code or commit them.

### WhatsApp

The number lives in `src/lib/site.ts` (`whatsapp: "211989655700"` — international format, digits
only, as `wa.me` requires). Message builders are in `src/lib/whatsapp.ts`. The floating button adds
context about the page the visitor is on. To use the WhatsApp Business Cloud API for automatic
notifications instead, add a channel in `deliver.ts` that calls the Graph API with a token stored
in an environment variable.

### Connect a database

Option A — no code: point `INQUIRY_WEBHOOK_URL` at an automation (Zapier, Make, n8n, Google Apps
Script) that writes rows to Google Sheets, Airtable, HubSpot, etc. The JSON body is
`{ reference, receivedAt, type: "flight" | "inquiry", data }`.

Option B — direct: add a `saveToDatabase()` channel in `src/lib/server/deliver.ts` using your
client (e.g. Supabase, Postgres via Prisma/Drizzle). Keep credentials in server-only env vars.

### Connect a flight booking API

`src/lib/flights/provider.ts` defines the `FlightSearchProvider` interface (`searchOffers`,
optional `holdOffer`). To add live search (Amadeus, Duffel, Sabre, Travelport…):

1. Implement the interface in a `server-only` module using credentials from env vars.
2. Add a route handler (e.g. `src/app/api/flights/search/route.ts`) that validates the same
   `FlightInquiry` schema and returns offers.
3. Add an offers step to `BookingForm` between "Your trip" and "Your details". The existing
   inquiry submission can then include the chosen offer ID so staff can ticket it.

## Content you should review

- **Destinations and packages** (`src/lib/data/`) are clearly labelled as inspiration / package
  ideas. No prices are shown; set `price` on a package only once Flynova confirms it.
- **Testimonials**: none were invented. Add genuine, consented reviews to
  `src/lib/data/testimonials.ts` and the section switches to showing them automatically.
- **Map**: the office location couldn't be verified to exact coordinates, so the site links to a
  Google Maps search for the address instead of embedding a pin. To embed a map, add an `<iframe>`
  with the verified location on `/contact`.
- **Photos**: destination/service photos load from Unsplash's CDN (allowed in `next.config.ts`).
  Each has a local fallback from the company profile if a remote image fails. Swap in Flynova's own
  photography any time via `src/lib/images.ts` and the data files.

## Project structure

```
src/
  app/                 routes, metadata, sitemap, robots, API route
  components/
    layout/            Navbar, Footer, WhatsAppFloat, MobileBookBar
    home/              homepage sections
    sections/          shared page sections (PageHero, CtaBand, explorers)
    cards/             DestinationCard, PackageCard
    forms/             BookingForm, InquiryForm, AirportInput, fields, submission flow
    motion/            FlightPath, Reveal/TextReveal/Stagger, Parallax, Counter, Clouds
    ui/                Button, SmartImage, Logo, SectionHeading, PlaneIcon
  lib/
    site.ts            company details (single source of truth)
    data/              services, destinations, packages, airports, testimonials
    schemas.ts         shared Zod schemas (client + server)
    whatsapp.ts        wa.me links and message formatting
    server/deliver.ts  email / webhook delivery
    flights/provider.ts  flight API integration point
```
