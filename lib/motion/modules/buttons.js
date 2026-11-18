/**
 * buttons.js — the pixel tile in every pill becomes a different mark while the
 * button is hovered or focused, and keeps cycling until the pointer leaves.
 * The artwork is deliberately small and monochrome so it sits inside the
 * button's yellow face without competing with the label.
 */

import { on, qsa } from "../core/dom.js";
import { prefersReducedMotion } from "../core/env.js";

const MARKS = [
  "/assets/pixel/mark-star.png",
  "/assets/pixel/mark-heart.png",
  "/assets/pixel/mark-bolt.png",
  "/assets/pixel/mark-diamond.png",
];

export function initButtons({ gsap }) {
  if (typeof window === "undefined") return;
  MARKS.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  const reduced = prefersReducedMotion();
  const cleanups = [];

  qsa(".btn").forEach((btn) => {
    const mark = btn.querySelector(".btn__mark");
    if (!mark) return;

    let timer = 0;
    let last = "";

    const swap = () => {
      let next = MARKS[Math.floor(Math.random() * MARKS.length)];
      for (let tries = 0; next === last && tries < 8; tries += 1) {
        next = MARKS[Math.floor(Math.random() * MARKS.length)];
      }
      last = next;
      mark.style.backgroundImage = 'url("' + next + '")';
      if (!reduced) {
        gsap.fromTo(
          mark,
          { scale: 0.55, rotate: -18 },
          {
            scale: 1,
            rotate: 0,
            duration: 0.38,
            ease: "back.out(2.6)",
            overwrite: true,
          },
        );
      }
    };

    const enter = () => {
      if (timer) return;
      swap();
      timer = window.setInterval(swap, 850);
    };

    const leave = () => {
      if (timer) {
        clearInterval(timer);
        timer = 0;
      }
      mark.style.backgroundImage = "";
      if (!reduced) {
        gsap.to(mark, { scale: 1, rotate: 0, duration: 0.2, overwrite: true });
      }
    };

    cleanups.push(
      on(btn, "pointerenter", enter),
      on(btn, "pointerleave", leave),
      on(btn, "focusin", enter),
      on(btn, "focusout", leave),
      () => {
        if (timer) clearInterval(timer);
      },
    );
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}
