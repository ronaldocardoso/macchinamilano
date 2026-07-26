import { describe, expect, it } from "vitest";

import {
  getVehiclePublicUrl,
  getWhatsAppUrl,
  maskItalianPhone,
  normalizePhoneDigits,
} from "./dealer-contact";

describe("dealer contact utilities", () => {
  it("normalizes Italian phone numbers for tel and WhatsApp links", () => {
    expect(normalizePhoneDigits("+39 380 - 2844080")).toBe("393802844080");
    expect(normalizePhoneDigits("380 2844080")).toBe("393802844080");
  });

  it("masks landline and mobile numbers until the visitor reveals them", () => {
    expect(maskItalianPhone("+39 02 - 36574430")).toBe("+39 02 ••••••••");
    expect(maskItalianPhone("+39 380 - 2844080")).toBe("+39 380 •••••••");
  });

  it("creates an Italian WhatsApp message with the .it vehicle URL", () => {
    const url = getWhatsAppUrl(
      {
        type: "Whatsapp",
        formatted: "+39 380 - 2844080",
      },
      {
        brand: "Lamborghini",
        model: "Urus",
        slug: "lamborghini-urus-2021-66e01dc",
      },
    );

    expect(url).toContain("https://wa.me/393802844080?text=");
    expect(decodeURIComponent(url ?? "")).toContain(
      "Ho trovato questo veicolo su Macchina Milano e sono interessato: Lamborghini Urus.",
    );
    expect(decodeURIComponent(url ?? "")).toContain(
      getVehiclePublicUrl("lamborghini-urus-2021-66e01dc"),
    );
  });
});
