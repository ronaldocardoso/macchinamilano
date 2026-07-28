"use client";

import { useEffect, useRef, useState } from "react";

import {
  CarIcon,
  CloseIcon,
  SearchIcon,
  SlidersIcon,
} from "@/components/icons";
import { brands, categories, vehicles } from "@/lib/vehicles";

export function CatalogFilters() {
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
        className={`filters-backdrop${isOpen ? "filters-backdrop--open" : ""}`}
        onClick={closeFilters}
        tabIndex={isOpen ? 0 : -1}
        type="button"
      />

      <aside
        className={`filters${isOpen ? "filters--open" : ""}`}
        id="catalog-filters"
      >
        <form>
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
                Filtri <span>({vehicles.length})</span>
              </h2>
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
            onClick={closeFilters}
            type="button"
          >
            Mostra {vehicles.length} veicoli
          </button>
        </form>
      </aside>
    </>
  );
}
