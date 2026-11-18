/**
 * archive.js — the shelf's "show the rest" disclosure.
 * Animated on measured height, same habit as the FAQ accordion: never
 * max-height, and a ScrollTrigger refresh once the layout settles.
 */

import { qs } from "../core/dom.js";
import { prefersReducedMotion } from "../core/env.js";

export function initArchive({ gsap, ScrollTrigger }) {
  const panel = qs("[data-archive-panel]");
  const toggle = qs("[data-archive-toggle]");
  const label = qs("[data-archive-toggle-label]");
  if (!panel || !toggle) return;

  const reduced = prefersReducedMotion();
  const openLabel = label ? label.textContent : "";
  let open = false;

  gsap.set(panel, { height: 0 });
  // A 0px, overflow-hidden box still holds focusable links. inert closes that
  // hole without removing the markup a crawler needs.
  panel.setAttribute("inert", "");
  panel.setAttribute("aria-hidden", "true");

  function set(next) {
    open = next;
    toggle.setAttribute("aria-expanded", String(open));

    if (open) {
      panel.removeAttribute("inert");
      panel.removeAttribute("aria-hidden");
    } else {
      panel.setAttribute("inert", "");
      panel.setAttribute("aria-hidden", "true");
    }

    const inner = panel.firstElementChild;
    gsap.to(panel, {
      height: open && inner ? inner.offsetHeight : 0,
      duration: reduced ? 0 : open ? 0.65 : 0.4,
      ease: open ? "power3.out" : "power2.inOut",
      overwrite: true,
      onComplete: () => {
        if (open) gsap.set(panel, { height: "auto" });
        ScrollTrigger.refresh();
      },
    });

    if (label) {
      label.textContent = open ? "show less" : openLabel;
    }
  }

  const onClick = () => set(!open);
  toggle.addEventListener("click", onClick);

  return () => toggle.removeEventListener("click", onClick);
}
