import type { MetadataRoute } from "next";
import { LAST_MODIFIED, SITE_URL } from "@/lib/seo";

// Required for `output: "export"` (see app/robots.ts).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: { en: SITE_URL },
      },
    },
  ];
}
