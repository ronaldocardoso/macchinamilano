import { SearchIcon } from "@/components/icons";
import { brands, categories } from "@/lib/vehicles";

type SearchPanelProps = {
  compact?: boolean;
};

export function SearchPanel({ compact = false }: SearchPanelProps) {
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
        <span>Categoria</span>
        <select defaultValue="" name="categoria">
          <option value="">Tutte le categorie</option>
          {categories.map((category) => (
            <option key={category} value={category.toLowerCase()}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Prezzo fino a</span>
        <select defaultValue="" name="prezzo-max">
          <option value="">Nessun limite</option>
          <option value="150000">150.000 €</option>
          <option value="250000">250.000 €</option>
          <option value="350000">350.000 €</option>
          <option value="500000">500.000 €</option>
        </select>
      </label>
      <button className="button button--red search-panel__button" type="submit">
        <SearchIcon />
        Cerca
      </button>
    </form>
  );
}
