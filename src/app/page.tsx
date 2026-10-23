import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Cloud, Code2, Network, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroBackground } from "@/components/hero-background";
import { HeroContent } from "@/components/hero-content";
import { ScrollReveals } from "@/components/scroll-reveals";

const interests = [
  { icon: Network, title: "Architecture des systèmes", desc: "Penser des systèmes cohérents, maintenables et adaptés à leurs contraintes." },
  { icon: Cloud, title: "Cloud & infrastructure", desc: "Explorer le déploiement, l'automatisation, la fiabilité et l'observabilité." },
  { icon: ShieldCheck, title: "Cybersécurité", desc: "Comprendre les risques et intégrer la sécurité dans la conception technique." },
  { icon: Code2, title: "Développement", desc: "Transformer des idées en outils testables, documentés et utiles." }
];

const steps = [
  ["01", "Comprendre", "Partir du besoin, du contexte et des contraintes."],
  ["02", "Concevoir", "Choisir une approche technique proportionnée."],
  ["03", "Construire", "Développer, tester et documenter."],
  ["04", "Améliorer", "Apprendre du résultat et faire évoluer la solution."]
];

type SelectedLink = { label: string; href: string; variant?: "primary" | "secondary" };

type SelectedProject = {
  id: string;
  category: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  alt: string;
  links: SelectedLink[];
  status?: string;
};

const selectedProjects: SelectedProject[] = [
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
    ]
  },
  {
    id: "wpopsx",
    category: "DevOps & observabilité",
    title: "WPOpsX",
    description: "Un environnement d’exploitation WordPress conçu autour de conteneurs, d’un reverse proxy et d’outils de supervision pour structurer le déploiement et l’observabilité.",
    tech: ["Docker", "Traefik", "MariaDB", "Redis"],
    image: "/wpopsx.webp",
    alt: "Pile de conteneurs Docker, Traefik, MariaDB et Redis devant un tableau de bord de supervision.",
    links: [{ label: "Explorer le projet", href: "https://github.com/digitaleflex/WPOpsX" }]
  },
  {
    id: "hashcode-reboot",
    category: "Full-stack & produit numérique",
    title: "HashCode Reboot",
    description: "Une plateforme pensée pour structurer l’intégration des membres, les parcours communautaires et la qualification des profils au sein de l’écosystème HashCode.",
    tech: ["Next.js", "PostgreSQL", "Prisma", "BetterAuth"],
    image: "/hashcode_reboot.webp",
    alt: "Ordinateur portable affichant un tableau de bord, entouré de tuiles de profils et de progression.",
    links: [{ label: "Explorer le projet", href: "https://github.com/digitaleflex/hashcode_reboot" }]
  },
  {
    id: "eurinhash-ai-lab",
    category: "IA appliquée & expérimentation",
    title: "EurinHash AI Lab",
    description: "Un laboratoire d’expérimentation consacré à l’évaluation des modèles d’IA, à l’orchestration des agents, à la résilience et à l’optimisation des coûts.",
    tech: ["AI/ML", "Agents", "Benchmarks", "Prototypes"],
    image: "/eurin_ai_lab.webp",
    alt: "Laboratoire d’IA : cerveau lumineux dans un cube, entouré d’écrans de graphes et de mesures.",
    links: [{ label: "Explorer le projet", href: "https://github.com/digitaleflex/eurinhash-ai-lab" }]
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
    status: "En cours"
  }
];

