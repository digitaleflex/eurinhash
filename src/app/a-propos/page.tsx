import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function AboutPage() {
  return <>
    <SiteHeader current="/a-propos" />
    <main>
      <section className="hero"><div className="container-shell hero-content">
        <div className="eyebrow">À propos</div>
        <h1>Je suis <span className="accent">Eurin Hash.</span></h1>
        <p>Passionné par l’informatique et la construction de systèmes numériques, j’apprends en explorant, en expérimentant et en faisant passer les idées du concept à la pratique.</p>
        <div className="actions"><Link className="button" href="/projets">Découvrir mes projets <ArrowRight size={16} /></Link></div>
      </div></section>
      <section className="section"><div className="container-shell">
        <div className="kicker">Mon approche</div><h2>Comprendre avant de construire.</h2>
        <p className="intro">Je m’intéresse à l’architecture cloud, au développement, à la cybersécurité et à la transformation numérique. J’aime comprendre comment les composants s’assemblent, où se trouvent les contraintes et comment rendre une solution plus claire, plus fiable et plus utile.</p>
        <div className="cards">
          <article className="card"><h3>Apprendre en autonomie</h3><p>Explorer de nouvelles technologies, approfondir les fondamentaux et transformer les découvertes en pratique.</p></article>
          <article className="card"><h3>Construire des systèmes</h3><p>Relier développement, infrastructure, sécurité et documentation dans une approche cohérente.</p></article>
          <article className="card"><h3>Partager les apprentissages</h3><p>Documenter les expériences et contribuer à des espaces où l’on apprend en construisant ensemble.</p></article>
        </div>
      </div></section>
      <section className="section"><div className="container-shell split">
        <div><div className="kicker">Ce site</div><h2>Un espace personnel, pas une vitrine d’entreprise.</h2><p className="intro">J’y rassemble mon parcours, mes projets, mes notes et les sujets que j’explore. Les initiatives auxquelles je contribue y apparaissent comme des projets de mon parcours, avec leur contexte et leur état d’avancement.</p></div>
        <div className="cta"><h2>Suivre mon travail.</h2><p className="intro">Retrouve le code et les expérimentations que je partage sur GitHub.</p><a className="button mt-5" href="https://github.com/digitaleflex" target="_blank" rel="noreferrer">Mon profil GitHub ↗</a></div>
      </div></section>
    </main>
    <SiteFooter />
  </>;
}
