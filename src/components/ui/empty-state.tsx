import type * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: React.ReactNode;
  eyebrow?: string;
  tone?: "default" | "danger";
  headingLevel?: "h1" | "h2";
  className?: string;
  children?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, eyebrow, tone = "default", headingLevel = "h2", className, children }: EmptyStateProps) {
  const Heading = headingLevel;

  return <section className={cn("flex flex-col items-start", className)}>
    <span className={cn("grid size-12 shrink-0 place-items-center rounded-full border", tone === "danger" ? "border-danger/30 bg-danger/10 text-danger" : "border-line bg-overlay text-accent-soft")}>
      <Icon size={22} aria-hidden="true" />
    </span>
    {eyebrow ? <p className="eyebrow mt-6">{eyebrow}</p> : null}
    <Heading className={cn("text-4xl font-semibold tracking-tight sm:text-5xl", eyebrow ? "mt-4" : "mt-6")}>{title}</Heading>
    {description ? <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{description}</p> : null}
    {children ? <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div> : null}
  </section>;
}
