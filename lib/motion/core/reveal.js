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
   * The hero wordmark gets a per-character entrance rather than a line mask:
   * each glyph stands up out of the baseline with a little 3D rotation, from
   * the centre outwards. It is the one place a more theatrical reveal is worth
   * the extra DOM.
   */
  function chars(el, { delay = 0, stagger = 0.045 } = {}) {
    if (!el || reduced) return null;

    return new SplitText(el, {
      type: "chars",
      mask: "chars",
      autoSplit: true,
      aria: "none",
      onSplit(self) {
        // A straight lift, not a 3D flip: perspective scales a glyph while it
        // turns, and a wordmark that stretches mid-entrance reads as a mistake.
        const tween = gsap.from(self.chars, {
          yPercent: 115,
          opacity: 0,
          duration: 1.05,
          stagger: { each: stagger, from: "center" },
          delay,
          ease: "power4.out",
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