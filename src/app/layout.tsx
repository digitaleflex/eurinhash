import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eurinhash.com"),
  title: {
    default: "Eurin Hash — Site personnel & portfolio",
    template: "%s — Eurin Hash"
  },
  description: "Le site personnel d’Eurin Hash : parcours, projets, compétences et réflexions autour du développement, du cloud, de l’architecture des systèmes et de la cybersécurité.",
  icons: {
    icon: [
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [{ url: "/apple-icon-180.png", sizes: "180x180", type: "image/png" }]
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Eurin Hash",
    title: "Eurin Hash — Site personnel & portfolio",
    description: "Mon parcours, mes projets personnels et mes réflexions autour de l’ingénierie numérique."
  },
  robots: { index: true, follow: true },
  alternates: {
    types: { "application/rss+xml": "/feed.xml" }
  }
};

export const viewport: Viewport = {
  themeColor: "#050914",
  colorScheme: "dark"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#contenu">Aller au contenu</a>
        {children}
      </body>
    </html>
  );
}
