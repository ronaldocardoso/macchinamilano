import type { Metadata } from "next";
import Link from "next/link";

import { MagazineCard } from "@/components/magazine-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { magazineArticles } from "@/lib/magazine";

export const metadata: Metadata = {
  title: "Magazine: guide per auto premium a Milano",
  description:
    "Guide affidabili per scegliere, acquistare e guidare auto premium a Milano e in Lombardia. Mobilità, costi, verifiche e cultura automobilistica.",
  alternates: {
    canonical: "/magazine/",
  },
  openGraph: {
    url: "/magazine/",
    title: "Magazine | Macchina Milano",
    description:
      "Guide affidabili per scegliere, acquistare e guidare auto premium a Milano e in Lombardia.",
  },
};

export default function MagazinePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="breadcrumbs container">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Magazine</span>
        </div>

        <section className="magazine-hero">
          <div className="magazine-hero__inner container">
            <p className="eyebrow eyebrow--light">Macchina Milano Magazine</p>
            <h1>Conoscere meglio. Scegliere con più chiarezza.</h1>
            <p>
              Guide concrete per acquistare, possedere e guidare un’auto
              speciale a Milano e in Lombardia.
            </p>
          </div>
        </section>

        <section className="magazine-index section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Guide e approfondimenti</p>
                <h2>Ultimi articoli</h2>
              </div>
              <p className="magazine-index__note">
                Contenuti verificati e aggiornati con fonti ufficiali.
              </p>
            </div>
            <div className="magazine-grid">
              {magazineArticles.map((article, index) => (
                <MagazineCard
                  article={article}
                  index={index}
                  key={article.slug}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
