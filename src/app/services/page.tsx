import Link from "next/link";
import { ArrowRight, Cloud, Code2, Network, ShieldCheck, BookOpen } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const areas = [
  { icon: Network, title: "Architecture des systèmes", desc: "Décomposer un problème, définir les composants d’une solution et réfléchir à ses compromis techniques." },
  { icon: Cloud, title: "Cloud & infrastructure", desc: "Explorer le déploiement, la conteneurisation, les reverse proxies, le stockage et l’observabilité." },
  { icon: ShieldCheck, title: "Cybersécurité", desc: "Étudier les risques, les méthodes de vérification et les pratiques qui renforcent la sécurité des systèmes." },
  { icon: Code2, title: "Développement logiciel", desc: "Concevoir des applications, prototyper des fonctionnalités et travailler avec des bases de code structurées." },
  { icon: BookOpen, title: "Documentation & transmission", desc: "Organiser les connaissances, écrire des guides et transformer les expériences en supports d’apprentissage." }
];

export default function SkillsPage() {
  return <>
    <SiteHeader current="/services" />
    <main id="contenu">
      <section className="hero"><div className="container-shell hero-content">
        <div className="eyebrow">Compétences & centres d’intérêt</div><h1>Les domaines que <span className="accent">j’explore.</span></h1>
        <p>Cette page décrit mes axes de travail et d’apprentissage. Elle présente des compétences en développement, pas un catalogue de prestations commerciales.</p>
      </div></section>
      <section className="section"><div className="container-shell">
        <div className="kicker">Domaines techniques</div><h2>Relier les disciplines.</h2>
        <div className="service-grid">{areas.map(({icon: Icon, title, desc}) => <article className="card" key={title}><Icon size={23} color="#69a9ff" /><h3>{title}</h3><p>{desc}</p></article>)}</div>
      </div></section>
      <section className="section"><div className="container-shell split">
        <div><div className="kicker">Ma démarche</div><h2>La pratique comme fil conducteur.</h2><p className="intro">Je privilégie les projets concrets, la documentation et les tests. Cette démarche me permet de vérifier mes hypothèses et d’identifier ce qu’il me reste à apprendre.</p></div>
        <div><div className="kicker">À découvrir</div><h2>La théorie mise en pratique.</h2><p className="intro">Parcours les projets pour voir comment ces domaines se croisent dans des réalisations et expérimentations concrètes.</p><Link className="button secondary mt-5" href="/projets">Voir les projets <ArrowRight size={15} /></Link></div>
      </div></section>
    </main>
    <SiteFooter />
  </>;
}
