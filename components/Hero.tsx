"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { heroWords, site } from "@/lib/data";
import { usePreloaded } from "./PreloadContext";
import { SplitText, Magnetic } from "./motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { ready } = usePreloaded();
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLElement>(null);

  // Portrait sinks and the title lifts away as you scroll out of the hero.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Subtle depth: portrait, glow and cards drift at different rates with the pointer.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const portraitX = useTransform(sx, (v) => v * -14);
  const portraitY = useTransform(sy, (v) => v * -8);
  const glowX = useTransform(sx, (v) => v * 30);
  const glowY = useTransform(sy, (v) => v * 20);
  const cardX = useTransform(sx, (v) => v * -34);
  const cardY = useTransform(sy, (v) => v * -22);

  const onPointerMove = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  useEffect(() => {
    if (!ready) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % heroWords.length), 3000);
    return () => clearInterval(id);
  }, [ready]);

  const current = heroWords[index];

  return (
    <section className="hero" ref={ref} onPointerMove={onPointerMove}>
      <motion.div className="hero-bg" style={{ y: bgY }} aria-hidden="true">
        {/* single accent rim light behind the portrait, breathing slowly */}
        <motion.div className="hero-rim" style={{ x: glowX, y: glowY }}>
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={ready ? { opacity: [0.75, 1, 0.75], scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {site.hasPortrait && (
          <motion.div
            className="hero-portrait"
            style={{ x: portraitX, y: portraitY }}
            initial={{ opacity: 0, y: 50, scale: 1.04 }}
            animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.6, ease: EASE, delay: 0.15 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/me-hero.jpg" alt="" fetchPriority="high" />
          </motion.div>
        )}

        <div className="hero-vignette" />
      </motion.div>
      <div className="grain" aria-hidden="true" />

      {/* {site.hasPortrait && (
        <motion.div className="hero-cards" style={{ x: cardX, y: cardY }} aria-hidden="true">
          <motion.div
            className="hero-card hero-card--a"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: [0, -8, 0] } : {}}
            transition={{ opacity: { delay: 1.1, duration: 0.8 }, y: { delay: 1.1, duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          >
            <span className="hero-card-dot" />
            <span>
              <strong>Product Lead</strong>
              <em className="label">Entelon · AI</em>
            </span>
          </motion.div>
          <motion.div
            className="hero-card hero-card--b"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: [0, 8, 0] } : {}}
            transition={{ opacity: { delay: 1.3, duration: 0.8 }, y: { delay: 1.3, duration: 6, repeat: Infinity, ease: "easeInOut" } }}
          >
            <span className="hero-card-dot hero-card-dot--teal" />
            <span>
              <strong>Developer &amp; Researcher</strong>
              <em className="label">IWP Africa · Health</em>
            </span>
          </motion.div>
        </motion.div>
      )} */}

      <motion.div className="hero-inner wrap" style={{ y: titleY, opacity: fade }}>
        <ul className="hero-skills" aria-label="Core skills">
          {site.skills.map((s, i) => (
            <motion.li
              key={s}
              className="label"
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 + i * 0.08 }}
            >
              {s}
            </motion.li>
          ))}
        </ul>
        <h1 className="hero-title">
          <span className="sr-only">I build {heroWords.map((w) => w.word).join(", ")} people rely on.</span>
          <span className="line" aria-hidden="true">
            <SplitText play={ready}>I build</SplitText>
            <span className="rotator">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span key={current.word} className="rotator-word accent">
                  {[...current.word].map((ch, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: "110%", opacity: 0 }}
                      animate={ready ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
                      exit={{ y: "-110%", opacity: 0, transition: { duration: 0.45, ease: EASE, delay: i * 0.015 } }}
                      transition={{ duration: 0.7, ease: EASE, delay: (ready && index === 0 ? 0.25 : 0.1) + i * 0.025 }}
                    >
                      {ch === " " ? " " : ch}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
          <span className="line" aria-hidden="true">
            {/* <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={ready ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
              style={{ display: "inline-flex" }}
            >
              <Link href="/about" className="avatar-pill" aria-label="About me">
                {site.hasPortrait ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="/img/me.jpg" alt="" />
                ) : (
                  <span className="avatar-initials">{site.initials}</span>
                )}
                <span className="avatar-hover label">
                  About me <i aria-hidden="true">↗</i>
                </span>
              </Link>
            </motion.span> */}
            <SplitText play={ready} delay={0.3}>
              people rely on
            </SplitText>
            <motion.span
              className="accent"
              style={{ marginLeft: "-0.22em" }}
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
            >
              .
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="hero-foot"
          initial={{ opacity: 0, y: 30 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.6 }}
        >
          <p className="hero-sub">
            Web &amp; mobile, backend and applied AI engineer. Product Lead at{" "}
            <a href={site.entelon} target="_blank" rel="noopener">
              Entelon
            </a>{" "}
            and Developer &amp; Researcher at{" "}
            <a href={site.iwp} target="_blank" rel="noopener">
              IWP Africa
            </a>
            , shipping AI, health and community-first software from {site.location}.
          </p>
          <Magnetic>
            <Link href="/work" className="hero-cta label">
              See selected work <span className="tri">▸</span>
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
