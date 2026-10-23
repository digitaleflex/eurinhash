import type { LucideIcon } from "lucide-react";
import { Bot, Cloud, Network, ShieldCheck } from "lucide-react";

export type CompetenceProject = {
  label: string;
  href?: string;
  status?: string;
};

export type Competence = {
  id: string;
  index: string;
  title: string;
  fonction: string;
  description: string;
  icon: LucideIcon;
  tech: string[];
  project: CompetenceProject | null;
};

/* Contenu vérifié : chaque domaine est présenté avec 2 pratiques et un seul
   projet associé réel (liens HTTP 200 testés). JoinHashCode reste textuel. */
export const COMPETENCES: Competence[] = [
  {
    id: "architecture",
    index: "01",
    title: "Architecture des systèmes",
    fonction: "Structurer",
    description:
      "Organiser les composants, leurs interactions et les décisions qui donnent sa cohérence à un système.",
    icon: Network,
    tech: ["Architecture", "Conception"],
    project: { label: "AURA Storage", href: "https://github.com/digitaleflex/aura-storage" },
  },
  {
    id: "cloud",
    index: "02",
    title: "Cloud & DevOps",
    fonction: "Déployer",
    description:
      "Automatiser les environnements, fiabiliser les déploiements et améliorer l’observabilité des services.",
    icon: Cloud,
    tech: ["Docker", "Observabilité"],
    project: { label: "WPOpsX", href: "https://github.com/digitaleflex/WPOpsX" },
  },
  {
    id: "securite",
    index: "03",
    title: "Cybersécurité",
    fonction: "Protéger",
    description:
      "Analyser les risques, renforcer la sécurité applicative et appliquer des pratiques défensives.",
    icon: ShieldCheck,
    tech: ["Analyse de risques", "Sécurité applicative"],
    project: { label: "JoinHashCode", status: "En cours" },
  },
  {
    id: "logiciel-ia",
    index: "04",
    title: "Développement logiciel & IA appliquée",
    fonction: "Construire",
    description:
      "Concevoir des applications et expérimenter avec les modèles et agents IA en évaluant leurs limites.",
    icon: Bot,
    tech: ["Next.js", "Agents IA"],
    project: { label: "HashCode Reboot", href: "https://github.com/digitaleflex/hashcode_reboot" },
  },
];
