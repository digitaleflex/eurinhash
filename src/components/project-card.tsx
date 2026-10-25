import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";

/* Carte projet partagée entre l’accueil et /projets. */

export function ProjectCard({ project, index, featured = false, showFocus = false }: { project: Project; index: number; featured?: boolean; showFocus?: boolean }) {
  return (
    <article className={featured ? "selected-card selected-card--featured" : "selected-card"} data-project-id={project.id} data-reveal data-reveal-delay={Math.min(index * 0.06, 0.24)}>
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
        {showFocus && (
          <ul className="selected-card-focus" aria-label={`Points clés : ${project.title}`}>
            {project.focus.map((f) => <li key={f}>{f}</li>)}
          </ul>
        )}
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
}
