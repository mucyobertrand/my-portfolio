import { experience } from "@/lib/data";
import { FadeIn, SplitText } from "./motion";

export default function Experience({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`experience wrap${dark ? " dark-table" : ""}`} id="experience">
      <div className="section-head">
        <h2 className="h2">
          <SplitText>Experience</SplitText>
          <sup className="count">({String(experience.length).padStart(2, "0")})</sup>
        </h2>
        <p className="label">
          <span className="star">✱</span> Roles &amp; practice
        </p>
      </div>

      <div className="table" role="table" aria-label="Experience">
        <div className="tr th" role="row">
          <span role="columnheader" className="label">Role</span>
          <span role="columnheader" className="label">Organisation</span>
          <span role="columnheader" className="label">When</span>
          <span role="columnheader" className="label">Focus</span>
        </div>
        {experience.map((e, i) => (
          <FadeIn key={e.role} delay={i * 0.06} y={20}>
            <a className="tr" role="row" href={e.href} target="_blank" rel="noopener">
              <strong role="cell">{e.role}</strong>
              <span role="cell">{e.org}</span>
              <span role="cell">{e.when}</span>
              <span role="cell" className="tr-focus">{e.focus}</span>
              <span className="tr-arrow" aria-hidden="true">↗</span>
            </a>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
