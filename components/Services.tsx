"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { domains, marqueeWords, services, stack } from "@/lib/data";
import { SplitText, VelocityMarquee } from "./motion";

const EASE = [0.22, 1, 0.36, 1] as const;

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="chips">
      {items.map((t, i) => (
        <motion.li
          key={t}
          className="chip"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: i * 0.03 }}
        >
          {t}
        </motion.li>
      ))}
    </ul>
  );
}

export function Marquee({ words = marqueeWords }: { words?: string[] }) {
  return (
    <VelocityMarquee baseVelocity={-2.5}>
      {words.map((w) => (
        <span key={w} style={{ display: "inline-flex", alignItems: "center" }}>
          <span>{w}</span>
          <i>●</i>
        </span>
      ))}
    </VelocityMarquee>
  );
}

export default function Services() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section className="services" id="services">
      <div className="services-grid wrap">
        <div className="services-aside">
          <h2 className="h2">
            <SplitText>How can</SplitText>
            <br />
            <span className="accent">
              <SplitText delay={0.1}>I help?</SplitText>
            </span>
          </h2>
          <p className="label chips-label">Stack</p>
          <Chips items={stack} />
          <p className="label chips-label">Domains</p>
          <Chips items={domains} />
        </div>

        <ol className="services-list" onMouseLeave={() => setHover(null)}>
          {services.map((s, i) => (
            <motion.li
              key={s.title}
              onMouseEnter={() => setHover(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.06 }}
            >
              <span className="svc-idx">{String(i + 1).padStart(2, "0")}</span>
              <motion.div animate={{ x: hover === i ? 10 : 0 }} transition={{ duration: 0.5, ease: EASE }}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </motion.div>
              <motion.span
                className="svc-line"
                initial={false}
                animate={{ scaleX: hover === i ? 1 : 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
