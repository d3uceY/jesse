"use client";

import { useEffect } from "react";

/**
 * MotionBoot — the only client boundary the page needs.
 *
 * Every section stays a server component: its markup is in the HTML before
 * React runs, so a crawler, a reader with JS off, or an answer engine gets the
 * full page. This component imports the imperative motion layer after paint
 * and tears it down again; nothing it does changes what the document says.
 */
export default function MotionBoot() {
  useEffect(() => {
    let disposed = false;
    let destroy: (() => void) | undefined;

    void (async () => {
      try {
        const { boot } = await import("@/lib/motion/boot");
        if (disposed) return;
        destroy = await boot();
      } catch (error) {
        // The page stays fully readable without JS; fail quietly.
        console.error("[d3ucey] motion failed to start:", error);
        document.querySelector("[data-intro]")?.remove();
      }
      if (disposed) destroy?.();
    })();

    return () => {
      disposed = true;
      destroy?.();
    };
  }, []);

  return null;
}
