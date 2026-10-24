import Link from "next/link";
import { Compass } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function NotFound() {
  return <>
    <SiteHeader current="" />
    <main id="contenu" className="container-shell state-page">
      <EmptyState
        icon={Compass}
        eyebrow="Erreur 404"
        headingLevel="h1"
        title="Cette page n’existe pas."
        description="Le lien est peut-être incorrect, ou la page a été déplacée. Voici quelques points de départ."
      >
        <Button asChild><Link href="/">Retour à l’accueil</Link></Button>
        <Button asChild variant="secondary"><Link href="/projets">Voir mes projets</Link></Button>
        <Button asChild variant="ghost"><Link href="/contact">Me contacter</Link></Button>
      </EmptyState>
    </main>
    <SiteFooter />
  </>;
}
