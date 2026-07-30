import type { Metadata } from "next";
import Link from "next/link";

import { ArrowIcon, MapPinIcon } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contatta Macchina Milano per informazioni sui veicoli, collaborazioni e pubblicazione degli annunci.",
  alternates: {
    canonical: "/contatti/",
  },
  openGraph: {
    url: "/contatti/",
    title: "Contatti | Macchina Milano",
    description:
      "Parla con Macchina Milano. Siamo a disposizione per automobilisti e concessionari.",
  },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="breadcrumbs container">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Contatti</span>
        </div>

        <section className="contact-hero">
          <div className="contact-hero__content container">
            <p className="eyebrow eyebrow--light">Macchina Milano</p>
            <h1>Parliamo della tua prossima auto.</h1>
            <p>
              Per informazioni, collaborazioni o pubblicazione di veicoli,
              scrivici. Ti risponderemo all’indirizzo indicato nel modulo.
            </p>
          </div>
        </section>

        <section className="contact-form-section" id="modulo">
          <div className="container">
            <form
              acceptCharset="UTF-8"
              action="/send-contact.php"
              className="contact-form"
              method="post"
            >
              <div className="contact-form__heading">
                <p className="eyebrow">Contatti</p>
                <h2>Scrivici</h2>
                <p>
                  Compila il modulo oppure invia direttamente un’e-mail a{" "}
                  <a href="mailto:ciao@macchinamilano.it">
                    ciao@macchinamilano.it
                  </a>
                  .
                </p>
              </div>

              <div className="contact-form__fields">
                <label>
                  <span>Nome *</span>
                  <input
                    autoComplete="given-name"
                    name="nome"
                    placeholder="Il tuo nome"
                    required
                    type="text"
                  />
                </label>
                <label>
                  <span>Cognome *</span>
                  <input
                    autoComplete="family-name"
                    name="cognome"
                    placeholder="Il tuo cognome"
                    required
                    type="text"
                  />
                </label>
                <label>
                  <span>E-mail *</span>
                  <input
                    autoComplete="email"
                    name="email"
                    placeholder="nome@esempio.it"
                    required
                    type="email"
                  />
                </label>
                <label>
                  <span>Telefono</span>
                  <input
                    autoComplete="tel"
                    inputMode="tel"
                    name="telefono"
                    placeholder="+39"
                    type="tel"
                  />
                </label>
                <label className="contact-form__message">
                  <span>Messaggio *</span>
                  <textarea
                    name="messaggio"
                    placeholder="Come possiamo aiutarti?"
                    required
                    rows={7}
                  />
                </label>
                <label className="contact-form__consent">
                  <input name="aggiornamenti" type="checkbox" value="sì" />
                  <span>
                    Desidero ricevere aggiornamenti da Macchina Milano.
                  </span>
                </label>
                <label className="contact-form__honeypot" aria-hidden="true">
                  <span>Non compilare questo campo</span>
                  <input
                    autoComplete="off"
                    name="website"
                    tabIndex={-1}
                    type="text"
                  />
                </label>
                <button className="button button--red" type="submit">
                  Invia il messaggio <ArrowIcon />
                </button>
              </div>

              <p
                className="contact-form__status contact-form__status--success"
                id="messaggio-inviato"
                role="status"
              >
                Grazie. Il tuo messaggio è stato inviato correttamente.
              </p>
              <p
                className="contact-form__status contact-form__status--error"
                id="errore-invio"
                role="alert"
              >
                Non è stato possibile inviare il messaggio. Controlla i dati o
                scrivi a{" "}
                <a href="mailto:ciao@macchinamilano.it">
                  ciao@macchinamilano.it
                </a>
                .
              </p>
            </form>
          </div>
        </section>

        <section className="contact-location">
          <div className="contact-location__grid container">
            <aside className="contact-location__card">
              <p className="eyebrow">Dove siamo</p>
              <h2>Milano, Lombardia</h2>
              <div>
                <MapPinIcon />
                <p>
                  <span>Area di riferimento</span>
                  <strong>Milano e regione</strong>
                </p>
              </div>
              <div>
                <span className="contact-location__at">@</span>
                <p>
                  <span>Scrivici</span>
                  <a href="mailto:ciao@macchinamilano.it">
                    ciao@macchinamilano.it
                  </a>
                </p>
              </div>
            </aside>

            <div className="contact-map">
              <iframe
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Milano%2C%20Lombardia%2C%20Italia&z=12&output=embed"
                title="Mappa di Milano"
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
