import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import LabGrid from "@/components/LabGrid";
import ContactCTA from "@/components/ContactCTA";
import { getRepos } from "@/lib/github";

export const metadata: Metadata = { title: "Lab" };
export const revalidate = 3600;

export default async function LabPage() {
  const repos = await getRepos("mucyobertrand");
  return (
    <>
      <PageHead
        kicker={`Lab — ${repos.length} repositories`}
        line1="Code &"
        accent="experiments"
        lead="Everything I build in the open: web and mobile apps, APIs, IoT prototypes and ML experiments. Pulled live from GitHub."
      />
      <LabGrid repos={repos} />
      <ContactCTA />
    </>
  );
}
