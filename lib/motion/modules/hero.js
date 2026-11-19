/**
 * hero.js — the signature moment: three app windows land, settle and scatter.
 *
 * Each window is a stack of independent transform layers:
 *   figure (scroll scrub) > tilt (css) > fly-in > velocity > float > bob > img
 *
 * Keeping them separate means the scroll tween never fights the idle float and
 * the pointer velocity never resets the intro.
 */

import { qs, qsa } from "../core/dom.js";
import { prefersReducedMotion } from "../core/env.js";

const VELOCITY_LIMIT = 120;
const SETTLE = "power3.out";

const WINDOWS = [
  {
    fly: {
      delay: 0.65,
      fromY: "74vh",
      fromZ: 150,
      fromRotateX: 62,
      fromRotateZ: 3,
      fromRotateY: -10,
      fromScale: 0.9,
    },
    float: { y: 12, rotate: 1.1, duration: 2.4, delay: 0 },
    bob: { y: 5, rotate: -0.4, duration: 3.6, delay: 0.2 },
    velocity: { y: 0.6, rotateX: 0.5, rotateZ: 0 },
    scroll: { y: "-14vw", rotate: 1.2, rotateX: 40, scale: 1.03 },
  },
  {
    fly: {
      delay: 0.75,
      fromY: "80vh",
      fromZ: 180,
      fromRotateX: 62,
      fromRotateZ: -14,
      fromRotateY: 14,
      fromScale: 0.86,
    },
    float: { y: 20, rotate: -1.2, duration: 3.1, delay: 0.4 },
    bob: { y: 7, rotate: 0.5, duration: 4.1, delay: 0.35 },
    velocity: { y: 1.1, rotateX: 1.1, rotateZ: 0.9 },
    scroll: { y: "-24vw", x: "-9vw", rotate: -13, rotateX: 45, rotateY: 90, scale: 0.92 },
  },
  {
    fly: {
      delay: 0.82,
      fromY: "76vh",
      fromZ: 170,
      fromRotateX: 62,
      fromRotateZ: 15,
      fromRotateY: -14,
      fromScale: 0.88,
    },
    float: { y: 16, rotate: 1.1, duration: 2.6, delay: 0.9 },
    bob: { y: 6, rotate: -0.6, duration: 3.7, delay: 0.5 },
    velocity: { y: 0.95, rotateX: 0.9, rotateZ: -0.9 },
    scroll: { y: "-18vw", x: "10vw", rotate: 12, rotateX: 35, rotateY: -60, scale: 0.94 },
  },
];

const PERSPECTIVE = 1400;

export function initHero({ gsap, lenis, reveal }) {
  const hero = qs(".hero");
  const title = qs("[data-hero-title]");
  const tagline = qs(".hero__tagline");
  const meta = qs(".hero__meta");
  const stage = qs(".hero__stage") || hero;
  const windows = qsa("[data-hero-photo]");
  if (!hero) return;

  const reduced = prefersReducedMotion();
  const copy = [title, tagline, meta].filter(Boolean);

  // Hold the copy under the curtain, then reveal it as the curtain lifts. The
  // loader mark gets its full morph cycle instead of playing to an empty room.
  let revealed = false;
  const revealCopy = () => {
    if (revealed) return;
    revealed = true;
    gsap.set(copy, { opacity: 1 });
    reveal.chars(title, { delay: 0.1 });
    reveal.text(tagline, { delay: 0.75 });
    reveal.text(meta, { delay: 0.85 });
  };

  let fallback = 0;
  if (!reduced) {
    gsap.set(copy, { opacity: 0 });
    window.addEventListener("d3uceY:reveal", revealCopy, { once: true });
    fallback = window.setTimeout(revealCopy, 6000);
  }

  if (reduced || windows.length === 0) {
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("d3uceY:reveal", revealCopy);
    };
  }

  const intro = gsap.timeline({ paused: true });
  const floats = [];
  const starters = [];

  windows.forEach((figure) => {
    const config = WINDOWS[Number(figure.dataset.heroPhoto)];
    if (!config) return;

    const fly = figure.querySelector("[data-hero-fly]");
    const velocity = figure.querySelector("[data-hero-velocity]");
    const floatLayer = figure.querySelector("[data-hero-float]");
    const bobLayer = figure.querySelector("[data-hero-bob]");

    gsap.set(figure, {
      transformPerspective: PERSPECTIVE,
      transformOrigin: "50% 50%",
      force3D: true,
      opacity: 0,
    });

    gsap.set(fly, {
      y: config.fly.fromY,
      z: config.fly.fromZ,
      rotateX: config.fly.fromRotateX,
      rotateZ: config.fly.fromRotateZ,
      rotateY: config.fly.fromRotateY,
      scale: config.fly.fromScale,
    });

    // 1. arrival ---------------------------------------------------------
    intro.to(
      fly,
      {
        y: 0,
        z: 0,
        rotateX: 0,
        rotateZ: 0,
        rotateY: 0,
        scale: 1,
        duration: 1.85,
        delay: config.fly.delay,
        ease: "elastic.out(0.5, 0.78)",
      },
      0,
    );
    intro.to(
      figure,
      {
        opacity: 1,
        duration: 0.4,
        delay: config.fly.delay,
        ease: "power2.out",
      },
      0,
    );
    starters.push(startIdle);

    // 2. idle float — two offset loops read as organic drift --------------
    function startIdle() {
      floats.push(
        gsap.fromTo(
          floatLayer,
          { y: -config.float.y / 2, rotate: -config.float.rotate / 2 },
          {
            y: config.float.y / 2,
            rotate: config.float.rotate / 2,
            duration: config.float.duration,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: config.float.delay,
          },
        ),
        gsap.fromTo(
          bobLayer,
          { y: config.bob.y / 2, rotate: config.bob.rotate / 2 },
          {
            y: -config.bob.y / 2,
            rotate: -config.bob.rotate / 2,
            duration: config.bob.duration,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: config.bob.delay,
          },
        ),
      );
    }

    // 3. pointer velocity -------------------------------------------------
    if (lenis) {
      const v = config.velocity;
      const toY = gsap.quickTo(velocity, "y", { duration: 0.8, ease: SETTLE });
      const toRotateX = gsap.quickTo(velocity, "rotationX", {
        duration: 0.85,
        ease: SETTLE,
      });
      const toRotateZ = gsap.quickTo(velocity, "rotation", {
        duration: 0.9,
        ease: SETTLE,
      });

      let last = 0;
      lenis.on("scroll", ({ velocity: raw }) => {
        const value = gsap.utils.clamp(-VELOCITY_LIMIT, VELOCITY_LIMIT, raw);
        if (value === last) return;
        last = value;
        toY(value * 0.55 * v.y);
        toRotateX(-value * 0.06 * v.rotateX);
        toRotateZ(value * 0.03 * v.rotateZ);
      });
    }

    // 4. scroll scatter ---------------------------------------------------
    gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: "top top",
        end: "bottom top",
        scrub: 1.6,
      },
    }).to(figure, { ...config.scroll, ease: "none" }, 0);
  });

  intro.call(() => starters.forEach((start) => start()), null, "-=1.1");

  const playIntro = () => intro.play(0);
  window.addEventListener("d3uceY:reveal", playIntro, { once: true });

  return () => {
    window.clearTimeout(fallback);
    window.removeEventListener("d3uceY:reveal", revealCopy);
    window.removeEventListener("d3uceY:reveal", playIntro);
    intro.kill();
    floats.forEach((tween) => tween.kill());
  };
}
