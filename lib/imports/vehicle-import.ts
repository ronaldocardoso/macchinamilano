import { createHash } from "node:crypto";

import { z } from "zod";

import {
  resolveWhatsAppStatus,
  validateItalianPhone,
  whatsappVerificationStatuses,
  type WhatsAppVerificationStatus,
} from "../phone-validation.ts";

const optionalText = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === "" ? undefined : value,
  z.string().trim().min(1).optional(),
);

const httpUrl = z
  .string()
  .url()
  .refine(
    (value) => {
      const protocol = new URL(value).protocol;
      return protocol === "http:" || protocol === "https:";
    },
    { message: "Only HTTP(S) URLs are accepted" },
  );

export const sellerTypeSchema = z.enum(["DEALER", "PRIVATE"]);
export const vehicleAvailabilitySchema = z.enum([
  "AVAILABLE",
  "SOLD",
  "UNAVAILABLE",
]);

export const rawVehicleCandidateSchema = z.object({
  source: z.string().trim().min(1),
  listingId: z.string().trim().min(1),
  sourceUrl: httpUrl,
  collectedAt: z.iso.datetime(),
  availability: vehicleAvailabilitySchema.optional(),
  seller: z.object({
    type: sellerTypeSchema,
    externalId: optionalText,
    name: z.string().trim().min(1),
    vatNumber: optionalText,
    phone: optionalText,
    phoneUri: optionalText,
    logoUrl: httpUrl.optional(),
    profileUrl: httpUrl.optional(),
    phones: z
      .array(
        z.object({
          type: optionalText,
          formatted: optionalText,
          callTo: optionalText,
          whatsappStatus: z.enum(whatsappVerificationStatuses).optional(),
          whatsappWaId: optionalText,
          whatsappCheckedAt: z.iso.datetime().optional(),
        }),
      )
      .default([]),
    email: z.email().optional(),
    website: httpUrl.optional(),
    address: z.object({
      street: optionalText,
      postalCode: optionalText,
      city: z.string().trim().min(1),
      province: optionalText,
      country: z.string().trim().length(2).default("IT"),
    }),
  }),
  vehicle: z.object({
    brand: z.string().trim().min(1),
    model: z.string().trim().min(1),
    version: optionalText,
    priceEuro: z.number().finite().nonnegative(),
    year: z.number().int().min(1886).max(2100).optional(),
    mileageKm: z.number().int().nonnegative().optional(),
    fuel: z.string().trim().min(1),
    transmission: optionalText,
    bodyType: optionalText,
    condition: optionalText,
    powerCv: z.number().int().positive().optional(),
    powerKw: z.number().int().positive().optional(),
    exteriorColor: optionalText,
    interiorColor: optionalText,
    description: optionalText,
    vin: optionalText,
    imageUrls: z.array(httpUrl).default([]),
  }),
  location: z.object({
    city: z.string().trim().min(1),
    province: optionalText,
    postalCode: optionalText,
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    distanceKm: z.number().finite().nonnegative().optional(),
  }),
});

export type RawVehicleCandidate = z.infer<typeof rawVehicleCandidateSchema>;

export const importPolicySchema = z.object({
  center: z
    .object({
      name: z.string().trim().min(1),
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    })
    .default({
      name: "Milano",
      latitude: 45.4642,
      longitude: 9.19,
    }),
  radiusKm: z.number().positive().max(500).default(25),
  minPriceExclusive: z.number().nonnegative().default(100_000),
  dealerOnly: z.boolean().default(true),
  requireImages: z.boolean().default(true),
  limit: z.number().int().positive().max(10_000).default(100),
});

export type ImportPolicy = z.infer<typeof importPolicySchema>;

export const defaultImportPolicy: ImportPolicy = importPolicySchema.parse({});

export type NormalizedDealer = {
  id: string;
  externalId?: string;
  name: string;
  vatNumber?: string;
  phone?: string;
  phoneUri?: string;
  logoUrl?: string;
  profileUrl?: string;
  phones: {
    type?: string;
    formatted?: string;
    callTo?: string;
    e164?: string;
    validationStatus: "valid" | "invalid";
    validationReason?: "missing" | "country" | "length" | "prefix";
    whatsappStatus?: WhatsAppVerificationStatus;
    whatsappWaId?: string;
    whatsappCheckedAt?: string;
  }[];
  email?: string;
  website?: string;
  street?: string;
  postalCode?: string;
  city: string;
  province?: string;
  country: string;
};

export type NormalizedVehicle = {
  id: string;
  source: string;
  sourceListingId: string;
  sourceUrl: string;
  contentHash: string;
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
  description?: string;
  vin?: string;
  imageUrls: string[];
  city: string;
  province?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  distanceKm: number;
  collectedAt: string;
};

