"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { reportError } from "@/lib/report-error";

export default function Error({ error, retry }: { error: unknown; reset: () => void; retry: () => void }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const digest = error instanceof Error && "digest" in error ? (error as { digest?: string }).digest : undefined;

  useEffect(() => {
    reportError(error, "render");
    titleRef.current?.focus();
  }, [error]);

  return <>
    <SiteHeader current="" />
    <main className="container-shell state-page">
      <p className="eyebrow">Erreur inattendue</p>
      <h1 ref={titleRef} tabIndex={-1} className="mt-6 text-4xl font-semibold tracking-tight focus:outline-none sm:text-5xl">Cette section n’a pas pu s’afficher.</h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">Une erreur inattendue a interrompu le rendu de cette page. Le reste du site reste accessible.</p>
      {digest ? <Alert className="mt-6 max-w-xl">
        <Info aria-hidden="true" />
        <AlertTitle>Référence technique</AlertTitle>
        <AlertDescription className="font-mono text-xs break-all">Référence : {digest}</AlertDescription>
      </Alert> : null}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button onClick={() => retry()}>Réessayer</Button>
        <Button asChild variant="secondary"><Link href="/">Retour à l’accueil</Link></Button>
      </div>
    </main>
    <SiteFooter />
  </>;
}
