import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The motion layer is a one-shot imperative boot (Lenis + GSAP + ScrollTrigger).
  // StrictMode's development-only double-mount would boot it twice and duplicate
  // every scroll trigger; production behaves identically either way.
  reactStrictMode: false,

  // Dev and `next start` can share one folder, but not one build output: a
  // production build overwrites .next and instantly breaks a running dev server.
  // Dev writes to .next-dev instead so both can run side by side.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",

  // Next >=15 blocks dev-only resources (the HMR socket, some chunks) when the
  // page is opened on 127.0.0.1 instead of localhost. Without this the dev
  // server serves the page but never hydrates: no GSAP, no Lenis, no motion.
  allowedDevOrigins: ["127.0.0.1", "localhost"],

  // Keep file tracing inside the project. Without this, Next walks up to
  // C:\Users\<name>\package-lock.json (outside this repo) and warns.
  outputFileTracingRoot: process.cwd(),

  // The dev overlay badge sits on top of the status bar; screenshots and the
  // page itself are cleaner without it.
  devIndicators: false,
};

export default nextConfig;