"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { CATEGORIES, categoryLabel, formatDate, type NoteCategoryId, type PublicNoteMeta } from "@/lib/notes";

type Props = { notes: PublicNoteMeta[] };

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function NotesBrowser({ notes }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<NoteCategoryId | "all">("all");
  const searchId = useId();

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return notes.filter((note) => {
      if (category !== "all" && note.category !== category) return false;
      if (!q) return true;
      const haystack = normalize(
        [note.title, note.description, note.tags.join(" "), categoryLabel(note.category), note.project?.label ?? ""].join(" ")
      );
      return haystack.includes(q);
    });
  }, [notes, query, category]);

  const isFiltered = query.trim().length > 0 || category !== "all";
  const reset = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <div className="notes-browser">
      <div className="notes-cats" role="group" aria-label="Catégories éditoriales">
        <button
          type="button"
          className="notes-cat notes-cat--all"
          aria-pressed={category === "all"}
          onClick={() => setCategory("all")}
        >
          <span className="notes-cat__label">Toutes les analyses</span>
          <span className="notes-cat__desc">L’ensemble des publications, tous sujets confondus.</span>
        </button>
        {CATEGORIES.map((item) => (
          <button
            key={item.id}
            type="button"
            className="notes-cat"
            aria-pressed={category === item.id}
            onClick={() => setCategory(item.id)}
          >
            <span className="notes-cat__label">{item.label}</span>
            <span className="notes-cat__desc">{item.description}</span>
          </button>
        ))}
      </div>

      <div className="notes-toolbar">
        <div className="notes-search">
          <label htmlFor={searchId} className="notes-search__label">Rechercher une analyse</label>
          <div className="notes-search__field">
            <Search size={16} aria-hidden="true" />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Titre, sujet, technologie…"
              autoComplete="off"
            />
            {query && (
              <button type="button" className="notes-search__clear" onClick={() => setQuery("")} aria-label="Effacer la recherche">
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
        {isFiltered && (
          <button type="button" className="notes-reset" onClick={reset}>
            Réinitialiser les filtres
          </button>
        )}
      </div>

      <p className="notes-count" role="status" aria-live="polite">
        {filtered.length === 0
          ? "Aucune analyse ne correspond à cette sélection."
          : `${filtered.length} analyse${filtered.length > 1 ? "s" : ""} affichée${filtered.length > 1 ? "s" : ""}`}
      </p>

      {filtered.length === 0 ? (
        <div className="notes-empty">
          <p className="notes-empty__title">Aucune analyse ne correspond aux filtres.</p>
          <p>Essayez un autre mot-clé, une autre catégorie, ou revenez à l’ensemble des publications.</p>
          <button type="button" className="notes-reset" onClick={reset}>Réinitialiser les filtres</button>
        </div>
      ) : (
        <ul className="notes-list">
          {filtered.map((note, index) => {
            const date = formatDate(note.publishedAt);
            return (
              <li key={note.slug} className={index === 0 && !isFiltered ? "notes-item notes-item--lead" : "notes-item"}>
                <article className="notes-card">
                  <div className="notes-item__top">
                    <span className="notes-item__cat">{categoryLabel(note.category)}</span>
                    <span className="notes-item__meta">
                      {date ? <time dateTime={note.publishedAt}>{date}</time> : <span>Version de travail</span>}
                      <span aria-hidden="true">·</span>
                      <span>{note.readingTime} min de lecture</span>
                    </span>
                  </div>
                  <h3 className="notes-item__title">
                    <Link href={`/notes/${note.slug}`} className="notes-card__link">{note.title}</Link>
                  </h3>
                  <p className="notes-item__desc">{note.description}</p>
                  <div className="notes-item__foot">
                    <ul className="notes-tags" aria-label="Mots-clés">
                      {note.tags.map((tag) => <li key={tag} className="notes-tag">{tag}</li>)}
                    </ul>
                    <span className="notes-item__cta" aria-hidden="true">Lire l’analyse <ArrowUpRight size={14} /></span>
                  </div>
                  {note.project && (
                    <p className="notes-item__project">Projet associé : {note.project.label}</p>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
