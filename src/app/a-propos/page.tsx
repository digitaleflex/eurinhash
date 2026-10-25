import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, BookOpen, Cloud, Code2, Github, Network, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { ScrollReveals } from "@/components/scroll-reveals";

export const metadata: Metadata = {
  title: "Mon parcours",
  description: "Entrepreneur dans le numérique et autodidacte, j’apprends en construisant : développement, cloud, cybersécurité et architecture des systèmes.",
  alternates: { canonical: "/a-propos" }
};

const values = [
  { icon: BookOpen, title: "Apprendre continuellement", text: "Approfondir les fondamentaux, étudier de nouvelles technologies et transformer les connaissances en pratique." },
  { icon: Network, title: "Penser en systèmes", text: "Relier application, données, infrastructure, sécurité et expérience utilisateur au lieu de les traiter isolément." },
  { icon: Code2, title: "Partager ce qui fonctionne", text: "Documenter les choix, les essais et les leçons tirées des projets pour rendre les apprentissages réutilisables." }
];

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
      <ScrollReveals />
      <PageHero
        eyebrow="Mon parcours"
        title={<>Je suis <span className="accent">Eurin Hash.</span></>}
        aside={<figure className="hero-portrait">
          <Image src="/eurinhash_portrait.png" alt="Portrait d’Eurin Hash" width={1254} height={1254} priority sizes="(max-width: 900px) 70vw, 380px" />
          <figcaption><span className="hero-portrait__dot" aria-hidden="true" /> Ingénierie logicielle &amp; infrastructure</figcaption>
        </figure>}
      >
        <p>Entrepreneur dans le numérique, passionné d’informatique et autodidacte, je m’intéresse à la manière dont la technologie peut répondre à des besoins réels. J’apprends en construisant, en testant et en documentant.</p>
        <div className="actions">
          <Link className="button" href="/projets">Voir mes projets <ArrowRight size={16} /></Link>
          <Link className="button secondary" href="/contact">Entrer en contact</Link>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="esprit-titre">
        <div className="container-shell">
          <div className="kicker" data-index="01">Mon état d’esprit</div>
          <h2 id="esprit-titre" data-reveal>Rester curieux. Construire avec méthode.</h2>
          <p className="intro" data-reveal>Je préfère comprendre un problème avant de choisir un outil. Mon approche relie apprentissage autonome, expérimentation technique et recherche de solutions durables. Je m’intéresse autant aux choix d’architecture qu’aux détails d’implémentation, à la sécurité et à l’exploitation quotidienne des systèmes.</p>
          <div className="cards">{values.map(({ icon: Icon, title, text }, i) => <article className="card card--lift" key={title} data-reveal data-reveal-delay={i * 0.06}>
            <span className="card-icon"><Icon size={20} aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p>
          </article>)}</div>
        </div>
      </section>

      <section className="section section--alt" aria-label="Citation">
        <div className="container-shell">
          <blockquote className="big-quote" data-reveal>
            <p>« Ce qui m’intéresse, ce n’est pas d’accumuler des technologies. C’est de comprendre quand les utiliser, pourquoi les choisir et comment les faire fonctionner ensemble. »</p>
            <footer>Eurin Hash</footer>
          </blockquote>
        </div>
      </section>

      <section className="section" aria-labelledby="interets-titre">
        <div className="container-shell">
          <div className="kicker" data-index="02">Mes domaines d’intérêt</div>
          <h2 id="interets-titre" data-reveal>Des disciplines qui se complètent.</h2>
          <div className="service-grid">{focusAreas.map(({ icon: Icon, title, description }, i) => <article className="card card--lift" key={title} data-reveal data-reveal-delay={i * 0.06}>
            <span className="card-icon"><Icon size={20} aria-hidden="true" /></span><h3>{title}</h3><p>{description}</p>
          </article>)}</div>
        </div>
      </section>

      <section className="section" aria-labelledby="espace-titre">
        <div className="container-shell split">
          <div data-reveal><div className="kicker" data-index="03">Ce que tu trouveras ici</div><h2 id="espace-titre">Un espace qui suit mon parcours.</h2>
            <p className="intro">Ce site rassemble mes projets, mes compétences en développement, mes notes et les sujets que j’explore. Les projets présentés sont à différents stades : certains sont en développement, d’autres sont des expérimentations ou des initiatives plus larges.</p>
            <div className="actions"><Link className="button secondary" href="/notes">Lire mes notes <ArrowRight size={15} /></Link></div>
          </div>
          <div className="cta" data-reveal><div className="kicker">Mon code &amp; mes expériences</div><h2>La pratique est au centre.</h2>
            <p className="intro">Retrouve mes dépôts et les projets que je partage sur GitHub.</p>
            <div className="actions"><a className="button" href="https://github.com/digitaleflex" target="_blank" rel="noreferrer"><Github size={16} /> Mon profil GitHub <ArrowUpRight size={16} /></a></div>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
