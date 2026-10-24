import { ArrowUpRight, Github } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function ContactPage() {
  return <>
    <SiteHeader current="/contact" />
    <main id="contenu">
      <section className="hero"><div className="container-shell hero-content">
        <div className="eyebrow">Contact</div><h1>Entrons en <span className="accent">conversation.</span></h1>
        <p>Pour parler de technologie, d’apprentissage, d’ingénierie ou d’un projet numérique, tu peux me retrouver sur GitHub.</p>
        <div className="actions"><a className="button" href="https://github.com/digitaleflex" target="_blank" rel="noreferrer"> <Github size={17} /> Mon profil GitHub <ArrowUpRight size={16} /></a></div>
      </div></section>
      <section className="section"><div className="container-shell">
        <div className="kicker">Avant de me contacter</div><h2>Un message avec du contexte aide.</h2>
        <p className="intro">Présente brièvement le sujet, l’objectif et les contraintes principales. Cela facilite un échange utile, qu’il s’agisse d’une question technique, d’un retour d’expérience ou d’une idée à explorer.</p>
      </div></section>
    </main>
    <SiteFooter />
  </>;
}
