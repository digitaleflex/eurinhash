import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return <>
    <SiteHeader current="" />
    <main id="contenu" role="status" aria-live="polite" aria-busy="true" className="container-shell">
      <span className="sr-only">Chargement de la page…</span>
      <div aria-hidden="true" className="flex min-h-[60vh] flex-col justify-center py-20">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="mt-6 h-11 w-full max-w-[560px]" />
        <Skeleton className="mt-3 h-11 w-4/5 max-w-[440px]" />
        <Skeleton className="mt-6 h-5 w-full max-w-[500px]" />
        <Skeleton className="mt-3 h-5 w-2/3 max-w-[360px]" />
        <div className="mt-8 flex flex-wrap gap-3">
          <Skeleton className="h-11 w-40 rounded-full" />
          <Skeleton className="h-11 w-36 rounded-full" />
        </div>
      </div>
      <div aria-hidden="true" className="grid gap-4 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-56 rounded-2xl" />
        <Skeleton className="h-56 rounded-2xl" />
        <Skeleton className="h-56 rounded-2xl" />
      </div>
    </main>
    <SiteFooter />
  </>;
}
