import { describe, expect, it } from "vitest";

import { processVehicleImport } from "./vehicle-import";
import { adaptPiloterrAutoScout24Export } from "./piloterr-autoscout24";

describe("Piloterr AutoScout24 adapter", () => {
  it("preserves the listing, vehicle and professional dealer data", () => {
    const records = adaptPiloterrAutoScout24Export({
      collectedAt: "2026-07-26T20:00:00.000Z",
      results: [
        {
          id: "listing-001",
          url: "https://www.autoscout24.it/annunci/listing-001",
          image:
            "https://prod.pictures.autoscout24.net/listing-images/a.jpg/250x188.webp",
          images: [
            "https://prod.pictures.autoscout24.net/listing-images/a.jpg/250x188.webp",
          ],
          price: { price_raw: 315000 },
          seller: {
            id: "dealer-001",
            type: "Dealer",
            company_name: "Milano Performance",
            logo: {
              small: {
                href: "https://prod.pictures.autoscout24.net/dealer-info/logo.png",
              },
            },
            links: {
              info_page:
                "https://www.autoscout24.it/concessionari/milano-performance",
            },
            phones: [
              {
                phone_type: "Office",
                formatted_number: "+39 02 - 1234567",
                call_to: "+39021234567",
              },
              {
                phone_type: "Whatsapp",
                formatted_number: "+39 380 - 2844080",
                call_to: null,
              },
            ],
          },
          vehicle: {
            make: "Ferrari",
            model: "296 GTB",
            model_version_input: "V6 Hybrid",
            fuel: "Elettrica/Benzina",
            transmission: "Automatico",
            mileage_in_km: "900 km",
          },
          location: {
            street: "Via Milano 1",
            zip: "20121",
            city: "Milano",
            country_code: "IT",
            distance_to_search_location_in_km: 4,
          },
          vehicle_details: {
            calendar: "06/2025",
            gas_pump: "Elettrica/Benzina",
            gearbox: "Automatico",
            speedometer: "610 kW (830 CV)",
            mileage_odometer: "900 km",
          },
        },
      ],
    });
    const report = processVehicleImport(records);

    expect(report.summary).toMatchObject({
      accepted: 1,
      rejected: 0,
      dealers: 1,
    });
    expect(report.dealers[0]).toMatchObject({
      externalId: "dealer-001",
      name: "Milano Performance",
      phone: "+39 02 - 1234567",
      phoneUri: "+39021234567",
      street: "Via Milano 1",
      logoUrl: "https://prod.pictures.autoscout24.net/dealer-info/logo.png",
    });
    expect(report.vehicles[0]).toMatchObject({
      source: "autoscout24.it",
      priceEuro: 315000,
      year: 2025,
      mileageKm: 900,
      powerCv: 830,
      powerKw: 610,
      distanceKm: 4,
    });
    expect(report.vehicles[0].imageUrls[0]).toContain("/1280x960.webp");
    expect(report.dealers[0].phones).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          e164: "393802844080",
          validationStatus: "valid",
          whatsappStatus: "declared",
        }),
      ]),
    );
    expect(report.contactSummary.whatsapp).toMatchObject({
      declared: 1,
      verified: 0,
    });
  });
});
