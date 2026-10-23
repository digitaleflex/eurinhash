"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COMPETENCES } from "./competences-data";

gsap.registerPlugin(ScrollTrigger);

/* « Mon terrain d’ingénierie » — grille éditoriale minimaliste.
   Colonne éditoriale + 4 cartes en 2×2. Aucun diagramme, aucune connexion.
   Cartes informatives : survol/focus = simple éclaircissement de bordure. */

export function Competences() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });
      tl.from(".comp-eyebrow", { opacity: 0, y: 10, duration: 0.45 }, 0);
      tl.from(".comp-title", { opacity: 0, y: 16, duration: 0.6 }, 0.08);
      tl.from(".comp-intro", { opacity: 0, y: 12, duration: 0.5 }, 0.16);
      tl.from(".comp-para", { opacity: 0, y: 12, duration: 0.5 }, 0.24);
      tl.from(".comp-cta", { opacity: 0, y: 10, duration: 0.45 }, 0.32);
      tl.from(".comp-node", { opacity: 0, y: 18, duration: 0.5, stagger: 0.08 }, 0.4);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="competences" aria-labelledby="competences-titre" ref={rootRef}>
      <div className="container-shell competences-grid">
        <div className="comp-editorial">
          <div className="kicker comp-eyebrow">03 / Domaines d’exploration</div>
          <h2 className="comp-title" id="competences-titre">
            <span>Mon terrain</span>
            <br />
            <span className="comp-title__accent">d’ingénierie.</span>
          </h2>
          <p className="comp-intro">Des disciplines différentes. Une même logique : comprendre, concevoir et construire.</p>
          <p className="comp-para">Je m’intéresse aux systèmes dans leur ensemble : leur architecture, leur fonctionnement, leur sécurité et les possibilités qu’offrent les nouvelles technologies.</p>
          <Link className="comp-cta" href="/services">Explorer mes compétences <ArrowUpRight size={15} /></Link>
        </div>
        <div className="comp-nodes">
          {COMPETENCES.map((c) => {
            const Icon = c.icon;
            return (
              <article key={c.id} className="comp-node">
                <div className="comp-node__num" aria-hidden="true">{c.index}</div>
                <div className="comp-node__head">
                  <Icon size={20} className="comp-node__icon" aria-hidden="true" />
                  <div>
                    <h3 className="comp-node__title">{c.title}</h3>
                    <span className="comp-node__func">{c.fonction}</span>
                  </div>
                </div>
                <p className="comp-node__desc">{c.description}</p>
                {c.tech.length > 0 && (
                  <ul className="comp-tech" aria-label={`Pratiques : ${c.title}`}>
                    {c.tech.map((t) => <li key={t} className="comp-chip">{t}</li>)}
                  </ul>
                )}
                {c.project && (
                  <p className="comp-proj">
                    <span className="comp-proj__label">Projet associé : </span>
                    {c.project.href ? (
                      <Link className="comp-proj__link" href={c.project.href} target="_blank" rel="noreferrer">{c.project.label} <ArrowUpRight size={12} /></Link>
                    ) : (
                      <span className="comp-proj__status">{c.project.label}{c.project.status ? ` (${c.project.status})` : ""}</span>
                    )}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
