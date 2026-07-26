import importedCatalog from "../data/imported-catalog.json";

export type Vehicle = {
  slug: string;
  brand: string;
  model: string;
  version: string;
  price: number;
  year?: number;
  mileage?: number;
  fuel: string;
  transmission: string;
  bodyType: string;
  condition?: string;
  exteriorColor: string;
  interiorColor: string;
  power: string;
  location: string;
  dealer: string;
  accent: string;
  scene: "studio" | "city" | "track" | "lake";
  armored?: boolean;
  featured?: boolean;
  newArrival?: boolean;
  imageUrls?: string[];
  source?: string;
  sourceListingId?: string;
  sourceUrl?: string;
  collectedAt?: string;
  distanceKm?: number;
  dealerId?: string;
  dealerPhone?: string;
  dealerPhoneUri?: string;
  dealerPhones?: {
    type?: string;
    formatted?: string;
    callTo?: string;
  }[];
  dealerEmail?: string;
  dealerWebsite?: string;
  dealerLogoUrl?: string;
  dealerProfileUrl?: string;
  dealerStreet?: string;
  dealerPostalCode?: string;
  dealerProvince?: string;
  description?: string;
};

export type VehicleLabel = "Blindato" | "Elettrico";

export function getVehicleLabel(vehicle: Vehicle): VehicleLabel | undefined {
  if (vehicle.armored) {
    return "Blindato";
  }

  const fuel = vehicle.fuel.toLocaleLowerCase("it-IT");

  if (fuel.includes("elettric") || fuel.includes("ibrid")) {
    return "Elettrico";
  }

  return undefined;
}

