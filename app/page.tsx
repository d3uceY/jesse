import SiteMotion from "@/components/SiteMotion";
import IntroCurtain from "@/components/IntroCurtain";
import RegisterStrip from "@/components/RegisterStrip";
import Hero from "@/components/Hero";
import Manifest from "@/components/Manifest";
import StatsBar from "@/components/StatsBar";
import Projects from "@/components/Projects";
import EmbeddedSystems from "@/components/EmbeddedSystems";
import Colophon from "@/components/Colophon";
import FooterFlag from "@/components/FooterFlag";

export default function Home() {
  return (
    <SiteMotion>
      <IntroCurtain />
      <RegisterStrip />
      <Hero />

      <hr className="rule rule--thick" />

      <Manifest />

      <hr className="rule rule--red" />

      <StatsBar />
      <Projects />
      <EmbeddedSystems />

      <hr className="rule rule--red" />

      <Colophon />
      <FooterFlag />
    </SiteMotion>
  );
}

