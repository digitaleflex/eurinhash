"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/* Couche 2 — Réseau GSAP au-dessus du fond /globe_hero.webp.
   Orbites, signaux, nœuds et halos : éléments SVG/CSS séparés,
   animés en continu. La couche 1 (photo) reste fonctionnelle sans JS. */

const NODES = [
  { cx: 990, cy: 165, r: 2.4, tone: "cyan" },
  { cx: 1085, cy: 355, r: 2.8, tone: "blue" },
  { cx: 930, cy: 330, r: 2.2, tone: "pale" },
  { cx: 955, cy: 490, r: 2.2, tone: "cyan" },
  { cx: 835, cy: 205, r: 2.4, tone: "blue" },
  { cx: 1140, cy: 430, r: 1.8, tone: "pale" },
  { cx: 1010, cy: 420, r: 1.6, tone: "cyan" },
  { cx: 880, cy: 545, r: 1.7, tone: "pale" },
];

export function HeroNetworkAnimation() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      // Séquence initiale unique : fondu de la couche réseau.
      gsap.fromTo(
        root,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power1.out" }
      );

      // Orbites : rotations très lentes, sens et vitesses distincts.
      gsap.to(".hero-orbit--primary", {
        rotation: 360,
        duration: 90,
        repeat: -1,
        ease: "none",
        svgOrigin: "930 330",
      });
      gsap.to(".hero-orbit--secondary", {
        rotation: -360,
        duration: 120,
        repeat: -1,
        ease: "none",
        svgOrigin: "930 330",
      });
      gsap.to(".hero-orbit--tertiary", {
        rotation: 360,
        duration: 70,
        repeat: -1,
        ease: "none",
        svgOrigin: "930 330",
      });
      gsap.to(".hero-orbit", {
        opacity: 0.35,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 1.2, from: "random" },
      });

      // Nœuds : pulsations douces désynchronisées (opacity + scale uniquement).
      gsap.to(".hero-node", {
        opacity: 0.4,
        scale: 0.65,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.35, from: "random" },
        transformOrigin: "50% 50%",
      });

      // Signaux : circulation le long des trajectoires, espacée et progressive.
      gsap.fromTo(
        ".hero-signal",
        { strokeDashoffset: 120 },
        {
          strokeDashoffset: 0,
          duration: 3.2,
          repeat: -1,
          repeatDelay: 1.6,
          ease: "none",
          stagger: 0.9,
        }
      );

      // Halos : variation faible d’opacité et léger déplacement.
      gsap.to(".hero-halo--a", {
        opacity: 0.55,
        x: 14,
        y: -10,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".hero-halo--b", {
        opacity: 0.4,
        x: -12,
        y: 12,
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="hero-network" aria-hidden="true">
      <div className="hero-halo hero-halo--a" />
      <div className="hero-halo hero-halo--b" />
      <svg
        className="hero-network__svg"
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMaxYMid slice"
        focusable="false"
      >
        <g className="hero-orbit-group" fill="none">
          <ellipse
            className="hero-orbit hero-orbit--primary"
            cx="930"
            cy="330"
            rx="298"
            ry="112"
            transform="rotate(-24 930 330)"
          />
          <ellipse
            className="hero-orbit hero-orbit--secondary"
            cx="930"
            cy="330"
            rx="232"
            ry="86"
            transform="rotate(38 930 330)"
          />
          <circle className="hero-orbit hero-orbit--tertiary" cx="930" cy="330" r="208" />
        </g>
        <g className="hero-signal-group" fill="none">
          <path className="hero-signal hero-signal--a" d="M990 165 L1055 245 L1085 355" />
          <path className="hero-signal hero-signal--b" d="M880 545 L955 490 L1010 420" />
          <path className="hero-signal hero-signal--c" d="M1165 300 L1140 430 L1060 520" />
        </g>
        <g className="hero-node-group">
          {NODES.map((n) => (
            <circle
              key={`${n.cx}-${n.cy}`}
              className={`hero-node hero-node--${n.tone}`}
              cx={n.cx}
              cy={n.cy}
              r={n.r}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
