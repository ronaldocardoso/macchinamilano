"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState } from "react";

import {
  CarIcon,
  CloseIcon,
  SearchIcon,
  SlidersIcon,
} from "@/components/icons";
import { filterCatalogVehicles } from "@/lib/explore-options";
import {
  brands,
  catalogYears,
  categories,
  conditions,
  fuelCategories,
  vehicles,
} from "@/lib/vehicles";

const brandLogos: Record<string, string> = {
  audi: "/explore/audi.webp",
  bmw: "/explore/bmw.webp",
  ferrari: "/explore/ferrari.webp",
  lamborghini: "/explore/lamborghini.webp",
  maserati: "/explore/maserati.png",
  mclaren: "/explore/mclaren.png",
  "mercedes-benz": "/explore/mercedes-benz.png",
  porsche: "/explore/porsche.png",
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLocaleLowerCase("it-IT");
}

function selectedNumber(value: string | null) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function CatalogFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  function openFilters() {
    setIsOpen(true);
    requestAnimationFrame(() => closeRef.current?.focus());
  }

  function closeFilters() {
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function isSelected(name: string, value: string) {
    const normalizedValue = normalize(value);
    return searchParams
      .getAll(name)
      .some((selected) => normalize(selected) === normalizedValue);
  }

  const currentVehicles = filterCatalogVehicles(vehicles, {
    brands: searchParams.getAll("marca"),
    bodies: searchParams.getAll("carrozzeria"),
    model: searchParams.get("modello") ?? undefined,
    conditions: searchParams.getAll("condizione"),
    fuels: searchParams.getAll("alimentazione"),
    minimumPrice: selectedNumber(searchParams.get("prezzo_da")),
    maximumPrice: selectedNumber(searchParams.get("prezzo_a")),
    minimumYear: selectedNumber(searchParams.get("anno_da")),
    maximumYear: selectedNumber(searchParams.get("anno_a")),
  });

  function resetFilters() {
    router.push("/veicoli");
    closeFilters();
  }

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();

    for (const [name, value] of new FormData(event.currentTarget).entries()) {
      const normalizedValue = String(value).trim();

      if (
        !normalizedValue ||
        (name === "prezzo_da" && normalizedValue === "100000")
      ) {
        continue;
      }

      params.append(name, normalizedValue);
    }

    const query = params.toString();
    router.push(query ? `/veicoli?${query}` : "/veicoli");
    closeFilters();
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeFilters();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      <button
        aria-controls="catalog-filters"
        aria-expanded={isOpen}
        className="catalog-filter-trigger"
        onClick={openFilters}
        ref={triggerRef}
        type="button"
      >
        <SlidersIcon />
        Filtri
      </button>

      <button
        aria-label="Chiudi i filtri"
        className={
          isOpen
            ? "filters-backdrop filters-backdrop--open"
            : "filters-backdrop"
        }
        onClick={closeFilters}
        tabIndex={isOpen ? 0 : -1}
        type="button"
      />

      <aside
        className={isOpen ? "filters filters--open" : "filters"}
        id="catalog-filters"
      >
        <form
          action="/veicoli"
          key={searchParams.toString()}
          onSubmit={applyFilters}
        >
          <div className="filters__header">
            <button
              aria-label="Chiudi i filtri"
              className="filters__close"
              onClick={closeFilters}
              ref={closeRef}
              type="button"
            >
              <CloseIcon />
            </button>
            <div>
              <p className="eyebrow">Ricerca</p>
              <h2>
                Filtri <span>({currentVehicles.length})</span>
              </h2>
            </div>
            <button onClick={resetFilters} type="button">
              Azzera
            </button>
          </div>

          <label className="filter-search">
            <span className="sr-only">Cerca marca o modello</span>
            <input
              defaultValue={searchParams.get("modello") ?? ""}
              name="modello"
              placeholder="Marca o modello"
              type="search"
            />
            <SearchIcon />
          </label>

          <fieldset>
            <legend>Prezzo</legend>
            <div className="filter-row">
              <label>
                <span>Da</span>
                <select
                  defaultValue={searchParams.get("prezzo_da") ?? "100000"}
                  name="prezzo_da"
                >
                  <option value="100000">100.000 €</option>
                  <option value="150000">150.000 €</option>
                  <option value="250000">250.000 €</option>
                </select>
              </label>
              <label>
                <span>A</span>
                <select
                  defaultValue={searchParams.get("prezzo_a") ?? ""}
                  name="prezzo_a"
                >
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
            {conditions.map((condition) => (
              <label className="check-row" key={condition}>
                <input
                  defaultChecked={isSelected("condizione", condition)}
                  name="condizione"
                  type="checkbox"
                  value={condition}
                />{" "}
                {condition}
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>Marca</legend>
            <div className="filter-chips filter-chips--brands">
              {brands.map((brand) => {
                const logo = brandLogos[normalize(brand)];

                return (
                  <label key={brand}>
                    <input
                      defaultChecked={isSelected("marca", brand)}
                      name="marca"
                      type="checkbox"
                      value={brand}
                    />
                    <span>
                      {logo && (
                        <Image
                          alt=""
                          className="filter-brand-logo"
                          height={30}
                          src={logo}
                          width={64}
                        />
                      )}
                      {brand}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend>Carrozzeria</legend>
            <div className="filter-chips filter-chips--categories">
              {categories.map((category) => (
                <label key={category}>
                  <input
                    defaultChecked={isSelected("carrozzeria", category)}
                    name="carrozzeria"
                    type="checkbox"
                    value={category}
                  />
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
                <select
                  defaultValue={searchParams.get("anno_da") ?? ""}
                  name="anno_da"
                >
                  <option value="">Qualsiasi anno</option>
                  {catalogYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Al</span>
                <select
                  defaultValue={searchParams.get("anno_a") ?? ""}
                  name="anno_a"
                >
                  <option value="">Qualsiasi anno</option>
                  {catalogYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Alimentazione</legend>
            {fuelCategories.map((fuel) => (
              <label className="check-row" key={fuel}>
                <input
                  defaultChecked={isSelected("alimentazione", fuel)}
                  name="alimentazione"
                  type="checkbox"
                  value={fuel}
                />{" "}
                {fuel}
              </label>
            ))}
          </fieldset>

          <button className="button button--red filters__submit" type="submit">
            Mostra {currentVehicles.length} veicoli
          </button>
        </form>
      </aside>
    </>
  );
}
