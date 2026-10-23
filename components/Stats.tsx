import { stats } from "@/lib/data";
import { CountUp, FadeIn } from "./motion";

export default function Stats() {
  return (
    <section className="stats" aria-label="At a glance">
      {stats.map((s, i) => (
        <FadeIn key={s.label} className="stat" delay={i * 0.08}>
          <span className="stat-idx">[{String(i + 1).padStart(2, "0")}]</span>
          <span className="stat-num">
            <CountUp to={s.value} suffix={s.suffix} />
          </span>
          <span className="label stat-label">{s.label}</span>
        </FadeIn>
      ))}
    </section>
  );
}
