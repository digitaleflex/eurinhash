import type { ReactNode } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./code-block";
import { Diagram, resolveDiagram } from "./diagrams";
import { InteractiveTerminal, type TerminalStep } from "./interactive-terminal";

/* Rendu des articles Markdown. Chaque type de bloc a un composant dédié :
   code coloré, terminal pédagogique, schéma vérifié, tableau, encadré.
   Les brouillons restent lisibles même si JavaScript est désactivé :
   les composants interactifs dégradent vers un contenu statique. */

const AURA_TERMINAL: TerminalStep[] = [
  {
    command: "docker compose ps",
    output: `NAME                SERVICE    STATUS                   PORTS
aura-api-1          api        Up 3 hours (healthy)     0.0.0.0:8080->8080/tcp
aura-postgres-1     postgres   Up 3 hours (healthy)     5432/tcp
aura-seaweedfs-1    seaweedfs  Up 3 hours               8333/tcp
aura-traefik-1      traefik    Up 3 hours               0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp`,
    purpose: "Voir quels services sont déclarés et dans quel état déclaré ils se trouvent.",
    inspect: "Le statut, la mention de santé et les ports publiés de chaque service.",
    conclusion: "Les conteneurs attendus sont démarrés et le catalogue répond à son contrôle de santé.",
    limits: "L’état déclaré d’un conteneur ne dit rien de la cohérence des données qu’il manipule.",
  },
  {
    command: "docker compose logs --tail=20",
    output: `api-1  | 2026-01-12T10:02:11Z INFO  transfer finalized id=8f2c key=obj/8f2c size=1048576
api-1  | 2026-01-12T10:02:11Z WARN  checksum mismatch retried id=8f2c attempt=1
api-1  | 2026-01-12T10:02:12Z INFO  checksum verified id=8f2c attempt=2
api-1  | 2026-01-12T10:03:40Z ERROR presigned url expired id=91ad tenant=acme
postgres-1 | 2026-01-12T10:03:05Z LOG  checkpoint complete`,
    purpose: "Examiner les événements récents des services applicatifs.",
    inspect: "Les erreurs, les avertissements répétés et les redémarrages récents.",
    conclusion: "Un transfert a nécessité une reprise, et une URL présignée a expiré : le comportement est traité, mais mérite d’être mesuré.",
    limits: "Vingt lignes ne représentent pas l’historique complet ; d’autres erreurs peuvent être plus anciennes ou dans un autre service.",
  },
  {
    command: "docker volume ls",
    output: `DRIVER    VOLUME NAME
local     aura_postgres-data
local     aura_seaweed-data
local     aura_traefik-acme`,
    purpose: "Identifier les volumes Docker existants.",
    inspect: "La présence et le nom des volumes qui doivent porter les données persistantes.",
    conclusion: "Des volumes sont déclarés côté Docker : les données peuvent survivre à la recréation des conteneurs si les montages sont corrects.",
    limits: "Un volume existant ne prouve ni qu’il est monté au bon endroit, ni qu’il contient les données attendues, ni qu’une restauration est possible. La fiabilité des sauvegardes reste à démontrer par un exercice de restauration.",
  },
];

function nodeText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(nodeText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return nodeText((children as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export function NoteBody({ markdown, outline }: {
  markdown: string;
  outline: { id: string; text: string; level: 2 | 3 }[];
}) {
  /* Files d’ancres : le même identifiant est produit pour le sommaire
     et pour le titre rendu, y compris en cas de doublon. */
  const queues = new Map<string, string[]>();
  for (const item of outline) {
    const key = `${item.level}::${item.text}`;
    queues.set(key, [...(queues.get(key) ?? []), item.id]);
  }
  const nextId = (level: 2 | 3, text: string) => queues.get(`${level}::${text}`)?.shift();

  const components: Components = {
    h1: ({ children }) => <h2 className="note-h1">{children}</h2>,
    h2: ({ children }) => {
      const text = nodeText(children);
      return <h2 id={nextId(2, text)}>{children}</h2>;
    },
    h3: ({ children }) => {
      const text = nodeText(children);
      return <h3 id={nextId(3, text)}>{children}</h3>;
    },
    p: ({ children }) => <p>{children}</p>,
    a: ({ href = "", children }) => {
      const external = /^https?:\/\//.test(href);
      return external ? (
        <a href={href} target="_blank" rel="noreferrer">{children}</a>
      ) : (
        <a href={href}>{children}</a>
      );
    },
    blockquote: ({ children }) => <aside className="note-callout">{children}</aside>,
    table: ({ children }) => (
      <div className="note-table__scroll">
        <table>{children}</table>
      </div>
    ),
    pre: ({ children }) => <>{children}</>,
    code: ({ className, children }) => {
      const match = /language-([\w-]+)/.exec(className ?? "");
      const raw = String(children).replace(/\n$/, "");

      if (!match) {
        // Fence sans langage : rendre comme bloc, pas comme code inline.
        return raw.includes("\n")
          ? <CodeBlock code={raw} language="text" />
          : <code className="inline-code">{children}</code>;
      }

      const language = match[1];
      if (language === "mermaid") {
        const diagram = resolveDiagram(raw);
        if (diagram) return <Diagram id={diagram} />;
        return (
          <CodeBlock
            code={raw}
            language="text"
            caption="Schéma non résolu : representation textuelle de la source Mermaid."
          />
        );
      }

      if (language === "bash" && raw.includes("docker compose ps")) {
        return <InteractiveTerminal title="Inspection d’une pile Docker Compose" steps={AURA_TERMINAL} />;
      }

      const editable = language.endsWith(":edit");
      const clean = editable ? language.replace(":edit", "") : language;
      return <CodeBlock code={raw} language={clean} editable={editable} />;
    },
  };

  return (
    <div className="note-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
