import { describe, expect, it } from "vitest";

import {
  getVehiclePublicUrl,
  getWhatsAppUrl,
  maskItalianPhone,
  normalizePhoneDigits,
  prepareDealerContacts,
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
        validationStatus: "valid",
        whatsappStatus: "verified",
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

  it("does not create WhatsApp links for numbers only declared by the source", () => {
    expect(
      getWhatsAppUrl(
        {
          type: "Whatsapp",
          formatted: "+39 380 - 2844080",
          validationStatus: "valid",
          whatsappStatus: "declared",
        },
        {
          brand: "Lamborghini",
          model: "Urus",
          slug: "lamborghini-urus-2021-66e01dc",
        },
      ),
    ).toBeUndefined();
  });

  it("keeps an unverified WhatsApp declaration as a regular phone", () => {
    const contacts = prepareDealerContacts([
      {
        type: "Mobile",
        formatted: "+39 380 - 2844080",
        callTo: "+393802844080",
        validationStatus: "valid",
      },
      {
        type: "Whatsapp",
        formatted: "+39 380 - 2844080",
        callTo: "+393802844080",
        validationStatus: "valid",
        whatsappStatus: "declared",
      },
    ]);

    expect(contacts.whatsapp).toBeUndefined();
    expect(contacts.standardPhones).toHaveLength(1);
    expect(contacts.standardPhones[0].type).toBe("Mobile");
  });

  it("keeps a verified WhatsApp contact available as phone and chat", () => {
    const contacts = prepareDealerContacts([
      {
        type: "Office",
        formatted: "+39 02 - 36574430",
        validationStatus: "valid",
      },
      {
        type: "Whatsapp",
        formatted: "+39 380 - 2844080",
        validationStatus: "valid",
        whatsappStatus: "verified",
      },
    ]);

    expect(contacts.standardPhones).toHaveLength(2);
    expect(contacts.whatsapp?.formatted).toBe("+39 380 - 2844080");
  });
});
