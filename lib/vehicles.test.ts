import { describe, expect, it } from "vitest";

import { filterCatalogVehicles } from "./explore-options";
import {
  catalogYears,
  categories,
  fuelCategories,
  getVehicleLabel,
  inferVehicleBodyType,
  matchesFuelCategory,
  vehicles,
  type Vehicle,
} from "./vehicles";

describe("Milano brand showcases", () => {
  it.each(["Ferrari", "Lamborghini", "Maserati"])(
    "provides real %s vehicles for its homepage block",
    (brand) => {
      const brandVehicles = vehicles.filter(
        (vehicle) => vehicle.brand === brand,
      );

      expect(brandVehicles.length).toBeGreaterThan(0);
      expect(brandVehicles.slice(0, 8).length).toBeLessThanOrEqual(8);
    },
  );

  it("keeps every vehicle slug unique", () => {
    const slugs = vehicles.map((vehicle) => vehicle.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses only Blindato and Elettrico as vehicle labels", () => {
    const electric = vehicles.find((vehicle) =>
      vehicle.fuel.toLocaleLowerCase("it-IT").includes("elettric"),
    );
    const hybrid = {
      ...vehicles[0],
      fuel: "Ibrida",
    };
    const combustion = vehicles.find((vehicle) => vehicle.fuel === "Benzina");

    expect(electric && getVehicleLabel(electric)).toBe("Elettrico");
    expect(getVehicleLabel(hybrid)).toBe("Elettrico");
    expect(combustion && getVehicleLabel(combustion)).toBeUndefined();
    expect(getVehicleLabel({ ...combustion, armored: true } as Vehicle)).toBe(
      "Blindato",
    );
  });

  it("builds the year range from every registered vehicle", () => {
    const availableYears = vehicles
      .map((vehicle) => vehicle.year)
      .filter((year): year is number => typeof year === "number");

    expect(catalogYears[0]).toBe(Math.max(...availableYears));
    expect(catalogYears.at(-1)).toBe(Math.min(...availableYears));
    expect(catalogYears).toContain(1968);
  });

  it("exposes Diesel and matches diesel hybrid vehicles", () => {
    expect(fuelCategories).toContain("Diesel");
    expect(matchesFuelCategory("Diesel", "Diesel")).toBe(true);
    expect(matchesFuelCategory("Elettrica/Diesel", "Diesel")).toBe(true);
  });

  it("infers useful body categories when the source omits body type", () => {
    expect(
      inferVehicleBodyType({
        brand: "Lamborghini",
        model: "Urus",
      }),
    ).toBe("SUV");
    expect(
      inferVehicleBodyType({
        brand: "Ferrari",
        model: "SF90 Spider",
      }),
    ).toBe("Cabrio");
    expect(categories).toEqual(
      expect.arrayContaining(["Berlina", "Cabrio", "Coupé", "SUV"]),
    );
    expect(categories).not.toContain("Non indicata");
  });

  it("applies the catalog fuel, body and year filters", () => {
    const filtered = filterCatalogVehicles(vehicles, {
      bodies: ["SUV"],
      fuels: ["Diesel"],
      minimumYear: 2020,
    });

    expect(filtered.length).toBeGreaterThan(0);
    expect(
      filtered.every(
        (vehicle) =>
          vehicle.bodyType === "SUV" &&
          matchesFuelCategory(vehicle.fuel, "Diesel") &&
          (vehicle.year ?? 0) >= 2020,
      ),
    ).toBe(true);
  });
});
