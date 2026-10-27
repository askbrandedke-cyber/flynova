/**
 * Integration point for a live flight-search API (e.g. Amadeus, Duffel, Sabre, Travelport).
 *
 * The website currently runs an inquiry workflow: travellers describe their trip, and
 * the Flynova team confirms availability, fares and ticketing. To show live offers,
 * implement this interface in a server-only module and call it from a route handler.
 * Never expose provider credentials to the browser.
 */
import type { FlightInquiry } from "@/lib/schemas";

export type FlightOffer = {
  id: string;
  carrier: string;
  totalPrice: { amount: string; currency: string };
  segments: { from: string; to: string; departAt: string; arriveAt: string; flightNumber: string }[];
  cabin: string;
};

export interface FlightSearchProvider {
  searchOffers(request: FlightInquiry): Promise<FlightOffer[]>;
  /** Create a held reservation that Flynova staff can ticket after confirming with the traveller. */
  holdOffer?(offerId: string, request: FlightInquiry): Promise<{ pnr: string }>;
}

/** No provider is connected yet, so the site does not show prices or availability. */
export const flightProvider: FlightSearchProvider | null = null;
