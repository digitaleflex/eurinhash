import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const themes = [
  { label: "Architecture", title: "Choisir une architecture adaptée à un projet", description: "Critères de choix, compromis, évolutivité et limites des solutions trop complexes." },
  { label: "Infrastructure", title: "Construire une infrastructure observable", description: "Premières réflexions autour des métriques, des journaux, de la disponibilité et du diagnostic." },
  { label: "Apprentissage", title: "Apprendre en construisant des projets", description: "Notes sur la documentation, l’expérimentation, la progression et la transmission." }
];

export default function NotesPage() {
  return <>
    <SiteHeader current="/notes" />
    <main>
      <section className="hero"><div className="container-shell hero-content">
        <div className="eyebrow">Notes personnelles</div><h1>Ce que je <span className="accent">comprends.</span></h1>
        <p>Un espace destiné à accueillir mes notes techniques, analyses et retours d’expérience au fil de mes apprentissages.</p>
      </div></section>
      <section className="section"><div className="container-shell">
        <div className="kicker">Thèmes de réflexion</div><h2>Des idées à documenter.</h2>
        <p className="intro">Les éléments ci-dessous sont des sujets prévus, pas des articles déjà publiés. Je les développerai à partir d’expériences concrètes.</p>
        <div className="cards">{themes.map(theme => <article className="card" key={theme.title}><div className="status">{theme.label} · À rédiger</div><h3>{theme.title}</h3><p>{theme.description}</p></article>)}</div>
      </div></section>
    </main>
    <SiteFooter />
  </>;
}
