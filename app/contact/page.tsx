import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Footer } from "@/components/ContactCTA";
import { FadeIn, SplitText } from "@/components/motion";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="contact-page">
      <div className="wrap">
        <FadeIn delay={0.4}>
          <p className="label kicker" style={{ marginBottom: 26 }}>
            <span className="star">✱</span> Open to collaborations
          </p>
        </FadeIn>
        <h1 className="cta-title">
          <SplitText delay={0.45}>Let&apos;s build</SplitText>
          <br />
          <SplitText delay={0.52}>something</SplitText>{" "}
          <span className="accent">
            <SplitText delay={0.6}>great</SplitText>
          </span>
        </h1>
      </div>
      <ContactForm />
      <Footer />
    </section>
  );
}
