import { faqs, products, shelf, site } from "./site-data";

/**
 * seo.ts — every URL, string and JSON-LD node the crawlers read.
 *
 * The site is published as a GitHub Pages project site, so it lives one
 * directory below the origin. NEXT_PUBLIC_BASE_PATH is set by the release
 * workflow and by next.config.ts; when it is empty (local dev, or a custom
 * domain at the root) every helper below degrades to the plain origin.
 *
 * NEXT_PUBLIC_SITE_URL must name the deployment origin, not the site root,
 * so that canonical and Open Graph URLs keep the base path in them.
 */

const ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://d3ucey.github.io"
).replace(/\/+$/, "");

export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(
  /\/+$/,
  "",
);

/** Origin + base path + path. Absolute, as schema.org and og:url require. */
export function pageUrl(path = "/"): string {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${ORIGIN}${BASE_PATH}${suffix}`;
}

export const SITE_ORIGIN = ORIGIN;
/** The page's own URL, with the trailing slash a directory index deserves. */
export const SITE_URL = pageUrl("/");
export const SITE_NAME = "d3uceY";
export const SITE_TITLE = "d3uceY / Jesse, desktop, web apps & command-line tools";
export const SITE_DESCRIPTION =
  "Jesse (d3uceY) builds open-source desktop apps and command-line tools — Avnac Studio, Vectile, Clipcat, SpriteWare, NooBoo. Fifteen tools, one developer.";
export const SITE_KEYWORDS = [
  "d3uceY",
  "Jesse",
  "Avnac Studio",
  "Vectile",
  "Clipcat",
  "SpriteWare",
  "NooBoo",
  "desktop apps",
  "command-line tools",
  "open source",
  "indie developer",
  "Go",
  "TypeScript",
  "Rust",
  "React",
  "MCP",
  "onyekwelu"
];

export const OG_IMAGE = {
  url: pageUrl("/og.png"),
  width: 1200,
  height: 630,
  alt: "A cream pixel-art cat mascot trailing blue, violet, pink and orange echoes across warm paper, above a black band with the d3uceY wordmark and the line \"Desktop, web apps & command-line tools\".",
  type: "image/png",
} as const;

/** Build time, in ISO form. Used for schema dateModified and the sitemap. */
export const LAST_MODIFIED = new Date().toISOString();

const PERSON_ID = `${SITE_URL}#person`;
const WEBSITE_ID = `${SITE_URL}#website`;
const PAGE_ID = `${SITE_URL}#webpage`;

const APPLICATION_CATEGORY: Record<string, string> = {
  avnac: "DesignApplication",
  vectile: "BusinessApplication",
  clipcat: "UtilitiesApplication",
  spriteware: "DeveloperApplication",
  nooboo: "UtilitiesApplication",
};

const SHELF_OS: Record<string, string> = {
  desktop: "Windows, macOS, Linux",
  cli: "Windows, macOS, Linux",
  web: "Web browser",
};

const SHELF_CATEGORY: Record<string, string> = {
  desktop: "UtilitiesApplication",
  cli: "DeveloperApplication",
  web: "WebApplication",
};

const PERSON = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.name,
  alternateName: site.handle,
  url: SITE_URL,
  email: site.email,
  image: pageUrl("/assets/media/jesse.webp"),
  jobTitle: "Independent software developer",
  description:
    "Jesse builds open-source desktop apps and command-line tools under the handle d3uceY.",
  sameAs: [site.github, site.x],
  knowsAbout: [
    "Go",
    "TypeScript",
    "Rust",
    "React",
    "Desktop application development",
    "Command-line interfaces",
    "Model Context Protocol",
    "Web development",
  ],
};

const APPS = products.map((app, index) => ({
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}#app-${app.id}`,
  name: app.name,
  description: `${app.lede} ${app.body}`,
  applicationCategory: APPLICATION_CATEGORY[app.id] ?? "UtilitiesApplication",
  operatingSystem: "Windows, macOS, Linux",
  url: app.href,
  image: pageUrl(app.shot),
  screenshot: pageUrl(app.shot),
  featureList: app.facts,
  author: { "@id": PERSON_ID },
  position: index + 1,
}));

const SHELF_APPS = shelf.map((item, index) => ({
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}#shelf-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  name: item.name,
  description: item.note,
  applicationCategory: SHELF_CATEGORY[item.kind] ?? "UtilitiesApplication",
  operatingSystem: SHELF_OS[item.kind] ?? "Windows, macOS, Linux",
  url: item.href,
  image: pageUrl(item.logo),
  author: { "@id": PERSON_ID },
  position: index + 1,
}));

/**
 * The complete graph. One <script> tag, every entity on the page:
 * who made it, what the site is, what shipped, what is on the shelf, and the
 * questions people actually ask. Crawlers that never execute JavaScript read
 * this instead of the client bundle.
 */
export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      PERSON,
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: site.handle,
        alternateName: `${site.name} — ${site.handle}`,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
        author: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": PAGE_ID,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
        inLanguage: "en",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE.url,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          caption: OG_IMAGE.alt,
        },
        dateModified: LAST_MODIFIED,
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}#apps`,
        name: "Shipped apps",
        description:
          "Five installable, open-source desktop apps by Jesse (d3uceY).",
        numberOfItems: APPS.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: APPS.map((app) => ({
          "@type": "ListItem",
          position: app.position,
          item: app,
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}#shelf`,
        name: "The rest of the shelf",
        description: "Smaller tools and experiments by Jesse (d3uceY).",
        numberOfItems: SHELF_APPS.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: SHELF_APPS.map((item) => ({
          "@type": "ListItem",
          position: item.position,
          item,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}#faq`,
        isPartOf: { "@id": WEBSITE_ID },
        inLanguage: "en",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer.trim(),
          },
        })),
      },
    ],
  };
}

/**
 * JSON-LD is injected as raw text, so "<" is escaped to stop a stray
 * "</script>" inside any string from closing the tag early.
 */
export function jsonLdString(): string {
  return JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");
}
