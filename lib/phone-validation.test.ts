import { describe, expect, it } from "vitest";

import {
  resolveWhatsAppStatus,
  validateItalianPhone,
} from "./phone-validation";

describe("Italian phone validation", () => {
  it("normalizes valid Italian mobile and landline numbers", () => {
    expect(validateItalianPhone("+39 380 - 2844080")).toMatchObject({
      e164: "393802844080",
      isValid: true,
      kind: "mobile",
    });
    expect(validateItalianPhone("02 36574430")).toMatchObject({
      e164: "390236574430",
      isValid: true,
      kind: "landline",
    });
  });

  it("rejects foreign and malformed numbers", () => {
    expect(validateItalianPhone("+55 11 41662222")).toMatchObject({
      isValid: false,
      reason: "country",
    });
    expect(validateItalianPhone("+39 123")).toMatchObject({
      isValid: false,
      reason: "length",
    });
  });

  it("never verifies a source declaration without explicit evidence", () => {
    const validation = validateItalianPhone("+39 380 - 2844080");

    expect(
      resolveWhatsAppStatus({
        declaredAsWhatsApp: true,
        validation,
      }),
    ).toBe("declared");
    expect(
      resolveWhatsAppStatus({
        declaredAsWhatsApp: true,
        requestedStatus: "verified",
        validation,
      }),
    ).toBe("verified");
  });
});
