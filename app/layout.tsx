import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export const metadata: Metadata = {
  title: {
    default: "World Pulse — De polsslag van de planeet",
    template: "%s | World Pulse",
  },
  description:
    "Een bronbewuste, interactieve reis door bevolking, water, voedsel, energie, uitstoot en gezondheid.",
  applicationName: "World Pulse",
  category: "education",
  keywords: [
    "werelddata",
    "bevolking",
    "energie",
    "water",
    "gezondheid",
    "data visualisatie",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "World Pulse",
    title: "World Pulse — De polsslag van de planeet",
    description:
      "Werelddata zijn niet zomaar cijfers. Ze zijn de realtime-achtige polsslag van één verbonden planeet.",
    images: [
      {
        url: "/media/world-pulse-social.webp",
        width: 1200,
        height: 630,
        alt: "Een gelaagde wereldmachine van datalijnen, energiestromen en lichtpunten.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "World Pulse — De polsslag van de planeet",
    description:
      "Een cinematografische datareis door de systemen die onze wereld vormen.",
    images: ["/media/world-pulse-social.webp"],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body id="top">
        <a className="skip-link" href="#main">
          Naar hoofdinhoud
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
