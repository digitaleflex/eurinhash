import { stack } from "@/content/projects";

/* Bandeau défilant des technologies utilisées dans les projets.
   Pure CSS : la liste est dupliquée pour une boucle continue, la copie est masquée aux lecteurs d’écran. */

export function StackMarquee() {
  return (
    <section className="stack-band" aria-label="Technologies utilisées dans mes projets">
      <div className="stack-band__track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="stack-band__list" aria-hidden={copy === 1 ? true : undefined}>
            {stack.map((t) => <li key={t}>{t}</li>)}
          </ul>
        ))}
      </div>
    </section>
  );
}
