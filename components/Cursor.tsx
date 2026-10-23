"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cover from "./Cover";
import { projects } from "@/lib/data";

type Target = { label: string; text: string; preview?: string };

/**
 * One cursor badge for the whole site. Any element with `data-cursor="Open"`
 * shows the spinning badge; `data-cursor-text` sets the ring text and
 * `data-cursor-preview` (a project slug) adds a floating cover behind it.
 */
export default function Cursor() {
  const pathname = usePathname();
  const [target, setTarget] = useState<Target | null>(null);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });
  const px = useSpring(x, { stiffness: 160, damping: 24 });
  const py = useSpring(y, { stiffness: 160, damping: 24 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let first = true;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (first) {
        sx.jump(e.clientX); sy.jump(e.clientY); px.jump(e.clientX); py.jump(e.clientY);
        first = false;
      }
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      if (!el) return setTarget((t) => (t ? null : t));
      const next: Target = {
        label: el.dataset.cursor || "Open",
        text: el.dataset.cursorText || el.dataset.cursor || "Open",
        preview: el.dataset.cursorPreview,
      };
      setTarget((t) =>
        t && t.label === next.label && t.text === next.text && t.preview === next.preview ? t : next
      );
    };
    const onLeave = () => setTarget(null);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y, sx, sy, px, py]);

  useEffect(() => setTarget(null), [pathname]);

  const project = target?.preview ? projects.find((p) => p.slug === target.preview) : undefined;
  const ring = target ? `${target.text.toUpperCase()} · `.repeat(target.text.length <= 6 ? 3 : 2) : "";

  return (
    <div className="cursor" aria-hidden="true">
      <AnimatePresence>
        {project && (
          <motion.div
            key="preview"
            className="cursor-preview"
            style={{ x: px, y: py }}
            initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.6, rotate: 4 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={project.slug}
                style={{ position: "absolute", inset: 0 }}
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Cover project={project} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {target && (
          <motion.div
            key="badge"
            className="cursor-badge"
            style={{ x: sx, y: sy }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg viewBox="0 0 100 100">
              <defs>
                <path id="cursor-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text>
                <textPath href="#cursor-circle" textLength="234" lengthAdjust="spacing">
                  {ring}
                </textPath>
              </text>
            </svg>
            <span className="cursor-core label" style={{ fontSize: 10 }}>
              {target.label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
