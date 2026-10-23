"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/data";

const num = (i: number) => String(i + 1).padStart(2, "0");

export default function Nav() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className={`nav${solid ? " is-solid" : ""}`}>
        <Link href="/" className="brand" aria-label={`${site.name}, home`}>
          <span className="brand-mark">{site.short}</span>
          <span className="brand-name label">{site.name}</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link${isActive(item.href) ? " is-active" : ""}`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              <sup>{num(i)}</sup>
              <span className="roll" aria-hidden="true">
                <span>{item.label}</span>
                <span>{item.label}</span>
              </span>
              <span className="sr-only">{item.label}</span>
              {isActive(item.href) && <motion.span layoutId="nav-dot" className="dot" />}
            </Link>
          ))}
        </nav>

        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {nav.map((item, i) => (
              <div key={item.href} style={{ overflow: "hidden" }}>
                <motion.div
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "110%" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.05 }}
                >
                  <Link href={item.href} className={isActive(item.href) ? "accent" : undefined}>
                    <sup>{num(i)}</sup>
                    {item.label}
                  </Link>
                </motion.div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
