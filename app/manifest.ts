import type { MetadataRoute } from "next";
import { BASE_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/seo";

// Required for `output: "export"` (see app/robots.ts).
export const dynamic = "force-static";

/**
 * Metadata routes are not base-path rewritten by Next, so every URL here is
 * built with BASE_PATH by hand. Without it the manifest 404s its own icons
 * on the Pages project site.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    id: `${BASE_PATH}/`,
    start_url: `${BASE_PATH}/`,
    scope: `${BASE_PATH}/`,
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "en",
    dir: "ltr",
    categories: ["developer", "design", "productivity"],
    icons: [
      {
        src: `${BASE_PATH}/assets/icons/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${BASE_PATH}/assets/icons/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${BASE_PATH}/assets/icons/icon-maskable-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "Apps", url: `${BASE_PATH}/#apps` },
      { name: "The shelf", url: `${BASE_PATH}/#shelf` },
      { name: "Questions", url: `${BASE_PATH}/#questions` },
      { name: "Contact", url: `${BASE_PATH}/#contact` },
    ],
  };
}
