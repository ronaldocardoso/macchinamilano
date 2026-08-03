import { matchesFuelCategory, type Vehicle } from "./vehicles";

export type ExploreOption = {
  label: string;
  value: string;
  image: string;
};

export const exploreBrands: ExploreOption[] = [
  { label: "Audi", value: "audi", image: "/explore/audi.webp" },
  { label: "BMW", value: "bmw", image: "/explore/bmw.webp" },
  {
    label: "Mercedes-Benz",
    value: "mercedes-benz",
    image: "/explore/mercedes-benz.png",
  },
  {
    label: "Maserati",
    value: "maserati",
    image: "/explore/maserati.png",
  },
  { label: "Porsche", value: "porsche", image: "/explore/porsche.png" },
  { label: "Ferrari", value: "ferrari", image: "/explore/ferrari.webp" },
  {
    label: "Lamborghini",
    value: "lamborghini",
    image: "/explore/lamborghini.webp",
  },
  { label: "McLaren", value: "mclaren", image: "/explore/mclaren.png" },
];

export const bodyStyles: ExploreOption[] = [
  { label: "SUV", value: "suv", image: "/explore/suv.png" },
  { label: "Berlina", value: "berlina", image: "/explore/berlina.png" },
  {
    label: "Station wagon",
    value: "station-wagon",
    image: "/explore/station-wagon.png",
  },
  { label: "City car", value: "city-car", image: "/explore/city-car.png" },
  {
    label: "Monovolume",
    value: "monovolume",
    image: "/explore/monovolume.png",
  },
  { label: "Coupé", value: "coupe", image: "/explore/coupe.png" },
  { label: "Cabrio", value: "cabrio", image: "/explore/cabrio.png" },
  {
    label: "Furgoni e van",
    value: "furgoni-e-van",
    image: "/explore/furgoni-van.png",
  },
];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

const brandAliases: Record<string, string[]> = {
  audi: ["audi"],
  bmw: ["bmw"],
  "mercedes-benz": ["mercedes"],
  jaguar: ["jaguar"],
  porsche: ["porsche"],
  ferrari: ["ferrari"],
  "rolls-royce": ["rolls royce"],
  mclaren: ["mclaren"],
  lamborghini: ["lamborghini"],
  maserati: ["maserati"],
};

const additionalFilterLabels: Record<string, string> = {
  lamborghini: "Lamborghini",
  maserati: "Maserati",
};

const bodyAliases: Record<string, string[]> = {
  suv: ["suv"],
  berlina: ["berlina"],
  "station-wagon": ["station wagon"],
  "city-car": ["city car"],
  monovolume: ["monovolume"],
  coupe: ["coupe"],
  cabrio: ["cabrio"],
  "furgoni-e-van": ["furgone", "furgoni", "van"],
};

export function filterCatalogVehicles(
  vehicles: Vehicle[],
  filters: {
    brand?: string;
    brands?: string[];
    body?: string;
    bodies?: string[];
    model?: string;
    conditions?: string[];
    fuels?: string[];
    minimumPrice?: number;
    maximumPrice?: number;
    minimumYear?: number;
    maximumYear?: number;
  },
) {
  const selectedBrands = filters.brands?.length
    ? filters.brands
    : filters.brand
      ? [filters.brand]
      : [];
  const selectedBodies = filters.bodies?.length
    ? filters.bodies
    : filters.body
      ? [filters.body]
      : [];
  const brandTermGroups = selectedBrands.map((brand) => {
    const normalizedBrand = normalize(brand);
    return brandAliases[normalizedBrand] ?? [normalizedBrand];
  });
  const bodyTermGroups = selectedBodies.map((body) => {
    const normalizedBody = normalize(body);
    return bodyAliases[normalizedBody] ?? [normalizedBody];
  });
  const modelTerm = filters.model ? normalize(filters.model) : "";
  const conditionTerms = (filters.conditions ?? []).map(normalize);

  return vehicles.filter((vehicle) => {
    const vehicleBrand = normalize(vehicle.brand);
    const vehicleBody = normalize(vehicle.bodyType);
    const vehicleDescription = normalize(
      `${vehicle.brand} ${vehicle.model} ${vehicle.version}`,
    );
    const vehicleCondition = normalize(vehicle.condition ?? "");

    return (
      (!brandTermGroups.length ||
        brandTermGroups.some((terms) =>
          terms.some((term) => vehicleBrand.includes(term)),
        )) &&
      (!bodyTermGroups.length ||
        bodyTermGroups.some((terms) =>
          terms.some((term) => vehicleBody.includes(term)),
        )) &&
      (!modelTerm || vehicleDescription.includes(modelTerm)) &&
      (!conditionTerms.length ||
        conditionTerms.some((term) => vehicleCondition === term)) &&
      (!(filters.fuels ?? []).length ||
        filters.fuels?.some((fuel) =>
          matchesFuelCategory(vehicle.fuel, fuel),
        )) &&
      (filters.minimumPrice === undefined ||
        vehicle.price >= filters.minimumPrice) &&
      (filters.maximumPrice === undefined ||
        vehicle.price <= filters.maximumPrice) &&
      (filters.minimumYear === undefined ||
        (vehicle.year !== undefined && vehicle.year >= filters.minimumYear)) &&
      (filters.maximumYear === undefined ||
        (vehicle.year !== undefined && vehicle.year <= filters.maximumYear))
    );
  });
}

export function getExploreFilterLabel(value?: string) {
  if (!value) return undefined;
  const normalizedValue = normalize(value);
  return (
    [...exploreBrands, ...bodyStyles].find(
      (option) =>
        normalize(option.value) === normalizedValue ||
        normalize(option.label) === normalizedValue,
    )?.label ??
    additionalFilterLabels[value] ??
    value
  );
}
