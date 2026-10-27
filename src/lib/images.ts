/** Remote photography is served straight from Unsplash's image CDN (imgix), sized per request. */
export function unsplash(id: string) {
  return `https://images.unsplash.com/${id}`;
}

/** Sub-path the site is served from (e.g. "/flynova" on GitHub Pages); empty at a domain root. */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const brandImages = {
  logo: `${base}/images/brand/flynova-logo.png`,
  logoLight: `${base}/images/brand/flynova-logo-light.png`,
  windowTraveller: `${base}/images/brand/window-traveller.jpg`,
  loungeTraveller: `${base}/images/brand/lounge-traveller.jpg`,
  sunsetFlight: `${base}/images/brand/sunset-flight.jpg`,
  safari: `${base}/images/brand/safari.jpg`,
  worldLandmarks: `${base}/images/brand/world-landmarks.jpg`,
} as const;

export const photos = {
  heroWing: unsplash("photo-1436491865332-7a61a109cc05"),
  corporate: unsplash("photo-1556761175-5973dc0f32e7"),
  beach: unsplash("photo-1507525428034-b723cf961d3e"),
  travelPlanning: unsplash("photo-1488646953014-85cb44e25828"),
  airliner: unsplash("photo-1569154941061-e231b4725ef1"),
  roadTrip: unsplash("photo-1469854523086-cc02fe5d8800"),
  mountainLake: unsplash("photo-1476514525535-07fb3b4ae5f1"),
  resortPool: unsplash("photo-1566073771259-6a8506099945"),
  team: unsplash("photo-1521737604893-d14cc237f11d"),
} as const;
