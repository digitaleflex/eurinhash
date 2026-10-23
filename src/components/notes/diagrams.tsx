import type { ReactNode } from "react";

/* Schémas techniques dessinés en SVG : déterministes, accessibles et
   responsives (viewBox). Chaque figure porte un titre, une description
   textuelle et une légende. Aucun composant ne prétend représenter une
   architecture non vérifiée : les contenus sont alignés sur les articles. */

type NodeKind = "default" | "accent" | "muted" | "warning";

function wrap(label: string, max: number): string[] {
  const words = label.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (!current) current = word;
    else if (`${current} ${word}`.length <= max) current += ` ${word}`;
    else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function DNode({
  x, y, label, kind = "default", w = 190, h = 56,
}: { x: number; y: number; label: string; kind?: NodeKind; w?: number; h?: number }) {
  const lines = wrap(label, Math.max(14, Math.floor(w / 8.4)));
  const lineHeight = 15;
  const firstY = y + h / 2 - ((lines.length - 1) * lineHeight) / 2;
  return (
    <g className={`diag-node diag-node--${kind}`}>
      <rect x={x} y={y} width={w} height={h} rx={11} />
      {lines.map((line, index) => (
        <text key={index} x={x + w / 2} y={firstY + index * lineHeight} textAnchor="middle" dominantBaseline="middle">
          {line}
        </text>
      ))}
    </g>
  );
}

function Arrow({
  d, dashed = false, label, lx, ly,
}: { d: string; dashed?: boolean; label?: string; lx?: number; ly?: number }) {
  return (
    <g className={dashed ? "diag-edge diag-edge--dashed" : "diag-edge"}>
      <path d={d} markerEnd="url(#diag-arrow)" />
      {label && lx !== undefined && ly !== undefined && (
        <text x={lx} y={ly} textAnchor="middle" className="diag-edge-label">{label}</text>
      )}
    </g>
  );
}

function SvgFrame({ title, desc, viewBox, children }: { title: string; desc: string; viewBox: string; children: ReactNode }) {
  return (
    <svg viewBox={viewBox} role="img" aria-label={title} className="diagram__svg">
      <title>{title}</title>
      <desc>{desc}</desc>
      <defs>
        <marker id="diag-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" className="diag-arrowhead" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

function Legend({ items }: { items: readonly { kind: NodeKind; label: string }[] }) {
  return (
    <ul className="diagram__legend">
      {items.map((item) => (
        <li key={item.label}>
          <span className={`diag-swatch diag-swatch--${item.kind}`} aria-hidden="true" />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

function Frame({ title, caption, legend, children }: { title: string; caption: string; legend?: readonly { kind: NodeKind; label: string }[]; children: ReactNode }) {
  return (
    <figure className="diagram">
      <figcaption className="diagram__title">{title}</figcaption>
      {children}
      {legend && <Legend items={legend} />}
      <p className="diagram__caption">{caption}</p>
    </figure>
  );
}

/* ——— AURA Storage : responsabilités ——— */
function AuraArchitecture() {
  return (
    <SvgFrame
      title="Responsabilités des composants d’AURA Storage"
      desc="La plateforme cliente demande une autorisation à l’API de gestion, qui écrit les métadonnées dans PostgreSQL et renvoie une URL présignée. Le transfert des octets se fait directement vers SeaweedFS. Une copie indépendante doit être vérifiée par restauration."
      viewBox="0 0 720 420"
    >
      <DNode x={265} y={12} label="Plateforme cliente" kind="accent" />
      <DNode x={265} y={112} label="API de gestion AURA" kind="accent" />
      <DNode x={470} y={222} label="Catalogue PostgreSQL" />
      <DNode x={60} y={222} label="SeaweedFS / API S3" />
      <DNode x={60} y={330} label="Sauvegarde indépendante" kind="warning" />

      <Arrow d="M360,68 L360,112" label="Demande autorisée" lx={452} ly={94} />
      <Arrow d="M455,140 C480,162 505,190 528,222" label="Métadonnées" lx={562} ly={188} />
      <Arrow d="M265,140 C205,138 196,80 268,68" dashed label="URL présignée" lx={176} ly={112} />
      <Arrow d="M316,68 C250,116 190,176 162,222" label="Transfert HTTPS" lx={196} ly={152} />
      <Arrow d="M155,278 L155,330" dashed label="Copie indépendante" lx={278} ly={308} />
    </SvgFrame>
  );
}

/* ——— AURA Storage : cycle de vie d’un transfert ——— */
function AuraStates() {
  return (
    <SvgFrame
      title="Cycle de vie d’un transfert"
      desc="Un transfert passe par pending, verifying puis available, ou échoue. Pending peut expirer, et un objet disponible peut être supprimé après autorisation."
      viewBox="0 0 720 230"
    >
      <DNode x={20} y={20} label="pending" w={130} h={48} />
      <DNode x={210} y={20} label="verifying" w={130} h={48} />
      <DNode x={400} y={20} label="available" kind="accent" w={130} h={48} />
      <DNode x={560} y={20} label="deleting" w={120} h={48} />
      <DNode x={210} y={150} label="failed" kind="warning" w={130} h={48} />
      <DNode x={20} y={150} label="expired" kind="muted" w={130} h={48} />

      <Arrow d="M150,44 L210,44" label="Finalisation" lx={180} ly={30} />
      <Arrow d="M340,44 L400,44" label="Vérifications" lx={370} ly={30} />
      <Arrow d="M530,44 L560,44" label="Suppression" lx={545} ly={30} />
      <Arrow d="M275,68 L275,150" label="Échec" lx={305} ly={112} />
      <Arrow d="M85,68 L85,150" label="Expiration" lx={122} ly={112} />
    </SvgFrame>
  );
}

/* ——— Axiom : parcours de déploiement ——— */
function AxiomPipeline() {
  return (
    <SvgFrame
      title="Parcours de déploiement observé par Axiom"
      desc="Le déclenchement part du dépôt GitHub, l’analyse détecte la stack, un profil et un plan sont produits, la construction puis le runtime sont lancés, le réseau et le TLS sont configurés, un contrôle de santé est exécuté avant l’accès à l’application."
      viewBox="0 0 720 380"
    >
      <DNode x={20} y={12} label="Dépôt GitHub" w={200} h={48} />
      <DNode x={260} y={12} label="Analyse du dépôt" w={200} h={48} />
      <DNode x={500} y={12} label="Détection de la stack" w={200} h={48} />
      <DNode x={500} y={140} label="Profil et plan" w={200} h={48} />
      <DNode x={260} y={140} label="Construction" w={200} h={48} />
      <DNode x={20} y={140} label="Démarrage du runtime" w={200} h={48} />
      <DNode x={20} y={268} label="Réseau, domaine et TLS" w={200} h={48} />
      <DNode x={260} y={268} label="Contrôle de santé" w={200} h={48} />
      <DNode x={500} y={268} label="Application accessible" kind="accent" w={200} h={48} />

      <Arrow d="M220,36 L260,36" />
      <Arrow d="M460,36 L500,36" />
      <Arrow d="M600,60 L600,140" />
      <Arrow d="M500,164 L460,164" />
      <Arrow d="M260,164 L220,164" />
      <Arrow d="M120,188 L120,268" />
      <Arrow d="M220,292 L260,292" />
      <Arrow d="M460,292 L500,292" />
    </SvgFrame>
  );
}

/* ——— WPOpsX : validation avant déploiement ——— */
function WpopsxValidation() {
  return (
    <SvgFrame
      title="Parcours de validation et de déploiement WPOpsX"
      desc="La configuration est vérifiée. Si elle est valide, le déploiement est appliqué puis des contrôles de santé sont exécutés. Un succès mène à l’acceptation, un échec au diagnostic et à la récupération."
      viewBox="0 0 720 420"
    >
      <DNode x={265} y={12} label="Configuration" w={190} h={48} />
      <DNode x={265} y={104} label="Vérifications" w={190} h={48} />
      <DNode x={120} y={196} label="Déploiement" kind="accent" w={190} h={48} />
      <DNode x={410} y={196} label="Arrêt et diagnostic" kind="warning" w={190} h={48} />
      <DNode x={120} y={288} label="Contrôles de santé" w={190} h={48} />
      <DNode x={410} y={288} label="Diagnostic / récupération" kind="warning" w={190} h={48} />
      <DNode x={120} y={368} label="Acceptation" kind="accent" w={190} h={48} />

      <Arrow d="M360,60 L360,104" />
      <Arrow d="M300,152 C280,170 250,182 215,196" label="Valide" lx={242} ly={164} />
      <Arrow d="M420,152 C440,170 470,182 505,196" label="Échec" lx={486} ly={164} />
      <Arrow d="M215,244 L215,288" />
      <Arrow d="M310,312 C360,332 380,320 405,312" dashed label="Échec" lx={360} ly={344} />
      <Arrow d="M215,336 L215,368" label="Succès" lx={252} ly={356} />
    </SvgFrame>
  );
}

/* ——— HEF : progression documentée ——— */
function HefProgression() {
  const stages = ["Onboarding", "Foundations", "Systems", "Engineering", "Advanced", "Specialization"];
  return (
    <SvgFrame
      title="Progression documentée de HashCode Engineering Foundations"
      desc="Six étapes : Onboarding, Foundations, Systems, Engineering, Advanced puis Specialization. La structure est documentée, mais les contenus et dispositifs d’évaluation ne sont pas tous finalisés."
      viewBox="0 0 460 470"
    >
      {stages.map((stage, index) => (
        <DNode
          key={stage}
          x={135}
          y={12 + index * 76}
          label={`0${index + 1} · ${stage}`}
          w={210}
          h={50}
          kind={index >= 4 ? "muted" : "default"}
        />
      ))}
      {stages.slice(0, -1).map((stage, index) => (
        <Arrow key={stage} d={`M240,${62 + index * 76} L240,${88 + index * 76}`} />
      ))}
    </SvgFrame>
  );
}

/* ——— HEF : boucle d’apprentissage ——— */
function HefLoop() {
  return (
    <SvgFrame
      title="Boucle apprentissage, pratique, évaluation"
      desc="Comprendre mène à pratiquer, puis évaluer, recevoir un retour et améliorer, ce qui ramène à la pratique."
      viewBox="0 0 720 220"
    >
      <DNode x={8} y={60} label="Comprendre" w={124} h={48} />
      <DNode x={152} y={60} label="Pratiquer" w={124} h={48} />
      <DNode x={296} y={60} label="Évaluer" w={124} h={48} />
      <DNode x={440} y={60} label="Recevoir un retour" w={140} h={48} />
      <DNode x={596} y={60} label="Améliorer" w={116} h={48} kind="accent" />

      <Arrow d="M132,84 L152,84" />
      <Arrow d="M276,84 L296,84" />
      <Arrow d="M420,84 L440,84" />
      <Arrow d="M580,84 L596,84" />
      <Arrow d="M654,108 C654,168 214,182 214,108" dashed label="Retour vers la pratique" lx={434} ly={164} />
    </SvgFrame>
  );
}

const DIAGRAMS = {
  "aura-architecture": {
    title: "Responsabilités des composants",
    caption: "Flux d’autorisation et métadonnées (traits pleins) ; capacité temporaire et copie de sauvegarde (traits pointillés). Une copie indépendante n’est utile que si sa restauration est testée.",
    legend: [
      { kind: "accent" as NodeKind, label: "Composant qui porte une décision d’autorisation" },
      { kind: "default" as NodeKind, label: "Stockage et catalogue" },
      { kind: "warning" as NodeKind, label: "Copie à vérifier par restauration" },
    ],
    render: AuraArchitecture,
  },
  "aura-states": {
    title: "Cycle de vie d’un transfert",
    caption: "Modèle de cycle de vie décrit dans la documentation du projet ; les transitions exactes restent à confronter à l’implémentation actuelle.",
    render: AuraStates,
  },
  "axiom-pipeline": {
    title: "Parcours de déploiement",
    caption: "Enchaînement des étapes observées par Axiom : analyse, plan, construction, runtime, réseau et TLS, puis contrôle de santé avant accès.",
    render: AxiomPipeline,
  },
  "wpopsx-validation": {
    title: "Validation et déploiement",
    caption: "La validation conditionne le déploiement ; les contrôles de santé conditionnent l’acceptation. Un échec mène au diagnostic, jamais à une acceptation implicite.",
    legend: [
      { kind: "accent" as NodeKind, label: "Étape nominale" },
      { kind: "warning" as NodeKind, label: "Chemin d’échec" },
    ],
    render: WpopsxValidation,
  },
  "hef-progression": {
    title: "Progression documentée",
    caption: "La structure en six étapes est documentée. Les deux dernières sont grisées : leur contenu et leurs évaluations restent à finaliser ou à vérifier.",
    legend: [
      { kind: "default" as NodeKind, label: "Étape documentée" },
      { kind: "muted" as NodeKind, label: "À finaliser / vérifier" },
    ],
    render: HefProgression,
  },
  "hef-loop": {
    title: "Boucle d’apprentissage",
    caption: "La progression ne s’arrête pas à l’évaluation : le retour nourrit une nouvelle pratique.",
    render: HefLoop,
  },
} as const;

export type DiagramId = keyof typeof DIAGRAMS;

/** Associe un bloc Mermaid source à un schéma vérifié (sans dépendance Mermaid). */
export function resolveDiagram(source: string): DiagramId | null {
  if (source.includes("stateDiagram")) return "aura-states";
  if (source.includes("Plateforme cliente")) return "aura-architecture";
  if (source.includes("Analyse du dépôt")) return "axiom-pipeline";
  if (source.includes("Contrôles de santé")) return "wpopsx-validation";
  if (source.includes("Onboarding")) return "hef-progression";
  if (source.includes("Recevoir un retour")) return "hef-loop";
  return null;
}

export function Diagram({ id }: { id: DiagramId }) {
  const entry = DIAGRAMS[id];
  const Body = entry.render;
  return (
    <Frame title={entry.title} caption={entry.caption} legend={"legend" in entry ? entry.legend : undefined}>
      <Body />
    </Frame>
  );
}
