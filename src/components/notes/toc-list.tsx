"use client";

import { useEffect, useState } from "react";

export type TocEntry = {
  item: { id: string; text: string };
  children: { id: string; text: string }[];
};

/* Sommaire avec section active : observe les titres réels du corps.
   Deux instances possibles (mobile replié / desktop collant), chacune
   possède son observateur et se nettoie au démontage. */
export function TocList({ toc }: { toc: TocEntry[] }) {
  const [active, setActive] = useState<string | null>(toc[0]?.item.id ?? null);

  useEffect(() => {
    const ids = toc.flatMap((entry) => [entry.item.id, ...entry.children.map((child) => child.id)]);
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [toc]);

  return (
    <ol>
      {toc.map((entry) => (
        <li key={entry.item.id}>
          <a
            href={`#${entry.item.id}`}
            aria-current={active === entry.item.id ? "location" : undefined}
          >
            {entry.item.text}
          </a>
          {entry.children.length > 0 && (
            <ol>
              {entry.children.map((child) => (
                <li key={child.id}>
                  <a
                    href={`#${child.id}`}
                    aria-current={active === child.id ? "location" : undefined}
                  >
                    {child.text}
                  </a>
                </li>
              ))}
            </ol>
          )}
        </li>
      ))}
    </ol>
  );
}
