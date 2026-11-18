import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/lib/site-data";
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_TITLE,
  SITE_URL,
  jsonLdString,
  pageUrl,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  // Origin only: every URL below is already absolute, base path included.
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  keywords: SITE_KEYWORDS,
  alternates: { canonical: SITE_URL },
  manifest: pageUrl("/manifest.webmanifest"),
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: site.xHandle,
    creator: site.xHandle,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: pageUrl("/icon.svg"), type: "image/svg+xml", sizes: "any" },
      {
        url: pageUrl("/assets/icons/icon-192.png"),
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: pageUrl("/assets/icons/icon-512.png"),
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: pageUrl("/assets/icons/apple-touch-icon.png"),
        type: "image/png",
        sizes: "180x180",
      },
    ],
    shortcut: [pageUrl("/favicon.ico")],
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        {/* The machine-readable copy of everything below. Crawlers that never
            run the bundle still get the person, the apps, the shelf and the
            FAQ from this one node graph. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString() }}
        />
        <link rel="me" href={site.github} />
        <link
          rel="preload"
          href="/assets/fonts/archivo-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/media/app-avnac.webp"
          as="image"
          fetchPriority="high"
        />
        {children}
      </body>
    </html>
  );
}
