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

  /**
   * The hero wordmark gets a per-character entrance rather than a line mask.
   * Each glyph fades up from just below its final position, from the centre
   * outwards. Deliberately no overflow mask: a 0.8 line-height box crops the
   * descender of the y and slices the round bottoms of 3/c/e while they travel,
   * which reads as broken type rather than motion.
   */
  function chars(el, { delay = 0, stagger = 0.05 } = {}) {
    if (!el || reduced) return null;

    return new SplitText(el, {
      type: "chars",
      autoSplit: true,
      aria: "none",
      onSplit(self) {
        const tween = gsap.from(self.chars, {
          yPercent: 12,
          opacity: 0,
          duration: 0.95,
          stagger: { each: stagger, from: "center" },
          delay,
          ease: "power3.out",
        });
        return tween;
      },
    });
  }

  /** Reveals every [data-reveal] on the page, once each, on scroll. */
  function all(selector = "[data-reveal]") {
    return Array.from(document.querySelectorAll(selector)).map((el) =>
      text(el, { scroll: true }),
    );
  }

  return { text, chars, all };
}