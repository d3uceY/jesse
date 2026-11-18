import SiteHeader from "./site/SiteHeader";
import Hero from "./site/Hero";
import About from "./site/About";
import Apps from "./site/Apps";
import Shelf from "./site/Shelf";
import Faq from "./site/Faq";
import Cta from "./site/Cta";
import SiteFooter from "./site/SiteFooter";
import IndexPanel from "./site/IndexPanel";
import PixelMorph from "./site/PixelMorph";
import MotionBoot from "./site/MotionBoot";

/**
 * The page shell is a server component on purpose. Every section below is
 * rendered to HTML on the server, so the content exists before a byte of
 * JavaScript runs — which is what makes it indexable no matter how much of the
 * site is animated on the client. MotionBoot is the only client island in the
 * shell; it starts the motion layer and changes nothing the document says.
 */
export default function PortfolioSite() {
  return (
    <>
      <div className="intro" data-intro aria-hidden="true">
        <div className="intro__inner">
          <PixelMorph />
          <span className="intro__bar">
            <span />
          </span>
        </div>
      </div>

      {/* Without JS the curtain never lifts, the disclosures never open and the
          toggles do nothing. This puts the page back into a readable state. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html:
            "<style>[data-intro]{display:none!important}.faq__panel,.shelf__rest{height:auto!important}[data-panel-toggle],[data-archive-toggle]{display:none!important}</style>",
        }}
      />

      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <canvas className="grain" data-grain aria-hidden="true" />

      <div className="site-frame" data-frame>
        <SiteHeader />

        <main id="main">
          <Hero />
          <About />
          <Apps />
          <Shelf />
          <Faq />
          <Cta />
        </main>

        <SiteFooter />
      </div>

      <IndexPanel />
      <MotionBoot />
    </>
  );
}
