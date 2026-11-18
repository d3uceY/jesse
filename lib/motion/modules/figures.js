/**
 * figures.js — scroll-tracked artwork.
 *
 * The portrait and the FAQ desk do not simply scroll with their section: they
 * travel downwards through it, then stop when their bottom reaches the
 * section's bottom edge. The travel is measured on refresh from the untransformed
 * layout box, so the image can never slide past the section it belongs to.
 */

import { qsa } from "../core/dom.js";
import { isMobile, prefersReducedMotion } from "../core/env.js";

const GUTTER = 32; // px of breathing room above the section's bottom edge

export function initFigures({ gsap }) {
  if (prefersReducedMotion() || isMobile()) return;

  const cleanups = [];

  qsa("[data-figure-scroll]").forEach((figure) => {
    const section = figure.closest("[data-section]");
    if (!section) return;

    const depth = figure.dataset.figureScroll === "faq" ? 0.1 : 0.06;
    const startY = () => -Math.min(window.innerHeight * depth, depth === 0.1 ? 100 : 64);

    const maxY = () => {
      const currentY = Number(gsap.getProperty(figure, "y")) || 0;
      const figureBottom =
        figure.getBoundingClientRect().bottom + window.scrollY - currentY;
      const sectionBottom = section.getBoundingClientRect().bottom + window.scrollY;
      return Math.max(0, Math.round(sectionBottom - figureBottom - GUTTER));
    };

    const tween = gsap.fromTo(
      figure,
      { y: startY },
      {
        y: maxY,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          // A tall section has enough room for the image to travel from the
          // moment it reaches the top; a short one would invert the range, so
          // it starts as the section enters instead.
          start: () =>
            section.offsetHeight > window.innerHeight + 24
              ? "top top"
              : "top 80%",
          end: "bottom bottom",
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      },
    );

    cleanups.push(() => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}
