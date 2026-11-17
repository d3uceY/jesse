/**
 * scroll.js — one smooth-scroll authority for the whole page.
 *
 * Lenis drives the document; GSAP's ticker drives Lenis, so there is a single
 * requestAnimationFrame loop and ScrollTrigger never lags behind the scroll.
 * Reduced-motion users get native scrolling and no rAF loop at all.
 */

import { prefersReducedMotion } from "./env.js";

export function createScroll({ gsap, ScrollTrigger, Lenis }) {
  if (prefersReducedMotion()) {
    return {
      lenis: null,
      scrollTo(target, { offset = 0 } = {}) {
        const el = typeof target === "string" ? document.querySelector(target) : target;
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: "auto" });
      },
      destroy() {},
    };
  }

  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  const scrollTo = (target, { offset = 0 } = {}) =>
    lenis.scrollTo(target, {
      offset,
      duration: 1.4,
      // easeOutExpo — the same curve the reference site uses for nav jumps
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

  return {
    lenis,
    scrollTo,
    destroy() {
      gsap.ticker.remove(tick);
      lenis.destroy();
    },
  };
}
