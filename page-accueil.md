# Page d’accueil — EURINHASH (`/`)

Site personnel d’Eurin Hash : parcours, projets, apprentissages et expérimentations en ingénierie numérique.
Ton franc, première personne (« je »), copywriting en français avec apostrophes typographiques. Fichier source : `src/app/page.tsx`.

## En-tête — `SiteHeader` (`current="/"`)
- Logo-image `eurinhash-wordmark-trim.png` (lien `/`, `aria-label="Eurin Hash, accueil"`).
- Navigation desktop : Accueil · Mes projets (`/projets`) · Compétences (`/services`) · Mon parcours (`/a-propos`) · Notes (`/notes`) · Contact (`/contact`), page courante marquée `aria-current="page"`.
- Bouton « Me contacter » (`/contact`) + menu mobile (`<details>`) avec les mêmes liens.

## 1. Hero centré et immersif (`#top`, `hero--home`)
Composition en couches, texte centré (880 px max), hauteur min 92svh, aucune hauteur fixe qui coupe le contenu.
- **Couche 1 — fond** : `/globe_hero.webp` (globe 1683×935, −90 % vs PNG), globe large centré, voile sombre (dégradé vertical + radial) pour la lisibilité.
- **Couche 2 — réseau GSAP** (`HeroNetworkAnimation`) : 3 orbites lentes (70/90/120 s, sens distincts), 3 trajectoires lumineuses (`stroke-dashoffset`), 8 nœuds pulsés désynchronisés, 2 halos. Parallaxe souris/scroll via variables CSS ; statique si `prefers-reduced-motion`.
- **Couche 3 — contenu** (`HeroContent`) :
  - Surtitre : « Eurin Hash · Ingénierie logicielle & infrastructure »
  - Titre (unique `h1`, révélé par lignes avec SplitText) : « De l’idée / au **système.** » (système en bleu)
  - Paragraphe : logiciels et infrastructures qui prennent forme dans des projets concrets — code, déploiement, tests, documentation.
  - Actions : « Découvrir mes projets » → `/projets` · « Parlons d’un projet » → `/contact` (micro-interactions Motion, flèche au survol).
  - Domaines : Cloud & DevOps · Développement logiciel · Cybersécurité · IA appliquée.
  - Indicateur « Défiler pour explorer ↓ » → ancre `#projets` (masqué sur mobile et en `reduced-motion`).
- Mobile : boutons empilés, domaines sur plusieurs lignes, halos masqués, globe atténué, pas de débordement horizontal.

## 2. Projets sélectionnés (`#projets`)
- Bandeau « Projets sélectionnés · 05 projets », titre « Des idées transformées en systèmes concrets. » + intro (sélection de projets d’ingénierie logicielle, d’infrastructure, d’automatisation et d’expérimentation).
- Grille de 5 cartes (la 1re mise en avant, badge « À la une »), chacune : visuel WebP, index (01–05), catégorie, titre, description, technos, liens GitHub externes :
  1. **AURA Storage** (Cloud & infrastructure) — stockage auto-hébergé, API, S3/SeaweedFS ; Docker Compose, Traefik, PostgreSQL. Liens : projet + architecture.
  2. **WPOpsX** (DevOps & observabilité) — exploitation WordPress conteneurisée ; Docker, Traefik, MariaDB, Redis.
  3. **HashCode Reboot** (Full-stack & produit) — intégration membres et parcours ; Next.js, PostgreSQL, Prisma, BetterAuth.
  4. **EurinHash AI Lab** (IA appliquée) — évaluation de modèles, agents, résilience, coûts ; AI/ML, Agents, Benchmarks.
  5. **JoinHashCode** (Cybersécurité & communauté) — plateforme d’apprentissage ; badge « En cours », sans lien externe.
- Pied : « Une sélection resserrée de projets, entre systèmes en construction, expérimentations et outils conçus pour répondre à des besoins concrets. » + bouton « Explorer l’ensemble des projets » → `/projets`.

