import fs from "node:fs";
import path from "node:path";
import {
  categoryFromLabel,
  isPublic,
  parseFrontmatter,
  PROJECT_LINKS,
  stripLeadingTitle,
  toPublicMeta,
  type Note,
  type NoteStatus,
  type PublicNoteMeta,
} from "@/lib/notes";

/* Les articles vivent avec le code applicatif : `src/content/notes/*.md`.
   La lecture a lieu au build (pages statiques), jamais côté navigateur.
   Un brouillon éditorial Markdown reste visible comme « version de travail ». */
const CONTENT_DIR = path.join(process.cwd(), "src", "content", "notes");

function mapStatus(value: string | string[] | undefined): NoteStatus {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "published") return "published";
  return "review";
}

/** Le préfixe du fichier (`01-…`) fixe l’ordre éditorial, indépendamment du titre. */
function parseOrder(file: string): number {
  const match = file.match(/^(\d+)/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function parseNote(file: string): Note | null {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, body } = parseFrontmatter(raw);

  const slug = typeof data.slug === "string" ? data.slug : "";
  const title = typeof data.title === "string" ? data.title : "";
  const description = typeof data.description === "string" ? data.description : "";
  if (!slug || !title || !description) return null;

  const projectLabel = typeof data.project === "string" ? data.project : undefined;

  return {
    slug,
    title,
    description,
    category: categoryFromLabel(typeof data.category === "string" ? data.category : ""),
    tags: Array.isArray(data.tags) ? data.tags : [],
    status: mapStatus(data.status),
    publishedAt: typeof data.publishedAt === "string" ? data.publishedAt : undefined,
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : undefined,
    project: projectLabel ? { label: projectLabel, href: PROJECT_LINKS[projectLabel] } : undefined,
    cover: typeof data.cover === "string" ? data.cover : undefined,
    markdown: stripLeadingTitle(body),
    sourceFile: `src/content/notes/${file}`,
    order: parseOrder(file),
  };
}

let cache: Note[] | null = null;

export function getAllNotes(): Note[] {
  if (cache) return cache;
  if (!fs.existsSync(CONTENT_DIR)) {
    throw new Error(`Dossier de contenu introuvable : ${CONTENT_DIR}`);
  }
  const notes = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(parseNote)
    .filter((note): note is Note => note !== null)
    .sort((a, b) => {
      const da = a.publishedAt ?? "";
      const db = b.publishedAt ?? "";
      if (da && db && da !== db) return db.localeCompare(da);
      if (da && !db) return -1;
      if (db && !da) return 1;
      return a.order - b.order;
    });
  cache = notes;
  return notes;
}

export function getPublicNotes(): PublicNoteMeta[] {
  return getAllNotes().filter(isPublic).map(toPublicMeta);
}

export function getPublicNote(slug: string): Note | undefined {
  const note = getAllNotes().find((item) => item.slug === slug);
  if (!note || !isPublic(note)) return undefined;
  return note;
}

export function getNoteNeighbours(slug: string) {
  const notes = getPublicNotes();
  const index = notes.findIndex((note) => note.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? notes[index - 1] : undefined,
    next: index < notes.length - 1 ? notes[index + 1] : undefined,
  };
}
