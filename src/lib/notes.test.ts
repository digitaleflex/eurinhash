import { test } from "node:test";
import assert from "node:assert/strict";
import {
  categoryFromLabel,
  formatDate,
  isPublic,
  parseFrontmatter,
  parseHeadings,
  readingTimeFromMarkdown,
  stripLeadingTitle,
  toPublicMeta,
  type Note,
} from "./notes.ts";

const RAW = `---
title: "Déployé ne signifie pas fiable"
description: "Examiner la fiabilité."
slug: "aura-storage-fiabilite"
category: "Cloud & DevOps"
tags: ["Docker", "Sauvegarde"]
project: "AURA Storage"
status: "draft"
---

# Déployé ne signifie pas fiable

## Résumé

Un paragraphe.

## 1. Disponibilité

\`\`\`bash
## pas un titre
\`\`\`

### Détail

## Résumé
`;

test("parseFrontmatter lit les chaînes et les tableaux", () => {
  const { data, body } = parseFrontmatter(RAW);
  assert.equal(data.title, "Déployé ne signifie pas fiable");
  assert.deepEqual(data.tags, ["Docker", "Sauvegarde"]);
  assert.equal(data.status, "draft");
  assert.ok(body.startsWith("# Déployé"));
  assert.ok(!body.includes("---\ntitle"));
});

test("parseFrontmatter retourne le corps brut sans frontmatter", () => {
  const { data, body } = parseFrontmatter("# Titre\n\nTexte");
  assert.deepEqual(data, {});
  assert.equal(body, "# Titre\n\nTexte");
});

test("stripLeadingTitle retire uniquement le H1 d’ouverture", () => {
  const body = stripLeadingTitle(RAW.slice(RAW.indexOf("# Déployé")));
  assert.ok(body.startsWith("## Résumé"));
  assert.ok(!body.includes("# Déployé"));
});

test("parseHeadings ignore les blocs de code et déduplique", () => {
  const outline = parseHeadings(RAW);
  const texts = outline.map((item) => item.text);
  assert.deepEqual(texts, ["Résumé", "1. Disponibilité", "Détail", "Résumé"]);
  assert.equal(outline[0].id, "resume");
  assert.equal(outline[1].id, "1-disponibilite");
  assert.equal(outline[2].level, 3);
  assert.equal(outline[3].id, "resume-2");
  assert.ok(!texts.includes("pas un titre"));
});

test("parseHeadings slugifie les accents", () => {
  const outline = parseHeadings("## Comprendre les responsabilités\n");
  assert.equal(outline[0].id, "comprendre-les-responsabilites");
});

test("readingTimeFromMarkdown ignore le code et reste >= 1", () => {
  assert.equal(readingTimeFromMarkdown(""), 1);
  assert.equal(readingTimeFromMarkdown("```bash\nmot mot mot\n```"), 1);
  const long = Array.from({ length: 600 }, () => "mot").join(" ");
  assert.equal(readingTimeFromMarkdown(long), 3);
});

test("isPublic exclut les brouillons", () => {
  const base: Note = {
    slug: "s",
    title: "T",
    description: "D",
    category: "cloud-devops",
    tags: [],
    status: "draft",
    markdown: "## A\n\nTexte",
    sourceFile: "x.md",
    order: 1,
  };
  assert.equal(isPublic(base), false);
  assert.equal(isPublic({ ...base, status: "review" }), true);
  assert.equal(isPublic({ ...base, status: "published" }), true);
});

test("toPublicMeta expose les métadonnées attendues", () => {
  const meta = toPublicMeta({
    slug: "s",
    title: "T",
    description: "D",
    category: "qualite-logicielle",
    tags: ["a"],
    status: "review",
    updatedAt: "2026-10-24",
    markdown: "## A\n\nUn texte court.",
    sourceFile: "x.md",
    order: 2,
  });
  assert.equal(meta.status, "review");
  assert.equal(meta.readingTime >= 1, true);
  assert.equal(meta.updatedAt, "2026-10-24");
  assert.equal(meta.category, "qualite-logicielle");
});

test("categoryFromLabel mappe les libellés éditoriaux", () => {
  assert.equal(categoryFromLabel("Cloud & DevOps"), "cloud-devops");
  assert.equal(categoryFromLabel("Qualité logicielle"), "qualite-logicielle");
  assert.equal(categoryFromLabel("Learning Systems"), "learning-systems");
  assert.equal(categoryFromLabel("Architecture & systèmes"), "architecture");
  assert.equal(categoryFromLabel("Autre"), "architecture");
});

test("formatDate formate en français et ignore l’invalide", () => {
  assert.equal(formatDate("2026-10-24"), "24 octobre 2026");
  assert.equal(formatDate(undefined), undefined);
  assert.equal(formatDate("nope"), undefined);
});
