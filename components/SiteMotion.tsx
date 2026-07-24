"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Wraps the page and drives scroll-triggered reveal choreography for every
 * `.reveal` element rendered inside it, replacing the old IntersectionObserver.
 */
export default function SiteMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          noPreference: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions as { reduceMotion: boolean };

          if (reduceMotion) {
            gsap.set(".reveal", { opacity: 1 });
            return;
          }

          gsap.set(".reveal", { y: 40 });

          ScrollTrigger.batch(".reveal", {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "expo.out",
                stagger: 0.08,
                overwrite: true,
              }),
          });
        }
      );

      return () => mm.revert();
    },
    { scope }
  );

  return <div ref={scope}>{children}</div>;
}
