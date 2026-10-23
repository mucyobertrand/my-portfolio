import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import Stats from "@/components/Stats";
import WorkList from "@/components/WorkList";
import Spotlight from "@/components/Spotlight";
import Services, { Marquee } from "@/components/Services";
import Experience from "@/components/Experience";
import ContactCTA from "@/components/ContactCTA";
import { ScrollLit } from "@/components/motion";
import { statement } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <section className="statement wrap">
        <ScrollLit className="scroll-lit" text={statement} />
      </section>
      <Stats />
      <WorkList />
      <Spotlight />
      <div className="light">
        <Services />
        <Marquee />
        <Experience />
      </div>
      <ContactCTA />
    </>
  );
}
