export type NoteCategoryId =
  | "architecture"
  | "cloud-devops"
  | "qualite-logicielle"
  | "learning-systems";

/** `draft` = invisible partout. `review` = visible mais signalé comme version de travail. */
export type NoteStatus = "draft" | "review" | "published";

export type NoteProject = { label: string; href?: string };

export type Note = {
  slug: string;
  title: string;
  description: string;
  category: NoteCategoryId;
  tags: string[];
  status: NoteStatus;
  publishedAt?: string;
  updatedAt?: string;
  project?: NoteProject;
  cover?: string;
  /** Corps Markdown, sans frontmatter ni titre H1. */
  markdown: string;
  sourceFile: string;
  /** Ordre éditorial dérivé du préfixe du fichier (`01-…`). */
  order: number;
};

export type PublicNoteMeta = {
  slug: string;
  title: string;
  description: string;
  category: NoteCategoryId;
  tags: string[];
  status: Exclude<NoteStatus, "draft">;
  publishedAt?: string;
  updatedAt?: string;
  readingTime: number;
  project?: NoteProject;
};

export type OutlineItem = { id: string; text: string; level: 2 | 3 };

export const CATEGORIES: { id: NoteCategoryId; label: string; description: string }[] = [
  {
    id: "architecture",
    label: "Architecture & systèmes",
    description: "Composants, dépendances, conception et compromis techniques.",
  },
  {
    id: "cloud-devops",
    label: "Cloud & DevOps",
    description: "Infrastructure, déploiement, disponibilité et sauvegardes.",
  },
  {
    id: "qualite-logicielle",
    label: "Qualité logicielle",
    description: "Tests, intégration, validation et fiabilité des applications.",
  },
  {
    id: "learning-systems",
    label: "Learning Systems",
    description: "Ingénierie pédagogique, parcours et progression des compétences.",
  },
];

export const PROJECT_LINKS: Record<string, string | undefined> = {
  "AURA Storage": "https://github.com/digitaleflex/aura-storage",
  WPOpsX: "https://github.com/digitaleflex/WPOpsX",
  Axiom: undefined,
  "HashCode Engineering Foundations": undefined,
};

export function categoryLabel(id: NoteCategoryId): string {
  return CATEGORIES.find((item) => item.id === id)?.label ?? id;
}

export function categoryFromLabel(label: string): NoteCategoryId {
  const normalized = label.trim().toLowerCase();
  const found = CATEGORIES.find((item) => item.label.toLowerCase() === normalized);
  if (found) return found.id;
  if (normalized.includes("cloud") || normalized.includes("devops")) return "cloud-devops";
  if (normalized.includes("qualit") || normalized.includes("test")) return "qualite-logicielle";
  if (normalized.includes("learning") || normalized.includes("pédagog")) return "learning-systems";
  return "architecture";
}

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Nettoie les marqueurs Markdown d’un titre pour l’affichage et l’ancre. */
function plainHeading(value: string): string {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, "$1")
    .trim();
}

/* ——— Frontmatter ——— */

type FrontmatterValue = string | string[];

export function parseFrontmatter(raw: string): { data: Record<string, FrontmatterValue>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: raw };

  const data: Record<string, FrontmatterValue> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const entry = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!entry) continue;
    const [, key, rawValue] = entry;
    const value = rawValue.trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      continue;
    }
    data[key] = value.replace(/^["']|["']$/g, "");
  }

  return { data, body: raw.slice(match[0].length).trimStart() };
}

/** Retire le H1 d’ouverture : le titre est rendu par l’en-tête d’article. */
export function stripLeadingTitle(markdown: string): string {
  return markdown.replace(/^\s*#\s+[^\n]+\r?\n+/, "").trim();
}

/* ——— Sommaire ——— */

export function parseHeadings(markdown: string): OutlineItem[] {
  const seen = new Map<string, number>();
  const outline: OutlineItem[] = [];
  let inFence = false;

  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const heading = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (!heading) continue;
    const text = plainHeading(heading[2]);
    const base = slugify(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    outline.push({
      id: count === 0 ? base : `${base}-${count + 1}`,
      text,
      level: heading[1].length === 2 ? 2 : 3,
    });
  }

  return outline;
}

/* ——— Temps de lecture ——— */

export function readingTimeFromMarkdown(markdown: string): number {
  const withoutFences = markdown.replace(/```[\s\S]*?```/g, " ");
  const words = withoutFences.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function isPublic(note: Note): note is Note & { status: "review" | "published" } {
  return note.status !== "draft";
}

export function toPublicMeta(note: Note): PublicNoteMeta {
  return {
    slug: note.slug,
    title: note.title,
    description: note.description,
    category: note.category,
    tags: note.tags,
    status: note.status === "draft" ? "review" : note.status,
    publishedAt: note.publishedAt,
    updatedAt: note.updatedAt,
    readingTime: readingTimeFromMarkdown(note.markdown),
    project: note.project,
  };
}

export function formatDate(iso?: string): string | undefined {
  if (!iso) return undefined;
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
