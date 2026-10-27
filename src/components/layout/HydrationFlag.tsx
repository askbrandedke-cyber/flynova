"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __fnReady?: boolean;
  }
}

/** Marks the app as hydrated so the no-JavaScript fallback styles are not applied. */
export function HydrationFlag() {
  useEffect(() => {
    window.__fnReady = true;
    document.documentElement.classList.remove("motion-fallback");
  }, []);
  return null;
}
