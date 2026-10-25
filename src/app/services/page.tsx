import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Boxes, Database, Layers, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { ScrollReveals } from "@/components/scroll-reveals";
import { COMPETENCES } from "@/components/competences-data";

export const metadata: Metadata = {
  title: "Compétences",
  description: "Architecture des systèmes, cloud & DevOps, cybersécurité, développement logiciel et IA appliquée : les domaines que je pratique et les outils que j’utilise.",
  alternates: { canonical: "/services" }
};

/* Uniquement des outils présents dans les projets publiés. */
const toolbox = [
  { icon: Layers, title: "Applications", items: ["Next.js", "React", "TypeScript", "Prisma", "BetterAuth"] },
  { icon: Boxes, title: "Infrastructure", items: ["Docker", "Docker Compose", "Traefik", "Reverse proxy", "Observabilité"] },
  { icon: Database, title: "Données & stockage", items: ["PostgreSQL", "MariaDB", "Redis", "SeaweedFS", "Stockage S3"] },
  { icon: Sparkles, title: "IA appliquée", items: ["Agents IA", "Évaluation de modèles", "Benchmarks", "Prototypes"] }
];

export default function SkillsPage() {
  return <>
    <SiteHeader current="/services" />
    <main id="contenu">
      <ScrollReveals />
      <PageHero eyebrow="Compétences & domaines" title={<>Les domaines que <span className="accent">je pratique.</span></>}>
        <p>Je travaille à la jonction du logiciel et de l’infrastructure : concevoir une application, la déployer proprement, la sécuriser et la rendre observable. Chaque compétence ci-dessous est reliée à un projet réel.</p>
        <div className="actions">
          <Link className="button" href="/projets">Voir les projets <ArrowRight size={16} /></Link>
          <Link className="button secondary" href="/contact">Discuter d’un besoin</Link>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="domaines-titre">
        <div className="container-shell">
          <div className="kicker" data-index="01">Domaines techniques</div>
          <h2 id="domaines-titre" data-reveal>Relier les disciplines.</h2>
          <p className="intro" data-reveal>Quatre domaines, une même logique : comprendre le système dans son ensemble avant d’en optimiser une partie.</p>
          <div className="comp-nodes comp-nodes--page">
            {COMPETENCES.map((c, i) => {
              const Icon = c.icon;
              return (
                <article key={c.id} className="comp-node" data-reveal data-reveal-delay={i * 0.06}>
                  <div className="comp-node__num" aria-hidden="true">{c.index}</div>
                  <div className="comp-node__head">
                    <Icon size={20} className="comp-node__icon" aria-hidden="true" />
                    <div><h3 className="comp-node__title">{c.title}</h3><span className="comp-node__func">{c.fonction}</span></div>
                  </div>
                  <p className="comp-node__desc">{c.description}</p>
                  <ul className="comp-tech" aria-label={`Pratiques : ${c.title}`}>{c.tech.map((t) => <li key={t} className="comp-chip">{t}</li>)}</ul>
                  {c.project && (
                    <p className="comp-proj">
                      <span className="comp-proj__label">Projet associé : </span>
                      {c.project.href
                        ? <a className="comp-proj__link" href={c.project.href} target="_blank" rel="noreferrer">{c.project.label} <ArrowUpRight size={12} /></a>
                        : <span className="comp-proj__status">{c.project.label}{c.project.status ? ` (${c.project.status})` : ""}</span>}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="outils-titre">
        <div className="container-shell">
          <div className="kicker" data-index="02">Boîte à outils</div>
          <h2 id="outils-titre" data-reveal>Les outils que j’utilise vraiment.</h2>
          <p className="intro" data-reveal>Pas une liste de mots-clés : uniquement des technologies mises en œuvre dans mes projets.</p>
          <div className="toolbox">{toolbox.map(({ icon: Icon, title, items }, i) => (
            <article className="toolbox__group" key={title} data-reveal data-reveal-delay={i * 0.06}>
              <h3><Icon size={18} aria-hidden="true" /> {title}</h3>
              <ul>{items.map((t) => <li key={t}>{t}</li>)}</ul>
            </article>
          ))}</div>
        </div>
      </section>

      <section className="section" aria-labelledby="transmission-titre">
        <div className="container-shell split">
          <div data-reveal>
            <div className="kicker" data-index="03">Documentation &amp; transmission</div>
            <h2 id="transmission-titre">Ce qui n’est pas documenté n’existe pas vraiment.</h2>
          </div>
          <div data-reveal>
            <p className="intro">J’écris des guides, des notes d’architecture et des retours d’expérience pour rendre les choix techniques lisibles et réutilisables. C’est aussi ma manière de vérifier que j’ai compris.</p>
            <div className="actions"><Link className="button secondary" href="/notes"><BookOpen size={16} /> Lire mes analyses</Link></div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container-shell"><div className="cta" data-reveal>
          <div className="kicker">Collaborer</div><h2>Une compétence t’intéresse ?</h2>
          <p className="intro">Parlons de ton contexte, de tes contraintes et de ce qui doit vraiment être résolu.</p>
          <div className="actions"><Link className="button" href="/contact">Entrer en contact <ArrowUpRight size={16} /></Link></div>
        </div></div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
