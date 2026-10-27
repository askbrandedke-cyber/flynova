import type { NextConfig } from "next";

/**
 * `npm run build:static` sets STATIC_EXPORT=true and produces plain HTML in `out/`
 * for any static host. The server-only API route (`route.api.ts`) is excluded there,
 * and forms hand requests off to WhatsApp/email instead.
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";
/** Set BASE_PATH (e.g. "/flynova") when the static site is hosted under a sub-path, as on GitHub Pages. */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const, trailingSlash: true } : {}),
  ...(basePath ? { basePath } : {}),
  pageExtensions: isStaticExport ? ["tsx", "ts"] : ["tsx", "ts", "api.ts"],
  env: { NEXT_PUBLIC_STATIC_EXPORT: isStaticExport ? "true" : "false", NEXT_PUBLIC_BASE_PATH: basePath },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Static hosts have no image optimizer; remote photos are still resized by Unsplash's CDN.
    unoptimized: isStaticExport,
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
    remotePatterns: [new URL("https://images.unsplash.com/**")],
  },
  poweredByHeader: false,
};

export default nextConfig;
