"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { ArrowIcon } from "@/components/icons";
import { VehicleCard } from "@/components/vehicle-card";
import {
  filterCatalogVehicles,
  getExploreFilterLabel,
} from "@/lib/explore-options";
import { vehicles } from "@/lib/vehicles";

export function VehicleResults() {
  const searchParams = useSearchParams();
  const brand = searchParams.get("marca") ?? undefined;
  const body = searchParams.get("carrozzeria") ?? undefined;
  const model = searchParams.get("modello") ?? undefined;
  const filteredVehicles = filterCatalogVehicles(vehicles, {
    brand,
    body,
    model,
  });
  const filterLabel =
    getExploreFilterLabel(brand) ??
    getExploreFilterLabel(body) ??
    (model ? model : undefined);

  return (
    <div className="catalog-results">
      <div className="catalog-toolbar">
        <div>
          <p>
            <strong>{filteredVehicles.length}</strong>{" "}
            {filteredVehicles.length === 1 ? "veicolo" : "veicoli"}
          </p>
          <span>
            {filterLabel
              ? `Risultati per ${filterLabel}`
              : "Tutta la selezione"}
          </span>
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

      {filteredVehicles.length ? (
        <>
          <div className="vehicle-grid vehicle-grid--catalog">
            {filteredVehicles.map((vehicle) => (
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
        </>
      ) : (
        <div className="catalog-empty">
          <p className="eyebrow">Nessun risultato</p>
          <h2>Questa selezione è in arrivo.</h2>
          <p>
            Contattaci per indicarci il veicolo che stai cercando oppure torna
            alla selezione completa.
          </p>
          <div>
            <Link className="button button--blue" href="/veicoli">
              Vedi tutti i veicoli
            </Link>
            <Link className="text-link" href="/#contatti">
              Contattaci <ArrowIcon />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
