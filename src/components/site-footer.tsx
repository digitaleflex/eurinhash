import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export function SiteFooter() {
  return <footer className="site-footer"><div className="container-shell grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-end">
    <div><Link className="wordmark text-lg" href="/">EURINH<span>A</span>SH</Link>
      <p className="mt-3 max-w-md text-sm leading-6 text-white/45">Le site personnel d’Eurin Hash : parcours, projets, apprentissages et expérimentations en ingénierie numérique.</p>
    </div>
    <div className="flex flex-wrap items-center gap-5 text-sm text-white/55">
      <Link href="/projets">Mes projets</Link><Link href="/services">Compétences</Link><Link href="/a-propos">Mon parcours</Link><Link href="/contact">Contact</Link>
      <a href="https://github.com/digitaleflex" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
      <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
    </div>
  </div>
  <div className="container-shell flex flex-col gap-2 border-t border-white/[0.08] py-5 text-xs text-white/35 sm:flex-row sm:justify-between">
    <span>© {new Date().getFullYear()} Eurin Hash. Tous droits réservés.</span><span>Un espace personnel pour apprendre, construire et partager.</span>
  </div></footer>;
}
