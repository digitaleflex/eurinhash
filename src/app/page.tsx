import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroBackground } from "@/components/hero-background";
import { HeroContent } from "@/components/hero-content";
import { ScrollReveals } from "@/components/scroll-reveals";
import { getPublicNotes } from "@/content/notes";
import { categoryLabel } from "@/lib/notes";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { StackMarquee } from "@/components/stack-marquee";

const FEATURED_COUNT = 3;
const NOTES_COUNT = 2;

export default function Home() {
  const featured = projects.slice(0, FEATURED_COUNT);
  const latestNotes = getPublicNotes().slice(0, NOTES_COUNT);

  return (
    <>
      <SiteHeader current="/" />
      <main id="contenu">
        <ScrollReveals />
        <section className="hero hero--home" id="top">
          <HeroBackground />
          <HeroContent />
        </section>

        <StackMarquee />

        <section className="section" id="projets">
          <div className="container-shell">
            <div className="selected-rule">
              <span className="kicker" data-index="01">Projets phares</span>
            </div>
            <div className="selected-head" data-reveal>
              <h2>Des idées transformées en systèmes concrets.</h2>
              <p className="selected-intro">Une sélection de projets d’ingénierie logicielle, d’infrastructure, d’automatisation et d’expérimentation, choisis pour ce qu’ils m’apprennent à construire.</p>
            </div>
            <div className="selected-grid">
              {featured.map((project, index) => <ProjectCard key={project.id} project={project} index={index} featured={index === 0} />)}
            </div>
            <div className="selected-footer" data-reveal>
              <p>{projects.length} projets documentés au total, du stockage auto-hébergé à l’IA appliquée.</p>
              <Link className="button secondary" href="/projets">Explorer l’ensemble des projets <ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>

        <section className="section" id="a-propos" aria-labelledby="apropos-titre">
          <div className="container-shell about-grid">
            <div className="about-portrait" data-reveal>
              <Image
                src="/eurinhash_portrait.webp"
                alt="Portrait d’Eurin Hash"
                width={1254}
                height={1254}
                sizes="(max-width: 767px) 82vw, (max-width: 1023px) 300px, 400px"
                className="about-portrait__img"
              />
            </div>
            <div className="about-body">
              <div className="kicker" data-index="02" data-reveal>À propos</div>
              <h2 id="apropos-titre" data-reveal>Je veux comprendre ce que je construis.</h2>
              <p data-reveal>Je conçois des logiciels et des infrastructures, du code au déploiement, avec une même exigence : que ça fonctionne vraiment, et que je sache expliquer pourquoi.</p>
              <p data-reveal>Je documente mes choix et mes essais dans mes projets et dans mes notes, pour pouvoir les vérifier et les améliorer.</p>
              <Link className="about-cta" href="/a-propos" data-reveal>Lire mon parcours <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </section>

        <section className="section" id="notes" aria-labelledby="notes-home-titre">
          <div className="container-shell">
            <div className="notes-home-head">
              <div data-reveal>
                <p className="kicker" data-index="03">Notes &amp; analyses</p>
                <h2 id="notes-home-titre">Comprendre les systèmes. Examiner les choix.</h2>
                <p className="notes-home-lead">Des analyses techniques issues de projets réels : architecture, cloud, DevOps, qualité logicielle et systèmes d’apprentissage.</p>
              </div>
              <Link className="notes-link notes-link--muted" href="/notes" data-reveal>Toutes les analyses <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
            <ul className="notes-preview">
              {latestNotes.map((note) => (
                <li key={note.slug} className="notes-preview__item" data-reveal>
                  <span className="notes-preview__cat">
                    {categoryLabel(note.category)} <span aria-hidden="true">·</span> {note.readingTime} min
                  </span>
                  <h3 className="notes-preview__title">
                    <Link href={`/notes/${note.slug}`} className="notes-preview__link">{note.title}</Link>
                  </h3>
                  <p className="notes-preview__desc">{note.description}</p>
                  <span className="notes-preview__cta" aria-hidden="true">Lire l’analyse <ArrowRight size={13} /></span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section--tight">
          <div className="container-shell"><div className="cta" data-reveal>
            <div className="kicker">Échangeons</div><h2>Une idée, une question, un projet ?</h2>
            <p className="intro">Je suis ouvert aux échanges autour du développement logiciel, du cloud, de la cybersécurité et de l’IA appliquée.</p>
            <div className="actions">
              <Link className="button" href="/contact">Entrer en contact <ArrowUpRight size={16} /></Link>
              <a className="button secondary" href="https://github.com/digitaleflex" target="_blank" rel="noreferrer"><Github size={16} /> Voir mon GitHub</a>
            </div>
          </div></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}