"use client";

import { useEffect, useRef } from "react";

/* Couche décorative du Hero : réseau de systèmes + structure orbitale.
   Purement visuelle (aria-hidden, pointer-events:none) et désactivée
   pour le parallaxe si l'appareil est tactile ou si l'utilisateur
   préfère des animations réduites. */

type NetworkNode = {
  x: number;
  y: number;
  r: number;
  accent?: boolean;
  detail?: boolean;
  pulse?: { delay: string; duration: string };
};

type Edge = [number, number, number, number, number];

const nodes: NetworkNode[] = [
  { x: 905, y: 105, r: 1.6 },
  { x: 990, y: 165, r: 2.2, accent: true, pulse: { delay: "-0.8s", duration: "4.6s" } },
  { x: 1055, y: 245, r: 1.8 },
  { x: 1120, y: 190, r: 1.4, detail: true },
  { x: 1165, y: 300, r: 2 },
  { x: 1085, y: 355, r: 2.6, accent: true, pulse: { delay: "-2.4s", duration: "5.4s" } },
  { x: 1140, y: 430, r: 1.5 },
  { x: 1060, y: 520, r: 1.8, accent: true },
  { x: 1010, y: 420, r: 1.4 },
  { x: 955, y: 490, r: 2, accent: true, pulse: { delay: "-1.6s", duration: "3.8s" } },
  { x: 880, y: 545, r: 1.5 },
  { x: 930, y: 620, r: 1.9 },
  { x: 790, y: 600, r: 1.4 },
  { x: 1105, y: 640, r: 1.3, detail: true },
  { x: 1160, y: 545, r: 1.2, detail: true },
  { x: 835, y: 205, r: 2.2, accent: true, pulse: { delay: "-3.1s", duration: "5.8s" } },
  { x: 760, y: 150, r: 1.7 },
  { x: 700, y: 210, r: 1.4 },
  { x: 930, y: 330, r: 2.4, accent: true, pulse: { delay: "-1.2s", duration: "5.1s" } },
  { x: 700, y: 340, r: 1.6 },
  { x: 640, y: 260, r: 1.2, detail: true },
  { x: 605, y: 385, r: 1.2 },
  { x: 655, y: 470, r: 1.3 },
  { x: 760, y: 690, r: 1.2, detail: true },
  { x: 1065, y: 715, r: 1.1, detail: true }
];

/* x1, y1, x2, y2, épaisseur */
const edges: Edge[] = [
  [700, 210, 760, 150, 1],
  [760, 150, 835, 205, 1.2],
  [835, 205, 905, 105, 1],
  [905, 105, 990, 165, 1],
  [990, 165, 1055, 245, 1.4],
  [1055, 245, 1120, 190, 1],
  [1120, 190, 1165, 300, 1],
  [1165, 300, 1085, 355, 1.2],
  [1085, 355, 1010, 420, 1],
  [1010, 420, 955, 490, 1.4],
  [955, 490, 880, 545, 1],
  [880, 545, 790, 600, 1],
  [790, 600, 760, 690, 1],
  [760, 690, 930, 620, 1],
  [930, 620, 955, 490, 1.2],
  [930, 620, 1060, 520, 1],
  [1060, 520, 1140, 430, 1],
  [1140, 430, 1085, 355, 1],
  [1140, 430, 1165, 300, 1],
  [1055, 245, 1085, 355, 1],
  [835, 205, 700, 340, 1.2],
  [700, 340, 640, 260, 1],
  [700, 340, 605, 385, 1],
  [605, 385, 655, 470, 1],
  [655, 470, 700, 340, 1],
  [760, 150, 700, 340, 1],
  [990, 165, 1085, 355, 1],
  [1010, 420, 1060, 520, 1],
  [835, 205, 930, 620, 0.8],
  [655, 470, 790, 600, 1],
  [640, 260, 605, 385, 1],
  [1060, 520, 1105, 640, 1],
  [1105, 640, 930, 620, 1],
  [1105, 640, 1160, 545, 1],
  [1160, 545, 1140, 430, 1],
  [700, 210, 640, 260, 1],
  [990, 165, 1120, 190, 0.8],
  [930, 330, 1085, 355, 1.1],
  [930, 330, 955, 490, 1]
];

export function HeroBackground() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const paint = () => {
      frame = 0;
      element.style.setProperty("--px", pointerX.toFixed(3));
      element.style.setProperty("--py", pointerY.toFixed(3));
    };

    /* Une seule écriture CSS par image, sans rendu React. */
    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const sync = () => {
      const active = finePointer.matches && !reducedMotion.matches;
      if (active) {
        window.addEventListener("pointermove", handleMove, { passive: true });
        return;
      }
      window.removeEventListener("pointermove", handleMove);
      element.style.removeProperty("--px");
      element.style.removeProperty("--py");
    };

    sync();
    finePointer.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      finePointer.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="hero-bg" ref={root} aria-hidden="true">
    <div className="hero-bg__grid" />
    <div className="hero-bg__glow" />
    <div className="hero-bg__visual">
      <svg className="hero-bg__svg" viewBox="0 0 1200 760" preserveAspectRatio="xMaxYMid slice">
        <defs>
          <radialGradient id="hero-halo">
            <stop offset="0%" stopColor="#087bff" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#087bff" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#087bff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="hero-ring hero-ring--halo">
          <circle cx="930" cy="330" r="286" />
          <circle cx="930" cy="330" r="160" strokeDasharray="12 14" />
        </g>
        <g className="hero-ring hero-ring--spin">
          <circle cx="930" cy="330" r="214" strokeDasharray="268 220" />
          <circle cx="930" cy="330" r="152" strokeDasharray="64 132" />
          <circle className="hero-ring__seed" cx="1144" cy="330" r="2.2" />
          <circle className="hero-ring__seed" cx="1085" cy="355" r="1.6" />
        </g>
        <g className="hero-ring hero-ring--spin-reverse">
          <ellipse cx="930" cy="330" rx="306" ry="116" transform="rotate(-24 930 330)" strokeDasharray="352 268" />
          <ellipse cx="930" cy="330" rx="238" ry="88" transform="rotate(38 930 330)" strokeDasharray="164 284" />
        </g>

        <g className="hero-edges">
          {edges.map(([x1, y1, x2, y2, width]) => (
            <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={width} />
          ))}
        </g>

        <g className="hero-nodes">
          {nodes.map((node) => (
            <g
              key={`${node.x}-${node.y}`}
              className={`hero-node${node.accent ? " hero-node--accent" : ""}${node.pulse ? " hero-node--pulse" : ""}${node.detail ? " hero-bg__detail" : ""}`}
            >
              <circle
                className="hero-node__halo"
                cx={node.x}
                cy={node.y}
                r={node.r * 7}
                fill="url(#hero-halo)"
                style={node.pulse ? { animationDelay: node.pulse.delay, animationDuration: node.pulse.duration } : undefined}
              />
              <circle className="hero-node__core" cx={node.x} cy={node.y} r={node.r} />
            </g>
          ))}
        </g>

        <g className="hero-packets">
          <circle className="hero-packet hero-packet--a" r="1.9" />
          <circle className="hero-packet hero-packet--b" r="1.7" />
          <circle className="hero-packet hero-packet--c" r="1.5" />
        </g>
      </svg>
    </div>
    <div className="hero-bg__veil" />
  </div>;
}
