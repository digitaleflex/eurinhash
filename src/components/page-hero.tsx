import type { ReactNode } from "react";

/* Hero des pages internes : grille technique + halo, contenu à gauche,
   colonne optionnelle à droite (portrait, chiffres, encart). */

export function PageHero({ eyebrow, title, children, aside }: { eyebrow: string; title: ReactNode; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section className={aside ? "hero page-hero page-hero--split" : "hero page-hero"}>
      <div className="page-hero__bg" aria-hidden="true"><span className="page-hero__grid" /><span className="page-hero__glow" /></div>
      <div className="container-shell page-hero__inner">
        <div className="hero-content">
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          {children}
        </div>
        {aside && <div className="page-hero__aside">{aside}</div>}
      </div>
    </section>
  );
}
