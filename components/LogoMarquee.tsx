import { logos } from "@/lib/data";
import { FadeIn } from "./motion";

function LogoSet({ hidden }: { hidden?: boolean }) {
  return (
    <div className="logo-set" aria-hidden={hidden || undefined}>
      {logos.map((l) =>
        l.kind === "word" ? (
          <span key={l.label} className="logo-word">
            {l.label}
            <span className="accent">.</span>
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={l.label} src={l.src} alt={hidden ? "" : l.label} />
        )
      )}
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section className="logos" aria-label="Organisations">
      <FadeIn>
        <p className="label kicker">
          <span className="star">✱</span> Building at &amp; alongside
        </p>
      </FadeIn>
      <div className="logo-viewport">
        <div className="logo-track">
          <LogoSet />
          <LogoSet hidden />
        </div>
      </div>
    </section>
  );
}
