"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { heroStats } from "@/lib/site-data";
import { INTRO_OPEN_AT } from "@/lib/timing";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ascii = "[ SOFTWARE ENGINEER · SYSTEMS · TOOLS ]";

/**
 * The hero "boot sequence": the ASCII label types in with a blinking cursor, a
 * red scanline sweeps the viewport, and the giant name slams up char-by-char
 * through masked lines. The name then parallaxes (decelerates) as you scroll away.
 */
function CharLine({ text }: { text: string }) {
  return (
    <span className="hero__name-line">
      {text.split("").map((c, i) => (
        <span className="hero__char" key={i}>
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      const hero = scope.current;
      const heroHeight = hero?.offsetHeight ?? window.innerHeight;

      const tl = gsap.timeline({ delay: INTRO_OPEN_AT, defaults: { ease: "expo.out" } });

      // ASCII label "types in".
      tl.from(".hero__ascii-char", {
        opacity: 0,
        y: 8,
        duration: 0.04,
        ease: "none",
        stagger: 0.02,
      })
        // Red scanline sweeps the full hero height.
        .fromTo(
          ".hero__scan",
          { y: -heroHeight, opacity: 1 },
          { y: heroHeight, opacity: 0, duration: 1.1, ease: "power2.inOut" },
          "-=0.25"
        )
        // Name chars slam up through the masks.
        .from(
          ".hero__char",
          {
            yPercent: 115,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.04,
          },
          "-=0.85"
        )
        // Meta cells cascade in behind the name.
        .from(
          ".hero__meta-cell",
          {
            y: 36,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
          },
          "-=0.6"
        );

      // Decorative parallax: the name lags as you scroll away from the hero.
      if (hero) {
        gsap.to(".hero__name", {
          yPercent: 24,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope }
  );

  return (
    <section className="hero" ref={scope}>
      <div className="hero__scan" aria-hidden="true" />

      <div className="hero__primary">
        <div className="hero__ascii" aria-label={ascii}>
          {ascii.split("").map((c, i) => (
            <span className="hero__ascii-char" key={i}>
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
          <span className="hero__ascii-cursor" aria-hidden="true">
            ▮
          </span>
        </div>
        <h1 className="hero__name">
          <CharLine text="JESSE" />
        </h1>
      </div>

      <div className="hero__meta-grid">
        {heroStats.map((item) => (
          <div className="hero__meta-cell" key={item.label}>
            <div className="hero__meta-label">{item.label}</div>
            <div
              className={`hero__meta-value${item.small ? " hero__meta-value--sm" : ""}${/^\d/.test(item.value) ? " count-up" : ""}`}
            >
              {item.value}
            </div>
            <div className="hero__meta-stat">{item.stat}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
