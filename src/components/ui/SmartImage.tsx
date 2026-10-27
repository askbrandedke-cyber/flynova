"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

function unsplashLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 72));
  return url.toString();
}

type Props = Omit<ImageProps, "src" | "loader"> & {
  src: string;
  /** Local image shown if the remote photo cannot be loaded. */
  fallback?: string;
};

/**
 * next/image wrapper: remote Unsplash photos are resized by Unsplash's CDN, local
 * brand photos go through Next's optimizer, and any failure falls back gracefully.
 */
export function SmartImage({ src, fallback, alt, className, ...rest }: Props) {
  const [failed, setFailed] = useState(false);
  const current = failed && fallback ? fallback : src;
  const remote = current.startsWith("https://images.unsplash.com");
  return (
    <Image
      key={current}
      src={current}
      alt={alt}
      loader={remote ? unsplashLoader : undefined}
      className={cn("bg-forest-900/20", className)}
      onError={() => {
        if (!failed && fallback && fallback !== src) setFailed(true);
      }}
      {...rest}
    />
  );
}
