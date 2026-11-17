/**
 * boot.js — application entry for the Next.js build.
 *
 * Scroll authority first, then the fixed shell, then sections in document
 * order, then a final refresh once fonts and images have settled the layout.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

import { createScroll } from "./core/scroll.js";
import { createReveal } from "./core/reveal.js";
import { initNoise } from "./modules/noise.js";
import { initHeader } from "./modules/header.js";
import { initPanel } from "./modules/panel.js";
import { initHero } from "./modules/hero.js";
import { initParallax } from "./modules/parallax.js";
import { initArchive } from "./modules/archive.js";
import { initFaq } from "./modules/faq.js";
import { initCta } from "./modules/cta.js";

gsap.registerPlugin(ScrollTrigger, SplitText);

export async function boot() {
  document.documentElement.classList.add("js-enabled");

  const scroll = createScroll({ gsap, ScrollTrigger, Lenis });
  const reveal = createReveal({ gsap, SplitText });

  const context = {
    gsap,
    ScrollTrigger,
    SplitText,
    Lenis,
    lenis: scroll.lenis,
    reveal,
    scrollTo: scroll.scrollTo,
  };

  const cleanups = [];

  cleanups.push(initNoise({ gsap }));
  cleanups.push(initHeader(context));
  cleanups.push(initPanel(context));
  cleanups.push(initHero(context));
  const splits = reveal.all();
  initParallax(context);
  cleanups.push(initArchive(context));
  initFaq(context);
  initCta(context);

  // Debug handle: lets tooling (and you, in the console) drive the same
  // Lenis instance the page uses instead of fighting it with window.scrollTo.
  window.__app = context;

  await document.fonts.ready;
  ScrollTrigger.refresh();

  const onLoad = () => ScrollTrigger.refresh();
  if (document.readyState === "complete") {
    ScrollTrigger.refresh();
  } else {
    window.addEventListener("load", onLoad, { once: true });
  }

  return () => {
    window.removeEventListener("load", onLoad);
    cleanups.forEach((cleanup) => {
      if (typeof cleanup === "function") cleanup();
    });
    splits.forEach((split) => {
      if (split && typeof split.revert === "function") split.revert();
    });
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    gsap.globalTimeline.clear();
    scroll.destroy();
    delete window.__app;
    document.body.classList.remove("panel-open");
    document.documentElement.classList.remove("js-enabled");
  };
}