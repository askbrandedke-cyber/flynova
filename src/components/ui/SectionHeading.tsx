import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, TextReveal } from "@/components/motion/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  align = "left",
  tone = "dark",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  /** Words rendered in italic orange after the title. */
  accent?: string;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal>
          <p className={cn("eyebrow mb-5", align === "center" && "justify-center")}>{eyebrow}</p>
        </Reveal>
      )}
      <Tag
        className={cn(
          "font-display text-[2.15rem] leading-[1.06] font-medium tracking-[-0.02em] text-balance sm:text-5xl lg:text-[3.4rem]",
          tone === "light" ? "text-white" : "text-forest-900",
        )}
      >
        <TextReveal text={title} />
        {accent && (
          <>
            {" "}
            <TextReveal text={accent} className="italic text-sun-400" delay={0.15} />
          </>
        )}
      </Tag>
      {intro && (
        <Reveal delay={0.2}>
          <div
            className={cn(
              "mt-5 text-base leading-relaxed text-pretty sm:text-lg",
              tone === "light" ? "text-white/75" : "text-mist",
            )}
          >
            {intro}
          </div>
        </Reveal>
      )}
    </div>
  );
}
