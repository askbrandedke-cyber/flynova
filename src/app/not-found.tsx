import { ButtonLink } from "@/components/ui/Button";
import { PlaneIcon } from "@/components/ui/PlaneIcon";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-forest-950 pt-32 pb-20 text-white">
      <div className="container-page text-center">
        <PlaneIcon className="mx-auto size-14 -rotate-12 text-sun-400" />
        <p className="mt-6 font-display text-8xl text-sun-400 italic">404</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">This route isn’t on our map.</h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">The page you’re looking for has moved or doesn’t exist. Let’s get you back on course.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/book" variant="outline-light">Book a flight</ButtonLink>
        </div>
      </div>
    </section>
  );
}
