import { FadeIn, SplitText } from "./motion";

/** "✱ KICKER" + two-line uppercase title, second line half accent. */
export default function PageHead({
  kicker,
  line1,
  accent,
  rest,
  lead,
}: {
  kicker: string;
  line1: string;
  accent: string;
  rest?: string;
  lead?: string;
}) {
  return (
    <header className="page-head wrap">
      <FadeIn delay={0.4}>
        <p className="label kicker">
          <span className="star">✱</span> {kicker}
        </p>
      </FadeIn>
      <h1 className="page-title">
        <SplitText delay={0.45}>{line1}</SplitText>
        <br />
        <span className="accent">
          <SplitText delay={0.55}>{accent}</SplitText>
        </span>{" "}
        {rest && <SplitText delay={0.62}>{rest}</SplitText>}
      </h1>
      {lead && (
        <FadeIn delay={0.7}>
          <p className="page-lead">{lead}</p>
        </FadeIn>
      )}
    </header>
  );
}
