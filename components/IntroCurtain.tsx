"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { INTRO_OPEN_AT } from "@/lib/timing";

gsap.registerPlugin(useGSAP);

const bootLine = ">>> INITIALIZING INTERFACE";

/**
 * Full-screen intro curtain. Two ink panels cover the page at first; a boot
 * label types in and the brand name slams up through a mask, then the panels
 * part (top up / bottom down) to reveal the page underneath — the classic
 * GSAP award-site load pattern. Pure decoration; screen readers get the real
 * content from the page itself.
 */
export default function IntroCurtain() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(scope.current, { display: "none" });
        return;
      }

      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(".intro-curtain__boot-char", {
        opacity: 0,
        y: 6,
        duration: 0.04,
        ease: "none",
        stagger: 0.022,
      })
        .from(
          ".intro-curtain__char",
          {
            yPercent: 115,
            duration: 0.75,
            ease: "power4.out",
            stagger: 0.05,
          },
          "-=0.3"
        )
        .addLabel("open", INTRO_OPEN_AT)
        .to(
          ".intro-curtain__brand",
          {
            yPercent: -24,
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.in",
          },
          "open"
        )
        .to(
          ".intro-curtain__panel--top",
          {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
          },
          "open+=0.05"
        )
        .to(
          ".intro-curtain__panel--bottom",
          {
            yPercent: 100,
            duration: 1,
            ease: "power4.inOut",
          },
          "<"
        )
        .set(scope.current, { display: "none" });
    },
    { scope }
  );

  return (
    <div className="intro-curtain" ref={scope} aria-hidden="true">
      <div className="intro-curtain__panel intro-curtain__panel--top" />
      <div className="intro-curtain__panel intro-curtain__panel--bottom" />
      <div className="intro-curtain__brand">
        <div className="intro-curtain__boot">
          {bootLine.split("").map((c, i) => (
            <span className="intro-curtain__boot-char" key={i}>
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
          <span className="intro-curtain__cursor" aria-hidden="true">
            ▮
          </span>
        </div>
        <div className="intro-curtain__name">
          {"JESSE".split("").map((c, i) => (
            <span className="intro-curtain__char" key={i}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
