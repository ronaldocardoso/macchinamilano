import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { CatalogFilters } from "@/components/catalog-filters";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VehicleResults } from "@/components/vehicle-results";

export const metadata: Metadata = {
  title: "Veicoli premium",
  description:
    "Esplora la selezione Macchina Milano di veicoli premium da Milano e dalla regione.",
  alternates: {
    canonical: "/veicoli/",
  },
  openGraph: {
    url: "/veicoli/",
    title: "Veicoli premium | Macchina Milano",
    description:
      "Esplora la selezione Macchina Milano di veicoli premium da Milano e dalla regione.",
  },
};

export default function VehiclesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="breadcrumbs container">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Veicoli</span>
        </div>

        <section className="catalog-hero">
          <div className="catalog-hero__grid container">
            <div>
              <p className="eyebrow eyebrow--light">La selezione</p>
              <h1>Trova la tua prossima auto straordinaria.</h1>
            </div>
          </div>
        </section>

        <section className="catalog-section">
          <div className="catalog-layout container">
            <Suspense
              fallback={
                <div className="filters catalog-filters--loading">
                  Caricamento filtri…
                </div>
              }
            >
              <CatalogFilters />
            </Suspense>

            <Suspense
              fallback={
                <div className="catalog-results catalog-results--loading">
                  Caricamento della selezione…
                </div>
              }
            >
              <VehicleResults />
            </Suspense>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
