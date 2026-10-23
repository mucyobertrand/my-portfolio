import Link from "next/link";
import { contactLinks, site, skillsLine } from "@/lib/data";
import { FadeIn, Magnetic, SplitText } from "./motion";

export function Footer() {
  return (
    <footer className="footer wrap">
      <span className="label">
        {site.name} © {new Date().getFullYear()} — {skillsLine}
      </span>
      <nav className="footer-links" aria-label="Elsewhere">
        {contactLinks.map((l) => (
          <a key={l.label} className="label" href={l.href} target="_blank" rel="noopener">
            {l.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}

export default function ContactCTA() {
  return (
    <section className="cta">
      <div className="wrap">
        <FadeIn>
          <p className="label kicker">
            <span className="star">✱</span> Open to collaborations
          </p>
        </FadeIn>
        <h2 className="cta-title">
          <SplitText>Let&apos;s build</SplitText>
          <br />
          <SplitText delay={0.08}>something</SplitText>{" "}
          <span className="accent">
            <SplitText delay={0.16}>great</SplitText>
          </span>
        </h2>
        <FadeIn className="cta-row" delay={0.1}>
          <p className="cta-copy">
            Web and mobile apps, backends, applied AI, or something that doesn&apos;t have a name yet. If you think
            we can build it together, let&apos;s talk.
          </p>
          <a className="cta-mail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <Magnetic>
            <Link className="btn label" href="/contact">
              Start a conversation <span className="arr">→</span>
            </Link>
          </Magnetic>
        </FadeIn>
      </div>
      <Footer />
    </section>
  );
}
