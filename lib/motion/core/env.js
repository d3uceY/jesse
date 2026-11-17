/** Environment queries, read at call time so a resize/reset is honoured. */

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const MOBILE = "(max-width: 639px)";
export const DESKTOP = "(min-width: 640px)";

export const prefersReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;

export const isMobile = () => window.matchMedia(MOBILE).matches;
