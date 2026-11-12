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

## 2. Projets phares (`#projets`)
- Bandeau « Projets phares », titre « Des idées transformées en systèmes concrets. » + intro.
- **3 cartes** (`FEATURED_COUNT`), la 1re mise en avant (badge « À la une ») : AURA Storage, WPOpsX, HashCode Reboot. Chaque carte : visuel WebP, index, catégorie, titre, description, technos, lien GitHub.
- Pied : nombre total de projets documentés + bouton « Explorer l’ensemble des projets » → `/projets` (les 5 projets, dont EurinHash AI Lab et JoinHashCode, y sont détaillés).

## 3. À propos (`#a-propos`)
Portrait `/eurinhash_portrait.webp` (via `next/image`, 1254×1254) + texte court : repère « 02 / À propos », titre « Je veux comprendre ce que je construis. », deux paragraphes, lien « Lire mon parcours » → `/a-propos`. Le développement complet reste sur `/a-propos`.

## 4. Notes & analyses (`#notes`)
Alimentée par `getPublicNotes()` : les **2 dernières** analyses (`NOTES_COUNT`), brouillons exclus. Kicker « 03 / Notes & analyses », titre, accroche, lien « Toutes les analyses » → `/notes`. Cartes en 1 colonne mobile, 2 colonnes dès 900 px : catégorie · temps de lecture, titre cliquable (carte entière), résumé, « Lire l’analyse ».

## 5. Appel à l’action
Carte « Échangeons — Une idée, une question, un projet ? » + « Entrer en contact » → `/contact` et « Voir mon GitHub ».

> Les sections « Mon terrain d’ingénierie » (compétences) et « Ma méthode » ne sont plus sur l’accueil : les compétences vivent sur `/services`.

## Pied de page — `SiteFooter`
Logo-image, description du site, liens (Mes projets · Compétences · Mon parcours · Contact, sans Notes), GitHub externe, mentions « © année Eurin Hash » + « Un espace personnel pour apprendre, construire et partager. »

## Comportements transverses
- Révélation ScrollTrigger (`data-reveal`, une fois, +24 px / 0,7 s) sur têtes de section, cartes et CTA ; contenu toujours visible sans JS et en `reduced-motion`.
- Images : visuels projets en WebP avec `alt` descriptifs ; fond hero décoratif (`aria-hidden`).
- Vérifié : `typecheck`, `lint`, `test`, `build` (prerender statique).
