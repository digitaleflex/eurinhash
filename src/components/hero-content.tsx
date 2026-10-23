"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { motion, useReducedMotion } from "motion/react";

gsap.registerPlugin(SplitText);

const MotionLink = motion.create(Link);

/* Hero centré : entrée orchestrée par GSAP + SplitText (lignes masquées),
   micro-interactions des boutons par Motion sur des éléments distincts. */

export function HeroContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const title = root.querySelector(".hero-title");
    let split: SplitText | undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(".hero-eyebrow", { opacity: 0, y: 10, duration: 0.5 }, 0.05);

      let firstSplit = true;
      if (title) {
        split = new SplitText(title, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            if (firstSplit) {
              firstSplit = false;
              tl.from(
                self.lines,
                { yPercent: 115, duration: 0.9, stagger: 0.12 },
                0.15
              );
            } else {
              gsap.set(self.lines, { yPercent: 0 });
            }
          },
        });
      }

      tl.from(".hero-desc", { opacity: 0, y: 12, duration: 0.6 }, 0.55);
      tl.from(
        ".hero-btn",
        {
          opacity: 0,
          y: 12,
          duration: 0.5,
          stagger: 0.08,
          clearProps: "all",
        },
        0.7
      );
      tl.from(".hero-tags-group", { opacity: 0, y: 8, duration: 0.5 }, 0.85);
      tl.from(".hero-scroll", { opacity: 0, duration: 0.6 }, 1.0);
    }, root);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  const hover = reduceMotion ? undefined : { y: -2 };
  const tap = reduceMotion ? undefined : { scale: 0.97 };

  return (
    <div ref={rootRef} className="container-shell hero-content">
      <div className="eyebrow hero-eyebrow">Eurin Hash · Ingénierie logicielle &amp; infrastructure</div>
      <h1 className="hero-title">
        <span className="hero-line hero-line--one">De l’idée</span>
        <br />
        <span className="hero-line hero-line--two">au <span className="accent">système.</span></span>
      </h1>
      <p className="hero-desc">Je conçois des logiciels et des infrastructures qui prennent forme dans des projets concrets. Du code au déploiement, je construis, teste et documente des solutions utiles.</p>
      <div className="actions">
        <MotionLink className="button hero-btn hero-btn--one" href="/projets" whileHover={hover} whileTap={tap} transition={{ duration: 0.18 }}>Découvrir mes projets <ArrowUpRight size={16} /></MotionLink>
        <MotionLink className="button secondary hero-btn hero-btn--two" href="/contact" whileHover={hover} whileTap={tap} transition={{ duration: 0.18 }}>Parlons d’un projet <ArrowUpRight size={16} /></MotionLink>
      </div>
      <div className="hero-tags hero-tags-group"><span>Cloud &amp; DevOps</span><span>Développement logiciel</span><span>Cybersécurité</span><span>IA appliquée</span></div>
      <a className="hero-scroll" href="#projets" aria-label="Aller aux projets sélectionnés">
        <span>Défiler pour explorer</span>
        <span className="hero-scroll-hint" aria-hidden="true">↓</span>
      </a>
    </div>
  );
}
