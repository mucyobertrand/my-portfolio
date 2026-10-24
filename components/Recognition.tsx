import { recognition } from "@/lib/data";
import { FadeIn, SplitText } from "./motion";

export default function Recognition() {
  return (
    <div className="experience wrap dark-table" id="recognition">
      <div className="section-head">
        <h2 className="h2">
          <SplitText>Recognition</SplitText>
          <sup className="count">({String(recognition.length).padStart(2, "0")})</sup>
        </h2>
        <p className="label">
          <span className="star">✱</span> Awards &amp; selections
        </p>
      </div>

      <div className="table" role="table" aria-label="Recognition">
        <div className="tr th" role="row">
          <span role="columnheader" className="label">Award</span>
          <span role="columnheader" className="label">Organisation</span>
          <span role="columnheader" className="label">Year</span>
          <span role="columnheader" className="label">Context</span>
        </div>
        {recognition.map((r, i) => (
          <FadeIn key={r.award} delay={i * 0.06} y={20}>
            <a className="tr" role="row" href={r.href} target="_blank" rel="noopener">
              <strong role="cell">{r.award}</strong>
              <span role="cell">{r.org}</span>
              <span role="cell">{r.year}</span>
              <span role="cell" className="tr-focus">{r.project}</span>
              <span className="tr-arrow" aria-hidden="true">↗</span>
            </a>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
