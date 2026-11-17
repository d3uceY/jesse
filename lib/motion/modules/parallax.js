/**
 * parallax.js — declarative drift.
 *
 * Markup:
 *   <section> with a DRIFT entry  → the whole section lags the scroll
 *   <figure data-parallax="18">   → image travel in vh
 *   <img data-pixel="26">         → pixel artifact travel, in tenths of a vh
 */

import { qs, qsa } from "../core/dom.js";
import { isMobile, prefersReducedMotion } from "../core/env.js";

/**
 * Whole sections lag behind the scroll instead of scrolling at page speed: the
 * hero travels 30svh down across its own exit, so the next section appears to
 * slide up over it. Taken from the original's LandingHero tween.
 */
const DRIFT = [{ selector: ".hero", start: "top top", end: "bottom top" }];

export function initParallax({ gsap }) {
  if (prefersReducedMotion()) return;

  // The pixel artifacts are decoration in the CTA's empty space: they drift
  // gently on every screen size, and fade in as the section arrives.
  qsa("[data-pixel]").forEach((el) => {
    const travel = (Number(el.dataset.pixel) || 20) * 0.18;
    const px = () => (window.innerHeight * travel) / 100;
    const rest = Number(getComputedStyle(el).opacity) || 1;

    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: rest,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      },
    );

    gsap.fromTo(
      el,
      { y: () => -px() },
      {
        y: () => px(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
  });

  // On a phone every framed image stacks full width under its own copy, so a
  // vertical drift would slide the picture over the paragraph above it.
  if (isMobile()) return;

  DRIFT.forEach(({ selector, start, end }) => {
    const section = qs(selector);
    if (!section) return;

    gsap.to(section, {
      y: "30svh",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start,
        end,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  });

  qsa("[data-parallax]").forEach((el) => {
    const travel = (Number(el.dataset.parallax) || 20) / 2;
    const px = () => (window.innerHeight * travel) / 100;

    gsap.fromTo(
      el,
      { y: () => -px() },
      {
        y: () => px(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
  });
}
