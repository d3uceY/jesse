"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { registerStripItems } from "@/lib/site-data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!marqueeRef.current || !progressRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Thin red rule tracking page progress (functional for all users).
    gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: 0,
          end: "max",
          scrub: true,
        },
      }
    );

    if (reduceMotion) return;

    // Duplicated content (two identical sets below) + xPercent -50 loop = seamless marquee.
    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    // The strip hurries with scroll velocity, then settles. Hovering slows it.
    const speed = { current: 1, target: 1 };
    let hovering = false;
    const velocityTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (!hovering) {
          speed.target = 1 + Math.min(1.2, Math.abs(self.getVelocity()) / 1500);
        }
      },
    });
    const tick = () => {
      speed.current = gsap.utils.interpolate(speed.current, speed.target, 0.06);
      tween.timeScale(speed.current);
    };
    gsap.ticker.add(tick);

    const strip = marqueeRef.current.closest(".register-strip");
    const onEnter = () => {
      hovering = true;
      speed.target = 0.2;
    };
    const onLeave = () => {
      hovering = false;
      speed.target = 1;
    };
    strip?.addEventListener("mouseenter", onEnter);
    strip?.addEventListener("mouseleave", onLeave);

    return () => {
      strip?.removeEventListener("mouseenter", onEnter);
      strip?.removeEventListener("mouseleave", onLeave);
      velocityTrigger.kill();
      gsap.ticker.remove(tick);
      tween.kill();
    };
  }, { scope: marqueeRef });

  return (
    <header className="register-strip">
      <div className="register-strip__marquee" ref={marqueeRef}>
        <StripSet />
        <StripSet />
      </div>
      <div className="register-strip__progress" ref={progressRef} aria-hidden="true" />
    </header>
  );
}
