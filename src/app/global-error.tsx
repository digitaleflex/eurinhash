"use client";

import { useEffect, useRef } from "react";
import { reportError } from "@/lib/report-error";

const fontStack = "ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif";
const monoStack = "ui-monospace, SFMono-Regular, Menlo, Consolas, \"Liberation Mono\", monospace";

const css = "*{box-sizing:border-box}body{margin:0}button:focus-visible,a:focus-visible{outline:2px solid #7ab4ff;outline-offset:3px}h1:focus{outline:none}@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}";

/**
 * global-error remplace le layout racine : ni globals.css ni Tailwind ne sont
 * garantis chargés ici. Tous les styles doivent donc être autonomes.
 */
export default function GlobalError({ error, retry }: { error: unknown; reset: () => void; retry: () => void }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const digest = error instanceof Error && "digest" in error ? (error as { digest?: string }).digest : undefined;

  useEffect(() => {
    reportError(error, "global");
    titleRef.current?.focus();
  }, [error]);

  return <html lang="fr">
    <body style={{ margin: 0, background: "#050914", color: "#f4f7fb", fontFamily: fontStack, WebkitFontSmoothing: "antialiased" }}>
      <style>{css}</style>
      <main id="contenu" role="alert" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", minHeight: "100vh", width: "min(640px, calc(100% - 48px))", margin: "0 auto", padding: "64px 0" }}>
        <p style={{ margin: 0, color: "#7ab4ff", fontSize: ".8125rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>Erreur inattendue</p>
        <h1 ref={titleRef} tabIndex={-1} style={{ margin: "24px 0 0", fontSize: "clamp(1.9rem, 5vw, 2.75rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-.03em" }}>Le site n’a pas pu s’afficher.</h1>
        <p style={{ margin: "16px 0 0", color: "#9eacc1", fontSize: "1.0625rem", lineHeight: 1.7 }}>Une erreur inattendue a interrompu le chargement. Tu peux réessayer ou revenir à l’accueil.</p>
        {digest ? <p style={{ margin: "20px 0 0", color: "#9eacc1", fontFamily: monoStack, fontSize: ".75rem", wordBreak: "break-all" }}>Référence : {digest}</p> : null}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginTop: 32 }}>
          <button type="button" onClick={() => retry()} style={{ padding: "13px 19px", border: "1px solid transparent", borderRadius: 999, background: "#0065fe", color: "#ffffff", fontFamily: "inherit", fontSize: ".875rem", fontWeight: 500, cursor: "pointer" }}>Réessayer</button>
          <button type="button" onClick={() => window.location.reload()} style={{ padding: "13px 19px", border: "1px solid #6b7078", borderRadius: 999, background: "#ffffff08", color: "#f4f7fb", fontFamily: "inherit", fontSize: ".875rem", fontWeight: 500, cursor: "pointer" }}>Recharger la page</button>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- global-error remplace le layout racine : une ancre native reste la seule navigation sûre quand les bundles applicatifs ont échoué. */}
          <a href="/" style={{ padding: "13px 19px", border: "1px solid transparent", borderRadius: 999, color: "#c3d2e8", fontSize: ".875rem", fontWeight: 500, textDecoration: "none" }}>Retour à l’accueil</a>
        </div>
        <p style={{ margin: "24px 0 0", color: "#9eacc1", fontSize: ".8125rem", lineHeight: 1.5 }}>Ces actions ne garantissent pas que le problème soit résolu. Tu peux aussi revenir plus tard.</p>
      </main>
    </body>
  </html>;
}
