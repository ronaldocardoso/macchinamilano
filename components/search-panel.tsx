import { SearchIcon } from "@/components/icons";
import { brands, vehicles } from "@/lib/vehicles";

type SearchPanelProps = {
  compact?: boolean;
};

export function SearchPanel({ compact = false }: SearchPanelProps) {
  const models = Array.from(
    new Set(vehicles.map((vehicle) => vehicle.model)),
  ).sort();

  return (
    <form
      action="/veicoli"
      className={`search-panel ${compact ? "search-panel--compact" : ""}`}
    >
      <label>
        <span>Marca</span>
        <select defaultValue="" name="marca">
          <option value="">Tutte le marche</option>
          {brands.map((brand) => (
            <option key={brand} value={brand.toLowerCase()}>
              {brand}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Modello</span>
        <select defaultValue="" name="modello">
          <option value="">Tutti i modelli</option>
          {models.map((model) => (
            <option key={model} value={model.toLowerCase()}>
              {model}
            </option>
          ))}
        </select>
      </label>
      <button
        className="button button--blue search-panel__button"
        type="submit"
      >
        <SearchIcon />
        Vedi veicoli
      </button>
    </form>
  );
}
