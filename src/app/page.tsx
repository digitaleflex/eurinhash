import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, RefreshCw, ScanSearch, Terminal, Workflow } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroBackground } from "@/components/hero-background";
import { HeroContent } from "@/components/hero-content";
import { ScrollReveals } from "@/components/scroll-reveals";
import { Competences } from "@/components/competences";
import { getPublicNotes } from "@/content/notes";
import { categoryLabel } from "@/lib/notes";

const steps = [
  { n: "01", icon: ScanSearch, title: "Comprendre le problème", desc: "Explorer le besoin, identifier les contraintes et définir ce qui doit réellement être résolu." },
  { n: "02", icon: Workflow, title: "Penser la solution", desc: "Choisir une architecture cohérente, les bons outils et un équilibre réaliste entre simplicité et performance." },
  { n: "03", icon: Terminal, title: "Construire et vérifier", desc: "Développer, tester et documenter. Valider le fonctionnement réel plutôt que s’arrêter à une solution théorique." },
  { n: "04", icon: RefreshCw, title: "Apprendre et améliorer", desc: "Mesurer les limites, tirer des enseignements et faire évoluer la solution sans complexité inutile." },
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
  const latestNotes = getPublicNotes().slice(0, 3);

  return (
    <>
      <SiteHeader current="/" />
      <main id="contenu">
        <ScrollReveals />
        <section className="hero hero--home" id="top">
          <HeroBackground />
          <HeroContent />
        </section>

        <section className="section" id="projets">
          <div className="container-shell">
            <div className="selected-rule">
              <span className="kicker" data-index="01">Projets sélectionnés · 05 projets</span>
            </div>
            <div className="selected-head" data-reveal>
              <h2>Des idées transformées en systèmes concrets.</h2>
              <p className="selected-intro">Une sélection de projets d’ingénierie logicielle, d’infrastructure, d’automatisation et d’expérimentation, choisis pour ce qu’ils m’apprennent à construire.</p>
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
              <p>Une sélection resserrée de projets, entre systèmes en construction, expérimentations et outils conçus pour répondre à des besoins concrets.</p>
              <Link className="button secondary" href="/projets">Explorer l’ensemble des projets <ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>

        <Competences />

        <section className="section section--alt">
          <div className="container-shell method-grid">
            <div>
              <div className="kicker" data-index="03">Approche &amp; méthode</div>
              <h2 data-reveal>Ma méthode.</h2>
              <p className="method-sub" data-reveal>Apprendre en construisant.</p>
              <p className="intro" data-reveal>Chaque projet est une occasion de comprendre, d’expérimenter et de progresser. Je pars du problème, je construis une solution adaptée et j’apprends de ce que le réel me renvoie.</p>
            </div>
            <div>
              <div className="steps">{steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <article className="step" key={s.n} data-reveal data-reveal-delay={Math.min(i * 0.06, 0.18)}>
                    <div className="step-top"><Icon size={20} className="step-icon" aria-hidden="true" /><span className="step-num">{s.n}</span></div>
                    <h3>{s.title}</h3><p>{s.desc}</p>
                  </article>
                );
              })}</div>
              <p className="method-sign" data-reveal>Comprendre → Concevoir → Construire → Améliorer</p>
            </div>
          </div>
        </section>

        <section className="section" id="a-propos" aria-labelledby="apropos-titre">
          <div className="container-shell about-grid">
            <div className="about-portrait" data-reveal>
              <Image
                src="/eurinhash_portrait.png"
                alt="Portrait d’Eurin Hash"
                width={1254}
                height={1254}
                sizes="(max-width: 767px) 82vw, (max-width: 1023px) 300px, 400px"
                className="about-portrait__img"
              />
            </div>
            <div className="about-body">
              <div className="kicker" data-index="04" data-reveal>À propos</div>
              <h2 id="apropos-titre" data-reveal>Je veux comprendre ce que je construis.</h2>
              <p data-reveal>Je m’intéresse à ce qui se passe derrière la technologie : les systèmes qui font fonctionner les applications, les infrastructures qui les soutiennent et les mécanismes qui les rendent fiables.</p>
              <p data-reveal>Mon parcours s’est construit par l’exploration, l’expérimentation et la pratique. J’apprends en allant au-delà de ce qui est visible, en cherchant à comprendre les choix techniques, leurs conséquences et les possibilités qu’ils ouvrent.</p>
              <h3 className="about-sub" data-reveal>Penser au-delà du code.</h3>
              <p data-reveal>Du développement logiciel au cloud, du DevOps à la cybersécurité, jusqu’à l’intelligence artificielle, j’explore des domaines qui se rejoignent autour d’une même question : comment concevoir des systèmes utiles, cohérents et capables d’évoluer ?</p>
              <p data-reveal>Ce qui m’intéresse, ce n’est pas d’accumuler des technologies. C’est de comprendre quand les utiliser, pourquoi les choisir et comment les faire fonctionner ensemble.</p>
              <h3 className="about-sub" data-reveal>Apprendre en construisant.</h3>
              <p data-reveal>Je transforme cette démarche en projets, en expérimentations et en solutions que je peux tester, documenter et améliorer. Chaque réalisation m’apporte de nouvelles compétences, mais aussi de nouvelles questions.</p>
              <p data-reveal>Je ne considère pas un projet comme une simple ligne de plus dans un portfolio. J’y vois une occasion de confronter mes idées au réel et de progresser dans ma manière de concevoir.</p>
              <p className="about-pull" data-reveal>Je suis en mouvement : j’explore, je construis et j’apprends.</p>
              <p data-reveal>Ce portfolio rassemble une partie de ce chemin. Le plus intéressant reste à découvrir dans les projets.</p>
              <Link className="about-cta" href="/projets" data-reveal>Découvrir mes projets <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </section>

        <section className="section" id="notes" aria-labelledby="notes-home-titre">
          <div className="container-shell">
            <div className="notes-home-head">
              <div data-reveal>
                <p className="kicker" data-index="05">Notes &amp; analyses</p>
                <h2 id="notes-home-titre">Comprendre les systèmes. Examiner les choix.</h2>
                <p className="notes-home-lead">Des analyses techniques issues de projets réels : architecture, cloud, DevOps, qualité logicielle et systèmes d’apprentissage.</p>
              </div>
              <Link className="notes-link notes-link--muted" href="/notes" data-reveal>Toutes les analyses <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
            <ul className="notes-preview">
              {latestNotes.map((note) => (
                <li key={note.slug} className="notes-preview__item" data-reveal>
                  <span className="notes-preview__cat">
                    {categoryLabel(note.category)} <span aria-hidden="true">·</span> {note.readingTime} min
                  </span>
                  <h3 className="notes-preview__title">
                    <Link href={`/notes/${note.slug}`} className="notes-preview__link">{note.title}</Link>
                  </h3>
                  <p className="notes-preview__desc">{note.description}</p>
                  <span className="notes-preview__cta" aria-hidden="true">Lire l’analyse <ArrowRight size={13} /></span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section--tight">
          <div className="container-shell"><div className="cta" data-reveal>
            <div className="kicker">Échangeons</div><h2>Une idée, une question, un projet ?</h2>
            <p className="intro">Je suis ouvert aux échanges autour du développement logiciel, du cloud, de la cybersécurité et de l’IA appliquée.</p>
            <Link className="button mt-5" href="/contact">Entrer en contact <ArrowUpRight size={16} /></Link>
          </div></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}