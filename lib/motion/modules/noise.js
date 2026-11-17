/**
 * noise.js — the film grain.
 *
 * Taken from the reference site's own grain worker: a 900 × 900 canvas where
 * every pixel is a random grey (0–254) at a constant alpha of 11, repainted at
 * 30fps and stretched over the viewport with `image-rendering: pixelated`, so
 * the grain is coarse rather than fine. That is why it reads as printed paper
 * instead of a screen effect.
 *
 * The original does this inside a worker with an OffscreenCanvas; the frame
 * budget is small enough (one 900² ImageData fill every 33ms) that doing it on
 * the main thread keeps the code readable without costing frames. The paint is
 * skipped entirely while the tab is hidden.
 */

import { qs } from "../core/dom.js";
import { prefersReducedMotion } from "../core/env.js";

const SIZE = 900;
const ALPHA = 11;
const FRAME = 1000 / 30; // 2 frames at 60fps, the original's refresh interval

export function initNoise({ gsap } = {}) {
  const canvas = qs("[data-grain]");
  const context = canvas?.getContext("2d", { alpha: true, desynchronized: true });
  if (!canvas || !context) return () => {};

  canvas.width = SIZE;
  canvas.height = SIZE;

  const image = context.createImageData(SIZE, SIZE);
  const words = new Uint32Array(image.data.buffer);
  // ImageData is R,G,B,A in memory, so the 32-bit word has to pack grey into
  // the low three bytes and the constant alpha into the top one.
  const littleEndian = new Uint8Array(new Uint32Array([1]).buffer)[0] === 1;
  const tint = littleEndian ? ALPHA << 24 : ALPHA;
  const stride = littleEndian ? 0x00010101 : 0x01010100;

  function paint() {
    let index = 0;
    while (index < words.length) {
      let random = (Math.random() * 4294967296) >>> 0;
      for (let byte = 0; byte < 4 && index < words.length; byte++, random >>>= 8) {
        const value = random & 255;
        if (value !== 255) words[index++] = tint | value * stride;
      }
    }
    context.putImageData(image, 0, 0);
  }

  paint();

  // The grain fades in over the first second rather than popping on.
  if (gsap && !prefersReducedMotion()) {
    gsap.fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" });
  } else {
    canvas.style.opacity = "1";
  }

  if (prefersReducedMotion()) return () => {};

  let frame = 0;
  let previous = 0;

  function loop(time) {
    if (time - previous >= FRAME) {
      previous = time;
      paint();
    }
    frame = requestAnimationFrame(loop);
  }

  function start() {
    if (frame) return;
    previous = 0;
    frame = requestAnimationFrame(loop);
  }

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
  }

  function onVisibility() {
    if (document.hidden) stop();
    else start();
  }

  start();
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    stop();
    document.removeEventListener("visibilitychange", onVisibility);
  };
}