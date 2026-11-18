import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "d3ucey / Jesse",
  description:
    "Jesse builds desktop apps and command-line tools: Avnac Studio, Vectile, Clipcat, SpriteWare, NooBoo and ten more. Fifteen tools, one person.",
  authors: [{ name: "Jesse", url: "https://github.com/d3uceY" }],
  openGraph: {
    title: "d3ucey / Jesse",
    description:
      "Desktop apps and command-line tools. Avnac Studio, Vectile, Clipcat, SpriteWare, NooBoo.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
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
