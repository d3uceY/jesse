// Next's `basePath` rewrites routes, `_next` chunk URLs and anything built from
// `next/link`, but it leaves URLs written by hand alone: `url("/assets/...")`
// in CSS, `src="/assets/..."` on an <img>, the preloads in layout.tsx. On a
// GitHub Pages project site those would resolve to the domain root and 404.
//
// So the release pipeline builds the export, then runs this once over `out/` to
// put the base path in front of every public asset URL. Local builds never set
// NEXT_PUBLIC_BASE_PATH, and this exits without touching anything.
//
// Usage: NEXT_PUBLIC_BASE_PATH=/My-Portfolio-v2 node scripts/apply-base-path.mjs

import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

if (!base) {
  console.log("apply-base-path: NEXT_PUBLIC_BASE_PATH is unset, nothing to do.");
  process.exit(0);
}

const OUT = path.resolve("out");
// .txt and .rsc carry the React Server Components payload, which repeats the
// same asset URLs found in the HTML.
const EXTENSIONS = new Set([".html", ".txt", ".rsc", ".css", ".js", ".json"]);
const FROM = "/assets/";
const TO = `${base}/assets/`;

// JSON-LD and llms.txt hold absolute URLs that already carry the base path
// ("https://host/My-Portfolio-v2/assets/..."). Rewriting those again would
// nest the prefix. Park the already-correct form, rewrite the bare one, then
// put it back, so the pass is idempotent.
const DONE = `${base}/assets/`;
const PARK = "\u0000d3uceY-base-path\u0000";

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (EXTENSIONS.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

const files = await walk(OUT);
let rewritten = 0;
let replacements = 0;

for (const file of files) {
  const before = await readFile(file, "utf8");
  if (!before.includes(FROM)) continue;
  const parked = before.split(DONE).join(PARK);
  const bare = parked.split(FROM).length - 1;
  if (bare === 0) continue;
  const after = parked.split(FROM).join(TO).split(PARK).join(DONE);
  await writeFile(file, after, "utf8");
  rewritten += 1;
  replacements += bare;
}

console.log(
  `apply-base-path: ${replacements} asset URLs in ${rewritten} files now point at ${base}/assets/`,
);
