import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const inputBase =
  "peer w-full rounded-2xl border bg-white px-4 text-[0.95rem] text-forest-950 placeholder:text-mist/60 transition-[border-color,box-shadow] duration-200 outline-none focus:border-forest-500 focus:ring-4 focus:ring-forest-500/10 disabled:opacity-60";

export function fieldBorder(error?: string) {
  return error ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : "border-forest-900/12 hover:border-forest-900/25";
}

export function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[0.8rem] font-semibold tracking-wide text-forest-900">
        {label}
        {required && <span className="ml-0.5 text-sun-500" aria-hidden="true">*</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-mist">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type InputProps = ComponentProps<"input"> & { error?: string; icon?: ReactNode };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ error, icon, className, id, ...rest }, ref) {
  return (
    <div className="relative">
      {icon && <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-forest-600/70">{icon}</span>}
      <input
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputBase, fieldBorder(error), "h-13", !!icon && "pl-11", className)}
        {...rest}
      />
    </div>
  );
});

export const Select = forwardRef<HTMLSelectElement, ComponentProps<"select"> & { error?: string }>(function Select(
  { error, className, id, children, ...rest },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputBase, fieldBorder(error), "h-13 cursor-pointer appearance-none pr-10", className)}
        {...rest}
      >
        {children}
      </select>
      <svg viewBox="0 0 20 20" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-forest-700" aria-hidden="true">
        <path fill="currentColor" d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
      </svg>
    </div>
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, ComponentProps<"textarea"> & { error?: string }>(function Textarea(
  { error, className, id, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={cn(inputBase, fieldBorder(error), "min-h-28 resize-y py-3.5", className)}
      {...rest}
    />
  );
});

/** Hidden from people, tempting to bots. */
export function Honeypot(props: ComponentProps<"input">) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
}
