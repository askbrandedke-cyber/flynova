"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Renders the year on the client only, keeping the footer prerenderable. */
export function CurrentYear() {
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => null);
  return <>{year}</>;
}
