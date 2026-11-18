import type { MetadataRoute } from "next";
import { pageUrl } from "@/lib/seo";

// Required for `output: "export"`: without it Next treats the metadata route
// as dynamic and the static export refuses to build.
export const dynamic = "force-static";

/**
 * robots.txt is only honoured at the origin root, and a GitHub Pages project
 * site is served from /<repo>/. This file still matters the day the site moves
 * to a custom domain or a user site, and it is what points at the sitemap when
 * that happens.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Answer engines and AI crawlers are welcome; the page is public.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
        ],
        allow: "/",
      },
    ],
    sitemap: pageUrl("/sitemap.xml"),
    // No `host`: the directive takes a bare hostname for Yandex, and the
    // sitemap line above is what the other crawlers actually read.
  };
}
