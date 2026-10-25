import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { ScrollReveals } from "@/components/scroll-reveals";
import { initiatives, projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Mes projets",
  description: "Projets d’ingénierie logicielle, d’infrastructure, de DevOps, d’IA appliquée et de cybersécurité : AURA Storage, WPOpsX, HashCode Reboot, EurinHash AI Lab, JoinHashCode.",
  alternates: { canonical: "/projets" }
};

const domains = new Set(projects.map((p) => p.category.split(" & ")[0]));
const techCount = new Set(projects.flatMap((p) => p.tech)).size;

export default function ProjectsPage() {
  return <>
    <SiteHeader current="/projets" />
    <main id="contenu">
      <ScrollReveals />
      <PageHero
        eyebrow="Portfolio · Projets"
        title={<>Ce que je <span className="accent">construis.</span></>}
        aside={<dl className="hero-stats">
          <div><dt>Projets documentés</dt><dd>{String(projects.length).padStart(2, "0")}</dd></div>
          <div><dt>Domaines couverts</dt><dd>{String(domains.size).padStart(2, "0")}</dd></div>
          <div><dt>Technologies mobilisées</dt><dd>{techCount}</dd></div>
        </dl>}
      >
        <p>Des systèmes conçus, déployés et documentés : stockage auto-hébergé, exploitation conteneurisée, plateformes full-stack et expérimentations en IA. Certains sont aboutis, d’autres en construction, et c’est assumé.</p>
        <div className="actions">
          <a className="button" href="#projets-liste">Parcourir les projets <ArrowRight size={16} /></a>
          <a className="button secondary" href="https://github.com/digitaleflex" target="_blank" rel="noreferrer"><Github size={16} /> Mes dépôts GitHub</a>
        </div>
      </PageHero>

      <section className="section" id="projets-liste" aria-labelledby="projets-titre">
        <div className="container-shell">
          <div className="selected-rule"><span className="kicker" data-index="01">Projets en vitrine</span></div>
          <div className="selected-head" data-reveal>
            <h2 id="projets-titre">Du concret, à différents stades.</h2>
            <p className="selected-intro">Chaque projet répond à une question technique précise. Pour chacun : le contexte, les points clés travaillés et la pile utilisée.</p>
          </div>
          <div className="selected-grid">
            {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} featured={index === 0} showFocus />)}
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="initiatives-titre">
        <div className="container-shell">
          <div className="kicker" data-index="02">Au-delà des dépôts</div>
          <h2 id="initiatives-titre" data-reveal>Initiatives &amp; expérimentations.</h2>
          <p className="intro" data-reveal>Des activités plus larges qui nourrissent les projets : conseil, communauté et prototypes.</p>
          <div className="cards">{initiatives.map((item, i) => <article className="card card--lift" key={item.name} data-reveal data-reveal-delay={i * 0.06}>
            <div className="status">{item.status}</div><h3>{item.name}</h3><p>{item.description}</p>
          </article>)}</div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container-shell"><div className="cta" data-reveal>
          <div className="kicker">Un projet en tête ?</div><h2>Parlons de ce que tu veux construire.</h2>
          <p className="intro">Architecture, déploiement, fiabilisation ou prototype : je suis ouvert aux échanges et aux collaborations.</p>
          <div className="actions"><Link className="button" href="/contact">Entrer en contact <ArrowUpRight size={16} /></Link></div>
        </div></div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