export default function Home() {
  return (
    <>
      <SiteHeader current="/" />
      <main>
        <ScrollReveals />
        <section className="hero hero--home">
          <HeroBackground />
          <HeroContent />
        </section>

        <section className="section" id="projets">
          <div className="container-shell">
            <div className="selected-rule">
              <span className="kicker">Projets sélectionnés</span>
              <span className="selected-rule-meta">05 projets</span>
            </div>
            <div className="selected-head" data-reveal>
              <h2>Des idées transformées en systèmes concrets.</h2>
              <p className="selected-intro">Cinq projets, chacun répondant à un problème concret : stockage auto-hébergé, exploitation WordPress, plateformes communautaires, évaluation de modèles.</p>
            </div>
            <div className="selected-grid">
              {selectedProjects.map((project, index) => {
                const featured = index === 0;
                return (
                  <article key={project.id} className={featured ? "selected-card selected-card--featured" : "selected-card"} data-project-id={project.id} data-reveal data-reveal-delay={Math.min(index * 0.06, 0.24)}>
                    <div className="selected-card-media">
                      <Image src={project.image} alt={project.alt} fill sizes={featured ? "(max-width: 1000px) 100vw, 580px" : "(max-width: 760px) 100vw, 560px"} className="selected-card-img" />
                      {featured && <span className="selected-card-badge">À la une</span>}
                    </div>
                    <div className="selected-card-body">
                      <div className="selected-card-eyebrow">
                        <span className="selected-card-index">{String(index + 1).padStart(2, "0")}</span>
                        <span className="selected-card-category">{project.category}</span>
                      </div>
                      <h3 className="selected-card-title">{project.title}</h3>
                      <p className="selected-card-desc">{project.description}</p>
                      <ul className="selected-card-tech">
                        {project.tech.map((tech) => <li key={tech}>{tech}</li>)}
                      </ul>
                      <div className="selected-card-actions">
                        {project.links.map((link) => <Link key={link.href} className={link.variant ? `selected-card-link ${link.variant}` : "selected-card-link"} href={link.href} target="_blank" rel="noreferrer">{link.label} <ArrowRight size={13} /></Link>)}
                        {project.status && <span className="selected-card-status">{project.status}</span>}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="selected-footer" data-reveal>
              <p>Une sélection resserrée, mise à jour au fil des avancées.</p>
              <Link className="button secondary" href="/projets">Explorer l’ensemble des projets <ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-shell">
            <div className="kicker">Compétences & centres d’intérêt</div>
            <h2 data-reveal>Relier la réflexion à la pratique.</h2>
            <p className="intro">Les domaines dans lesquels je développe mes compétences et mène mes expérimentations.</p>
            <div className="service-grid">{interests.map(({ icon: Icon, title, desc }, i) => <article className="card" key={title} data-reveal data-reveal-delay={Math.min(i * 0.06, 0.18)}>
              <Icon size={23} color="#69a9ff" /><h3>{title}</h3><p>{desc}</p>
            </article>)}</div>
            <Link className="button secondary mt-7" href="/services">Voir mes compétences <ArrowRight size={15} /></Link>
          </div>
        </section>

        <section className="section">
          <div className="container-shell">
            <div className="kicker">Ma méthode</div><h2 data-reveal>Apprendre en construisant.</h2>
            <p className="intro">Une démarche simple qui m’aide à garder le cap dans mes projets, même lorsque les contraintes sont fortes.</p>
            <div className="steps">{steps.map(([n, title, desc], i) => <article className="step" key={n} data-reveal data-reveal-delay={Math.min(i * 0.06, 0.18)}>
              <span className="step-num">{n}</span><h3>{title}</h3><p>{desc}</p>
            </article>)}</div>
          </div>
        </section>

        <section className="section">
          <div className="container-shell split">
            <div data-reveal><div className="kicker">À propos de moi</div><h2>La technologie, par curiosité et par pratique.</h2>
              <p className="intro">Mon site personnel rassemble mon parcours, mes réflexions et les projets sur lesquels je travaille. J’y partage ce que j’apprends, les problèmes que j’explore et les solutions que je tente de construire.</p>
              <Link className="button secondary mt-6" href="/a-propos">Découvrir mon parcours <ArrowRight size={15} /></Link>
            </div>
            <div data-reveal data-reveal-delay={0.1}><div className="kicker">Notes & analyses</div><h2>Idées en cours d’exploration.</h2>
              <article className="note"><small>Architecture · À venir</small><h3>Comment choisir une architecture adaptée à un projet ?</h3></article>
              <article className="note"><small>Infrastructure · À venir</small><h3>Les bases d’une infrastructure fiable et observable</h3></article>
              <Link className="mt-5 inline-flex items-center gap-2 text-accent-soft" href="/notes">Lire mes notes <ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-shell"><div className="cta" data-reveal>
            <div className="kicker">Échangeons</div><h2>Une idée, une question, un projet ?</h2>
            <p className="intro">Je suis ouvert aux échanges autour de la technologie, de l’ingénierie et des projets numériques.</p>
            <Link className="button mt-5" href="/contact">Entrer en contact <ArrowUpRight size={16} /></Link>
          </div></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}