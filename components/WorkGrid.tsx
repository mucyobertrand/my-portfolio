"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { projects, workFilters } from "@/lib/data";
import Cover from "./Cover";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Filters({
  items,
  value,
  onChange,
  id,
}: {
  items: string[];
  value: string;
  onChange: (v: string) => void;
  id: string;
}) {
  return (
    <div className="filters" role="group" aria-label="Filter">
      {items.map((f, i) => (
        <motion.button
          key={f}
          className={`filter${value === f ? " is-on" : ""}`}
          aria-pressed={value === f}
          onClick={() => onChange(f)}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.5 + i * 0.03 }}
        >
          {value === f && <motion.span layoutId={`${id}-pill`} className="filter-pill" transition={{ duration: 0.5, ease: EASE }} />}
          {f}
        </motion.button>
      ))}
    </div>
  );
}

export default function WorkGrid() {
  const [filter, setFilter] = useState("All");
  const list = filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <>
      <div className="wrap">
        <Filters items={workFilters} value={filter} onChange={setFilter} id="work" />
      </div>
      <motion.div layout className="grid wrap" style={{ marginTop: 60 }}>
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.a
              layout
              key={p.slug}
              className="card"
              href={p.href}
              target="_blank"
              rel="noopener"
              data-cursor="Open"
              data-cursor-text={p.title}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.3 } }}
              transition={{ duration: 0.8, ease: EASE, delay: (i % 2) * 0.08 }}
            >
              <motion.div
                className="card-media"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              >
                <Cover project={p} />
              </motion.div>
              <div className="card-info">
                <span className="card-idx">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="card-title">
                  {p.title} <span style={{ color: "var(--muted)", fontWeight: 500 }}>| {p.meta}</span>
                </h3>
                <span className="card-year">{p.org}</span>
                <span className="card-tags label">{p.tags.join(" / ")}</span>
                <p className="card-blurb">{p.blurb}</p>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
