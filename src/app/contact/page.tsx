import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, Cloud, Code2, Github, Mail, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { ScrollReveals } from "@/components/scroll-reveals";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une idée, une question technique ou un projet numérique ? Voici comment me joindre et quoi préciser pour un échange utile.",
  alternates: { canonical: "/contact" }
};

/* Renseigner une adresse publique pour afficher la carte « E-mail ». Laissée vide, la carte n’apparaît pas. */
const CONTACT_EMAIL = "";

const topics = [
  { icon: Code2, label: "Développement logiciel" },
  { icon: Cloud, label: "Cloud & DevOps" },
  { icon: ShieldCheck, label: "Cybersécurité" },
  { icon: Bot, label: "IA appliquée" }
];

const brief = [
  { n: "01", title: "Le sujet", text: "Une phrase pour situer le contexte : produit, infrastructure, apprentissage, question technique." },
  { n: "02", title: "L’objectif", text: "Ce que tu cherches à obtenir : un avis, un échange, une collaboration, un retour d’expérience." },
  { n: "03", title: "Les contraintes", text: "Délais, technologies imposées, budget ou niveau de sécurité attendu, si c’est pertinent." }
];

export default function ContactPage() {
  return <>
    <SiteHeader current="/contact" />
    <main id="contenu">
      <ScrollReveals />
      <PageHero eyebrow="Contact" title={<>Entrons en <span className="accent">conversation.</span></>}>
        <p>Pour parler de technologie, d’ingénierie, d’apprentissage ou d’un projet numérique, je suis disponible. Choisis le canal qui te convient.</p>
        <ul className="topic-list" aria-label="Sujets d’échange">
          {topics.map(({ icon: Icon, label }) => <li key={label}><Icon size={15} aria-hidden="true" /> {label}</li>)}
        </ul>
      </PageHero>

      <section className="section" aria-labelledby="canaux-titre">
        <div className="container-shell">
          <div className="kicker" data-index="01">Me joindre</div>
          <h2 id="canaux-titre" data-reveal>Les canaux directs.</h2>
          <div className="channel-grid">
            <a className="channel" href="https://github.com/digitaleflex" target="_blank" rel="noreferrer" data-reveal>
              <span className="channel__icon"><Github size={22} aria-hidden="true" /></span>
              <span className="channel__body"><span className="channel__label">GitHub</span><span className="channel__value">github.com/digitaleflex</span><span className="channel__hint">Code, projets et issues</span></span>
              <ArrowUpRight size={18} className="channel__arrow" aria-hidden="true" />
            </a>
            {CONTACT_EMAIL && (
              <a className="channel" href={`mailto:${CONTACT_EMAIL}`} data-reveal data-reveal-delay={0.06}>
                <span className="channel__icon"><Mail size={22} aria-hidden="true" /></span>
                <span className="channel__body"><span className="channel__label">E-mail</span><span className="channel__value">{CONTACT_EMAIL}</span><span className="channel__hint">Pour un projet ou une collaboration</span></span>
                <ArrowUpRight size={18} className="channel__arrow" aria-hidden="true" />
              </a>
            )}
            <Link className="channel" href="/projets" data-reveal data-reveal-delay={0.12}>
              <span className="channel__icon"><ArrowRight size={22} aria-hidden="true" /></span>
              <span className="channel__body"><span className="channel__label">Avant d’écrire</span><span className="channel__value">Parcourir mes projets</span><span className="channel__hint">Pour voir comment je travaille</span></span>
              <ArrowUpRight size={18} className="channel__arrow" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="brief-titre">
        <div className="container-shell">
          <div className="kicker" data-index="02">Avant de me contacter</div>
          <h2 id="brief-titre" data-reveal>Un message avec du contexte aide.</h2>
          <p className="intro" data-reveal>Trois éléments suffisent pour un échange utile dès le premier message.</p>
          <ol className="brief">{brief.map((b, i) => <li key={b.n} className="card card--lift" data-reveal data-reveal-delay={i * 0.06}>
            <span className="brief__n">{b.n}</span><h3>{b.title}</h3><p>{b.text}</p>
          </li>)}</ol>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
