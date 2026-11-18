"use client";

import { useEffect } from "react";
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

export default function PortfolioSite() {
  useEffect(() => {
    let disposed = false;
    let destroy: (() => void) | undefined;

    void (async () => {
      try {
        const { boot } = await import("@/lib/motion/boot");
        if (disposed) return;
        destroy = await boot();
      } catch (error) {
        // The page stays fully readable without JS; fail quietly.
        console.error("[d3ucey] motion failed to start:", error);
        document.querySelector("[data-intro]")?.remove();
      }
      if (disposed) destroy?.();
    })();

    return () => {
      disposed = true;
      destroy?.();
    };
  }, []);

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
      <noscript
        dangerouslySetInnerHTML={{
          __html: "<style>[data-intro]{display:none!important}</style>",
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
    </>
  );
}
