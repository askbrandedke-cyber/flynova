import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light" | "whatsapp";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-sun-400 text-forest-950 shadow-glow hover:bg-sun-300 hover:-translate-y-0.5 active:translate-y-0",
  secondary: "bg-forest-700 text-white shadow-soft hover:bg-forest-600 hover:-translate-y-0.5",
  ghost: "text-forest-700 hover:bg-forest-50",
  light: "bg-white text-forest-800 shadow-soft hover:bg-cream hover:-translate-y-0.5",
  "outline-light": "border border-white/40 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/70",
  whatsapp: "bg-[#1fae53] text-white shadow-soft hover:bg-[#199a48] hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm gap-2",
  md: "h-12 px-6 text-[0.95rem] gap-2.5",
  lg: "h-14 px-8 text-base gap-3",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "group/btn relative inline-flex select-none items-center justify-center rounded-full font-semibold tracking-tight transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  external,
  ...rest
}: Common & { href: string; external?: boolean } & Omit<ComponentProps<"a">, "href" | "className" | "children">) {
  const classes = buttonClasses(variant, size, className);
  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Button({ variant, size, className, children, ...rest }: Common & ComponentProps<"button">) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
