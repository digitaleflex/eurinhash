import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const projects = [
  { name: "AURA Storage", status: "En développement", category: "Infrastructure", description: "Un projet personnel consacré au stockage et à la mise à disposition de ressources numériques, avec une attention portée à l’exploitation et à la fiabilité." },
  { name: "HashCode Community", status: "En évolution", category: "Apprentissage & communauté", description: "Un espace d’apprentissage pratique autour du développement web, de la cybersécurité et de l’intelligence artificielle appliquée." },
  { name: "E-Flex", status: "Initiative professionnelle", category: "Ingénierie numérique", description: "Une activité de conseil et d’ingénierie numérique orientée vers la conception et la réalisation de solutions adaptées à des besoins concrets." },
  { name: "Outils & expérimentations", status: "En continu", category: "Développement", description: "Des prototypes, outils et essais techniques qui me permettent de tester des idées, d’approfondir des technologies et de partager les apprentissages." }
];

export default function ProjectsPage() {
  return <>
    <SiteHeader current="/projets" />
    <main>
      <section className="hero"><div className="container-shell hero-content">
        <div className="eyebrow">Portfolio · Projets sélectionnés</div><h1>Ce que je <span className="accent">construis.</span></h1>
        <p>Des projets personnels et des initiatives professionnelles que j’explore, développe ou fais évoluer. Leur présence ici ne signifie pas qu’ils sont tous achevés.</p>
      </div></section>
      <section className="section"><div className="container-shell">
        <div className="kicker">Sélection</div><h2>Du concret, à différents stades.</h2>
        <div className="cards">{projects.map(project => <article className="card" key={project.name}>
          <div className="status">{project.status}</div><h3>{project.name}</h3><p>{project.description}</p>
          <div className="tags"><span>{project.category}</span></div>
        </article>)}</div>
        <p className="intro mt-8">Je complète cette page au fur et à mesure des avancées, des décisions techniques et des retours d’expérience.</p>
        <a className="button secondary mt-5" href="https://github.com/digitaleflex" target="_blank" rel="noreferrer">Explorer mes dépôts <ArrowUpRight size={15} /></a>
      </div></section>
    </main>
    <SiteFooter />
  </>;
}
