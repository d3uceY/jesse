import type { Metadata } from "next";
import { Archivo_Black, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-micro",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JESSE · ENGINEER · PORTFOLIO",
  description:
    "Software engineer building desktop apps, CLI tools, and embedded systems — Go, Wails, React, ESP32.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${jetBrainsMono.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
