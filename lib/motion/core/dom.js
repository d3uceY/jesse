/** Tiny DOM helpers. No abstractions beyond what the modules actually use. */

export const qs = (selector, root = document) => root.querySelector(selector);

export const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

/** Adds a listener and returns its remover — modules return these from init(). */
export function on(target, type, handler, options) {
  target.addEventListener(type, handler, options);
  return () => target.removeEventListener(type, handler, options);
}

/** Function-based value: returns px-per-vw at the current viewport. */
export const vw = (value) => (window.innerWidth * value) / 100;

export const clamp = (min, max, value) => Math.min(max, Math.max(min, value));
