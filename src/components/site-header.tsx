import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/projets", label: "Mes projets" },
  { href: "/services", label: "Compétences" },
  { href: "/a-propos", label: "Mon parcours" },
  { href: "/notes", label: "Notes" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader({ current = "/" }: { current?: string }) {
  return <header className="site-header"><div className="container-shell flex h-[76px] items-center justify-between gap-5">
    <Link className="wordmark" href="/" aria-label="Eurin Hash, accueil"><Image src="/eurinhash-wordmark-trim.png" alt="" width={480} height={51} priority className="h-[22px] w-auto shrink-0" /></Link>
    <nav aria-label="Navigation principale" className="hidden items-center gap-6 lg:flex">
      {links.map(l => <Link key={l.href} href={l.href} aria-current={current === l.href ? "page" : undefined} className={`nav-link ${current === l.href ? "nav-link-active" : ""}`}>{l.label}</Link>)}
    </nav>
    <div className="hidden lg:block"><Button asChild size="sm"><Link href="/contact">Me contacter <ArrowUpRight size={15} /></Link></Button></div>
    <details className="mobile-nav lg:hidden"><summary aria-label="Ouvrir le menu"><Menu size={21} /></summary><nav aria-label="Navigation mobile">
      {links.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
      <Link href="/contact" className="mobile-nav-cta">Me contacter ↗</Link>
    </nav></details>
  </div></header>;
}
