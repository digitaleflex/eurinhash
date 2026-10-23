"use client";

import { useId, useMemo, useState } from "react";
import { Check, Copy, RotateCcw } from "lucide-react";
import { Highlight, themes, type Language } from "prism-react-renderer";

/* Bloc de code : coloration Prism, numéros de lignes, copie.
   Mode `editable` : l’exemple est modifié localement, jamais exécuté.
   Aucun `eval`, aucun appel réseau, aucune exécution de code. */

const LANGUAGE_MAP: Record<string, Language> = {
  ts: "typescript",
  typescript: "typescript",
  tsx: "tsx",
  js: "javascript",
  javascript: "javascript",
  jsx: "jsx",
  bash: "bash",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  json: "json",
  yaml: "yaml",
  yml: "yaml",
  sql: "sql",
  python: "python",
  py: "python",
  go: "go",
  dockerfile: "bash",
  nginx: "bash",
  text: "markup",
  txt: "markup",
};

const LANGUAGE_LABEL: Record<string, string> = {
  ts: "TypeScript",
  typescript: "TypeScript",
  tsx: "TSX",
  js: "JavaScript",
  javascript: "JavaScript",
  bash: "Bash",
  sh: "Shell",
  shell: "Shell",
  json: "JSON",
  yaml: "YAML",
  yml: "YAML",
  sql: "SQL",
  python: "Python",
  go: "Go",
  dockerfile: "Dockerfile",
  text: "Texte",
};

type Props = {
  code: string;
  language?: string;
  caption?: string;
  /** Objectif pédagogique affiché sous le bloc. */
  note?: string;
  editable?: boolean;
  preview?: string;
};

export function CodeBlock({ code, language = "text", caption, note, editable = false, preview }: Props) {
  const initial = code.replace(/\n+$/, "");
  const [value, setValue] = useState(initial);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const labelId = useId();

  const prismLanguage = LANGUAGE_MAP[language] ?? "markup";
  const displayLanguage = LANGUAGE_LABEL[language] ?? language.toUpperCase();
  const dirty = value !== initial;

  const lines = useMemo(() => value.replace(/\n+$/, "").split("\n"), [value]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <figure className="codeblock" aria-labelledby={labelId}>
      <figcaption className="codeblock__bar" id={labelId}>
        <span className="codeblock__lang">{displayLanguage}</span>
        <span className="codeblock__actions">
          {editable && dirty && (
            <button type="button" className="codeblock__btn" onClick={() => setValue(initial)}>
              <RotateCcw size={13} aria-hidden="true" /> Réinitialiser
            </button>
          )}
          <button type="button" className="codeblock__btn" onClick={copy} aria-live="polite">
            {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
            {copied ? "Copié" : "Copier"}
          </button>
        </span>
      </figcaption>

      {editable ? (
        <div className="codeblock__editor">
          <div className="codeblock__gutter" aria-hidden="true">
            {lines.map((_, index) => <span key={index}>{index + 1}</span>)}
          </div>
          <textarea
            className="codeblock__textarea"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            spellCheck={false}
            aria-label={`Exemple ${displayLanguage} modifiable`}
            rows={Math.min(24, Math.max(4, lines.length))}
          />
        </div>
      ) : (
        <Highlight theme={themes.vsDark} code={value} language={prismLanguage}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <div className="codeblock__scroller">
              <pre className="codeblock__pre">
                <code>
                  {tokens.map((line, index) => (
                    <span key={index} {...getLineProps({ line })} className="codeblock__line">
                      <span className="codeblock__num" aria-hidden="true">{index + 1}</span>
                      <span className="codeblock__code">
                        {line.map((token, tokenIndex) => (
                          <span key={tokenIndex} {...getTokenProps({ token })} />
                        ))}
                      </span>
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          )}
        </Highlight>
      )}

      {caption && <p className="codeblock__caption">{caption}</p>}
      {note && <p className="codeblock__note">{note}</p>}

      {preview && (
        <div className="codeblock__preview">
          <button
            type="button"
            className="codeblock__btn codeblock__btn--ghost"
            aria-expanded={showPreview}
            onClick={() => setShowPreview((open) => !open)}
          >
            {showPreview ? "Masquer le résultat attendu" : "Voir le résultat attendu"}
          </button>
          {showPreview && <pre className="codeblock__pre">{preview}</pre>}
        </div>
      )}
    </figure>
  );
}
