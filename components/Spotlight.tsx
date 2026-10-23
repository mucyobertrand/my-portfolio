"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { entelon, site } from "@/lib/data";
import { FadeIn, Magnetic, Parallax, SplitText } from "./motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const STEP_MS = 2600;
const BARS = 14;

/** Animated "product console" that cycles through Entelon's three-step process. */
function Console() {
  const [step, setStep] = useState(0);
  const [bars, setBars] = useState(() => Array.from({ length: BARS }, (_, i) => 0.3 + ((i * 37) % 60) / 100));

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % entelon.steps.length);
      setBars((b) => b.map(() => 0.2 + Math.random() * 0.8));
    }, STEP_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="panel" data-cursor="Visit" data-cursor-text="entelon">
      <div className="panel-head label">
        <span className="panel-dots">
          <i />
          <i />
          <i />
        </span>
        <span>Built at Entelon</span>
      </div>
      <div className="panel-body">
        {entelon.steps.map((s, i) => {
          const on = i === step;
          return (
            <div key={s.title} className={`panel-step${on ? " is-on" : ""}`}>
              <span className="panel-step-num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
              <span className="panel-step-state label" style={{ color: on ? "var(--accent)" : i < step ? "#29d17d" : "var(--muted)" }}>
                {on ? "Running" : i < step ? "Done" : "Queued"}
              </span>
              {on && (
                <motion.span
                  key={`p-${step}`}
                  className="panel-step-progress"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                />
              )}
            </div>
          );
        })}
        <div className="panel-chart" aria-hidden="true">
          {bars.map((h, i) => (
            <motion.i
              key={i}
              animate={{ scaleY: h }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.02 }}
              style={{ height: "100%" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Spotlight() {
  return (
    <section className="spotlight wrap">
      <div className="spotlight-bg" aria-hidden="true" />
      <div className="spotlight-grid">
        <div>
          <FadeIn>
            <span className="spotlight-logo">
              entelon<span className="accent">.</span>
            </span>
          </FadeIn>
          <h2 className="spotlight-title">
            <SplitText>Make AI work</SplitText>
            <br />
            <SplitText delay={0.1}>for</SplitText> <span className="accent"><SplitText delay={0.15}>you.</SplitText></span>
          </h2>
          <FadeIn delay={0.1}>
            <p className="spotlight-sub">Product Lead at Entelon, Kigali.</p>
            <p className="spotlight-copy">
              Entelon builds AI products and custom AI systems that save time, cut costs and help businesses and
              institutions run smoothly. I lead product across Klok AI, HeyRwanda, Visko and Phibram.
            </p>
            <div className="spotlight-actions">
              <Magnetic>
                <a className="btn label" href={site.entelon} target="_blank" rel="noopener">
                  Visit entelon.co <span className="arr">↗</span>
                </a>
              </Magnetic>
              <a className="btn btn-ghost label" href="https://cal.com/entelon/call" target="_blank" rel="noopener">
                Book a demo <span className="arr">↗</span>
              </a>
            </div>
          </FadeIn>
        </div>
        <Parallax offset={50}>
          <FadeIn delay={0.15}>
            <a href={site.entelon} target="_blank" rel="noopener" aria-label="Visit Entelon" style={{ display: "block" }}>
              <Console />
            </a>
          </FadeIn>
        </Parallax>
      </div>

      <div className="spotlight-stats">
        {entelon.stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.08}>
            <strong>{s.value}</strong>
            <span className="label">{s.label}</span>
          </FadeIn>
        ))}
        <FadeIn delay={0.3} className="spotlight-quote">
          <blockquote style={{ margin: 0 }}>
            &ldquo;We make AI work for you, not against you.&rdquo;
            <cite className="label">Entelon // Kigali, Rwanda</cite>
          </blockquote>
        </FadeIn>
      </div>
    </section>
  );
}
