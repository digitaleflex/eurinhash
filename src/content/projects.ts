/* Source unique des projets : utilisée par l’accueil et par /projets.
   Les liens GitHub sont ceux déjà publiés sur le site ; JoinHashCode n’a pas de lien. */

export type ProjectLink = { label: string; href: string; variant?: "primary" | "secondary" };

export type Project = {
  id: string;
  category: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  alt: string;
  links: ProjectLink[];
  status?: string;
  /* Ce que le projet m’a appris ou ce qu’il cherche à résoudre (page /projets). */
  focus: string[];
};

export const projects: Project[] = [
  {
    id: "aura-storage",
    category: "Cloud & infrastructure",
    title: "AURA Storage",
    description: "Une plateforme de stockage conçue pour organiser, transférer et gérer des fichiers à travers une infrastructure auto-hébergée, une API et des services de stockage compatibles S3.",
    tech: ["Docker Compose", "Traefik", "PostgreSQL", "S3/SeaweedFS"],
    image: "/aura_storage.webp",
    alt: "Infrastructure de stockage : baies de serveurs, nuage lumineux et explorateur de fichiers.",
    links: [
      { label: "Explorer le projet", href: "https://github.com/digitaleflex/aura-storage", variant: "primary" },
      { label: "Voir l’architecture", href: "https://github.com/digitaleflex/aura-storage/tree/main/docs#architecture", variant: "secondary" }
    ],
    focus: ["Stockage objet compatible S3", "Persistance et restauration", "Reverse proxy et routage"]
  },
  {
    id: "wpopsx",
    category: "DevOps & observabilité",
    title: "WPOpsX",
    description: "Un environnement d’exploitation WordPress conçu autour de conteneurs, d’un reverse proxy et d’outils de supervision pour structurer le déploiement et l’observabilité.",
    tech: ["Docker", "Traefik", "MariaDB", "Redis"],
    image: "/wpopsx.webp",
    alt: "Pile de conteneurs Docker, Traefik, MariaDB et Redis devant un tableau de bord de supervision.",
    links: [{ label: "Explorer le projet", href: "https://github.com/digitaleflex/WPOpsX" }],
    focus: ["Déploiement conteneurisé", "Supervision et métriques", "Automatisation maîtrisée"]
  },
  {
    id: "hashcode-reboot",
    category: "Full-stack & produit numérique",
    title: "HashCode Reboot",
    description: "Une plateforme pensée pour structurer l’intégration des membres, les parcours communautaires et la qualification des profils au sein de l’écosystème HashCode.",
    tech: ["Next.js", "PostgreSQL", "Prisma", "BetterAuth"],
    image: "/hashcode_reboot.webp",
    alt: "Ordinateur portable affichant un tableau de bord, entouré de tuiles de profils et de progression.",
    links: [{ label: "Explorer le projet", href: "https://github.com/digitaleflex/hashcode_reboot" }],
    focus: ["Authentification et rôles", "Modélisation des données", "Parcours utilisateur"]
  },
  {
    id: "eurinhash-ai-lab",
    category: "IA appliquée & expérimentation",
    title: "EurinHash AI Lab",
    description: "Un laboratoire d’expérimentation consacré à l’évaluation des modèles d’IA, à l’orchestration des agents, à la résilience et à l’optimisation des coûts.",
    tech: ["AI/ML", "Agents", "Benchmarks", "Prototypes"],
    image: "/eurin_ai_lab.webp",
    alt: "Laboratoire d’IA : cerveau lumineux dans un cube, entouré d’écrans de graphes et de mesures.",
    links: [{ label: "Explorer le projet", href: "https://github.com/digitaleflex/eurinhash-ai-lab" }],
    focus: ["Évaluation de modèles", "Orchestration d’agents", "Coûts et résilience"]
  },
  {
    id: "joinhashcode",
    category: "Cybersécurité & communauté",
    title: "JoinHashCode",
    description: "Une plateforme communautaire orientée vers l’apprentissage technique, la cybersécurité et la structuration de parcours de progression.",
    tech: ["Next.js", "PostgreSQL", "Prisma", "BetterAuth"],
    image: "/joinhashcode.webp",
    alt: "Espace collaboratif : globe connecté, tuiles de parcours et cadenas de sécurité.",
    links: [],
    status: "En cours",
    focus: ["Parcours d’apprentissage", "Sécurité applicative", "Communauté technique"]
  }
];

/* Initiatives plus larges, sans dépôt public dédié. */
export const initiatives = [
  { name: "E-Flex", status: "Initiative professionnelle", description: "Une activité de conseil et d’ingénierie numérique orientée vers la conception et la réalisation de solutions adaptées à des besoins concrets." },
  { name: "HashCode Community", status: "En évolution", description: "Un espace d’apprentissage pratique autour du développement web, de la cybersécurité et de l’intelligence artificielle appliquée." },
  { name: "Outils & expérimentations", status: "En continu", description: "Des prototypes, outils et essais techniques qui me permettent de tester des idées, d’approfondir des technologies et de partager les apprentissages." }
];

/* Technologies réellement utilisées dans les projets ci-dessus (bandeau de l’accueil). */
export const stack = ["Next.js", "React", "TypeScript", "Docker", "Docker Compose", "Traefik", "PostgreSQL", "Prisma", "MariaDB", "Redis", "SeaweedFS", "S3", "BetterAuth", "Agents IA", "Observabilité"];
