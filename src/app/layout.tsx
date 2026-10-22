import type { Metadata, Viewport } from "next";
import "./globals.css";

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
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#050914",
  colorScheme: "dark"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body>{children}</body></html>;
}
