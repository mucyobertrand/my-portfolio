"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { contactLinks, site } from "@/lib/data";
import { Magnetic } from "./motion";

const EASE = [0.22, 1, 0.36, 1] as const;

function LocalTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: site.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <p className="label local-time">Local time — Kigali {now ?? "--:--:--"} (GMT+2)</p>;
}

/**
 * No backend: submitting opens the visitor's mail app with everything
 * pre-filled. Swap `onSubmit` for Formspree/Resend if you want inbox delivery.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Project enquiry from ${data.get("name")}`;
    const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const fields = [
    { id: "name", label: "Name", type: "text", placeholder: "Your name" },
    { id: "email", label: "Email", type: "email", placeholder: "you@company.com" },
  ];

  return (
    <div className="contact-grid wrap">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.8 }}>
        <p className="contact-intro">
          Need a web or mobile app, a backend that holds up, or AI that works in production? Reach out, or just say
          hello if you want to talk products in Africa.
        </p>
        <form onSubmit={onSubmit}>
          {fields.map((f, i) => (
            <label key={f.id} className="field" htmlFor={f.id}>
              <span className="label">
                {String(i + 1).padStart(2, "0")} — {f.label} *
              </span>
              <input id={f.id} name={f.id} type={f.type} placeholder={f.placeholder} required autoComplete={f.id} />
            </label>
          ))}
          <label className="field" htmlFor="message">
            <span className="label">03 — Message *</span>
            <textarea id="message" name="message" placeholder="Tell me about the project, timeline and goals" required />
          </label>
          <div className="form-foot">
            <p className="form-note">Your details are only used to reply to you. Sending opens your email app.</p>
            <Magnetic>
              <button className="btn label" type="submit">
                {sent ? "Opening your mail app" : "Send message"} <span className="arr">→</span>
              </button>
            </Magnetic>
          </div>
        </form>
      </motion.div>

      <motion.aside
        className="contact-side"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.95 }}
      >
        <a className="cta-mail" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <nav className="contact-links" aria-label="Elsewhere">
          {contactLinks.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener">
              {l.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <LocalTime />
      </motion.aside>
    </div>
  );
}
