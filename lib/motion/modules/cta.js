/**
 * cta.js — the photo "docks" into a rounded card over the last 100px of scroll.
 * Width and radius are the only animated properties; the image itself is static.
 */

import { qs } from "../core/dom.js";
import { prefersReducedMotion } from "../core/env.js";

export function initCta({ gsap }) {
  const frame = qs("[data-cta-frame]");
  if (!frame || prefersReducedMotion()) return;

  gsap.to(frame, {
    width: "95%",
    borderRadius: "0.85vw",
    ease: "none",
    scrollTrigger: {
      trigger: frame,
      start: "bottom bottom",
      end: "+=100",
      scrub: true,
    },
  });
}