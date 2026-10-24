import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, ListTree } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NoteBody } from "@/components/notes/note-body";
import { ReadingProgress } from "@/components/notes/reading-progress";
import { TocList } from "@/components/notes/toc-list";
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
      ...(note.publishedAt ?? note.updatedAt ? { publishedTime: note.publishedAt ?? note.updatedAt } : {}),
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
  const others = getPublicNotes().filter((item) => item.slug !== note.slug);
  const related = [
    ...others.filter((item) => item.category === note.category),
    ...others.filter((item) => item.category !== note.category),
  ].slice(0, 2);
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
      <main id="contenu">
        <ReadingProgress targetId="article-layout" />
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
                {note.status === "review" && (
                  <>
                    <span className="note-status">Version de travail — à vérifier</span>
                    <span aria-hidden="true">·</span>
                  </>
                )}
                {date && <time dateTime={note.publishedAt}>{date}</time>}
                {date && <span aria-hidden="true">·</span>}
                <span>{minutes} min de lecture</span>
                {updated && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{date ? "Mis à jour le " : "Dernière révision : "}{updated}</span>
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

            <div className="note-layout" id="article-layout">
              <details className="note-toc note-toc--compact">
                <summary className="note-toc__title">
                  <ListTree size={15} aria-hidden="true" /> Dans cette analyse
                  <span className="note-toc__count">{outline.filter((item) => item.level === 2).length} sections</span>
                </summary>
                <TocList toc={toc} />
              </details>

              <aside className="note-toc note-toc--full" aria-labelledby="toc-titre">
                <p className="note-toc__title" id="toc-titre"><ListTree size={15} aria-hidden="true" /> Dans cette analyse</p>
                <TocList toc={toc} />
              </aside>

              <div className="note-main">
                <NoteBody markdown={note.markdown} outline={outline} />

                <aside className="note-author" aria-label="À propos de l’auteur">
                  <Image
                    src="/eurinhash_portrait.png"
                    alt=""
                    width={56}
                    height={56}
                    className="note-author__img"
                  />
                  <div>
                    <p className="note-author__name">Eurin Hash</p>
                    <p className="note-author__line">
                      Ingénierie logicielle, cloud et systèmes. <Link href="/a-propos">Mon parcours</Link>
                      <span aria-hidden="true"> · </span>
                      <Link href="/projets">Mes projets</Link>
                    </p>
                  </div>
                </aside>

                {related.length > 0 && (
                  <section className="note-related" aria-labelledby="related-titre">
                    <h2 id="related-titre">À lire ensuite</h2>
                    <ul>
                      {related.map((item) => (
                        <li key={item.slug}>
                          <Link href={`/notes/${item.slug}`}>
                            <span className="note-related__cat">{categoryLabel(item.category)}</span>
                            <span className="note-related__title">{item.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

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
