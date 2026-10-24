import { getPublicNotes } from "@/content/notes";
import { categoryLabel } from "@/lib/notes";

export const dynamic = "force-static";

const BASE = "https://eurinhash.com";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(iso?: string): string | undefined {
  if (!iso) return undefined;
  const date = new Date(`${iso}T08:00:00Z`);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toUTCString();
}

export function GET() {
  const notes = getPublicNotes();

  const items = notes
    .map((note) => {
      const url = `${BASE}/notes/${note.slug}`;
      const date = rfc822(note.publishedAt ?? note.updatedAt);
      return [
        "    <item>",
        `      <title>${escapeXml(note.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(note.description)}</description>`,
        `      <category>${escapeXml(categoryLabel(note.category))}</category>`,
        date ? `      <pubDate>${date}</pubDate>` : "",
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Eurin Hash — Notes &amp; analyses</title>
    <link>${BASE}/notes</link>
    <description>Analyses techniques : architecture, cloud, DevOps, qualité logicielle et systèmes d’apprentissage.</description>
    <language>fr-FR</language>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
