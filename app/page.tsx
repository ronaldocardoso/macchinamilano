import Link from "next/link";

import { ArrowIcon, CarIcon, CheckIcon } from "@/components/icons";
import { SearchPanel } from "@/components/search-panel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VehicleCard } from "@/components/vehicle-card";
import { brands, categories, vehicles } from "@/lib/vehicles";

const featured = vehicles.filter((vehicle) => vehicle.featured);
const newArrivals = vehicles.filter((vehicle) => vehicle.newArrival);

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="home-hero">
          <div className="home-hero__grid container">
            <div className="home-hero__copy">
              <p className="eyebrow">Auto premium da Milano e dalla regione</p>
              <h1>
                <span>Trova</span> la tua
                <br />
                auto straordinaria.
              </h1>
            </div>
          </div>
        </section>

        <div className="search-panel-wrap container">
          <p className="search-panel-title">Auto a Milano e nella regione</p>
          <SearchPanel />
        </div>

        <section className="section section--intro" id="manifesto">
          <div className="intro-grid container">
            <p className="section-index">01 / La selezione</p>
            <div>
              <p className="eyebrow">Curata, non infinita</p>
              <h2 className="display-title">
                Meno rumore.
                <br />
                Più automobili memorabili.
              </h2>
            </div>
            <p className="section-copy">
              Un portale pensato per scoprire con chiarezza le auto più
              interessanti di Milano e della regione. Ricerca immediata,
              informazioni essenziali e contatto diretto.
            </p>
          </div>
        </section>

        <section className="section section--muted" id="selezioni">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Scelte per te</p>
                <h2>In evidenza</h2>
              </div>
              <Link className="text-link" href="/veicoli">
                Vedi tutti i veicoli <ArrowIcon />
              </Link>
            </div>
            <div className="vehicle-grid">
              {featured.map((vehicle) => (
                <VehicleCard key={vehicle.slug} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </section>

        <section className="section brand-section" id="marche">
          <div className="container">
            <div className="section-heading section-heading--bordered">
              <div>
                <p className="eyebrow">Icone e performance</p>
                <h2>Esplora per marca</h2>
              </div>
              <p>
                Una selezione trasversale, dalle gran turismo alle supercar.
              </p>
            </div>
            <div className="brand-grid">
              {brands.map((brand, index) => (
                <Link href="/veicoli" key={brand}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{brand}</strong>
                  <ArrowIcon />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="editorial-banner">
          <div className="editorial-banner__grid container">
            <div className="editorial-banner__visual" aria-hidden="true">
              <span className="editorial-banner__road" />
              <CarIcon />
              <span className="editorial-banner__word">MILANO</span>
            </div>
            <div className="editorial-banner__copy">
              <p className="eyebrow eyebrow--light">The Milano Drive</p>
              <h2>La città è soltanto il punto di partenza.</h2>
              <p>
                Scopri itinerari, persone e automobili che raccontano un nuovo
                modo di vivere la passione.
              </p>
              <Link className="button button--white" href="#magazine">
                Entra nel magazine <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>

        <section className="section category-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Trova il tuo carattere</p>
                <h2>Esplora per categoria</h2>
              </div>
            </div>
            <div className="category-grid">
              {categories.map((category, index) => (
                <Link href="/veicoli" key={category}>
                  <span className="category-grid__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <CarIcon />
                  <strong>{category}</strong>
                  <ArrowIcon className="category-grid__arrow" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--dark">
          <div className="container">
            <div className="section-heading section-heading--dark">
              <div>
                <p className="eyebrow eyebrow--light">Appena arrivati</p>
                <h2>Nuovi ingressi</h2>
              </div>
              <Link className="text-link text-link--light" href="/veicoli">
                Scopri tutto <ArrowIcon />
              </Link>
            </div>
            <div className="vehicle-grid vehicle-grid--dark">
              {newArrivals.map((vehicle) => (
                <VehicleCard key={vehicle.slug} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </section>

        <section className="section concierge-section" id="servizio">
          <div className="concierge-grid container">
            <div>
              <p className="eyebrow">Concierge Macchina Milano</p>
              <h2 className="display-title">
                Non trovi l&apos;auto che cerchi?
              </h2>
              <p className="section-copy">
                Raccontaci cosa desideri. La nostra esperienza è progettata per
                trasformare una ricerca complessa in una selezione semplice.
              </p>
              <Link className="button button--red" href="#contatti">
                Inizia la ricerca <ArrowIcon />
              </Link>
            </div>
            <div className="concierge-card">
              <p>Il metodo</p>
              {[
                "Ascoltiamo ciò che stai cercando",
                "Selezioniamo le proposte rilevanti",
                "Ti mettiamo in contatto diretto",
              ].map((item, index) => (
                <div key={item}>
                  <span>{index + 1}</span>
                  <strong>{item}</strong>
                  <CheckIcon />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section magazine-section" id="magazine">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Storie in movimento</p>
                <h2>Dal magazine</h2>
              </div>
              <Link className="text-link" href="#magazine">
                Tutte le storie <ArrowIcon />
              </Link>
            </div>
            <div className="story-grid">
              <article className="story-card story-card--red">
                <span>Design</span>
                <h3>
                  La linea italiana che trasforma un&apos;auto in un&apos;icona.
                </h3>
                <Link href="#magazine">
                  Leggi la storia <ArrowIcon />
                </Link>
              </article>
              <article className="story-card story-card--blue">
                <span>Itinerari</span>
                <h3>Da Milano al lago: una strada da guidare senza fretta.</h3>
                <Link href="#magazine">
                  Scopri l&apos;itinerario <ArrowIcon />
                </Link>
              </article>
              <article className="story-card story-card--paper">
                <span>Collezionismo</span>
                <h3>
                  Quali dettagli definiscono davvero un esemplare speciale?
                </h3>
                <Link href="#magazine">
                  Approfondisci <ArrowIcon />
                </Link>
              </article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
