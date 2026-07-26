/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowIcon,
  CheckIcon,
  HeartIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VehicleCard } from "@/components/vehicle-card";
import { VehicleVisual } from "@/components/vehicle-visual";
import {
  formatMileage,
  formatPrice,
  getVehicle,
  vehicles,
} from "@/lib/vehicles";

type VehiclePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({
  params,
}: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicle(slug);

  if (!vehicle) {
    return {};
  }

  return {
    title: `${vehicle.brand} ${vehicle.model}`,
    description: `${vehicle.brand} ${vehicle.model} ${vehicle.version}, ${vehicle.year ?? "nuovo"}, ${vehicle.mileage === undefined ? "chilometraggio non indicato" : formatMileage(vehicle.mileage)}. Macchina Milano.`,
  };
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);

  if (!vehicle) {
    notFound();
  }

  const similar = vehicles
    .filter((item) => item.slug !== vehicle.slug)
    .slice(0, 3);

  const specs = [
    [
      "Condizione",
      vehicle.condition ??
        (vehicle.mileage !== undefined && vehicle.mileage < 1000
          ? "Nuovo"
          : "Usato"),
    ],
    ["Anno", vehicle.year ? String(vehicle.year) : "Nuovo"],
    [
      "Chilometraggio",
      vehicle.mileage === undefined
        ? "Non indicato"
        : formatMileage(vehicle.mileage),
    ],
    ["Alimentazione", vehicle.fuel],
    ["Cambio", vehicle.transmission],
    ["Potenza", vehicle.power],
    ["Carrozzeria", vehicle.bodyType],
    ["Colore esterno", vehicle.exteriorColor],
    ["Interni", vehicle.interiorColor],
    ["Località", vehicle.location],
  ];

  return (
    <>
      <SiteHeader />
      <main>
        <div className="breadcrumbs container">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/veicoli">Veicoli</Link>
          <span>/</span>
          <span>{vehicle.model}</span>
        </div>

        <section className="detail-section">
          <div className="detail-layout container">
            <div className="detail-main">
              <div className="detail-title">
                <div>
                  <p className="eyebrow">{vehicle.brand}</p>
                  <h1>{vehicle.model}</h1>
                  <span>{vehicle.version}</span>
                </div>
                <div className="detail-price">
                  <span>Prezzo</span>
                  <strong>{formatPrice(vehicle.price)}</strong>
                </div>
              </div>

              <div className="detail-gallery">
                <VehicleVisual vehicle={vehicle} />
                <button
                  aria-label="Salva nei preferiti"
                  className="detail-save"
                  type="button"
                >
                  <HeartIcon />
                </button>
                <div className="gallery-thumbs">
                  {(vehicle.imageUrls?.slice(0, 4) ?? []).map(
                    (imageUrl, index) => (
                      <button
                        aria-label={`Vista ${index + 1}`}
                        className={index === 0 ? "is-active" : ""}
                        key={imageUrl}
                        type="button"
                      >
                        <VehicleVisual
                          compact
                          imageUrl={imageUrl}
                          vehicle={vehicle}
                        />
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="spec-section">
                <div className="section-heading section-heading--small">
                  <div>
                    <p className="eyebrow">Dettagli</p>
                    <h2>Specifiche principali</h2>
                  </div>
                </div>
                <dl className="spec-grid">
                  {specs.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="description-section">
                <p className="eyebrow">Il veicolo</p>
                <h2>{vehicle.version}</h2>
                {vehicle.description && <p>{vehicle.description}</p>}
                {vehicle.sourceUrl && (
                  <p>
                    Dati dell&apos;annuncio raccolti il{" "}
                    {new Intl.DateTimeFormat("it-IT", {
                      dateStyle: "long",
                    }).format(
                      vehicle.collectedAt
                        ? new Date(vehicle.collectedAt)
                        : new Date(),
                    )}
                    . Verifica disponibilità e condizioni direttamente con il
                    concessionario.
                  </p>
                )}
              </div>
            </div>

            <aside className="dealer-panel">
              <p className="eyebrow">Concessionario</p>
              {vehicle.dealerLogoUrl && (
                <img
                  alt={`Logo ${vehicle.dealer}`}
                  className="dealer-panel__logo"
                  src={vehicle.dealerLogoUrl}
                />
              )}
              <h2>{vehicle.dealer}</h2>
              <span className="verified">
                <CheckIcon /> Dati del concessionario dall&apos;annuncio
              </span>
              {(vehicle.dealerPhones?.length || vehicle.dealerPhone) && (
                <div className="dealer-panel__contact">
                  <PhoneIcon />
                  <div>
                    <span>Telefono</span>
                    {(vehicle.dealerPhones?.length
                      ? vehicle.dealerPhones
                      : [
                          {
                            formatted: vehicle.dealerPhone,
                            callTo: vehicle.dealerPhoneUri,
                          },
                        ]
                    ).map((phone, index) => (
                      <a
                        href={
                          phone.callTo
                            ? `tel:${phone.callTo}`
                            : phone.formatted
                              ? `tel:${phone.formatted}`
                              : undefined
                        }
                        key={`${phone.formatted}-${index}`}
                      >
                        {phone.formatted}
                        {phone.type ? ` · ${phone.type}` : ""}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <div className="dealer-panel__contact">
                <MapPinIcon />
                <div>
                  <span>Sede</span>
                  <strong>
                    {[
                      vehicle.dealerStreet,
                      vehicle.dealerPostalCode,
                      vehicle.location,
                      vehicle.dealerProvince,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </strong>
                </div>
              </div>
              <div className="dealer-map">
                <span className="dealer-map__grid" />
                <MapPinIcon />
                <strong>{vehicle.location}</strong>
              </div>
              {vehicle.dealerProfileUrl ? (
                <a
                  className="button button--blue"
                  href={vehicle.dealerProfileUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Profilo concessionario <ArrowIcon />
                </a>
              ) : (
                <a className="button button--blue" href="#richiesta">
                  Richiedi informazioni <ArrowIcon />
                </a>
              )}
              {vehicle.sourceUrl && (
                <a
                  className="dealer-panel__source"
                  href={vehicle.sourceUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Vedi l&apos;annuncio originale
                </a>
              )}
              <p className="dealer-panel__note">
                Cita Macchina Milano quando contatti il concessionario.
              </p>
            </aside>
          </div>
        </section>

        <section className="contact-band" id="richiesta">
          <div className="contact-band__grid container">
            <div>
              <p className="eyebrow eyebrow--light">Contatto diretto</p>
              <h2>Parla con il concessionario.</h2>
              <p>
                Invia una richiesta per ricevere informazioni su disponibilità,
                condizioni e appuntamenti.
              </p>
            </div>
            <form className="lead-form">
              <label className="lead-form__message">
                <span>Messaggio</span>
                <textarea
                  defaultValue={`Buongiorno, desidero maggiori informazioni su ${vehicle.brand} ${vehicle.model}.`}
                  name="message"
                  rows={4}
                />
              </label>
              <label>
                <span>Nome</span>
                <input name="name" placeholder="Il tuo nome" />
              </label>
              <label>
                <span>E-mail</span>
                <input name="email" placeholder="nome@email.it" type="email" />
              </label>
              <label>
                <span>Telefono</span>
                <input name="phone" placeholder="+39" type="tel" />
              </label>
              <label className="lead-form__consent">
                <input type="checkbox" />
                <span>Accetto l&apos;informativa privacy.</span>
              </label>
              <button className="button button--white" type="button">
                Invia la richiesta <ArrowIcon />
              </button>
            </form>
          </div>
        </section>

        <section className="section section--muted">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Potrebbero piacerti</p>
                <h2>Altre proposte</h2>
              </div>
              <Link className="text-link" href="/veicoli">
                Tutti i veicoli <ArrowIcon />
              </Link>
            </div>
            <div className="vehicle-grid vehicle-grid--three">
              {similar.map((item) => (
                <VehicleCard key={item.slug} vehicle={item} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
