import { describe, expect, it } from "vitest";

import { getVehicleLabel, vehicles, type Vehicle } from "./vehicles";

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
});
