import type { Metadata } from "next";
import Link from "next/link";

import { ArrowIcon, CarIcon, SearchIcon } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VehicleCard } from "@/components/vehicle-card";
import { brands, categories, vehicles } from "@/lib/vehicles";

export const metadata: Metadata = {
  title: "Veicoli premium",
  description:
    "Esplora la selezione Macchina Milano di veicoli premium da Milano e dalla regione.",
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
            <p>
              Veicoli premium scelti da Milano e dalla regione. Confronta le
              caratteristiche e contatta direttamente il concessionario.
            </p>
          </div>
        </section>

        <section className="catalog-section">
          <div className="catalog-layout container">
            <aside className="filters">
              <div className="filters__header">
                <div>
                  <p className="eyebrow">Ricerca</p>
                  <h2>Filtri</h2>
                </div>
                <button type="reset">Azzera</button>
              </div>

              <label className="filter-search">
                <span className="sr-only">Cerca marca o modello</span>
                <input placeholder="Marca o modello" type="search" />
                <SearchIcon />
              </label>

              <fieldset>
                <legend>Prezzo</legend>
                <div className="filter-row">
                  <label>
                    <span>Da</span>
                    <select defaultValue="100000">
                      <option value="100000">100.000 €</option>
                      <option value="150000">150.000 €</option>
                      <option value="250000">250.000 €</option>
                    </select>
                  </label>
                  <label>
                    <span>A</span>
                    <select defaultValue="">
                      <option value="">Senza limite</option>
                      <option value="250000">250.000 €</option>
                      <option value="350000">350.000 €</option>
                      <option value="500000">500.000 €</option>
                    </select>
                  </label>
                </div>
              </fieldset>

              <fieldset>
                <legend>Condizione</legend>
                <label className="check-row">
                  <input type="checkbox" /> Nuovo
                </label>
                <label className="check-row">
                  <input type="checkbox" /> Usato
                </label>
              </fieldset>

              <fieldset>
                <legend>Marca</legend>
                <div className="filter-chips">
                  {brands.map((brand) => (
                    <label key={brand}>
                      <input name="brand" type="checkbox" />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend>Categoria</legend>
                <div className="filter-chips filter-chips--categories">
                  {categories.map((category) => (
                    <label key={category}>
                      <input name="category" type="checkbox" />
                      <span>
                        <CarIcon /> {category}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend>Anno</legend>
                <div className="filter-row">
                  <label>
                    <span>Dal</span>
                    <select defaultValue="2022">
                      <option>2022</option>
                      <option>2023</option>
                      <option>2024</option>
                    </select>
                  </label>
                  <label>
                    <span>Al</span>
                    <select defaultValue="2026">
                      <option>2024</option>
                      <option>2025</option>
                      <option>2026</option>
                    </select>
                  </label>
                </div>
              </fieldset>

              <fieldset>
                <legend>Alimentazione</legend>
                {["Benzina", "Ibrida", "Elettrica"].map((fuel) => (
                  <label className="check-row" key={fuel}>
                    <input type="checkbox" /> {fuel}
                  </label>
                ))}
              </fieldset>

              <button
                className="button button--red filters__submit"
                type="button"
              >
                Mostra 12 veicoli
              </button>
            </aside>

            <div className="catalog-results">
              <div className="catalog-toolbar">
                <div>
                  <p>
                    <strong>12</strong> veicoli
                  </p>
                  <span>Contenuti dimostrativi</span>
                </div>
                <label>
                  <span>Ordina per</span>
                  <select defaultValue="featured">
                    <option value="featured">In evidenza</option>
                    <option value="recent">Più recenti</option>
                    <option value="price-asc">Prezzo crescente</option>
                    <option value="price-desc">Prezzo decrescente</option>
                  </select>
                </label>
              </div>
              <div className="vehicle-grid vehicle-grid--catalog">
                {vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.slug} vehicle={vehicle} />
                ))}
              </div>
              <nav aria-label="Paginazione" className="pagination">
                <span className="pagination__current">1</span>
                <button type="button">2</button>
                <button type="button">3</button>
                <button aria-label="Pagina successiva" type="button">
                  <ArrowIcon />
                </button>
              </nav>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
