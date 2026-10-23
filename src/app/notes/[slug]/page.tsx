import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, ListTree } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NoteBody } from "@/components/notes/note-body";
import { getPublicNote, getNoteNeighbours, getPublicNotes } from "@/content/notes";
import { categoryLabel, formatDate, parseHeadings, readingTimeFromMarkdown } from "@/lib/notes";

type Props = { params: Promise<{ slug: string }> };

/* Seuls les slugs générés (notes publiques) existent : un slug inconnu
   ou brouillon renvoie un 404 au niveau du routeur, sans rendu de page. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublicNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getPublicNote(slug);
  if (!note) return { title: "Analyse introuvable" };
  const url = `/notes/${note.slug}`;
  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: note.title,
      description: note.description,
      url,
      ...(note.publishedAt ? { publishedTime: note.publishedAt } : {}),
      ...(note.updatedAt ? { modifiedTime: note.updatedAt } : {}),
    },
    twitter: {
      card: "summary",
      title: note.title,
      description: note.description,
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = getPublicNote(slug);
  if (!note) notFound();

  const outline = parseHeadings(note.markdown);
  const { previous, next } = getNoteNeighbours(note.slug);
  const date = formatDate(note.publishedAt);
  const updated = formatDate(note.updatedAt);
  const minutes = readingTimeFromMarkdown(note.markdown);
  const toc = outline.reduce<{ item: (typeof outline)[number]; children: (typeof outline)[number][] }[]>((acc, entry) => {
    if (entry.level === 2) acc.push({ item: entry, children: [] });
    else if (acc.length > 0) acc[acc.length - 1].children.push(entry);
    return acc;
  }, []);
  const jsonLd =
    note.status === "published" && note.publishedAt
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: note.title,
          description: note.description,
          datePublished: note.publishedAt,
          ...(note.updatedAt ? { dateModified: note.updatedAt } : {}),
          author: { "@type": "Person", name: "Eurin Hash" },
          mainEntityOfPage: `https://eurinhash.com/notes/${note.slug}`,
        }
      : null;

  return (
    <>
      <SiteHeader current="/notes" />
      <main>
        <article className="note-page">
          <div className="container-shell">
            <nav className="note-breadcrumb" aria-label="Fil d’Ariane">
              <Link href="/">Accueil</Link>
              <span aria-hidden="true">/</span>
              <Link href="/notes">Notes &amp; analyses</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{categoryLabel(note.category)}</span>
            </nav>

            <header className="note-header">
              <p className="note-header__cat">{categoryLabel(note.category)}</p>
              <h1>{note.title}</h1>
              <p className="note-header__lead">{note.description}</p>
              <div className="note-meta">
                {date ? (
                  <time dateTime={note.publishedAt}>{date}</time>
                ) : (
                  <span className="note-status">Version de travail — à vérifier</span>
                )}
                <span aria-hidden="true">·</span>
                <span>{minutes} min de lecture</span>
                {updated && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Mis à jour le {updated}</span>
                  </>
                )}
              </div>
              {note.project && (
                <p className="note-project">
                  Projet associé :{" "}
                  {note.project.href ? (
                    <a href={note.project.href} target="_blank" rel="noreferrer">
                      {note.project.label} <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  ) : (
                    <span>{note.project.label}</span>
                  )}
                </p>
              )}
            </header>

            <div className="note-layout">
              <aside className="note-toc" aria-labelledby="toc-titre">
                <p className="note-toc__title" id="toc-titre"><ListTree size={15} aria-hidden="true" /> Dans cette analyse</p>
                <ol>
                  {toc.map((entry) => (
                    <li key={entry.item.id}>
                      <a href={`#${entry.item.id}`}>{entry.item.text}</a>
                      {entry.children.length > 0 && (
                        <ol>
                          {entry.children.map((child) => (
                            <li key={child.id}><a href={`#${child.id}`}>{child.text}</a></li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
                </ol>
              </aside>

              <div className="note-main">
                <NoteBody markdown={note.markdown} outline={outline} />

                <nav className="note-pager" aria-label="Navigation entre les analyses">
                  {previous ? (
                    <Link className="note-pager__item" href={`/notes/${previous.slug}`}>
                      <span className="note-pager__dir"><ArrowLeft size={14} aria-hidden="true" /> Analyse précédente</span>
                      <span className="note-pager__label">{previous.title}</span>
                    </Link>
                  ) : (
                    <span />
                  )}
                  {next ? (
                    <Link className="note-pager__item note-pager__item--next" href={`/notes/${next.slug}`}>
                      <span className="note-pager__dir">Analyse suivante <ArrowRight size={14} aria-hidden="true" /></span>
                      <span className="note-pager__label">{next.title}</span>
                    </Link>
                  ) : (
                    <span />
                  )}
                </nav>

                <Link className="notes-link notes-link--muted note-back" href="/notes">
                  <ArrowLeft size={14} aria-hidden="true" /> Retour à toutes les analyses
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
    </>
  );
}
