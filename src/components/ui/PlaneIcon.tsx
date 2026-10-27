import type { SVGProps } from "react";

/** Top-down airliner silhouette pointing right (0°), so it can be rotated to any heading. */
export function PlaneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M61.5 32c0-1.9-1.6-3.4-3.6-3.4H41.2L27.4 6.3c-.4-.6-1-1-1.8-1h-4.4c-.9 0-1.5.8-1.3 1.6l5.7 21.7h-9.9l-4.6-6.4c-.3-.4-.8-.7-1.4-.7H5.9c-.8 0-1.4.8-1.2 1.6L7.4 32l-2.7 8.9c-.2.8.4 1.6 1.2 1.6h3.8c.6 0 1.1-.3 1.4-.7l4.6-6.4h9.9l-5.7 21.7c-.2.8.4 1.6 1.3 1.6h4.4c.8 0 1.4-.4 1.8-1l13.8-22.3h16.7c2 0 3.6-1.5 3.6-3.4Z" />
    </svg>
  );
}
