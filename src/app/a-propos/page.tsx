import Link from "next/link";
import { ArrowRight, BookOpen, Cloud, Code2, Network, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const focusAreas = [
  { icon: Code2, title: "Développement", description: "Concevoir des applications et transformer des idées en fonctionnalités concrètes." },
  { icon: Cloud, title: "Cloud & infrastructure", description: "Déployer, organiser et maintenir des services numériques fiables." },
  { icon: ShieldCheck, title: "Cybersécurité", description: "Intégrer la sécurité dans la réflexion technique et apprendre à évaluer les risques." },
  { icon: Network, title: "Architecture", description: "Comprendre les interactions entre les composants et les compromis d’un système." }
];

export default function AboutPage() {
  return <>
    <SiteHeader current="/a-propos" />
    <main id="contenu">
      <section className="hero"><div className="container-shell hero-content">
        <div className="eyebrow">Profil personnel</div>
        <h1>Je suis <span className="accent">Eurin Hash.</span></h1>
        <p>Entrepreneur dans le numérique, passionné d’informatique et autodidacte, je m’intéresse à la manière dont la technologie peut répondre à des besoins réels. J’apprends en construisant, en testant et en documentant.</p>
        <div className="actions">
          <Link className="button" href="/projets">Voir mes projets <ArrowRight size={16} /></Link>
          <Link className="button secondary" href="/contact">Entrer en contact</Link>
        </div>
      </div></section>
      <section className="section"><div className="container-shell">
        <div className="kicker">Mon état d’esprit</div><h2>Rester curieux. Construire avec méthode.</h2>
        <p className="intro">Je préfère comprendre un problème avant de choisir un outil. Mon approche relie apprentissage autonome, expérimentation technique et recherche de solutions durables. Je m’intéresse autant aux choix d’architecture qu’aux détails d’implémentation, à la sécurité et à l’exploitation quotidienne des systèmes.</p>
        <div className="cards">
          <article className="card"><BookOpen size={23} color="#69a9ff" /><h3>Apprendre continuellement</h3><p>Approfondir les fondamentaux, étudier de nouvelles technologies et transformer les connaissances en pratique.</p></article>
          <article className="card"><Network size={23} color="#69a9ff" /><h3>Penser en systèmes</h3><p>Relier application, données, infrastructure, sécurité et expérience utilisateur au lieu de les traiter isolément.</p></article>
          <article className="card"><Code2 size={23} color="#69a9ff" /><h3>Partager ce qui fonctionne</h3><p>Documenter les choix, les essais et les leçons tirées des projets pour rendre les apprentissages réutilisables.</p></article>
        </div>
      </div></section>
      <section className="section"><div className="container-shell">
        <div className="kicker">Mes domaines d’intérêt</div><h2>Des disciplines qui se complètent.</h2>
        <div className="service-grid">{focusAreas.map(({icon: Icon, title, description}) => <article className="card" key={title}>
          <Icon size={23} color="#69a9ff" /><h3>{title}</h3><p>{description}</p>
        </article>)}</div>
      </div></section>
      <section className="section"><div className="container-shell split">
        <div><div className="kicker">Ce que tu trouveras ici</div><h2>Un espace qui suit mon parcours.</h2>
          <p className="intro">Ce site rassemble mes projets, mes compétences en développement, mes notes et les sujets que j’explore. Les projets présentés sont à différents stades : certains sont en développement, d’autres sont des expérimentations ou des initiatives plus larges.</p>
          <Link className="button secondary mt-5" href="/notes">Lire mes notes <ArrowRight size={15} /></Link>
        </div>
        <div className="cta"><div className="kicker">Mon code & mes expériences</div><h2>La pratique est au centre.</h2>
          <p className="intro">Retrouve mes dépôts et les projets que je partage sur GitHub.</p>
          <a className="button mt-5" href="https://github.com/digitaleflex" target="_blank" rel="noreferrer">Mon profil GitHub ↗</a>
        </div>
      </div></section>
    </main>
    <SiteFooter />
  </>;
}
