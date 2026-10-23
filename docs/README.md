# EURINHASH — Notes & analyses

Les articles publiés par le site sont des fichiers Markdown chargés **au build**.

## Où sont les fichiers

- **Articles** : `src/content/notes/*.md` — un fichier par analyse, frontmatter obligatoire
  (`title`, `description`, `slug`, `category`, `tags`, `project`, `status`).
  L’ordre éditorial suit le préfixe numérique du fichier (`01-`, `02-`…).
- **Documents de travail** : ce dossier (`docs/`) — checklist, notes de rédaction.
  Les fichiers sans frontmatter ne sont jamais publiés.

## Règles éditoriales

- `status: draft` est affiché comme « Version de travail — à vérifier ».
  Ne passer à `published` (avec `publishedAt: "AAAA-MM-JJ"`) qu’après vérification
  des preuves techniques et des liens.
- Les commandes et schémas illustratifs ne sont pas des résultats d’exécution.
- Les schémas Mermaid sont rendus par des composants SVG vérifiés
  (`src/components/notes/diagrams.tsx`) : une nouvelle signature doit y être ajoutée.
