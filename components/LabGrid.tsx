"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { langColor, type Repo } from "@/lib/github";
import { Filters } from "./WorkGrid";

const EASE = [0.22, 1, 0.36, 1] as const;

const pretty = (name: string) => name.replace(/[_-]+/g, " ").replace(/\s+$/, "");

export default function LabGrid({ repos }: { repos: Repo[] }) {
  const languages = ["All", ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean) as string[]))];
  const [lang, setLang] = useState("All");
  const list = lang === "All" ? repos : repos.filter((r) => r.language === lang);

  return (
    <>
      <div className="wrap">
        <Filters items={languages} value={lang} onChange={setLang} id="lab" />
      </div>
      <motion.div layout className="grid grid-3 wrap" style={{ marginTop: 60, rowGap: 16, columnGap: 16 }}>
        <AnimatePresence mode="popLayout">
          {list.map((r, i) => (
            <motion.a
              layout
              key={r.name}
              className="repo"
              href={r.html_url}
              target="_blank"
              rel="noopener"
              data-cursor="Code"
              data-cursor-text="GitHub"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
              transition={{ duration: 0.7, ease: EASE, delay: Math.min(i, 8) * 0.04 }}
            >
              <div className="repo-top">
                <span className="repo-lang label">
                  <i style={{ background: (r.language && langColor[r.language]) || "#666" }} />
                  {r.language || "Repo"}
                </span>
                <span className="repo-go" aria-hidden="true">↗</span>
              </div>
              <h3>{pretty(r.name)}</h3>
              <p>{r.description || "Work in progress."}</p>
              <div className="repo-foot label">
                <span>{r.stargazers_count > 0 ? `★ ${r.stargazers_count}` : "Open source"}</span>
                <span>{r.pushed_at ? new Date(r.pushed_at).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : ""}</span>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
