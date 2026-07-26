import { describe, expect, it } from "vitest";

import {
  defaultImportPolicy,
  distanceInKm,
  processVehicleImport,
  type RawVehicleCandidate,
} from "./vehicle-import";

function candidate(
  overrides: Partial<RawVehicleCandidate> = {},
): RawVehicleCandidate {
  const base: RawVehicleCandidate = {
    source: "authorized-test-feed",
    listingId: "vehicle-001",
    sourceUrl: "https://feed.example.test/vehicle-001",
    collectedAt: "2026-07-26T12:00:00.000Z",
    seller: {
      type: "DEALER",
      externalId: "dealer-001",
      name: "Milano Performance",
      vatNumber: "IT 01234567890",
      phone: "+39 02 1234 5678",
      phoneUri: "+390212345678",
      phones: [
        {
          type: "Office",
          formatted: "+39 02 1234 5678",
          callTo: "+390212345678",
        },
      ],
      email: "INFO@EXAMPLE.TEST",
      website: "https://www.example.test",
      logoUrl: "https://images.example.test/dealer-logo.png",
      address: {
        street: "Via Milano 1",
        postalCode: "20121",
        city: "Milano",
        province: "MI",
        country: "IT",
      },
    },
    vehicle: {
      brand: "Ferrari",
      model: "296 GTB",
      version: "V6 Hybrid",
      priceEuro: 315_000,
      year: 2025,
      mileageKm: 900,
      fuel: "Ibrida",
      transmission: "Automatico",
      bodyType: "Coupé",
      powerCv: 830,
      exteriorColor: "Rosso",
      imageUrls: [
        "https://images.example.test/vehicle-001-1.jpg",
        "https://images.example.test/vehicle-001-1.jpg",
      ],
    },
    location: {
      city: "Milano",
      province: "MI",
      postalCode: "20121",
      latitude: 45.4642,
      longitude: 9.19,
    },
  };

  return {
    ...base,
    ...overrides,
    seller: { ...base.seller, ...overrides.seller },
    vehicle: { ...base.vehicle, ...overrides.vehicle },
    location: { ...base.location, ...overrides.location },
  };
}

describe("vehicle import pipeline", () => {
  it("normalizes a valid dealer vehicle and removes duplicate images", () => {
    const report = processVehicleImport([candidate()], {
      startedAt: new Date("2026-07-26T13:00:00.000Z"),
    });

    expect(report.summary).toEqual({
      received: 1,
      accepted: 1,
      rejected: 0,
      dealers: 1,
    });
    expect(report.dealers[0]).toMatchObject({
      vatNumber: "IT01234567890",
      phone: "+39 02 1234 5678",
      phoneUri: "+390212345678",
      email: "info@example.test",
    });
    expect(report.vehicles[0]).toMatchObject({
      sourceListingId: "vehicle-001",
      priceEuro: 315_000,
      distanceKm: 0,
    });
    expect(report.vehicles[0].imageUrls).toHaveLength(1);
  });

  it("filters private, low-price, distant and image-less records", () => {
    const report = processVehicleImport([
      candidate({
        listingId: "private",
        seller: { ...candidate().seller, type: "PRIVATE" },
      }),
      candidate({
        listingId: "low-price",
        vehicle: { ...candidate().vehicle, priceEuro: 100_000 },
      }),
      candidate({
        listingId: "distant",
        location: { ...candidate().location, distanceKm: 25.01 },
      }),
      candidate({
        listingId: "no-images",
        vehicle: { ...candidate().vehicle, imageUrls: [] },
      }),
    ]);

    expect(report.summary.accepted).toBe(0);
    expect(report.rejections.map(({ code }) => code)).toEqual([
      "PRIVATE_SELLER",
      "PRICE_NOT_ABOVE_MINIMUM",
      "OUTSIDE_RADIUS",
      "MISSING_IMAGES",
    ]);
  });

  it("rejects records that cannot be placed inside the radius", () => {
    const report = processVehicleImport([
      candidate({
        location: {
          city: "Milano",
          province: "MI",
          postalCode: "20121",
          latitude: undefined,
          longitude: undefined,
        },
      }),
    ]);

    expect(report.rejections[0].code).toBe("DISTANCE_UNAVAILABLE");
  });

  it("deduplicates listings and dealers while keeping distinct vehicles", () => {
    const first = candidate();
    const duplicate = candidate();
    const secondVehicle = candidate({
      listingId: "vehicle-002",
      sourceUrl: "https://feed.example.test/vehicle-002",
      seller: { ...candidate().seller, logoUrl: undefined },
      vehicle: { ...candidate().vehicle, model: "SF90 Stradale" },
    });
    const report = processVehicleImport([first, duplicate, secondVehicle]);

    expect(report.summary).toMatchObject({
      accepted: 2,
      rejected: 1,
      dealers: 1,
    });
    expect(report.rejections[0].code).toBe("DUPLICATE_LISTING");
    expect(report.dealers[0].logoUrl).toBe(
      "https://images.example.test/dealer-logo.png",
    );
  });

  it("applies the accepted-vehicle batch limit", () => {
    const records = Array.from({ length: 3 }, (_, index) =>
      candidate({
        listingId: `vehicle-${index}`,
        sourceUrl: `https://feed.example.test/vehicle-${index}`,
      }),
    );
    const report = processVehicleImport(records, {
      policy: { limit: 2 },
    });

    expect(report.summary.accepted).toBe(2);
    expect(report.rejections[0].code).toBe("BATCH_LIMIT");
  });

  it("calculates distance from coordinates using Milano as the center", () => {
    const distance = distanceInKm(defaultImportPolicy.center, {
      latitude: 45.5845,
      longitude: 9.2744,
    });

    expect(distance).toBeGreaterThan(14);
    expect(distance).toBeLessThan(16);
  });

  it("reports invalid feed records without aborting the batch", () => {
    const report = processVehicleImport([
      { listingId: "incomplete" },
      candidate(),
    ]);

    expect(report.summary).toMatchObject({
      received: 2,
      accepted: 1,
      rejected: 1,
    });
    expect(report.rejections[0].code).toBe("INVALID_RECORD");
  });

  it("normalizes the target scale of 900 vehicles and 700 dealers", () => {
    const records = Array.from({ length: 900 }, (_, index) => {
      const dealerIndex = index % 700;

      return candidate({
        listingId: `scale-vehicle-${index}`,
        sourceUrl: `https://feed.example.test/scale-vehicle-${index}`,
        seller: {
          ...candidate().seller,
          externalId: `scale-dealer-${dealerIndex}`,
          name: `Dealer ${dealerIndex}`,
          vatNumber: undefined,
          phone: undefined,
          website: undefined,
        },
      });
    });
    const report = processVehicleImport(records, {
      policy: { limit: 1_000 },
    });

    expect(report.summary).toMatchObject({
      received: 900,
      accepted: 900,
      rejected: 0,
      dealers: 700,
    });
  });
});
