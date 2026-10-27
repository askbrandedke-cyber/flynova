import Image from "next/image";
import { brandImages } from "@/lib/images";
import { cn } from "@/lib/utils";

export function Logo({ light = false, className, priority }: { light?: boolean; className?: string; priority?: boolean }) {
  return (
    <Image
      src={light ? brandImages.logoLight : brandImages.logo}
      alt="Flynova Travel Agency Ltd"
      width={1147}
      height={363}
      priority={priority}
      className={cn("h-auto w-[136px] sm:w-[156px]", className)}
    />
  );
}
