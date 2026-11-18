/**
 * cta.js — the closing card and its two pixel props.
 *
 * The frame docks to a rounded card over the last 100px of scroll. The camera
 * and pager arrive from below with a spring, drift with the pointer, and lean
 * towards the button when it is hovered. Their idle bob lives in CSS so the
 * GSAP transforms on the inner layer never fight the scroll timeline.
 */

import { on, qs, qsa } from "../core/dom.js";
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

  const inners = qsa("[data-cta-sprite-inner]");
  const cleanups = [];

  if (inners.length) {
    gsap.set(inners, {
      opacity: 0,
      scale: 0.55,
      y: 42,
      rotate: (i) => (i === 0 ? 9 : -11),
    });

    const intro = gsap.to(inners, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: 0,
      duration: 1.2,
      stagger: 0.16,
      ease: "back.out(1.55)",
      scrollTrigger: {
        trigger: frame,
        start: "top 72%",
        once: true,
      },
    });
    cleanups.push(() => intro.kill());

    const section = qs(".cta");
    if (section) {
      const setX = inners.map((el) => gsap.quickTo(el, "x", { duration: 1.1, ease: "power3.out" }));
      const setY = inners.map((el) => gsap.quickTo(el, "y", { duration: 1.1, ease: "power3.out" }));

      const move = (event) => {
        const rect = section.getBoundingClientRect();
        const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        setX.forEach((set, index) => set(nx * (index === 0 ? 16 : -12)));
        setY.forEach((set, index) => set(ny * (index === 0 ? 12 : -9)));
      };

      const rest = () => {
        setX.forEach((set) => set(0));
        setY.forEach((set) => set(0));
      };

      cleanups.push(
        on(section, "pointermove", move),
        on(section, "pointerleave", rest),
      );
    }

    const button = qs(".cta .btn");
    if (button) {
      const lean = () =>
        gsap.to(inners, {
          scale: 1.07,
          rotate: (i) => (i === 0 ? -4 : 5),
          duration: 0.65,
          ease: "power3.out",
          overwrite: true,
        });
      const settle = () =>
        gsap.to(inners, {
          scale: 1,
          rotate: 0,
          duration: 0.8,
          ease: "power3.out",
          overwrite: true,
        });

      cleanups.push(
        on(button, "pointerenter", lean),
        on(button, "pointerleave", settle),
        on(button, "focusin", lean),
        on(button, "focusout", settle),
      );
    }
  }

  return () => cleanups.forEach((cleanup) => cleanup());
}