## 3. Mon terrain d’ingénierie (`#competences`)
Section éditoriale + grille minimaliste 2×2 (≥1280 px : éditorial 380 px + grille ; 1 colonne en dessous, 2 colonnes dès 768 px).
- Surtitre « 03 / Domaines d’exploration », titre 2 lignes (seconde en dégradé blanc→bleu), accroche, paragraphe unique, lien texte « Explorer mes compétences ↗ » → `/services`.
- 4 cartes propres : numéro, icône, titre h3, verbe d’action, description courte, 2 chips max, 1 projet vérifié (liens GitHub testés 200 ; JoinHashCode en texte « En cours », sans lien). Survol/focus = simple bordure ; aucun SVG, aucun cercle, aucun halo, aucune grille de fond.
- Entrée GSAP orchestrée (titres puis cartes en cascade), statique sans JS et en `reduced-motion`.

## 4. Ma méthode
Éditorial 40 % + 4 étapes en 2×2 60 % (≥1024 px ; empilé en dessous, 2 colonnes dès 601 px). Surtitre « 04 / Approche & méthode », titre « Ma méthode. », sous-titre bleu « Apprendre en construisant. », intro (comprendre, expérimenter, progresser). Étapes : 01 Comprendre le problème (scan) · 02 Penser la solution (workflow) · 03 Construire et vérifier (terminal) · 04 Apprendre et améliorer (refresh) — icône + numéro discrets, h3, description courte, bordure au survol. Signature « Comprendre → Concevoir → Construire → Améliorer ».

## 5. À propos (`#a-propos`)
Grille portrait/éditorial (≥1024 px : portrait 400 px + texte ; 900–1023 px : 300 px + texte ; <900 px : une colonne). Portrait `/eurinhash_portrait.png` via `next/image` (1254×1254, `alt` « Portrait d’Eurin Hash », `sizes` 82vw/300px/400px), conteneur vertical 4/5, rayon 24 px, léger liseré interne, zoom maîtrisé (`scale` 1.22 desktop / 1.16 tablette / 1.08 mobile, origine haute) pour un cadrage tête-épaules sans déformation.
Éditorial : repère « 05 / À propos », titre « Je veux comprendre ce que je construis. », 2 paragraphes d’introduction, sous-titres bleus « Penser au-delà du code. » et « Apprendre en construisant. » (2 paragraphes chacun), phrase forte « Je suis en mouvement : j’explore, je construis et j’apprends. » (filet bleu), paragraphe de clôture, lien « Découvrir mes projets » → `/projets`.

## 6. Notes & analyses (`#notes`)
Section alimentée par `getPublicNotes()` (3 dernières analyses publiées, brouillons exclus). En-tête : kicker « Notes & analyses », titre « Comprendre les systèmes. Examiner les choix. », accroche, lien « Toutes les analyses » → `/notes`. Aperçu en 3 cartes (1 colonne mobile) : catégorie · temps de lecture, titre `h3` cliquable (carte entière via overlay), résumé, « Lire l’analyse ». L’ancien bloc statique « À venir » a été supprimé.

## 6. Appel à l’action
Carte « Échangeons — Une idée, une question, un projet ? » (échanges : développement logiciel, cloud, cybersécurité, IA appliquée) + bouton « Entrer en contact » → `/contact`.

## Pied de page — `SiteFooter`
Logo-image, description du site, liens (Mes projets · Compétences · Mon parcours · Contact, sans Notes), GitHub externe, mentions « © année Eurin Hash » + « Un espace personnel pour apprendre, construire et partager. »

## Comportements transverses
- Révélation ScrollTrigger (`data-reveal`, une fois, +24 px / 0,7 s) sur têtes de section, cartes et CTA ; contenu toujours visible sans JS et en `reduced-motion`.
- Images : visuels projets en WebP avec `alt` descriptifs ; fond hero décoratif (`aria-hidden`).
- Vérifié : `typecheck`, `lint`, `build` (7 routes, prerender statique).
