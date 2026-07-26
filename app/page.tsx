import Link from "next/link";

import { BrandVehicleShowcase } from "@/components/brand-vehicle-showcase";
import { ArrowIcon } from "@/components/icons";
import { ExploreDirectory } from "@/components/explore-directory";
import { SearchPanel } from "@/components/search-panel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VehicleCard } from "@/components/vehicle-card";
import { vehicles } from "@/lib/vehicles";

const featured = vehicles.filter((vehicle) => vehicle.featured);
const newArrivals = vehicles.filter((vehicle) => vehicle.newArrival);
const ferrariMilano = vehicles.filter((vehicle) => vehicle.brand === "Ferrari");
const lamborghiniMilano = vehicles.filter(
  (vehicle) => vehicle.brand === "Lamborghini",
);
const maseratiMilano = vehicles.filter(
  (vehicle) => vehicle.brand === "Maserati",
);

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

        <ExploreDirectory />

        <section className="section" id="selezioni">
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

        <BrandVehicleShowcase
          brand="Ferrari"
          filterValue="ferrari"
          vehicles={ferrariMilano}
        />
        <BrandVehicleShowcase
          brand="Lamborghini"
          filterValue="lamborghini"
          vehicles={lamborghiniMilano}
        />
        <BrandVehicleShowcase
          brand="Maserati"
          filterValue="maserati"
          vehicles={maseratiMilano}
        />

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
