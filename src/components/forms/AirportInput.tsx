"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import { airports, formatAirport } from "@/lib/data/airports";
import { cn } from "@/lib/utils";
import { fieldBorder, inputBase } from "@/components/forms/fields";

type Props = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  placeholder?: string;
  error?: string;
  icon?: ReactNode;
  inputRef?: (el: HTMLInputElement | null) => void;
};

/** Accessible combobox suggesting airports while still accepting any typed city. */
export function AirportInput({ id, value, onChange, onBlur, placeholder, error, icon, inputRef }: Props) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const matches = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return airports.slice(0, 6);
    return airports
      .filter((a) => [a.code, a.city, a.name, a.country].some((s) => s.toLowerCase().includes(q)))
      .sort((a, b) => Number(b.code.toLowerCase() === q) - Number(a.code.toLowerCase() === q))
      .slice(0, 6);
  }, [value]);

  const showList = open && matches.length > 0 && !matches.some((a) => formatAirport(a) === value);

  function choose(i: number) {
    const a = matches[i];
    if (!a) return;
    onChange(formatAirport(a));
    setOpen(false);
  }

  return (
    <div className="relative">
      {icon && <span className="pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 text-forest-600/70">{icon}</span>}
      <input
        ref={inputRef}
        id={id}
        type="text"
        role="combobox"
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={showList}
        aria-controls={listId}
        aria-activedescendant={showList ? `${listId}-${active}` : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          setTimeout(() => setOpen(false), 120);
          onBlur();
        }}
        onKeyDown={(e) => {
          if (!showList) {
            if (e.key === "ArrowDown") setOpen(true);
            return;
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((i) => (i + 1) % matches.length);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => (i - 1 + matches.length) % matches.length);
          } else if (e.key === "Enter") {
            e.preventDefault();
            choose(active);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className={cn(inputBase, fieldBorder(error), "h-13", !!icon && "pl-11")}
      />
      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute top-full right-0 left-0 z-30 mt-2 max-h-72 overflow-auto rounded-2xl bg-white p-1.5 shadow-lift ring-1 ring-forest-900/8"
        >
          {matches.map((a, i) => (
            <li
              key={a.code}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault();
                choose(i);
              }}
              onMouseEnter={() => setActive(i)}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5",
                i === active ? "bg-forest-50" : "bg-transparent",
              )}
            >
              <span className="grid h-8 w-12 shrink-0 place-items-center rounded-lg bg-forest-700 font-mono text-xs font-bold text-white">
                {a.code}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-forest-900">
                  {a.city}, {a.country}
                </span>
                <span className="block truncate text-xs text-mist">{a.name}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