const demoVehicles: Vehicle[] = [
  {
    slug: "ferrari-roma-spider",
    brand: "Ferrari",
    model: "Roma Spider",
    version: "V8 620 CV DCT",
    price: 319000,
    year: 2025,
    mileage: 1200,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Cabriolet",
    exteriorColor: "Rosso corsa",
    interiorColor: "Cuoio",
    power: "620 CV",
    location: "Milano",
    dealer: "Atelier Milano",
    accent: "#c71812",
    scene: "city",
    featured: true,
  },
  {
    slug: "porsche-911-gt3-touring",
    brand: "Porsche",
    model: "911 GT3 Touring",
    version: "4.0 510 CV PDK",
    price: 274900,
    year: 2024,
    mileage: 4800,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Coupé",
    exteriorColor: "Grigio ardesia",
    interiorColor: "Nero",
    power: "510 CV",
    location: "Monza",
    dealer: "Officina 1963",
    accent: "#6b6e73",
    scene: "track",
    featured: true,
  },
  {
    slug: "lamborghini-urus-performante",
    brand: "Lamborghini",
    model: "Urus Performante",
    version: "4.0 V8 666 CV",
    price: 348000,
    year: 2025,
    mileage: 900,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Luxury SUV",
    exteriorColor: "Verde turbine",
    interiorColor: "Nero e verde",
    power: "666 CV",
    location: "Milano",
    dealer: "Quadrilatero Motors",
    accent: "#435a2c",
    scene: "lake",
    featured: true,
  },
  {
    slug: "bentley-continental-gt-speed",
    brand: "Bentley",
    model: "Continental GT Speed",
    version: "W12 659 CV",
    price: 289500,
    year: 2023,
    mileage: 7600,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Gran Turismo",
    exteriorColor: "Blu notte",
    interiorColor: "Lino",
    power: "659 CV",
    location: "Como",
    dealer: "Lario Collection",
    accent: "#172c4e",
    scene: "lake",
    featured: true,
  },
  {
    slug: "maserati-mc20-cielo",
    brand: "Maserati",
    model: "MC20 Cielo",
    version: "Nettuno 630 CV",
    price: 289000,
    year: 2024,
    mileage: 3200,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Cabriolet",
    exteriorColor: "Bianco audace",
    interiorColor: "Ghiaccio",
    power: "630 CV",
    location: "Milano",
    dealer: "Corsa Privata",
    accent: "#deddd8",
    scene: "studio",
    newArrival: true,
  },
  {
    slug: "mercedes-amg-g63",
    brand: "Mercedes-AMG",
    model: "G 63",
    version: "4MATIC+ 585 CV",
    price: 238000,
    year: 2025,
    mileage: 600,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Luxury SUV",
    exteriorColor: "Nero ossidiana",
    interiorColor: "Rosso classico",
    power: "585 CV",
    location: "Milano",
    dealer: "Porta Nuova Auto",
    accent: "#17181b",
    scene: "city",
    newArrival: true,
  },
  {
    slug: "aston-martin-db12",
    brand: "Aston Martin",
    model: "DB12",
    version: "V8 680 CV",
    price: 278500,
    year: 2024,
    mileage: 2100,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Gran Turismo",
    exteriorColor: "British racing green",
    interiorColor: "Saddle tan",
    power: "680 CV",
    location: "Varese",
    dealer: "Veloce Society",
    accent: "#183f37",
    scene: "lake",
    newArrival: true,
  },
  {
    slug: "audi-rs-e-tron-gt",
    brand: "Audi Sport",
    model: "RS e-tron GT",
    version: "quattro 646 CV",
    price: 139900,
    year: 2024,
    mileage: 5600,
    fuel: "Elettrica",
    transmission: "Automatico",
    bodyType: "Berlina",
    exteriorColor: "Grigio kemora",
    interiorColor: "Nero",
    power: "646 CV",
    location: "Pavia",
    dealer: "Elettrica Milano",
    accent: "#777d81",
    scene: "studio",
    newArrival: true,
  },
  {
    slug: "bmw-m8-competition",
    brand: "BMW M",
    model: "M8 Competition",
    version: "xDrive 625 CV",
    price: 169000,
    year: 2023,
    mileage: 9800,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Coupé",
    exteriorColor: "Blu marina bay",
    interiorColor: "Nero",
    power: "625 CV",
    location: "Milano",
    dealer: "Navigli Performance",
    accent: "#174d77",
    scene: "city",
  },
  {
    slug: "range-rover-sv",
    brand: "Range Rover",
    model: "SV",
    version: "P615 LWB",
    price: 259000,
    year: 2025,
    mileage: 100,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Luxury SUV",
    exteriorColor: "Bronzo satinato",
    interiorColor: "Crema",
    power: "615 CV",
    location: "Como",
    dealer: "Lario Collection",
    accent: "#7b6653",
    scene: "lake",
  },
  {
    slug: "mclaren-artura",
    brand: "McLaren",
    model: "Artura",
    version: "V6 Hybrid 700 CV",
    price: 249900,
    year: 2024,
    mileage: 1800,
    fuel: "Ibrida",
    transmission: "Automatico",
    bodyType: "Supercar",
    exteriorColor: "Arancio papaya",
    interiorColor: "Nero",
    power: "700 CV",
    location: "Brescia",
    dealer: "Corsa Privata",
    accent: "#d8550a",
    scene: "track",
  },
  {
    slug: "rolls-royce-cullinan-black-badge",
    brand: "Rolls-Royce",
    model: "Cullinan Black Badge",
    version: "V12 600 CV",
    price: 489000,
    year: 2023,
    mileage: 11500,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Luxury SUV",
    exteriorColor: "Black diamond",
    interiorColor: "Mandarin",
    power: "600 CV",
    location: "Milano",
    dealer: "Quadrilatero Motors",
    accent: "#121212",
    scene: "studio",
  },
  {
    slug: "ferrari-296-gtb",
    brand: "Ferrari",
    model: "296 GTB",
    version: "V6 Hybrid 830 CV F1-DCT",
    price: 309000,
    year: 2024,
    mileage: 2400,
    fuel: "Ibrida",
    transmission: "Automatico",
    bodyType: "Coupé",
    exteriorColor: "Rosso Imola",
    interiorColor: "Nero",
    power: "830 CV",
    location: "Milano",
    dealer: "Atelier Milano",
    accent: "#b81104",
    scene: "track",
  },
  {
    slug: "ferrari-sf90-stradale",
    brand: "Ferrari",
    model: "SF90 Stradale",
    version: "V8 Hybrid 1000 CV",
    price: 529000,
    year: 2023,
    mileage: 5100,
    fuel: "Ibrida",
    transmission: "Automatico",
    bodyType: "Supercar",
    exteriorColor: "Rosso Corsa",
    interiorColor: "Nero e rosso",
    power: "1000 CV",
    location: "Milano",
    dealer: "Atelier Milano",
    accent: "#d3120b",
    scene: "studio",
  },
  {
    slug: "ferrari-12cilindri",
    brand: "Ferrari",
    model: "12Cilindri",
    version: "V12 830 CV F1-DCT",
    price: 435000,
    year: 2025,
    mileage: 300,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Gran Turismo",
    exteriorColor: "Bianco Cervino",
    interiorColor: "Blu Sterling",
    power: "830 CV",
    location: "Milano",
    dealer: "Brera Collection",
    accent: "#e4e3dc",
    scene: "city",
  },
  {
    slug: "ferrari-purosangue",
    brand: "Ferrari",
    model: "Purosangue",
    version: "V12 725 CV",
    price: 489000,
    year: 2024,
    mileage: 3800,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Luxury SUV",
    exteriorColor: "Nero Purosangue",
    interiorColor: "Cuoio",
    power: "725 CV",
    location: "Milano",
    dealer: "Quadrilatero Motors",
    accent: "#151515",
    scene: "lake",
  },
  {
    slug: "ferrari-812-competizione",
    brand: "Ferrari",
    model: "812 Competizione",
    version: "V12 830 CV F1-DCT",
    price: 699000,
    year: 2022,
    mileage: 2900,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Coupé",
    exteriorColor: "Grigio Competizione",
    interiorColor: "Nero e rosso",
    power: "830 CV",
    location: "Milano",
    dealer: "Brera Collection",
    accent: "#808286",
    scene: "track",
  },
  {
    slug: "ferrari-f8-spider",
    brand: "Ferrari",
    model: "F8 Spider",
    version: "V8 720 CV F1-DCT",
    price: 339000,
    year: 2022,
    mileage: 6200,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Cabriolet",
    exteriorColor: "Rosso Corsa",
    interiorColor: "Sabbia",
    power: "720 CV",
    location: "Milano",
    dealer: "Atelier Milano",
    accent: "#cf1f15",
    scene: "city",
  },
  {
    slug: "ferrari-488-pista",
    brand: "Ferrari",
    model: "488 Pista",
    version: "V8 720 CV F1-DCT",
    price: 419000,
    year: 2020,
    mileage: 8500,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Coupé",
    exteriorColor: "Giallo Modena",
    interiorColor: "Nero",
    power: "720 CV",
    location: "Milano",
    dealer: "Corsa Privata",
    accent: "#f2b705",
    scene: "track",
  },
  {
    slug: "lamborghini-revuelto",
    brand: "Lamborghini",
    model: "Revuelto",
    version: "V12 Hybrid 1015 CV",
    price: 649000,
    year: 2025,
    mileage: 350,
    fuel: "Ibrida",
    transmission: "Automatico",
    bodyType: "Supercar",
    exteriorColor: "Arancio Apodis",
    interiorColor: "Nero Ade",
    power: "1015 CV",
    location: "Milano",
    dealer: "Quadrilatero Motors",
    accent: "#e75113",
    scene: "studio",
  },
  {
    slug: "lamborghini-huracan-tecnica",
    brand: "Lamborghini",
    model: "Huracán Tecnica",
    version: "V10 640 CV LDF",
    price: 329000,
    year: 2024,
    mileage: 1800,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Coupé",
    exteriorColor: "Verde Selvans",
    interiorColor: "Nero e verde",
    power: "640 CV",
    location: "Milano",
    dealer: "Quadrilatero Motors",
    accent: "#4c6426",
    scene: "city",
  },
  {
    slug: "lamborghini-huracan-sto",
    brand: "Lamborghini",
    model: "Huracán STO",
    version: "V10 640 CV LDF",
    price: 419000,
    year: 2023,
    mileage: 2600,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Supercar",
    exteriorColor: "Blu Laufey",
    interiorColor: "Nero Cosmus",
    power: "640 CV",
    location: "Milano",
    dealer: "Corsa Privata",
    accent: "#164b78",
    scene: "track",
  },
  {
    slug: "lamborghini-aventador-svj",
    brand: "Lamborghini",
    model: "Aventador SVJ",
    version: "V12 770 CV ISR",
    price: 789000,
    year: 2021,
    mileage: 7200,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Coupé",
    exteriorColor: "Grigio Titans",
    interiorColor: "Nero e arancio",
    power: "770 CV",
    location: "Milano",
    dealer: "Brera Collection",
    accent: "#5f6265",
    scene: "studio",
  },
  {
    slug: "lamborghini-urus-s",
    brand: "Lamborghini",
    model: "Urus S",
    version: "V8 666 CV",
    price: 298000,
    year: 2024,
    mileage: 4100,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Luxury SUV",
    exteriorColor: "Nero Helene",
    interiorColor: "Rosso Alala",
    power: "666 CV",
    location: "Milano",
    dealer: "Navigli Performance",
    accent: "#171717",
    scene: "lake",
  },
  {
    slug: "lamborghini-urus-se",
    brand: "Lamborghini",
    model: "Urus SE",
    version: "V8 Hybrid 800 CV",
    price: 359000,
    year: 2025,
    mileage: 250,
    fuel: "Ibrida",
    transmission: "Automatico",
    bodyType: "Luxury SUV",
    exteriorColor: "Bianco Monocerus",
    interiorColor: "Nero Ade",
    power: "800 CV",
    location: "Milano",
    dealer: "Quadrilatero Motors",
    accent: "#e3e3df",
    scene: "city",
  },
  {
    slug: "lamborghini-huracan-evo-spyder",
    brand: "Lamborghini",
    model: "Huracán EVO Spyder",
    version: "V10 640 CV LDF",
    price: 309000,
    year: 2022,
    mileage: 9400,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Cabriolet",
    exteriorColor: "Arancio Xanto",
    interiorColor: "Nero",
    power: "640 CV",
    location: "Milano",
    dealer: "Corsa Privata",
    accent: "#df5d10",
    scene: "lake",
  },
  {
    slug: "maserati-mc20",
    brand: "Maserati",
    model: "MC20",
    version: "Nettuno 630 CV",
    price: 249000,
    year: 2024,
    mileage: 1800,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Coupé",
    exteriorColor: "Blu Infinito",
    interiorColor: "Nero",
    power: "630 CV",
    location: "Milano",
    dealer: "Corsa Privata",
    accent: "#174679",
    scene: "track",
  },
  {
    slug: "maserati-granturismo-trofeo",
    brand: "Maserati",
    model: "GranTurismo Trofeo",
    version: "Nettuno 550 CV",
    price: 199000,
    year: 2024,
    mileage: 2400,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Gran Turismo",
    exteriorColor: "Grigio Maratea",
    interiorColor: "Nero",
    power: "550 CV",
    location: "Milano",
    dealer: "Brera Collection",
    accent: "#73777c",
    scene: "city",
  },
  {
    slug: "maserati-grancabrio-trofeo",
    brand: "Maserati",
    model: "GranCabrio Trofeo",
    version: "Nettuno 550 CV",
    price: 219000,
    year: 2025,
    mileage: 500,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Cabriolet",
    exteriorColor: "Acquamarina",
    interiorColor: "Ghiaccio",
    power: "550 CV",
    location: "Milano",
    dealer: "Atelier Milano",
    accent: "#6295a7",
    scene: "lake",
  },
  {
    slug: "maserati-grecale-trofeo",
    brand: "Maserati",
    model: "Grecale Trofeo",
    version: "V6 530 CV",
    price: 129000,
    year: 2024,
    mileage: 3800,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Luxury SUV",
    exteriorColor: "Giallo Corse",
    interiorColor: "Nero",
    power: "530 CV",
    location: "Milano",
    dealer: "Navigli Performance",
    accent: "#e1a907",
    scene: "city",
  },
  {
    slug: "maserati-ghibli-trofeo",
    brand: "Maserati",
    model: "Ghibli Trofeo",
    version: "V8 580 CV",
    price: 119000,
    year: 2022,
    mileage: 14500,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Berlina",
    exteriorColor: "Nero Ribelle",
    interiorColor: "Rosso",
    power: "580 CV",
    location: "Milano",
    dealer: "Porta Nuova Auto",
    accent: "#161719",
    scene: "studio",
  },
  {
    slug: "maserati-levante-trofeo",
    brand: "Maserati",
    model: "Levante Trofeo",
    version: "V8 580 CV",
    price: 139000,
    year: 2022,
    mileage: 18200,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Luxury SUV",
    exteriorColor: "Blu Emozione",
    interiorColor: "Cuoio",
    power: "580 CV",
    location: "Milano",
    dealer: "Navigli Performance",
    accent: "#1c416f",
    scene: "lake",
  },
  {
    slug: "maserati-quattroporte-trofeo",
    brand: "Maserati",
    model: "Quattroporte Trofeo",
    version: "V8 580 CV",
    price: 149000,
    year: 2022,
    mileage: 12900,
    fuel: "Benzina",
    transmission: "Automatico",
    bodyType: "Berlina",
    exteriorColor: "Rosso Potente",
    interiorColor: "Nero",
    power: "580 CV",
    location: "Milano",
    dealer: "Porta Nuova Auto",
    accent: "#9f160f",
    scene: "studio",
  },
];

