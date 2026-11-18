"use client";

import { useEffect, useRef } from "react";

const FRAME_SIZE = 16;
const FRAME_COUNT = 12;
const HOLD_MS = 140;
const MORPH_MS = 40;

/**
 * The loader mark. A 16x16 canvas holds the icons; on a change the current
 * frame crossfades into the next one. The blend is deliberately short and is
 * drawn from the sprite sheet with smoothing off, so it reads as a pixel
 * morph rather than a slideshow. The mark never goes blank and never slides.
 */
export default function PixelMorph() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx = context as CanvasRenderingContext2D;

    ctx.imageSmoothingEnabled = false;

    const sheet = new Image();
    sheet.decoding = "async";
    sheet.src = "/assets/pixel/loader-icons.png";

    let disposed = false;
    let raf = 0;
    let current = 0;
    let next = 0;
    let queue: number[] = [];
    let phase: "hold" | "morph" = "hold";
    let phaseStart = 0;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function refillQueue() {
      queue = Array.from({ length: FRAME_COUNT }, (_, index) => index);
      for (let index = queue.length - 1; index > 0; index -= 1) {
        const swap = Math.floor(Math.random() * (index + 1));
        const value = queue[index];
        queue[index] = queue[swap];
        queue[swap] = value;
      }
      // Never let a new shuffle start by showing the frame already on screen.
      if (queue[0] === current) {
        const first = queue.shift();
        if (first !== undefined) queue.push(first);
      }
    }

    function takeNext() {
      if (queue.length === 0) refillQueue();
      return queue.shift() ?? 0;
    }

    function drawFrame(index: number) {
      ctx.clearRect(0, 0, FRAME_SIZE, FRAME_SIZE);
      ctx.drawImage(
        sheet,
        index * FRAME_SIZE,
        0,
        FRAME_SIZE,
        FRAME_SIZE,
        0,
        0,
        FRAME_SIZE,
        FRAME_SIZE,
      );
    }

    function drawBlend(from: number, to: number, progress: number) {
      ctx.clearRect(0, 0, FRAME_SIZE, FRAME_SIZE);
      ctx.globalAlpha = 1 - progress;
      ctx.drawImage(
        sheet,
        from * FRAME_SIZE,
        0,
        FRAME_SIZE,
        FRAME_SIZE,
        0,
        0,
        FRAME_SIZE,
        FRAME_SIZE,
      );
      ctx.globalAlpha = progress;
      ctx.drawImage(
        sheet,
        to * FRAME_SIZE,
        0,
        FRAME_SIZE,
        FRAME_SIZE,
        0,
        0,
        FRAME_SIZE,
        FRAME_SIZE,
      );
      ctx.globalAlpha = 1;
    }

    function tick(now: number) {
      if (disposed) return;

      if (phase === "hold") {
        if (now - phaseStart >= HOLD_MS) {
          phase = "morph";
          phaseStart = now;
        }
      } else {
        const progress = Math.min(1, (now - phaseStart) / MORPH_MS);
        drawBlend(current, next, progress);

        if (progress >= 1) {
          current = next;
          next = takeNext();
          phase = "hold";
          phaseStart = now;
          drawFrame(current);
        }
      }

      raf = requestAnimationFrame(tick);
    }

    sheet.onload = () => {
      if (disposed) return;

      current = 0;
      queue = [];
      refillQueue();
      next = takeNext();
      drawFrame(current);
      canvas.dataset.ready = "true";
      window.dispatchEvent(new Event("d3ucey:intro-ready"));

      if (reduced) return;
      phaseStart = performance.now();
      raf = requestAnimationFrame(tick);
    };

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      sheet.onload = null;
      sheet.onerror = null;
    };
  }, []);

  return (
    <span className="intro__mark" aria-hidden="true">
      <canvas ref={canvasRef} width={FRAME_SIZE} height={FRAME_SIZE} />
      <span className="intro__mark-fallback">
        {Array.from({ length: FRAME_COUNT }, (_, index) => (
          <span
            key={index}
            style={{
              backgroundPosition: `${(index * 100) / (FRAME_COUNT - 1)}% 0`,
              animationDelay: `${index * 0.15}s`,
            }}
          />
        ))}
      </span>
    </span>
  );
}
