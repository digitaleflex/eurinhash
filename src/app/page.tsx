import Link from "next/link";
import { ArrowRight, ArrowUpRight, Cloud, Code2, Network, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroBackground } from "@/components/hero-background";

const projects = [
  { name: "AURA Storage", status: "En développement", desc: "Un projet d’infrastructure que je construis pour organiser et servir des ressources numériques.", tags: ["Stockage", "Infrastructure"], mark: "AURA" },
  { name: "HashCode", status: "En évolution", desc: "Une communauté et un espace d’apprentissage autour du développement, de la cybersécurité et de l’IA appliquée.", tags: ["Communauté", "Apprentissage"], mark: "HC" },
  { name: "E-Flex", status: "Activité numérique", desc: "Une initiative de conseil et d’ingénierie numérique autour de besoins concrets.", tags: ["Conseil", "Ingénierie"], mark: "EF" }
];

const interests = [
  { icon: Network, title: "Architecture des systèmes", desc: "Penser des systèmes cohérents, maintenables et adaptés à leurs contraintes." },
  { icon: Cloud, title: "Cloud & infrastructure", desc: "Explorer le déploiement, l’automatisation, la fiabilité et l’observabilité." },
  { icon: ShieldCheck, title: "Cybersécurité", desc: "Comprendre les risques et intégrer la sécurité dans la conception technique." },
  { icon: Code2, title: "Développement", desc: "Transformer des idées en outils testables, documentés et utiles." }
];

const steps = [
  ["01", "Comprendre", "Partir du besoin, du contexte et des contraintes."],
  ["02", "Concevoir", "Choisir une approche technique proportionnée."],
  ["03", "Construire", "Développer, tester et documenter."],
  ["04", "Améliorer", "Apprendre du résultat et faire évoluer la solution."]
];

export default function Home() {
  return <>
    <SiteHeader current="/" />
    <main>
      <section className="hero">
        <HeroBackground />
        <div className="container-shell hero-content">
          <div className="eyebrow hero-eyebrow">Eurin Hash · Ingénierie numérique & apprentissage</div>
          <h1 className="hero-title">
            <span className="hero-line hero-line--one">De l’idée</span>
            <br />
            <span className="hero-line hero-line--two">au <span className="accent hero-accent">système.</span></span>
          </h1>
          <p className="hero-desc">Je suis Eurin Hash. Je conçois et construis des solutions numériques, j’explore l’architecture des systèmes et j’apprends en faisant.</p>
          <div className="actions">
            <Link className="button hero-btn hero-btn--one" href="/projets">Voir mes projets <ArrowRight size={16} /></Link>
            <Link className="button secondary hero-btn hero-btn--two" href="/contact">Me contacter <ArrowUpRight size={16} /></Link>
          </div>
          <div className="hero-tags hero-tags-group"><span>Architecture</span><span>Cloud & infrastructure</span><span>Cybersécurité</span><span>Développement</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container-shell">
          <div className="kicker">Projets personnels</div>
          <h2>Ce que j’explore et construis.</h2>
          <p className="intro">Une sélection de projets qui reflètent mes intérêts, mes expérimentations et ma progression technique.</p>
          <div className="cards">{projects.map(p => <article className="card" key={p.name}>
            <div className="card-mark">{p.mark}</div><div className="status">{p.status}</div><h3>{p.name}</h3><p>{p.desc}</p>
            <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
          </article>)}</div>
          <Link className="button secondary mt-7" href="/projets">Parcourir mes projets <ArrowRight size={15} /></Link>
        </div>
      </section>

      <section className="section">
        <div className="container-shell">
          <div className="kicker">Compétences & centres d’intérêt</div>
          <h2>Relier la réflexion à la pratique.</h2>
          <p className="intro">Les domaines dans lesquels je développe mes compétences et mène mes expérimentations.</p>
          <div className="service-grid">{interests.map(({ icon: Icon, title, desc }) => <article className="card" key={title}>
            <Icon size={23} color="#69a9ff" /><h3>{title}</h3><p>{desc}</p>
          </article>)}</div>
          <Link className="button secondary mt-7" href="/services">Voir mes compétences <ArrowRight size={15} /></Link>
        </div>
      </section>

      <section className="section">
        <div className="container-shell">
          <div className="kicker">Ma méthode</div><h2>Apprendre en construisant.</h2>
          <p className="intro">Une démarche simple qui m’aide à garder le cap dans mes projets, même lorsque les contraintes sont fortes.</p>
          <div className="steps">{steps.map(([n, title, desc]) => <article className="step" key={n}>
            <span className="step-num">{n}</span><h3>{title}</h3><p>{desc}</p>
          </article>)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container-shell split">
          <div><div className="kicker">À propos de moi</div><h2>La technologie, par curiosité et par pratique.</h2>
            <p className="intro">Mon site personnel rassemble mon parcours, mes réflexions et les projets sur lesquels je travaille. J’y partage ce que j’apprends, les problèmes que j’explore et les solutions que je tente de construire.</p>
            <Link className="button secondary mt-6" href="/a-propos">Découvrir mon parcours <ArrowRight size={15} /></Link>
          </div>
          <div><div className="kicker">Notes & analyses</div><h2>Idées en cours d’exploration.</h2>
            <article className="note"><small>Architecture · À venir</small><h3>Comment choisir une architecture adaptée à un projet ?</h3></article>
            <article className="note"><small>Infrastructure · À venir</small><h3>Les bases d’une infrastructure fiable et observable</h3></article>
            <Link className="mt-5 inline-flex items-center gap-2 text-accent-soft" href="/notes">Lire mes notes <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-shell"><div className="cta">
          <div className="kicker">Échangeons</div><h2>Une idée, une question, un projet ?</h2>
          <p className="intro">Je suis ouvert aux échanges autour de la technologie, de l’ingénierie et des projets numériques.</p>
          <Link className="button mt-5" href="/contact">Entrer en contact <ArrowUpRight size={16} /></Link>
        </div></div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
