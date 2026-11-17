/**
 * reveal.js — the one text animation the entire site reuses.
 *
 * Every headline is split into lines, each line masked, and the inner line
 * travels up from 110%. Values are fixed by design, not configurable per
 * call site, so the page keeps one rhythm.
 */

import { prefersReducedMotion } from "./env.js";

const REVEAL = {
  duration: 0.85,
  stagger: 0.055,
  distance: 110,
  ease: "power3.out",
  scrollStart: "top 85%",
};

export function createReveal({ gsap, SplitText }) {
  const reduced = prefersReducedMotion();

  /**
   * @param {HTMLElement} el       element whose lines should reveal
   * @param {object}      options  { delay, scroll, start }
   * @returns {SplitText | null}
   */
  function text(el, { delay = 0, scroll = false, start = REVEAL.scrollStart } = {}) {
    if (!el || reduced) return null;

    return new SplitText(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      aria: "none",
      onSplit(self) {
        const tween = gsap.from(self.lines, {
          yPercent: REVEAL.distance,
          duration: REVEAL.duration,
          stagger: REVEAL.stagger,
          delay: scroll ? 0 : delay,
          ease: REVEAL.ease,
          scrollTrigger: scroll
            ? { trigger: el, start, once: true }
            : undefined,
        });
        return tween; // returning it lets SplitText rewind on re-split
      },
    });
  }

  /** Reveals every [data-reveal] on the page, once each, on scroll. */
  function all(selector = "[data-reveal]") {
    return Array.from(document.querySelectorAll(selector)).map((el) =>
      text(el, { scroll: true }),
    );
  }

  return { text, all };
}
