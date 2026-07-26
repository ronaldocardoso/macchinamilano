import { describe, expect, it } from "vitest";

import { vehicles } from "./vehicles";

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
});
