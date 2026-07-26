import type { RawVehicleCandidate } from "./vehicle-import";

type UnknownRecord = Record<string, unknown>;

export type PiloterrAutoScout24Export = {
  collectedAt?: string;
  results?: unknown[];
  records?: unknown[];
};

function record(value: unknown): UnknownRecord {
  return typeof value === "object" && value !== null
    ? (value as UnknownRecord)
    : {};
}

function text(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function number(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value
    .replace(/[^\d,.-]/g, "")
    .replace(/\.(?=\d{3}(?:\D|$))/g, "")
    .replace(",", ".");
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : undefined;
}

function integer(value: unknown) {
  const parsed = number(value);
  return parsed === undefined ? undefined : Math.round(parsed);
}

function year(value: unknown) {
  const match = text(value)?.match(/\b(19|20)\d{2}\b/);
  return match ? Number(match[0]) : undefined;
}

function absoluteAutoScoutUrl(value: unknown) {
  const url = text(value);

  if (!url) {
    return undefined;
  }

  return new URL(url, "https://www.autoscout24.it").toString();
}

function highResolutionImage(value: unknown) {
  const url = text(value);
  return url?.replace(/\/250x188\.webp(?:\?.*)?$/, "/1280x960.webp");
}

function power(value: unknown, unit: "kW" | "CV") {
  const source = text(value);

  if (!source) {
    return undefined;
  }

  const match =
    unit === "kW"
      ? source.match(/([\d.]+)\s*kW/i)
      : source.match(/\(([\d.]+)\s*CV\)/i);

  return match ? integer(match[1]) : undefined;
}

function firstPhone(phones: unknown[]) {
  const entries = phones.map(record);
  return (
    entries.find((phone) => text(phone.phone_type) === "Office") ??
    entries.find((phone) => text(phone.call_to)) ??
    entries[0]
  );
}

function adaptResult(
  value: unknown,
  collectedAt: string,
): RawVehicleCandidate | unknown {
  const result = record(value);
  const seller = record(result.seller);
  const sellerLogo = record(seller.logo);
  const sellerLogoSmall = record(sellerLogo.small);
  const sellerLinks = record(seller.links);
  const location = record(result.location);
  const vehicle = record(result.vehicle);
  const details = record(result.vehicle_details);
  const price = record(result.price);
  const phones = Array.isArray(seller.phones) ? seller.phones : [];
  const primaryPhone = firstPhone(phones);
  const images = Array.isArray(result.images)
    ? result.images.map(highResolutionImage).filter(Boolean)
    : [];
  const fallbackImage = highResolutionImage(result.image);
  const listingId = text(result.id) ?? text(result.identifier);
  const registrationYear =
    year(details.calendar) ?? year(record(result.tracking).first_registration);
  const mileage =
    integer(details.mileage_odometer) ?? integer(vehicle.mileage_in_km);
  const speedometer = details.speedometer;

  if (!listingId) {
    return value;
  }

  return {
    source: "autoscout24.it",
    listingId,
    sourceUrl: absoluteAutoScoutUrl(result.url),
    collectedAt,
    seller: {
      type: text(seller.type) === "Dealer" ? "DEALER" : "PRIVATE",
      externalId: text(seller.id),
      name: text(seller.company_name),
      phone: text(primaryPhone?.formatted_number),
      phoneUri: text(primaryPhone?.call_to),
      logoUrl: absoluteAutoScoutUrl(sellerLogoSmall.href),
      profileUrl: absoluteAutoScoutUrl(sellerLinks.info_page),
      phones: phones.map((phoneValue) => {
        const phone = record(phoneValue);

        return {
          type: text(phone.phone_type),
          formatted: text(phone.formatted_number),
          callTo: text(phone.call_to),
        };
      }),
      address: {
        street: text(location.street),
        postalCode: text(location.zip),
        city: text(location.city),
        country: text(location.country_code) ?? "IT",
      },
    },
    vehicle: {
      brand: text(vehicle.make),
      model: text(vehicle.model),
      version:
        text(vehicle.model_version_input) ??
        text(vehicle.variant) ??
        text(vehicle.model_version_custom),
      priceEuro: number(price.price_raw),
      year: registrationYear,
      mileageKm: mileage,
      fuel: text(details.gas_pump) ?? text(vehicle.fuel),
      transmission: text(details.gearbox) ?? text(vehicle.transmission),
      condition:
        text(vehicle.offer_type) === "N"
          ? "Nuovo"
          : text(vehicle.offer_type) === "U"
            ? "Usato"
            : undefined,
      powerCv: power(speedometer, "CV"),
      powerKw: power(speedometer, "kW"),
      description: text(vehicle.subtitle),
      imageUrls: [
        ...new Set(
          [...images, fallbackImage].filter(
            (image): image is string => typeof image === "string",
          ),
        ),
      ],
    },
    location: {
      city: text(location.city),
      postalCode: text(location.zip),
      distanceKm: number(location.distance_to_search_location_in_km),
    },
  };
}

export function adaptPiloterrAutoScout24Export(
  input: PiloterrAutoScout24Export,
) {
  const collectedAt = input.collectedAt ?? new Date().toISOString();
  const results = input.results ?? input.records ?? [];

  return results.map((result) => adaptResult(result, collectedAt));
}
