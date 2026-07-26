export const whatsappVerificationStatuses = [
  "declared",
  "verified",
  "invalid",
  "unknown",
] as const;

export type WhatsAppVerificationStatus =
  (typeof whatsappVerificationStatuses)[number];

export type ItalianPhoneValidation = {
  e164?: string;
  isValid: boolean;
  kind?: "landline" | "mobile";
  reason?: "missing" | "country" | "length" | "prefix";
};

export function validateItalianPhone(phone?: string): ItalianPhoneValidation {
  const explicitInternational = /^\s*(?:\+|00)/.test(phone ?? "");
  let digits = phone?.replace(/\D/g, "") ?? "";

  if (!digits) {
    return { isValid: false, reason: "missing" };
  }

  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  if (explicitInternational && !digits.startsWith("39")) {
    return { isValid: false, reason: "country" };
  }

  if (!digits.startsWith("39")) {
    digits = `39${digits}`;
  }

  const nationalNumber = digits.slice(2);

  if (nationalNumber.length < 6 || nationalNumber.length > 11) {
    return { e164: digits, isValid: false, reason: "length" };
  }

  if (nationalNumber.startsWith("3")) {
    if (nationalNumber.length !== 10) {
      return { e164: digits, isValid: false, reason: "length" };
    }

    return { e164: digits, isValid: true, kind: "mobile" };
  }

  if (nationalNumber.startsWith("0")) {
    return { e164: digits, isValid: true, kind: "landline" };
  }

  return { e164: digits, isValid: false, reason: "prefix" };
}

export function resolveWhatsAppStatus({
  declaredAsWhatsApp,
  requestedStatus,
  validation,
}: {
  declaredAsWhatsApp: boolean;
  requestedStatus?: WhatsAppVerificationStatus;
  validation: ItalianPhoneValidation;
}): WhatsAppVerificationStatus | undefined {
  if (!declaredAsWhatsApp && !requestedStatus) {
    return undefined;
  }

  if (!validation.isValid || requestedStatus === "invalid") {
    return "invalid";
  }

  if (requestedStatus === "verified") {
    return "verified";
  }

  if (requestedStatus === "unknown") {
    return "unknown";
  }

  if (declaredAsWhatsApp || requestedStatus === "declared") {
    return "declared";
  }

  return "unknown";
}
