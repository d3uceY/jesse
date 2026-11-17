/**
 * faq.js — an accordion that animates measured height, never max-height.
 * One row open at a time; closing is faster than opening (0.45s vs 0.7s).
 */

import { qsa } from "../core/dom.js";
import { prefersReducedMotion } from "../core/env.js";

const OPEN = { duration: 0.7, ease: "power3.out" };
const CLOSE = { duration: 0.45, ease: "power3.out" };

export function initFaq({ gsap, ScrollTrigger }) {
  const items = qsa("[data-faq] .faq__item");
  if (items.length === 0) return;

  const reduced = prefersReducedMotion();
  let active = -1;

  const rows = items.map((item) => {
    const trigger = item.querySelector("[data-faq-trigger]");
    const panel = item.querySelector(".faq__panel");
    const answer = panel?.firstElementChild;

    gsap.set(panel, { height: 0 });
    gsap.set(answer, { y: "1.1em", opacity: 0.55 });

    return { item, trigger, panel, answer };
  });

  function close(index) {
    const { trigger, panel, answer } = rows[index];
    if (!trigger || !panel) return;

    trigger.setAttribute("aria-expanded", "false");
    gsap.killTweensOf([panel, answer]);
    gsap.to(panel, {
      height: 0,
      duration: reduced ? 0 : CLOSE.duration,
      ease: CLOSE.ease,
      overwrite: true,
      onComplete: () => ScrollTrigger.refresh(),
    });
    gsap.to(answer, {
      y: "1.1em",
      opacity: 0.55,
      duration: reduced ? 0 : CLOSE.duration,
      ease: CLOSE.ease,
      overwrite: true,
    });
  }

  function open(index) {
    const { trigger, panel, answer } = rows[index];
    if (!trigger || !panel) return;

    trigger.setAttribute("aria-expanded", "true");
    gsap.killTweensOf([panel, answer]);
    gsap.to(panel, {
      height: () => answer.offsetHeight,
      duration: reduced ? 0 : OPEN.duration,
      ease: OPEN.ease,
      overwrite: true,
      onComplete: () => {
        gsap.set(panel, { height: "auto" });
        ScrollTrigger.refresh();
      },
    });
    gsap.to(answer, {
      y: 0,
      opacity: 1,
      duration: reduced ? 0 : OPEN.duration,
      ease: OPEN.ease,
      overwrite: true,
    });
  }

  rows.forEach(({ trigger }, index) => {
    trigger?.addEventListener("click", () => {
      if (active === index) {
        close(index);
        active = -1;
        return;
      }
      if (active >= 0) close(active);
      open(index);
      active = index;
    });
  });
}
