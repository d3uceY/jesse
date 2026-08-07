"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { countUpTo } from "@/lib/count-up";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Site-wide motion orchestrator.
 *
 *  - `lenis`             weighted smooth scroll, wired into ScrollTrigger
 *  - `.reveal`           whole-block scroll reveals (fade + rise)
 *  - `.reveal-mask`      masked line reveals for headlines (SplitText)
 *  - `.reveal-chars`     masked char reveals for short display words
 *  - `.count-up`         numeric count-up on scroll-enter
 *
 * Everything respects prefers-reduced-motion via gsap.matchMedia.
 */
export default function SiteMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Weighted smooth scroll — only when motion is allowed.
      let lenis: Lenis | null = null;
      let raf: ((time: number) => void) | null = null;
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, touchMultiplier: 1.2 });
        lenis.on("scroll", ScrollTrigger.update);
        raf = (time) => lenis!.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
      }

      // SplitText reveals are created asynchronously (after custom fonts load so
      // line breaks are correct) — they live in their own context so they can be
      // reverted with everything else on unmount.
      let splitCtx: gsap.Context | null = null;
      let disposed = false;

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          noPreference: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions as { reduceMotion: boolean };

          if (reduceMotion) {
            gsap.set(".reveal", { opacity: 1, y: 0 });
            return;
          }

          // 1) Whole-block reveals. "top bottom" fires as an element enters the
          //    viewport so even the last element on the page always reveals.
          gsap.set(".reveal", { y: 48 });
          ScrollTrigger.batch(".reveal", {
            start: "top bottom",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power4.out",
                stagger: 0.08,
                overwrite: true,
              }),
          });

          // 2) Numeric count-ups (hero stat + stats bar).
          gsap.utils.toArray<HTMLElement>(".count-up").forEach((el) => {
            ScrollTrigger.create({
              trigger: el,
              start: "top 92%",
              once: true,
              onEnter: () => countUpTo(el),
            });
          });

          // 3) SplitText masked reveals — split once fonts are ready.
          document.fonts.ready.then(() => {
            if (disposed || !scope.current) return;

            splitCtx = gsap.context(() => {
              gsap.utils.toArray<HTMLElement>(".reveal-mask").forEach((el) => {
                const split = SplitText.create(el, { type: "lines", mask: "lines" });
                gsap.set(split.lines, { yPercent: 110 });
                ScrollTrigger.create({
                  trigger: el,
                  start: "top 86%",
                  once: true,
                  onEnter: () =>
                    gsap.to(split.lines, {
                      yPercent: 0,
                      duration: 0.9,
                      ease: "power4.out",
                      stagger: 0.08,
                    }),
                });
              });

              gsap.utils.toArray<HTMLElement>(".reveal-chars").forEach((el) => {
                const split = SplitText.create(el, { type: "chars", mask: "chars" });
                gsap.set(split.chars, { yPercent: 115 });
                ScrollTrigger.create({
                  trigger: el,
                  start: "top bottom",
                  once: true,
                  onEnter: () =>
                    gsap.to(split.chars, {
                      yPercent: 0,
                      duration: 0.7,
                      ease: "power4.out",
                      stagger: 0.045,
                    }),
                });
              });
            }, scope.current);

            ScrollTrigger.refresh();
          });
        }
      );

      return () => {
        disposed = true;
        splitCtx?.revert();
        mm.revert();
        if (raf) gsap.ticker.remove(raf);
        lenis?.destroy();
      };
    },
    { scope }
  );

  return <div ref={scope}>{children}</div>;
}