export type ImportRejectionCode =
  | "INVALID_RECORD"
  | "SOLD_OR_UNAVAILABLE"
  | "PRIVATE_SELLER"
  | "PRICE_NOT_ABOVE_MINIMUM"
  | "DISTANCE_UNAVAILABLE"
  | "OUTSIDE_RADIUS"
  | "MISSING_IMAGES"
  | "DUPLICATE_LISTING"
  | "BATCH_LIMIT";

export type ImportRejection = {
  index: number;
  listingId?: string;
  code: ImportRejectionCode;
  message: string;
};

export type VehicleImportReport = {
  schemaVersion: 1;
  runId: string;
  startedAt: string;
  sourceNames: string[];
  policy: ImportPolicy;
  summary: {
    received: number;
    accepted: number;
    rejected: number;
    dealers: number;
  };
  contactSummary: {
    phones: number;
    valid: number;
    invalid: number;
    whatsapp: Record<WhatsAppVerificationStatus, number>;
  };
  dealers: NormalizedDealer[];
  vehicles: NormalizedVehicle[];
  rejections: ImportRejection[];
};

type ProcessVehicleImportOptions = {
  policy?: Partial<ImportPolicy>;
  startedAt?: Date;
};

function hash(value: unknown) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function normalizeKey(value?: string) {
  return value
    ?.normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("it-IT")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function digitsOnly(value?: string) {
  return value?.replace(/\D/g, "") || undefined;
}

function normalizeDealerPhones(
  phones: RawVehicleCandidate["seller"]["phones"],
): NormalizedDealer["phones"] {
  const phoneKeys = new Set<string>();

  return phones
    .map((phone) => {
      const validation = validateItalianPhone(phone.callTo ?? phone.formatted);
      const declaredAsWhatsApp = normalizeKey(phone.type) === "whatsapp";
      const whatsappStatus = resolveWhatsAppStatus({
        declaredAsWhatsApp,
        requestedStatus: phone.whatsappStatus,
        validation,
      });

      return {
        type: phone.type,
        formatted: phone.formatted,
        callTo:
          phone.callTo ??
          (validation.isValid && validation.e164
            ? `+${validation.e164}`
            : undefined),
        e164: validation.e164,
        validationStatus: validation.isValid ? "valid" : "invalid",
        validationReason: validation.reason,
        whatsappStatus,
        whatsappWaId: phone.whatsappWaId,
        whatsappCheckedAt: phone.whatsappCheckedAt,
      } satisfies NormalizedDealer["phones"][number];
    })
    .filter((phone) => {
      const key = [
        phone.e164 ?? phone.formatted ?? phone.callTo ?? "missing",
        normalizeKey(phone.type) ?? "phone",
      ].join(":");

      if (phoneKeys.has(key)) {
        return false;
      }

      phoneKeys.add(key);
      return true;
    });
}

function normalizeVatNumber(value?: string) {
  return value?.replace(/[^a-zA-Z0-9]/g, "").toUpperCase() || undefined;
}

function normalizeWebsite(value?: string) {
  if (!value) {
    return undefined;
  }

  const url = new URL(value);
  return url.hostname.replace(/^www\./, "").toLocaleLowerCase("it-IT");
}

function slugify(value: string) {
  return (
    normalizeKey(value)?.replace(/\s+/g, "-").replace(/^-|-$/g, "") || "veicolo"
  );
}

function getDealerIdentity(candidate: RawVehicleCandidate) {
  const seller = candidate.seller;
  const vatNumber = normalizeVatNumber(seller.vatNumber);
  const phone = digitsOnly(seller.phone);
  const website = normalizeWebsite(seller.website);

  if (vatNumber) {
    return `vat:${vatNumber}`;
  }

  if (seller.externalId) {
    return `${candidate.source}:external:${normalizeKey(seller.externalId)}`;
  }

  if (website) {
    return `website:${website}`;
  }

  if (phone) {
    return `phone:${phone}`;
  }

  return [
    "address",
    normalizeKey(seller.name),
    normalizeKey(seller.address.city),
    normalizeKey(seller.address.postalCode),
  ].join(":");
}

function normalizeDealer(candidate: RawVehicleCandidate): NormalizedDealer {
  const seller = candidate.seller;
  const identity = getDealerIdentity(candidate);

  return {
    id: `dlr_${hash(identity).slice(0, 20)}`,
    externalId: seller.externalId,
    name: seller.name,
    vatNumber: normalizeVatNumber(seller.vatNumber),
    phone: seller.phone,
    phoneUri: seller.phoneUri,
    logoUrl: seller.logoUrl,
    profileUrl: seller.profileUrl,
    phones: normalizeDealerPhones(seller.phones),
    email: seller.email?.toLocaleLowerCase("it-IT"),
    website: seller.website,
    street: seller.address.street,
    postalCode: seller.address.postalCode,
    city: seller.address.city,
    province: seller.address.province,
    country: seller.address.country.toUpperCase(),
  };
}

function mergeDealers(
  current: NormalizedDealer | undefined,
  incoming: NormalizedDealer,
): NormalizedDealer {
  if (!current) {
    return incoming;
  }

  const phones = [...current.phones, ...incoming.phones];
  const phoneKeys = new Set<string>();

  return {
    ...incoming,
    externalId: current.externalId ?? incoming.externalId,
    vatNumber: current.vatNumber ?? incoming.vatNumber,
    phone: current.phone ?? incoming.phone,
    phoneUri: current.phoneUri ?? incoming.phoneUri,
    logoUrl: current.logoUrl ?? incoming.logoUrl,
    profileUrl: current.profileUrl ?? incoming.profileUrl,
    phones: phones.filter((phone) => {
      const key = [
        phone.e164 ?? phone.formatted ?? phone.callTo ?? JSON.stringify(phone),
        normalizeKey(phone.type) ?? "phone",
      ].join(":");

      if (phoneKeys.has(key)) {
        return false;
      }

      phoneKeys.add(key);
      return true;
    }),
    email: current.email ?? incoming.email,
    website: current.website ?? incoming.website,
    street: current.street ?? incoming.street,
    postalCode: current.postalCode ?? incoming.postalCode,
    province: current.province ?? incoming.province,
  };
}

function summarizeDealerContacts(
  dealers: NormalizedDealer[],
): VehicleImportReport["contactSummary"] {
  const phones = dealers.flatMap((dealer) => dealer.phones);
  const whatsapp = {
    declared: 0,
    verified: 0,
    invalid: 0,
    unknown: 0,
  } satisfies Record<WhatsAppVerificationStatus, number>;

  phones.forEach((phone) => {
    if (phone.whatsappStatus) {
      whatsapp[phone.whatsappStatus] += 1;
    }
  });

  return {
    phones: phones.length,
    valid: phones.filter((phone) => phone.validationStatus === "valid").length,
    invalid: phones.filter((phone) => phone.validationStatus === "invalid")
      .length,
    whatsapp,
  };
}

function degreesToRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function distanceInKm(
  start: { latitude: number; longitude: number },
  end: { latitude: number; longitude: number },
) {
  const earthRadiusKm = 6371.0088;
  const latitudeDelta = degreesToRadians(end.latitude - start.latitude);
  const longitudeDelta = degreesToRadians(end.longitude - start.longitude);
  const startLatitude = degreesToRadians(start.latitude);
  const endLatitude = degreesToRadians(end.latitude);

  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(startLatitude) *
      Math.cos(endLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;

  return (
    2 *
    earthRadiusKm *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  );
}

function getCandidateDistance(
  candidate: RawVehicleCandidate,
  policy: ImportPolicy,
) {
  if (candidate.location.distanceKm !== undefined) {
    return candidate.location.distanceKm;
  }

  if (
    candidate.location.latitude === undefined ||
    candidate.location.longitude === undefined
  ) {
    return undefined;
  }

  return distanceInKm(policy.center, {
    latitude: candidate.location.latitude,
    longitude: candidate.location.longitude,
  });
}

function normalizeVehicle(
  candidate: RawVehicleCandidate,
  dealer: NormalizedDealer,
  distanceKm: number,
): NormalizedVehicle {
  const sourceIdentity = `${candidate.source}:${candidate.listingId}`;
  const shortIdentity = hash(sourceIdentity).slice(0, 12);
  const slug = `${slugify(
    `${candidate.vehicle.brand}-${candidate.vehicle.model}-${candidate.vehicle.year ?? "nuovo"}`,
  )}-${shortIdentity.slice(0, 7)}`;
  const content = {
    dealerId: dealer.id,
    vehicle: candidate.vehicle,
    location: candidate.location,
  };

  return {
    id: `veh_${hash(sourceIdentity).slice(0, 20)}`,
    source: candidate.source,
    sourceListingId: candidate.listingId,
    sourceUrl: candidate.sourceUrl,
    contentHash: hash(content),
    dealerId: dealer.id,
    slug,
    brand: candidate.vehicle.brand,
    model: candidate.vehicle.model,
    version: candidate.vehicle.version,
    priceEuro: Math.round(candidate.vehicle.priceEuro),
    year: candidate.vehicle.year,
    mileageKm: candidate.vehicle.mileageKm,
    fuel: candidate.vehicle.fuel,
    transmission: candidate.vehicle.transmission,
    bodyType: candidate.vehicle.bodyType,
    condition: candidate.vehicle.condition,
    powerCv: candidate.vehicle.powerCv,
    powerKw: candidate.vehicle.powerKw,
    exteriorColor: candidate.vehicle.exteriorColor,
    interiorColor: candidate.vehicle.interiorColor,
    description: candidate.vehicle.description,
    vin: candidate.vehicle.vin,
    imageUrls: [...new Set(candidate.vehicle.imageUrls)],
    city: candidate.location.city,
    province: candidate.location.province,
    postalCode: candidate.location.postalCode,
    latitude: candidate.location.latitude,
    longitude: candidate.location.longitude,
    distanceKm: Number(distanceKm.toFixed(2)),
    collectedAt: candidate.collectedAt,
  };
}

export function processVehicleImport(
  records: unknown[],
  options: ProcessVehicleImportOptions = {},
): VehicleImportReport {
  const policy = importPolicySchema.parse({
    ...defaultImportPolicy,
    ...options.policy,
    center: {
      ...defaultImportPolicy.center,
      ...options.policy?.center,
    },
  });
  const startedAt = options.startedAt ?? new Date();
  const dealers = new Map<string, NormalizedDealer>();
  const vehicles: NormalizedVehicle[] = [];
  const rejections: ImportRejection[] = [];
  const listingKeys = new Set<string>();
  const sourceNames = new Set<string>();

  records.forEach((record, index) => {
    const parsed = rawVehicleCandidateSchema.safeParse(record);

    if (!parsed.success) {
      rejections.push({
        index,
        code: "INVALID_RECORD",
        message: z.prettifyError(parsed.error),
      });
      return;
    }

    const candidate = parsed.data;
    const listingKey = `${candidate.source}:${candidate.listingId}`;
    sourceNames.add(candidate.source);

    if (listingKeys.has(listingKey)) {
      rejections.push({
        index,
        listingId: candidate.listingId,
        code: "DUPLICATE_LISTING",
        message: "The same source and listing ID already appeared in this run.",
      });
      return;
    }

    listingKeys.add(listingKey);

    if (
      candidate.availability === "SOLD" ||
      candidate.availability === "UNAVAILABLE"
    ) {
      rejections.push({
        index,
        listingId: candidate.listingId,
        code: "SOLD_OR_UNAVAILABLE",
        message: "Sold or unavailable listings are removed from the catalog.",
      });
      return;
    }

    if (policy.dealerOnly && candidate.seller.type !== "DEALER") {
      rejections.push({
        index,
        listingId: candidate.listingId,
        code: "PRIVATE_SELLER",
        message: "Only professional dealer listings are accepted.",
      });
      return;
    }

    if (candidate.vehicle.priceEuro <= policy.minPriceExclusive) {
      rejections.push({
        index,
        listingId: candidate.listingId,
        code: "PRICE_NOT_ABOVE_MINIMUM",
        message: `Price must be greater than €${policy.minPriceExclusive}.`,
      });
      return;
    }

    const distanceKm = getCandidateDistance(candidate, policy);

    if (distanceKm === undefined) {
      rejections.push({
        index,
        listingId: candidate.listingId,
        code: "DISTANCE_UNAVAILABLE",
        message:
          "Provide distanceKm or geographic coordinates for radius validation.",
      });
      return;
    }

    if (distanceKm > policy.radiusKm) {
      rejections.push({
        index,
        listingId: candidate.listingId,
        code: "OUTSIDE_RADIUS",
        message: `Listing is ${distanceKm.toFixed(2)} km from ${policy.center.name}.`,
      });
      return;
    }

    if (policy.requireImages && candidate.vehicle.imageUrls.length === 0) {
      rejections.push({
        index,
        listingId: candidate.listingId,
        code: "MISSING_IMAGES",
        message: "At least one authorized vehicle image is required.",
      });
      return;
    }

    if (vehicles.length >= policy.limit) {
      rejections.push({
        index,
        listingId: candidate.listingId,
        code: "BATCH_LIMIT",
        message: `The import limit of ${policy.limit} accepted vehicles was reached.`,
      });
      return;
    }

    const dealer = normalizeDealer(candidate);
    dealers.set(dealer.id, mergeDealers(dealers.get(dealer.id), dealer));
    vehicles.push(normalizeVehicle(candidate, dealer, distanceKm));
  });

  const runSeed = {
    startedAt: startedAt.toISOString(),
    records: records.length,
    listingIds: vehicles.map((vehicle) => vehicle.sourceListingId),
  };
  const normalizedDealers = [...dealers.values()].sort((a, b) =>
    a.name.localeCompare(b.name, "it"),
  );

  return {
    schemaVersion: 1,
    runId: `imp_${hash(runSeed).slice(0, 20)}`,
    startedAt: startedAt.toISOString(),
    sourceNames: [...sourceNames].sort(),
    policy,
    summary: {
      received: records.length,
      accepted: vehicles.length,
      rejected: rejections.length,
      dealers: dealers.size,
    },
    contactSummary: summarizeDealerContacts(normalizedDealers),
    dealers: normalizedDealers,
    vehicles,
    rejections,
  };
}
