/**
 * panel.js — the right-hand index panel.
 *
 * Same mechanic as the reference site's player: the site frame slides left by
 * the panel width and the panel is revealed behind it. Esc closes, "m" toggles,
 * focus is moved in and returned, and the page stops scrolling while it is open.
 */

import { qs, qsa, on } from "../core/dom.js";

const TYPING_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

function isTypingTarget(target) {
  return TYPING_TAGS.has(target?.tagName) || target?.isContentEditable === true;
}

export function initPanel({ lenis, scrollTo }) {
  const panel = qs("[data-panel]");
  const frame = qs("[data-frame]");
  const toggles = qsa("[data-panel-toggle]");
  const closeButton = qs("[data-panel-close]");
  const links = qsa("[data-panel-link]");
  if (!panel) return;

  const offs = [];
  let open = false;
  let lastFocused = null;

  function focusables() {
    return qsa('a[href], button:not([disabled])', panel).filter(
      (el) => el.offsetParent !== null,
    );
  }

  function setOpen(next) {
    if (next === open) return;
    open = next;

    document.body.classList.toggle("panel-open", open);
    panel.toggleAttribute("inert", !open);
    panel.setAttribute("aria-hidden", String(!open));
    toggles.forEach((toggle) => toggle.setAttribute("aria-expanded", String(open)));

    if (open) {
      lastFocused = document.activeElement;
      lenis?.stop();
      // focus the panel itself, not the close button: a ring on "esc" reads
      // like a form control. Tab still reaches the close button first.
      panel.focus({ preventScroll: true });
    } else {
      lenis?.start();
      if (lastFocused instanceof HTMLElement) lastFocused.focus({ preventScroll: true });
    }
  }

  toggles.forEach((toggle) => offs.push(on(toggle, "click", () => setOpen(!open))));
  if (closeButton) offs.push(on(closeButton, "click", () => setOpen(false)));
  links.forEach((link) =>
    offs.push(
      on(link, "click", (event) => {
        const href = link.getAttribute("href");
        const target = href?.startsWith("#") ? qs(href) : null;
        setOpen(false);

        if (!target) return;
        event.preventDefault();
        // The body is scroll-locked while the panel is open, so the browser's
        // own hash jump lands at 0. Close first, then scroll on the next frame.
        requestAnimationFrame(() => {
          scrollTo(target, { offset: 0 });
          history.replaceState(null, "", href);
        });
      }),
    ),
  );

  // clicking the exposed page while the panel is open closes it
  if (frame) {
    offs.push(
      on(frame, "pointerdown", () => {
        if (open) setOpen(false);
      }),
    );
  }

  offs.push(
    on(document, "keydown", (event) => {
      if (event.key === "Escape" && open) {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key.toLowerCase() === "m" && !isTypingTarget(event.target)) {
        event.preventDefault();
        setOpen(!open);
        return;
      }

      if (event.key === "Tab" && open) {
        const items = focusables();
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }),
  );

  return () => {
    offs.forEach((off) => off());
    setOpen(false);
  };
}
