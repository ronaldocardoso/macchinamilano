"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { ArrowIcon } from "@/components/icons";
import { VehicleCard } from "@/components/vehicle-card";
import {
  filterCatalogVehicles,
  getExploreFilterLabel,
} from "@/lib/explore-options";
import { vehicles } from "@/lib/vehicles";

export function VehicleResults() {
  const pageSize = 24;
  const router = useRouter();
  const searchParams = useSearchParams();
  const brand = searchParams.get("marca") ?? undefined;
  const body = searchParams.get("carrozzeria") ?? undefined;
  const model = searchParams.get("modello") ?? undefined;
  const order = searchParams.get("ordine") ?? "featured";
  const filteredVehicles = filterCatalogVehicles(vehicles, {
    brand,
    body,
    model,
  });
  const sortedVehicles = [...filteredVehicles].sort((first, second) => {
    if (order === "recent") {
      return (
        (second.year ?? 0) - (first.year ?? 0) ||
        (first.mileage ?? Number.MAX_SAFE_INTEGER) -
          (second.mileage ?? Number.MAX_SAFE_INTEGER)
      );
    }

    if (order === "price-asc") {
      return first.price - second.price;
    }

    if (order === "price-desc") {
      return second.price - first.price;
    }

    return Number(Boolean(second.featured)) - Number(Boolean(first.featured));
  });
  const totalPages = Math.max(1, Math.ceil(sortedVehicles.length / pageSize));
  const requestedPage = Number(searchParams.get("pagina") ?? "1");
  const currentPage = Math.min(
    totalPages,
    Math.max(1, Number.isInteger(requestedPage) ? requestedPage : 1),
  );
  const visibleVehicles = sortedVehicles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => {
      const firstPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
      return firstPage + index;
    },
  );

  function catalogUrl(page: number, nextOrder = order) {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) {
      params.delete("pagina");
    } else {
      params.set("pagina", String(page));
    }

    if (nextOrder === "featured") {
      params.delete("ordine");
    } else {
      params.set("ordine", nextOrder);
    }

    const query = params.toString();
    return query ? `/veicoli?${query}` : "/veicoli";
  }
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
          <select
            onChange={(event) =>
              router.push(catalogUrl(1, event.currentTarget.value))
            }
            value={order}
          >
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
            {visibleVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.slug} vehicle={vehicle} />
            ))}
          </div>
          {totalPages > 1 && (
            <nav aria-label="Paginazione" className="pagination">
              {currentPage > 1 && (
                <Link
                  aria-label="Pagina precedente"
                  className="pagination__previous"
                  href={catalogUrl(currentPage - 1)}
                >
                  <ArrowIcon />
                </Link>
              )}
              {visiblePages.map((page) =>
                page === currentPage ? (
                  <span className="pagination__current" key={page}>
                    {page}
                  </span>
                ) : (
                  <Link href={catalogUrl(page)} key={page}>
                    {page}
                  </Link>
                ),
              )}
              {currentPage < totalPages && (
                <Link
                  aria-label="Pagina successiva"
                  href={catalogUrl(currentPage + 1)}
                >
                  <ArrowIcon />
                </Link>
              )}
            </nav>
          )}
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
