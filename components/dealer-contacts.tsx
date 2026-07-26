"use client";

import { useState } from "react";

import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import {
  getWhatsAppUrl,
  maskItalianPhone,
  normalizePhoneDigits,
  type DealerPhone,
} from "@/lib/dealer-contact";

type DealerContactsProps = {
  dealer: string;
  dealerId?: string;
  fallbackPhone?: string;
  fallbackPhoneUri?: string;
  phones?: DealerPhone[];
  vehicle: {
    brand: string;
    model: string;
    slug: string;
  };
};

type AnalyticsWindow = Window & {
  dataLayer?: Record<string, unknown>[];
};

function trackContact(
  event: string,
  details: Record<string, string | undefined>,
) {
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer ??= [];
  analyticsWindow.dataLayer.push({ event, ...details });
}

function phoneKey(phone: DealerPhone, index: number) {
  return (
    normalizePhoneDigits(phone.callTo ?? phone.formatted) ||
    `${phone.type}-${index}`
  );
}

export function DealerContacts({
  dealer,
  dealerId,
  fallbackPhone,
  fallbackPhoneUri,
  phones,
  vehicle,
}: DealerContactsProps) {
  const [revealedPhones, setRevealedPhones] = useState<string[]>([]);
  const contacts =
    phones?.length || !fallbackPhone
      ? (phones ?? [])
      : [
          {
            type: "Office",
            formatted: fallbackPhone,
            callTo: fallbackPhoneUri,
          },
        ];
  const whatsapp = contacts.find(
    (phone) => phone.type?.toLocaleLowerCase("it-IT") === "whatsapp",
  );
  const whatsappUrl = whatsapp ? getWhatsAppUrl(whatsapp, vehicle) : undefined;
  const standardPhones = contacts.filter(
    (phone) =>
      phone.formatted && phone.type?.toLocaleLowerCase("it-IT") !== "whatsapp",
  );

  if (!standardPhones.length && !whatsappUrl) {
    return null;
  }

  return (
    <div className="dealer-contacts">
      {standardPhones.length > 0 && (
        <div className="dealer-contacts__phones">
          <PhoneIcon />
          <div>
            <span>Telefono</span>
            {standardPhones.map((phone, index) => {
              const key = phoneKey(phone, index);
              const isRevealed = revealedPhones.includes(key);
              const phoneUri = normalizePhoneDigits(
                phone.callTo ?? phone.formatted,
              );

              return (
                <div className="dealer-phone" key={key}>
                  {isRevealed ? (
                    <a
                      href={phoneUri ? `tel:+${phoneUri}` : undefined}
                      onClick={() =>
                        trackContact("dealer_phone_click", {
                          dealer,
                          dealer_id: dealerId,
                          phone_type: phone.type,
                          vehicle_slug: vehicle.slug,
                        })
                      }
                    >
                      {phone.formatted}
                    </a>
                  ) : (
                    <>
                      <strong>{maskItalianPhone(phone.formatted)}</strong>
                      <button
                        onClick={() => {
                          setRevealedPhones((current) => [...current, key]);
                          trackContact("dealer_phone_reveal", {
                            dealer,
                            dealer_id: dealerId,
                            phone_type: phone.type,
                            vehicle_slug: vehicle.slug,
                          });
                        }}
                        type="button"
                      >
                        Mostra telefono
                      </button>
                    </>
                  )}
                  {phone.type && <small>{phone.type}</small>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {whatsappUrl && (
        <a
          className="dealer-whatsapp"
          href={whatsappUrl}
          onClick={() =>
            trackContact("whatsapp_click", {
              dealer,
              dealer_id: dealerId,
              phone_type: whatsapp?.type,
              vehicle_slug: vehicle.slug,
            })
          }
          rel="noreferrer"
          target="_blank"
        >
          <WhatsAppIcon />
          <strong>Chat su WhatsApp</strong>
        </a>
      )}
    </div>
  );
}
