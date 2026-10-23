import type { Metadata } from "next";
import AboutHero from "@/components/AboutHero";
import Experience from "@/components/Experience";
import ContactCTA from "@/components/ContactCTA";
import { Marquee } from "@/components/Services";
import { FadeIn, ScrollLit, SplitText } from "@/components/motion";
import { about, services } from "@/lib/data";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <section className="profile wrap">
        <FadeIn>
          <p className="label kicker">
            <span className="star">✱</span> Profile
          </p>
        </FadeIn>
        <div className="profile-body">
          {about.profile.map((p) => (
            <ScrollLit key={p} text={p} />
          ))}
          <FadeIn>
            <p className="profile-mission">
              <span className="accent">&ldquo;</span>
              {about.mission}
              <span className="accent">&rdquo;</span>
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="tldr wrap">
        <h2 className="tldr-title">
          <SplitText>TL;DR</SplitText>
          <span className="accent">.</span>
        </h2>
        {about.tldr.map((row, i) => (
          <FadeIn key={row.k} className="tldr-row" delay={i * 0.05} y={20}>
            <span className="label">{row.k}</span>
            <p>{row.v}</p>
          </FadeIn>
        ))}
      </section>

      <section style={{ paddingBlock: "clamp(40px, 8vh, 100px)" }}>
        <div className="section-head wrap">
          <h2 className="h2">
            <SplitText>How I work</SplitText>
            <span className="accent">.</span>
          </h2>
          <p className="label kicker">
            <span className="star">✱</span> From the field to the product
          </p>
        </div>
        <div className="approach">
          {about.approach.map((s, i) => (
            <FadeIn key={s.title} className="approach-step" delay={i * 0.08}>
              <span className="label">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <Marquee words={services.map((s) => s.title)} />
      <Experience dark />
      <ContactCTA />
    </>
  );
}
