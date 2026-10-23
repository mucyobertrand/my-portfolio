"use client";

import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { usePreloaded } from "./PreloadContext";
import { site } from "@/lib/data";

const SEEN_KEY = "mb-preloaded";

export default function Preloader() {
  const { setReady } = usePreloaded();
  const [visible, setVisible] = useState(true);
  const progress = useMotionValue(0);
  const rounded = useTransform(progress, (v) => String(Math.round(v)).padStart(3, "0"));
  const width = useTransform(progress, (v) => `${v}%`);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Only play the full count once per session.
    if (seen || reduce) {
      setVisible(false);
      setReady(true);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const controls = animate(progress, 100, {
      duration: 1.8,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {}
        setVisible(false);
      },
    });
    return () => controls.stop();
  }, [progress, setReady]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = "";
        setReady(true);
      }}
    >
      {visible && (
        <motion.div
          className="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <motion.span
            className="preloader-mark"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {site.short} <span className="label" style={{ color: "var(--muted)", marginLeft: 10 }}>{site.name}</span>
          </motion.span>
          <span className="label" style={{ color: "var(--muted)" }}>
            Web &amp; Mobile · Backend · Applied AI
          </span>
          <motion.span className="preloader-count">{rounded}</motion.span>
          <motion.span className="preloader-bar" style={{ width }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
