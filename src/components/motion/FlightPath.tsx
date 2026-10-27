"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { PlaneIcon } from "@/components/ui/PlaneIcon";

type Pt = { x: number; y: number };
type Size = { w: number; h: number; vh: number };

/** Smooth curve through points (Catmull-Rom converted to cubic Béziers). */
function smoothPath(pts: Pt[]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

/** A route that starts in the right margin and weaves between the page edges. */
function buildRoute({ w, h, vh }: Size) {
  const mobile = w < 768;
  const startY = mobile ? 80 : 160;
  const endY = Math.max(startY + 400, h - vh * 0.6);
  const step = mobile ? 520 : 820;
  const lanes = mobile ? [0.955, 0.925, 0.965, 0.935] : [0.94, 0.06, 0.94, 0.62, 0.05, 0.95, 0.35, 0.94, 0.06];
  const pts: Pt[] = [{ x: w * (mobile ? 0.97 : 0.99), y: 0 }];
  let y = startY;
  let i = 0;
  while (y < endY) {
    pts.push({ x: w * lanes[i % lanes.length], y });
    y += step;
    i++;
  }
  pts.push({ x: w * (mobile ? 0.94 : 0.5), y: endY });
  return smoothPath(pts);
}

/**
 * Wraps page content with an aircraft that flies a curved, dotted route through
 * the sections as the visitor scrolls. The plane stays near the middle of the
 * viewport, banks to follow the curve, and leaves a trail behind it.
 */
export function FlightPath({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const samples = useRef<{ l: number; x: number; y: number }[]>([]);
  const total = useRef(1);
  const top = useRef(0);
  const [size, setSize] = useState<Size>({ w: 0, h: 0, vh: 0 });

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const rotate = useMotionValue(90);
  const progress = useMotionValue(0);
  const opacity = useMotionValue(0);
  const planeOpacity = useTransform(opacity, (o) => o * 0.95);

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 140, damping: 32, mass: 0.5 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduce) return;
    const measure = () => {
      top.current = el.getBoundingClientRect().top + window.scrollY;
      setSize((s) => {
        const next = { w: el.offsetWidth, h: el.offsetHeight, vh: window.innerHeight };
        return Math.abs(next.w - s.w) < 2 && Math.abs(next.h - s.h) < 40 && Math.abs(next.vh - s.vh) < 120 ? s : next;
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduce]);

  const d = useMemo(() => (size.w ? buildRoute(size) : ""), [size]);

  const update = useCallback(
    (scroll: number) => {
      const s = samples.current;
      if (s.length < 8) return;
      const target = scroll - top.current + size.vh * 0.56;
      // Binary search for the first sample at or below the target height.
      let lo = 0;
      let hi = s.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (s[mid].y < target) lo = mid + 1;
        else hi = mid;
      }
      const i = Math.min(Math.max(lo, 1), s.length - 1);
      const a = s[i - 1];
      const b = s[i];
      const t = b.y === a.y ? 0 : Math.min(Math.max((target - a.y) / (b.y - a.y), 0), 1);
      const px = a.x + (b.x - a.x) * t;
      const py = a.y + (b.y - a.y) * t;
      const back = s[Math.max(i - 4, 0)];
      const ahead = s[Math.min(i + 4, s.length - 1)];
      const angle = (Math.atan2(ahead.y - back.y, ahead.x - back.x) * 180) / Math.PI;
      x.set(px);
      y.set(py);
      rotate.set(angle);
      progress.set((a.l + (b.l - a.l) * t) / total.current);
      const first = s[0].y;
      const last = s[s.length - 1].y;
      const fadeIn = Math.min(Math.max((target - first) / 160, 0), 1);
      const fadeOut = Math.min(Math.max((last - target) / 220, 0), 1);
      opacity.set(Math.min(fadeIn, fadeOut));
    },
    [size.vh, x, y, rotate, progress, opacity],
  );

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || !d) return;
    const len = path.getTotalLength();
    total.current = len || 1;
    const count = Math.max(Math.ceil(len / 6), 10);
    const pts = [];
    let maxY = -Infinity;
    for (let k = 0; k <= count; k++) {
      const l = (k / count) * len;
      const p = path.getPointAtLength(l);
      maxY = Math.max(maxY, p.y);
      pts.push({ l, x: p.x, y: maxY }); // keep y monotonic for the lookup
    }
    samples.current = pts;
    update(window.scrollY);
  }, [d, update]);

  useMotionValueEvent(smoothY, "change", update);

  if (reduce) return <>{children}</>;

  const mobile = size.w < 768;
  const planeSize = mobile ? 24 : 46;

  return (
    <div ref={wrapRef} className="relative isolate">
      {d && (
        // The route sits behind the sections, so it shows through open areas without crossing text.
        <svg
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          className="pointer-events-none absolute inset-0 -z-10 print:hidden"
          aria-hidden="true"
        >
          <path ref={pathRef} d={d} fill="none" stroke="#f4941c" strokeOpacity={0.35} strokeWidth={2} strokeDasharray="1 11" strokeLinecap="round" />
          <motion.path d={d} fill="none" stroke="#f4941c" strokeOpacity={0.75} strokeWidth={mobile ? 1.5 : 2} strokeLinecap="round" style={{ pathLength: progress, opacity }} />
        </svg>
      )}
      {children}
      {d && (
        <div className="pointer-events-none absolute inset-0 z-[15] overflow-hidden print:hidden" aria-hidden="true">
          <motion.div
            className="absolute top-0 left-0"
            style={{ x, y, opacity: planeOpacity, width: planeSize, height: planeSize, marginLeft: -planeSize / 2, marginTop: -planeSize / 2 }}
          >
            <motion.div style={{ rotate }} className="h-full w-full">
              <PlaneIcon className="h-full w-full text-sun-400 drop-shadow-[0_6px_10px_rgba(1,23,12,0.35)]" />
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
