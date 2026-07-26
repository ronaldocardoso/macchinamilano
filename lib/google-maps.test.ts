import { describe, expect, it } from "vitest";

import { formatGoogleMapsQuery, getGoogleMapsUrls } from "./google-maps";

describe("Google Maps URLs", () => {
  const place = {
    name: "Milano Performance",
    street: "Via Milano 1",
    postalCode: "20121",
    city: "Milano",
    province: "MI",
    country: "Italia",
  };

  it("builds a complete dealer address query", () => {
    expect(formatGoogleMapsQuery(place)).toBe(
      "Milano Performance, Via Milano 1, 20121, Milano, MI, Italia",
    );
  });

  it("uses the official Embed API when a key is configured", () => {
    const urls = getGoogleMapsUrls(place, "maps-key");

    expect(urls.embedUrl).toContain("/maps/embed/v1/place?key=maps-key");
    expect(urls.embedUrl).toContain("&language=it&region=IT");
    expect(urls.externalUrl).toContain("/maps/search/?api=1&query=");
  });

  it("keeps a working Google Maps embed fallback without a key", () => {
    const urls = getGoogleMapsUrls(place, "");

    expect(urls.embedUrl).toContain("/maps?q=");
    expect(urls.embedUrl).toContain("&output=embed&hl=it");
  });
});
