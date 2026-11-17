/**
 * parallax.js — declarative image drift.
 * Markup: <figure data-parallax="18"> where 18 = total travel in vh.
 */

import { qs, qsa } from "../core/dom.js";
import { isMobile, prefersReducedMotion } from "../core/env.js";

/**
 * Whole sections lag behind the scroll instead of scrolling at page speed: the
 * hero and the studio panel each travel 30svh down across their own exit, so
 * the next section appears to slide up over them. Taken from the original's
 * LandingHero / LandingAbout tweens.
 */
const DRIFT = [{ selector: ".hero", start: "top top", end: "bottom top" }];

export function initParallax({ gsap }) {
  if (prefersReducedMotion()) return;
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