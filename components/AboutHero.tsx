"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { site, skillsLine } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;
const NAME = "MUCYO";
const CENTER = (NAME.length - 1) / 2;

function Letter({ ch, i, progress }: { ch: string; i: number; progress: MotionValue<number> }) {
  const dist = i - CENTER;
  // Letters slide away from the middle to make room for the portrait.
  const x = useTransform(progress, [0, 0.55], ["0vw", `${Math.sign(dist) * (6 + Math.abs(dist) * 2.5)}vw`]);
  const opacity = useTransform(progress, [0, 0.3], [1, dist === 0 ? 0 : 1]);
  // Outer span moves sideways (unclipped); inner mask clips the intro rise.
  return (
    <motion.span style={{ x, opacity, display: "inline-block" }} aria-hidden="true">
      <span style={{ overflow: "hidden", display: "inline-block", paddingTop: "0.06em" }}>
        <motion.span
          style={{ display: "inline-block" }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.45 + i * 0.06 }}
        >
          {ch}
        </motion.span>
      </span>
    </motion.span>
  );
}

export default function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const photoScale = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const photoRotate = useTransform(scrollYProgress, [0, 0.55], [-8, 0]);
  const fadeOut = useTransform(scrollYProgress, [0.75, 1], [1, 0]);

  return (
    <section className="about-hero" ref={ref}>
      <motion.div className="about-sticky" style={{ opacity: fadeOut }}>
        <motion.div
          className="about-top label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link href="/" className="link-arrow">← Home</Link>
          <span className="about-caption">
            Web &amp; Mobile · Backend · Applied AI
            <br />
            Kigali // Rwanda // Since 2023 on GitHub
          </span>
          <span>About</span>
        </motion.div>

        <div className="about-name-wrap">
          <h1 className="about-name" aria-label={site.name}>
            {[...NAME].map((ch, i) => (
              <Letter key={i} ch={ch} i={i} progress={scrollYProgress} />
            ))}
          </h1>
          <motion.div className="about-photo" style={{ scale: photoScale, rotate: photoRotate }}>
            {site.hasPortrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/img/me.jpg" alt={site.name} />
            ) : (
              <span className="about-photo-initials">{site.initials}</span>
            )}
          </motion.div>
        </div>

        <motion.div
          className="about-bottom"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: EASE }}
        >
          <span className="label" style={{ color: "var(--muted)" }}>© {site.name}</span>
          <div style={{ textAlign: "center" }}>
            <p className="about-intro">
              Web &amp; mobile, backend and applied AI engineer, and product lead building community-first software across Rwanda.
            </p>
            <span className="about-tag label">{skillsLine}</span>
          </div>
          <span className="about-scroll label">
            Scroll <motion.i animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>↓</motion.i>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