type ImportedDealer = {
  id: string;
  name: string;
  phone?: string;
  phoneUri?: string;
  phones?: {
    type?: string;
    formatted?: string;
    callTo?: string;
  }[];
  email?: string;
  website?: string;
  logoUrl?: string;
  profileUrl?: string;
  street?: string;
  postalCode?: string;
  city: string;
  province?: string;
};

type ImportedVehicle = {
  dealerId: string;
  slug: string;
  brand: string;
  model: string;
  version?: string;
  priceEuro: number;
  year?: number;
  mileageKm?: number;
  fuel: string;
  transmission?: string;
  bodyType?: string;
  condition?: string;
  powerCv?: number;
  powerKw?: number;
  exteriorColor?: string;
  interiorColor?: string;
  imageUrls: string[];
  source: string;
  sourceListingId: string;
  sourceUrl: string;
  collectedAt: string;
  city: string;
  distanceKm: number;
  description?: string;
};

const catalog = importedCatalog as {
  dealers: ImportedDealer[];
  vehicles: ImportedVehicle[];
};
const importedDealers = new Map(
  catalog.dealers.map((dealer) => [dealer.id, dealer]),
);
const importedVehicles: Vehicle[] = catalog.vehicles.map((vehicle, index) => {
  const dealer = importedDealers.get(vehicle.dealerId);

  return {
    slug: vehicle.slug,
    brand: vehicle.brand,
    model: vehicle.model,
    version: vehicle.version ?? "Versione non indicata",
    price: vehicle.priceEuro,
    year: vehicle.year,
    mileage: vehicle.mileageKm,
    fuel: vehicle.fuel,
    transmission: vehicle.transmission ?? "Non indicato",
    bodyType: vehicle.bodyType ?? "Non indicata",
    condition: vehicle.condition,
    exteriorColor: vehicle.exteriorColor ?? "Non indicato",
    interiorColor: vehicle.interiorColor ?? "Non indicato",
    power: vehicle.powerCv
      ? `${vehicle.powerCv} CV`
      : vehicle.powerKw
        ? `${vehicle.powerKw} kW`
        : "Non indicata",
    location: vehicle.city,
    dealer: dealer?.name ?? "Concessionario",
    accent: "#b81104",
    scene: "studio",
    featured: index < 8,
    newArrival: index >= 8 && index < 16,
    imageUrls: vehicle.imageUrls,
    source: vehicle.source,
    sourceListingId: vehicle.sourceListingId,
    sourceUrl: vehicle.sourceUrl,
    collectedAt: vehicle.collectedAt,
    distanceKm: vehicle.distanceKm,
    dealerId: vehicle.dealerId,
    dealerPhone: dealer?.phone,
    dealerPhoneUri: dealer?.phoneUri,
    dealerPhones: dealer?.phones,
    dealerEmail: dealer?.email,
    dealerWebsite: dealer?.website,
    dealerLogoUrl: dealer?.logoUrl,
    dealerProfileUrl: dealer?.profileUrl,
    dealerStreet: dealer?.street,
    dealerPostalCode: dealer?.postalCode,
    dealerProvince: dealer?.province,
    description: vehicle.description,
  };
});

export const hasImportedCatalog = importedVehicles.length > 0;
export const vehicles = hasImportedCatalog ? importedVehicles : demoVehicles;

const demoBrands = [
  "Ferrari",
  "Porsche",
  "Lamborghini",
  "Maserati",
  "Bentley",
  "McLaren",
  "Aston Martin",
  "Mercedes-AMG",
];
const demoCategories = [
  "Supercar",
  "Gran Turismo",
  "Luxury SUV",
  "Cabriolet",
  "Elettriche",
  "Da collezione",
];

export const brands = hasImportedCatalog
  ? [...new Set(vehicles.map((vehicle) => vehicle.brand))].sort((a, b) =>
      a.localeCompare(b, "it"),
    )
  : demoBrands;

export const categories = hasImportedCatalog
  ? [...new Set(vehicles.map((vehicle) => vehicle.bodyType))].sort((a, b) =>
      a.localeCompare(b, "it"),
    )
  : demoCategories;

export function formatPrice(value: number) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMileage(value: number) {
  return `${new Intl.NumberFormat("it-IT").format(value)} km`;
}

export function getVehicle(slug: string) {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}
