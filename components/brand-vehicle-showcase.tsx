import Link from "next/link";

import { ArrowIcon } from "@/components/icons";
import { VehicleCard } from "@/components/vehicle-card";
import type { Vehicle } from "@/lib/vehicles";

type BrandVehicleShowcaseProps = {
  brand: string;
  filterValue: string;
  vehicles: Vehicle[];
};

export function BrandVehicleShowcase({
  brand,
  filterValue,
  vehicles,
}: BrandVehicleShowcaseProps) {
  return (
    <section
      aria-labelledby={`${filterValue}-milano-title`}
      className="section brand-showcase"
    >
      <div className="container">
        <header className="brand-showcase__header">
          <div>
            <p className="eyebrow">Selezione del marchio</p>
            <h2 id={`${filterValue}-milano-title`}>
              <span>{brand}</span> a Milano
            </h2>
          </div>
          <Link
            className="text-link"
            href={{
              pathname: "/veicoli",
              query: { marca: filterValue },
            }}
          >
            Vedi tutte le {brand} <ArrowIcon />
          </Link>
        </header>
        <div className="vehicle-grid brand-showcase__grid">
          {vehicles.slice(0, 8).map((vehicle) => (
            <VehicleCard key={vehicle.slug} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
