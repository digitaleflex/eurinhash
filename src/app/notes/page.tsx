import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NotesBrowser } from "@/components/notes/notes-browser";
import { getPublicNotes } from "@/content/notes";

export const metadata: Metadata = {
  title: "Notes & analyses",
  description:
    "Analyses techniques issues de projets réels : architecture, cloud, DevOps, fiabilité, qualité logicielle et systèmes d’apprentissage.",
  alternates: { canonical: "/notes" },
  openGraph: {
    type: "website",
    title: "Notes & analyses — Eurin Hash",
    description:
      "Comprendre les systèmes. Examiner les choix : analyses techniques sur le logiciel, le cloud, le DevOps et l’ingénierie pédagogique.",
    url: "/notes",
  },
};

export default function NotesPage() {
  const notes = getPublicNotes();

  return (
    <>
      <SiteHeader current="/notes" />
      <main id="contenu">
        <section className="notes-hero">
          <div className="container-shell">
            <p className="notes-ident">EURINHASH / RESEARCH</p>
            <h1 className="notes-hero__title">Comprendre les systèmes. Examiner les choix.</h1>
            <p className="notes-hero__desc">
              Des analyses techniques issues de projets réels, de décisions d’ingénierie et d’expérimentations autour du logiciel, du cloud, du DevOps et des systèmes d’apprentissage.
            </p>
            <div className="notes-hero__actions">
              <a className="notes-link" href="#analyses">Explorer les analyses <ArrowDown size={15} aria-hidden="true" /></a>
              <a className="notes-link notes-link--muted" href="#demarche">Ma démarche <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className="section" id="analyses" aria-labelledby="analyses-titre">
          <div className="container-shell">
            <div className="notes-section-head">
              <p className="notes-eyebrow">Publications</p>
              <h2 id="analyses-titre">Analyses à la une</h2>
              <p className="notes-lead">
                Chaque note documente un raisonnement technique, ses hypothèses et ses limites. Les versions de travail sont signalées comme telles.
              </p>
            </div>
            <NotesBrowser notes={notes} />
          </div>
        </section>

        <section className="section" id="demarche" aria-labelledby="demarche-titre">
          <div className="container-shell notes-demarche">
            <div>
              <p className="notes-eyebrow">Méthode</p>
              <h2 id="demarche-titre">Ma démarche</h2>
            </div>
            <div className="notes-demarche__body">
              <p>Je m’intéresse autant au fonctionnement d’un système qu’aux raisons pour lesquelles il a été conçu de cette manière.</p>
              <p>Mes analyses partent de problèmes concrets : une architecture à faire évoluer, un déploiement à fiabiliser, une intégration à vérifier ou un parcours d’apprentissage à structurer.</p>
              <p>Je cherche à distinguer les hypothèses des faits observés, à examiner les compromis et à documenter les conclusions à l’aide de preuves lorsque cela est possible.</p>
              <p>Ces notes ne prétendent pas proposer une solution universelle à chaque problème. Elles documentent un raisonnement technique, ses limites et les enseignements qu’il permet de tirer.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-shell notes-footer-nav">
            <p>Les analyses s’appuient sur des projets documentés et publiés.</p>
            <div className="notes-footer-nav__links">
              <Link className="notes-link notes-link--muted" href="/projets">Voir les projets <ArrowUpRight size={15} aria-hidden="true" /></Link>
              <Link className="notes-link notes-link--muted" href="/">Retour à l’accueil <ArrowUpRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
