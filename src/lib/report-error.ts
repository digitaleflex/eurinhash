type ErrorContext = "render" | "global" | "navigation";

/**
 * Point d'entrée unique pour la remontée technique des erreurs.
 *
 * Le message affiché à l'utilisateur vit dans les composants ; ce module ne
 * transporte que des métadonnées non sensibles (nom, digest). Aucun contenu de
 * formulaire, jeton ou donnée personnelle ne doit transiter ici.
 *
 * En production, brancher un service de suivi à cet endroit plutôt que de
 * journaliser dans la console du navigateur.
 */
export function reportError(error: unknown, context: ErrorContext) {
  if (process.env.NODE_ENV !== "development") return;

  const digest = typeof error === "object" && error !== null && "digest" in error ? String((error as { digest?: unknown }).digest ?? "") : "";
  const name = error instanceof Error ? error.name : "UnknownError";

  console.error(`[eurinhash:${context}] ${name}${digest ? ` (digest ${digest})` : ""}`, error);
}
