import type { Project } from "@/lib/data";

/** Visual for a project: a photo, a logo on colour, or a typographic card. */
export default function Cover({ project, sizes }: { project: Project; sizes?: string }) {
  const { cover, title } = project;
  return (
    <div className="cover">
      {cover.kind === "photo" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="cover-photo" src={cover.src} alt="" sizes={sizes} loading="lazy" />
      )}
      {cover.kind === "logo" && (
        <div className="cover-logo" style={{ background: cover.bg }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover.src} alt="" loading="lazy" />
        </div>
      )}
      {cover.kind === "type" && (
        <div className="cover-type" style={{ background: cover.bg }}>
          <span>{title}</span>
        </div>
      )}
    </div>
  );
}
