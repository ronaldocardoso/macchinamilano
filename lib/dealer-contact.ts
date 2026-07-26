import type { WhatsAppVerificationStatus } from "./phone-validation";

export type DealerPhone = {
  type?: string;
  formatted?: string;
  callTo?: string;
  e164?: string;
  validationStatus?: "valid" | "invalid";
  validationReason?: "missing" | "country" | "length" | "prefix";
  whatsappStatus?: WhatsAppVerificationStatus;
  whatsappWaId?: string;
  whatsappCheckedAt?: string;
};

type VehicleContactContext = {
  brand: string;
  model: string;
  slug: string;
};

export function normalizePhoneDigits(phone?: string) {
  const digits = phone?.replace(/\D/g, "") ?? "";

  if (digits.startsWith("00")) {
    return digits.slice(2);
  }

  return digits.startsWith("39") || !digits ? digits : `39${digits}`;
}

export function maskItalianPhone(phone?: string) {
  const digits = normalizePhoneDigits(phone);

  if (!digits) {
    return "Numero riservato";
  }

  if (digits.startsWith("39")) {
    const nationalNumber = digits.slice(2);
    const visibleLength = nationalNumber.startsWith("0") ? 2 : 3;
    const visible = nationalNumber.slice(0, visibleLength);
    const hidden = "•".repeat(
      Math.max(4, nationalNumber.length - visible.length),
    );

    return `+39 ${visible} ${hidden}`;
  }

  return `${digits.slice(0, 3)}${"•".repeat(Math.max(4, digits.length - 3))}`;
}

export function getVehiclePublicUrl(slug: string) {
  return `https://macchinamilano.it/veicoli/${encodeURIComponent(slug)}/`;
}

export function getWhatsAppUrl(
  phone: DealerPhone,
  vehicle: VehicleContactContext,
) {
  if (phone.whatsappStatus !== "verified") {
    return undefined;
  }

  const number = normalizePhoneDigits(phone.callTo ?? phone.formatted);

  if (!number) {
    return undefined;
  }

  const message = [
    "Buongiorno.",
    `Ho trovato questo veicolo su Macchina Milano e sono interessato: ${vehicle.brand} ${vehicle.model}.`,
    "Potreste fornirmi maggiori dettagli?",
    `Link del veicolo: ${getVehiclePublicUrl(vehicle.slug)}`,
  ].join(" ");

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function isWhatsAppPhone(phone: DealerPhone) {
  return (
    phone.type?.toLocaleLowerCase("it-IT") === "whatsapp" ||
    phone.whatsappStatus !== undefined
  );
}

export function prepareDealerContacts(contacts: DealerPhone[]) {
  const whatsapp = contacts.find(
    (phone) =>
      isWhatsAppPhone(phone) &&
      phone.whatsappStatus === "verified" &&
      phone.validationStatus !== "invalid",
  );
  const phoneNumbers = new Set<string>();
  const standardPhones = contacts.filter((phone) => {
    if (!phone.formatted) {
      return false;
    }

    const key =
      normalizePhoneDigits(phone.callTo ?? phone.formatted) || phone.formatted;

    if (phoneNumbers.has(key)) {
      return false;
    }

    phoneNumbers.add(key);
    return true;
  });

  return { standardPhones, whatsapp };
}
