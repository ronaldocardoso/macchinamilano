import type { Vehicle } from "@/lib/vehicles";

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
  { label: "Jaguar", value: "jaguar", image: "/explore/jaguar.webp" },
  { label: "Porsche", value: "porsche", image: "/explore/porsche.png" },
  { label: "Ferrari", value: "ferrari", image: "/explore/ferrari.webp" },
  {
    label: "Rolls-Royce",
    value: "rolls-royce",
    image: "/explore/rolls-royce.webp",
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
  filters: { brand?: string; body?: string; model?: string },
) {
  const brandTerms = filters.brand
    ? (brandAliases[filters.brand] ?? [normalize(filters.brand)])
    : [];
  const bodyTerms = filters.body
    ? (bodyAliases[filters.body] ?? [normalize(filters.body)])
    : [];
  const modelTerm = filters.model ? normalize(filters.model) : "";

  return vehicles.filter((vehicle) => {
    const vehicleBrand = normalize(vehicle.brand);
    const vehicleBody = normalize(vehicle.bodyType);
    const vehicleModel = normalize(vehicle.model);

    return (
      (!brandTerms.length ||
        brandTerms.some((term) => vehicleBrand.includes(term))) &&
      (!bodyTerms.length ||
        bodyTerms.some((term) => vehicleBody.includes(term))) &&
      (!modelTerm || vehicleModel.includes(modelTerm))
    );
  });
}

export function getExploreFilterLabel(value?: string) {
  if (!value) return undefined;
  return [...exploreBrands, ...bodyStyles].find(
    (option) => option.value === value,
  )?.label;
}
