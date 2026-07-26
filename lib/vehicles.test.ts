import { describe, expect, it } from "vitest";

import { getVehicleLabel, vehicles, type Vehicle } from "./vehicles";

describe("Milano brand showcases", () => {
  it.each(["Ferrari", "Lamborghini", "Maserati"])(
    "provides two rows of %s vehicles",
    (brand) => {
      expect(
        vehicles.filter((vehicle) => vehicle.brand === brand),
      ).toHaveLength(8);
    },
  );

  it("keeps every vehicle slug unique", () => {
    const slugs = vehicles.map((vehicle) => vehicle.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses only Blindato and Elettrico as vehicle labels", () => {
    const electric = vehicles.find((vehicle) => vehicle.fuel === "Elettrica");
    const hybrid = vehicles.find((vehicle) => vehicle.fuel === "Ibrida");
    const combustion = vehicles.find((vehicle) => vehicle.fuel === "Benzina");

    expect(electric && getVehicleLabel(electric)).toBe("Elettrico");
    expect(hybrid && getVehicleLabel(hybrid)).toBe("Elettrico");
    expect(combustion && getVehicleLabel(combustion)).toBeUndefined();
    expect(getVehicleLabel({ ...combustion, armored: true } as Vehicle)).toBe(
      "Blindato",
    );
  });
});
