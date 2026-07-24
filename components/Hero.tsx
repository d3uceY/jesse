"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroStats } from "@/lib/site-data";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      const tl = gsap.timeline({ delay: 0.15 });

      tl.from(".hero__ascii", {
        yPercent: 120,
        opacity: 0,
        duration: 0.6,
        ease: "expo.out",
      })
        .from(
          ".hero__name-line span",
          {
            yPercent: 110,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.12,
          },
          "-=0.35"
        )
        .from(
          ".hero__meta-cell",
          {
            y: 32,
            opacity: 0,
            duration: 0.7,
            ease: "expo.out",
            stagger: 0.1,
          },
          "-=0.45"
        );
    },
    { scope }
  );

  return (
    <section className="hero" ref={scope}>
      <div className="hero__primary">
        <div className="hero__ascii">[ SOFTWARE ENGINEER · SYSTEMS · TOOLS ]</div>
        <h1 className="hero__name">
          <span className="hero__name-line">
            <span>ONYEKWELU</span>
          </span>
          <span className="hero__name-line hero__name-line--outline">
            <span>JESSE</span>
          </span>
        </h1>
      </div>
      <div className="hero__meta-grid">
        {heroStats.map((item) => (
          <div className="hero__meta-cell" key={item.label}>
            <div className="hero__meta-label">{item.label}</div>
            <div
              className={`hero__meta-value${item.small ? " hero__meta-value--sm" : ""}`}
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
