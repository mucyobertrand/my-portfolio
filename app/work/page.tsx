import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import WorkGrid from "@/components/WorkGrid";
import ContactCTA from "@/components/ContactCTA";
import { projects } from "@/lib/data";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <>
      <PageHead
        kicker={`Selection — ${String(projects.length).padStart(2, "0")} projects`}
        line1="Selected"
        accent="work"
        rest="2023—2026"
        lead="AI products I lead at Entelon, community health and livelihood tools I build and research at IWP Africa, and the side projects where I try things first."
      />
      <WorkGrid />
      <ContactCTA />
    </>
  );
}
