"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { projects } from "@/lib/data";
import { FadeIn, SplitText } from "./motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function WorkList() {
  const featured = projects.filter((p) => p.featured);
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="work" id="work">
      <div className="section-head wrap">
        <h2 className="h2">
          <SplitText>Selected work</SplitText>
          <sup className="count">({String(featured.length).padStart(2, "0")})</sup>
        </h2>
        <Link href="/work" className="label link-arrow">
          All projects →
        </Link>
      </div>

      <ol className={`work-list${active ? " is-hovering" : ""}`} onMouseLeave={() => setActive(null)}>
        {featured.map((p, i) => (
          <FadeIn as="li" key={p.slug} delay={i * 0.04} y={30}>
            <a
              className={`work-row${active === p.slug ? " is-active" : ""}`}
              href={p.href}
              target="_blank"
              rel="noopener"
              data-cursor="Open"
              data-cursor-text={p.title}
              onMouseEnter={() => setActive(p.slug)}
              onFocus={() => setActive(p.slug)}
              onBlur={() => setActive(null)}
            >
              <motion.span
                className="work-fill"
                initial={false}
                animate={{ scaleY: active === p.slug ? 1 : 0 }}
                transition={{ duration: 0.55, ease: EASE }}
              />
              <span className="work-idx">{String(i + 1).padStart(2, "0")}</span>
              <motion.span
                className="work-title"
                animate={{ x: active === p.slug ? 14 : 0 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                {p.title}
              </motion.span>
              <span className="work-meta label">
                {p.org} / {p.meta}
              </span>
              <span className="work-arrow" aria-hidden="true">
                {active === p.slug ? "→" : "↗"}
              </span>
            </a>
          </FadeIn>
        ))}
      </ol>
    </section>
  );
}
