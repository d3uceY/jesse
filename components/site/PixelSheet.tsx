"use client";

import { useEffect, useState } from "react";

/**
 * PixelSheet — a horizontal strip stepped one frame at a time.
 *
 * Ported from Vectile's sprite player. The strip is one <img> inside an
 * overflow-hidden box and is moved by exactly one frame width per tick, so the
 * pixels themselves never slide: only the crop changes. Timings come from the
 * SpriteWare export, so a held frame really holds instead of sharing one
 * uniform delay with the rest.
 */
type Props = {
  src: string;
  frames: number;
  frameWidth: number;
  frameHeight: number;
  /** Milliseconds each frame is held, in order. */
  timings: number[];
  className?: string;
  /** Accessible name. Omit for decoration. */
  label?: string;
};

export default function PixelSheet({
  src,
  frames,
  frameWidth,
  frameHeight,
  timings,
  className,
  label,
}: Props) {
  const [frame, setFrame] = useState(0);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const timingKey = timings.join(",");

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let alive = true;
    const image = new Image();
    image.src = src;
    const fallback = window.setTimeout(() => {
      if (alive) setReady(true);
    }, 800);
    image
      .decode()
      .catch(() => {})
      .finally(() => {
        if (!alive) return;
        window.clearTimeout(fallback);
        setReady(true);
      });
    return () => {
      alive = false;
      window.clearTimeout(fallback);
    };
  }, [src]);

  useEffect(() => {
    if (!ready || reduced || frames < 2) return;

    let index = 0;
    let timer = 0;
    const tick = () => {
      setFrame(index);
      const hold = timings[index] ?? 90;
      index = (index + 1) % frames;
      timer = window.setTimeout(tick, hold);
    };
    tick();

    return () => window.clearTimeout(timer);
  }, [ready, reduced, frames, timingKey, timings]);

  const shownFrame = ready && !reduced ? frame : 0;

  return (
    <span
      className={className ? "pixel-sheet " + className : "pixel-sheet"}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ aspectRatio: frameWidth + " / " + frameHeight }}
    >
      {ready ? (
        <img
          src={src}
          alt=""
          draggable={false}
          style={{
            width: frames * 100 + "%",
            height: "auto",
            transform: "translateX(" + (-shownFrame * 100) / frames + "%)",
          }}
        />
      ) : null}
    </span>
  );
}
