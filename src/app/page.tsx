import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Cloud, Code2, Network, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroBackground } from "@/components/hero-background";

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

export default function Home() {
  return (
    <>
      <SiteHeader current="/" />
      <main>
        <section className="hero">
          <HeroBackground />
          <div className="container-shell hero-content">
            <div className="eyebrow hero-eyebrow">Eurin Hash · Ingénierie numérique & apprentissage</div>
            <h1 className="hero-title">
              <span className="hero-line hero-line--one">De l’idée</span>
              <br />
              <span className="hero-line hero-line--two">au <span className="accent hero-accent">système.</span></span>
            </h1>
            <p className="hero-desc">Je suis Eurin Hash. Je conçois et construis des solutions numériques, j’explore l’architecture des systèmes et j’apprends en faisant.</p>
            <div className="actions">
              <Link className="button hero-btn hero-btn--one" href="/projets">Voir mes projets <ArrowRight size={16} /></Link>
              <Link className="button secondary hero-btn hero-btn--two" href="/contact">Me contacter <ArrowUpRight size={16} /></Link>
            </div>
            <div className="hero-tags hero-tags-group"><span>Architecture</span><span>Cloud & infrastructure</span><span>Cybersécurité</span><span>Développement</span></div>
          </div>
        </section>

        <section className="section">
          <div className="container-shell">
            <div className="kicker">Projets sélectionnés</div>
            <h2>Des idées transformées en systèmes concrets.</h2>
            <p>Je conçois des applications, des infrastructures et des outils qui explorent les possibilités du logiciel, du cloud et de l’intelligence artificielle. Voici cinq projets qui illustrent différentes facettes de mon travail.</p>
            <div className="selected-cards" data-columns="3">
              <article className="selected-card large" data-project-id="aura-storage">
                <div className="selected-card-visual">
                  <Image src="/aura_storage.png" alt="" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" priority />
                </div>
                <div className="selected-card-content">
                  <div className="selected-card-meta">
                    <span className="selected-card-category">CLOUD & INFRASTRUCTURE</span>
                  </div>
                  <h3 className="selected-card-title">AURA Storage</h3>
                  <p className="selected-card-desc">Une plateforme de stockage conçue pour organiser, transférer et gérer des fichiers à travers une infrastructure auto-hébergée, une API et des services de stockage compatibles S3.</p>
                  <div className="selected-card-tech">
                    <span>Docker Compose</span>
                    <span>Traefik</span>
                    <span>PostgreSQL</span>
                    <span>S3/SeaweedFS</span>
                  </div>
                  <div className="selected-card-actions">
                    <Link className="selected-card-link" href="https://github.com/digitaleflex/aura-storage" target="_blank" rel="noreferrer">Explorer le projet <ArrowRight size={12} /></Link>
                    <Link className="selected-card-link secondary" href="https://github.com/digitaleflex/aura-storage/tree/main/docs#architecture" target="_blank" rel="noreferrer">Voir l&#39;architecture <ArrowRight size={12} /></Link>
                  </div>
                </div>
              </article>
              <article className="selected-card" data-project-id="wpopsx">
                <div className="selected-card-visual">
                  <Image src="/wpopsx.png" alt="" fill sizes="(max-width: 768px) 100vw, 32vw" className="object-cover" />
                </div>
                <div className="selected-card-content">
                  <div className="selected-card-meta">
                    <span className="selected-card-category">DEVOPS & OBSERVABILITÉ</span>
                  </div>
                  <h3 className="selected-card-title">WPOpsX</h3>
                  <p className="selected-card-desc">Un environnement d’exploitation WordPress conçu autour de conteneurs, d’un reverse proxy et d’outils de supervision pour structurer le déploiement et l’observabilité.</p>
                  <div className="selected-card-tech">
                    <span>Docker</span>
                    <span>Traefik</span>
                    <span>MariaDB</span>
                    <span>Redis</span>
                  </div>
                  <div className="selected-card-actions">
                    <Link className="selected-card-link" href="https://github.com/digitaleflex/WPOpsX" target="_blank" rel="noreferrer">Explorer le projet <ArrowRight size={12} /></Link>
                  </div>
                </div>
              </article>
              <article className="selected-card" data-project-id="hashcode-reboot">
                <div className="selected-card-visual">
                  <Image src="/hashcode_reboot.png" alt="" fill sizes="(max-width: 768px) 100vw, 32vw" className="object-cover" />
                </div>
                <div className="selected-card-content">
                  <div className="selected-card-meta">
                    <span className="selected-card-category">FULL-STACK & PRODUIT NUMÉRIQUE</span>
                  </div>
                  <h3 className="selected-card-title">HashCode Reboot</h3>
                  <p className="selected-card-desc">Une plateforme pensée pour structurer l’intégration des membres, les parcours communautaires et la qualification des profils au sein de l’écosystème HashCode.</p>
                  <div className="selected-card-tech">
                    <span>Next.js</span>
                    <span>PostgreSQL</span>
                    <span>Prisma</span>
                    <span>BetterAuth</span>
                  </div>
                  <div className="selected-card-actions">
                    <Link className="selected-card-link" href="https://github.com/digitaleflex/hashcode_reboot" target="_blank" rel="noreferrer">Explorer le projet <ArrowRight size={12} /></Link>
                  </div>
                </div>
              </article>
              <article className="selected-card" data-project-id="eurinhash-ai-lab">
                <div className="selected-card-visual">
                  <Image src="/eurin_ai_lab.png" alt="" fill sizes="(max-width: 768px) 100vw, 32vw" className="object-cover" />
                </div>
                <div className="selected-card-content">
                  <div className="selected-card-meta">
                    <span className="selected-card-category">IA APPLIQUÉE & EXPÉRIMENTATION</span>
                  </div>
                  <h3 className="selected-card-title">EurinHash AI Lab</h3>
                  <p className="selected-card-desc">Un laboratoire d’expérimentation consacré à l’évaluation des modèles d’IA, à l’orchestration des agents, à la résilience et à l’optimisation des coûts.</p>
                  <div className="selected-card-tech">
                    <span>AI/ML</span>
                    <span>Agents</span>
                    <span>Benchmarks</span>
                    <span>Prototypes</span>
                  </div>
                  <div className="selected-card-actions">
                    <Link className="selected-card-link" href="https://github.com/digitaleflex/eurinhash-ai-lab" target="_blank" rel="noreferrer">Explorer le laboratoire <ArrowRight size={12} /></Link>
                  </div>
                </div>
              </article>
              <article className="selected-card" data-project-id="joinhashcode">
                <div className="selected-card-visual">
                  <Image src="/joinhashcode.png" alt="" fill sizes="(max-width: 768px) 100vw, 32vw" className="object-cover" />
                </div>
                <div className="selected-card-content">
                  <div className="selected-card-meta">
                    <span className="selected-card-category">CYBERSÉCURITÉ & COMMUNAUTÉ</span>
                  </div>
                  <h3 className="selected-card-title">JoinHashCode</h3>
                  <p className="selected-card-desc">Une plateforme communautaire orientée vers l’apprentissage technique, la cybersécurité et la structuration de parcours de progression.</p>
                  <div className="selected-card-tech">
                    <span>Next.js</span>
                    <span>PostgreSQL</span>
                    <span>Prisma</span>
                    <span>BetterAuth</span>
                  </div>
                  <div className="selected-card-actions">
                  </div>
                </div>
              </article>
            </div>
            <Link className="button secondary mt-7" href="/projets">Explorer l’ensemble des projets <ArrowRight size={15} /></Link>
          </div>
        </section>

        <section className="section">
          <div className="container-shell">
            <div className="kicker">Compétences & centres d’intérêt</div>
            <h2>Relier la réflexion à la pratique.</h2>
            <p className="intro">Les domaines dans lesquels je développe mes compétences et mène mes expérimentations.</p>
            <div className="service-grid">{interests.map(({ icon: Icon, title, desc }) => <article className="card" key={title}>
              <Icon size={23} color="#69a9ff" /><h3>{title}</h3><p>{desc}</p>
            </article>)}</div>
            <Link className="button secondary mt-7" href="/services">Voir mes compétences <ArrowRight size={15} /></Link>
          </div>
        </section>

        <section className="section">
          <div className="container-shell">
            <div className="kicker">Ma méthode</div><h2>Apprendre en construisant.</h2>
            <p className="intro">Une démarche simple qui m’aide à garder le cap dans mes projets, même lorsque les contraintes sont fortes.</p>
            <div className="steps">{steps.map(([n, title, desc]) => <article className="step" key={n}>
              <span className="step-num">{n}</span><h3>{title}</h3><p>{desc}</p>
            </article>)}</div>
          </div>
        </section>

        <section className="section">
          <div className="container-shell split">
            <div><div className="kicker">À propos de moi</div><h2>La technologie, par curiosité et par pratique.</h2>
              <p className="intro">Mon site personnel rassemble mon parcours, mes réflexions et les projets sur lesquels je travaille. J’y partage ce que j’apprends, les problèmes que j’explore et les solutions que je tente de construire.</p>
              <Link className="button secondary mt-6" href="/a-propos">Découvrir mon parcours <ArrowRight size={15} /></Link>
            </div>
            <div><div className="kicker">Notes & analyses</div><h2>Idées en cours d’exploration.</h2>
              <article className="note"><small>Architecture · À venir</small><h3>Comment choisir une architecture adaptée à un projet ?</h3></article>
              <article className="note"><small>Infrastructure · À venir</small><h3>Les bases d’une infrastructure fiable et observable</h3></article>
              <Link className="mt-5 inline-flex items-center gap-2 text-accent-soft" href="/notes">Lire mes notes <ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-shell"><div className="cta">
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