"use client";

import { useId, useState } from "react";
import { Check, Copy, Play, RotateCcw, Terminal } from "lucide-react";

/* Terminal pédagogique à sorties **simulées**. Rien n’est exécuté :
   aucun appel réseau, aucun accès système, aucune commande évaluée. */

export type TerminalStep = {
  command: string;
  output: string;
  purpose: string;
  inspect: string;
  conclusion: string;
  limits: string;
};

type Props = {
  title?: string;
  session?: string;
  steps: TerminalStep[];
};

export function InteractiveTerminal({ title = "AURA Storage — inspection", session = "session locale simulée", steps }: Props) {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const terminalId = useId();
  const step = steps[Math.min(index, steps.length - 1)];
  const isLast = index >= steps.length - 1;

  async function copy() {
    try {
      await navigator.clipboard.writeText(step.command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  function reset() {
    setIndex(0);
  }

  return (
    <div className="terminal">
      <div className="terminal__window">
        <div className="terminal__bar">
          <span className="terminal__dots" aria-hidden="true">
            <i /><i /><i />
          </span>
          <span className="terminal__title"><Terminal size={13} aria-hidden="true" /> {title}</span>
          <span className="terminal__session">{session}</span>
        </div>

        <div className="terminal__body" id={terminalId} role="log" aria-live="polite">
          <p className="terminal__prompt-line">
            <span className="terminal__prompt">visitor@eurinhash</span>
            <span className="terminal__sep" aria-hidden="true">:</span>
            <span className="terminal__path">~/demo</span>
            <span className="terminal__sep" aria-hidden="true">$</span>
            <span className="terminal__command">{step.command}</span>
          </p>
          <pre className="terminal__output">{step.output}</pre>
          <p className="terminal__flag">Sortie simulée — exemple pédagogique, pas un résultat d’exécution réelle.</p>
        </div>

        <div className="terminal__controls">
          <button type="button" className="terminal__btn" onClick={copy}>
            {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
            {copied ? "Copié" : "Copier la commande"}
          </button>
          <button
            type="button"
            className="terminal__btn terminal__btn--primary"
            onClick={() => setIndex((current) => (isLast ? 0 : current + 1))}
          >
            {isLast ? <RotateCcw size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
            {isLast ? "Recommencer" : "Étape suivante"}
          </button>
          <button type="button" className="terminal__btn terminal__btn--ghost" onClick={reset}>
            Réinitialiser
          </button>
          <span className="terminal__progress">{index + 1}/{steps.length}</span>
        </div>
      </div>

      <div className="terminal__explain">
        <div>
          <p className="terminal__explain-title">Objectif</p>
          <p>{step.purpose}</p>
        </div>
        <div>
          <p className="terminal__explain-title">À examiner</p>
          <p>{step.inspect}</p>
        </div>
        <div>
          <p className="terminal__explain-title">Ce que l’on peut conclure</p>
          <p>{step.conclusion}</p>
        </div>
        <div>
          <p className="terminal__explain-title">Ce que cela ne garantit pas</p>
          <p>{step.limits}</p>
        </div>
      </div>
    </div>
  );
}
