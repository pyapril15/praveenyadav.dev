/**
 * File: app/layout.tsx
 * Role: Root document, global fonts, styles, and default metadata.
 * Use: Wraps every App Router page with the shared HTML document.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://praveenyadav.dev",
  ),
  title: {
    default: "Praveen Yadav | Portfolio",
    template: "%s | Praveen Yadav",
  },
  description: "Portfolio website for Praveen Yadav.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
