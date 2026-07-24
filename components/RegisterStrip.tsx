"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { registerStripItems } from "@/lib/site-data";

gsap.registerPlugin(useGSAP);

function StripSet() {
  return (
    <>
      <span className="register-strip__item">///</span>
      {registerStripItems.map((item, i) => {
        const isRed = typeof item === "object" && item.red;
        const text = typeof item === "object" ? item.text : item;
        return (
          <span key={i} style={{ display: "contents" }}>
            <span
              className={`register-strip__item${isRed ? " register-strip__item--red" : ""}`}
            >
              {text}
            </span>
            <span className="register-strip__item">///</span>
          </span>
        );
      })}
    </>
  );
}

export default function RegisterStrip() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion || !marqueeRef.current) return;

    // Duplicated content (two identical sets below) + xPercent -50 loop = seamless marquee.
    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, { scope: marqueeRef });

  return (
    <header className="register-strip">
      <div className="register-strip__marquee" ref={marqueeRef}>
        <StripSet />
        <StripSet />
      </div>
    </header>
  );
}
