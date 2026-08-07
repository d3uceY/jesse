import gsap from "gsap";

/**
 * Animates a numeric count-up on an element whose text is a number with an
 * optional suffix (e.g. "2" or "1K+"). The numeric prefix counts from 0 to its
 * target and the suffix is preserved. Call on scroll-enter.
 */
export function countUpTo(el: HTMLElement, duration = 1.4) {
  const raw = el.textContent?.trim() ?? "";
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return;

  const target = parseInt(match[1], 10);
  const suffix = match[2];
  const state = { n: 0 };

  // Start at zero immediately so there is no "2 -> 0" flash.
  el.textContent = `0${suffix}`;

  gsap.to(state, {
    n: target,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      el.textContent = `${Math.round(state.n)}${suffix}`;
    },
  });
}
