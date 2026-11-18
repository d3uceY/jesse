/**
 * header.js — the fixed header: intro animation, per-section colour, anchors.
 *
 * The colour change is measured once per frame against the section sitting
 * under the header line, so the logo, the links and the pills always agree
 * with the background behind them, including after a jump or a resize.
 */

import { qs, qsa, on } from "../core/dom.js";
import { prefersReducedMotion } from "../core/env.js";

// The header is transparent, so its colour must match the section actually
// behind it. A section that starts 80px down (an anchor jump) still has the
// previous section behind the header, so the switch belongs at 0, not at the
// header's own height.
const HEADER_LINE = 0;

export function initHeader({ gsap, scrollTo }) {
  const header = qs("[data-header]");
  const inner = header?.firstElementChild;
  if (!header || !inner) return;

  // 1. intro ------------------------------------------------------------
  // fromTo, not from(): the end state must be explicit, and reduced-motion
  // users get no entrance at all rather than a delayed one.
  const reduced = prefersReducedMotion();
  let intro = null;

  if (!reduced) {
    const brand = qs(".site-header__brand", header);
    const links = qsa(".nav-link", header);
    const tail = qsa(".site-header__cta > *", header);

    intro = gsap.timeline({ delay: 0.55 });
    intro
      .fromTo(
        inner,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      )
      .fromTo(
        brand,
        { yPercent: -120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.35",
      )
      .fromTo(
        links,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.06,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .fromTo(
        tail,
        { y: 8, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.35",
      );
  }

  // 2. per-section colour ----------------------------------------------
  const sections = qsa("[data-section]");
  let scheme = "";
  let frame = 0;

  function measure() {
    frame = 0;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= HEADER_LINE) current = section;
    }
    const next = current?.dataset.nav;
    if (next && next !== scheme) {
      scheme = next;
      document.body.dataset.nav = next;
    }
  }

  function schedule() {
    if (frame) return;
    frame = requestAnimationFrame(measure);
  }

  measure();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);

  // 3. in-page anchors --------------------------------------------------
  const cleanups = qsa('a[href^="#"]').map((link) =>
    on(link, "click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = qs(id);
      if (!target) return;
      event.preventDefault();
      scrollTo(target, { offset: -HEADER_LINE });
      history.replaceState(null, "", id);
    }),
  );

  return () => {
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    intro?.kill();
    cleanups.forEach((off) => off());
  };
}
