import type { MetadataRoute } from "next";
import { getPublicNotes } from "@/content/notes";

const BASE = "https://eurinhash.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/projets`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/a-propos`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/notes`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  /* Seules les notes publiques (review/published) entrent dans le sitemap. */
  const notes: MetadataRoute.Sitemap = getPublicNotes().map((note) => ({
    url: `${BASE}/notes/${note.slug}`,
    lastModified: note.publishedAt,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...notes];
}
