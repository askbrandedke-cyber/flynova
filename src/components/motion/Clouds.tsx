import { cn } from "@/lib/utils";

function Cloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 90" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M42 82c-18 0-32-11-32-25 0-13 12-24 28-25 3-16 19-28 38-28 13 0 25 6 32 15 5-3 11-5 18-5 18 0 32 12 34 27 17 1 30 11 30 24 0 14-14 17-31 17H42Z"
      />
    </svg>
  );
}

/** Soft clouds drifting across a section. Pure CSS, disabled automatically with reduced motion. */
export function Clouds({ className, tone = "light" }: { className?: string; tone?: "light" | "warm" }) {
  const color = tone === "light" ? "text-white" : "text-sun-100";
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div className="absolute top-[14%] left-0 animate-drift-slow [animation-delay:-40s]">
        <Cloud className={cn("w-[340px] opacity-25 blur-[2px]", color)} />
      </div>
      <div className="absolute top-[34%] left-0 animate-drift [animation-delay:-12s]">
        <Cloud className={cn("w-[220px] opacity-20 blur-[1px]", color)} />
      </div>
      <div className="absolute top-[62%] left-0 animate-drift-slow [animation-delay:-70s]">
        <Cloud className={cn("w-[420px] opacity-15 blur-[3px]", color)} />
      </div>
      <div className="absolute top-[8%] left-0 animate-drift [animation-delay:-48s]">
        <Cloud className={cn("w-[160px] opacity-30", color)} />
      </div>
    </div>
  );
}
