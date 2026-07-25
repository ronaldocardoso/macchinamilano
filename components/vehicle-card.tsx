import Link from "next/link";

import { ArrowIcon, HeartIcon, MapPinIcon } from "@/components/icons";
import { VehicleVisual } from "@/components/vehicle-visual";
import { formatMileage, formatPrice, type Vehicle } from "@/lib/vehicles";

type VehicleCardProps = {
  vehicle: Vehicle;
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <article className="vehicle-card">
      <Link
        aria-label={`Scopri ${vehicle.brand} ${vehicle.model}`}
        className="vehicle-card__visual-link"
        href={`/veicoli/${vehicle.slug}`}
      >
        <VehicleVisual compact vehicle={vehicle} />
        <span className="vehicle-card__tag">
          {vehicle.featured ? "In evidenza" : "Nuovo arrivo"}
        </span>
      </Link>
      <div className="vehicle-card__body">
        <div className="vehicle-card__heading">
          <div>
            <p>{vehicle.brand}</p>
            <h3>
              <Link href={`/veicoli/${vehicle.slug}`}>{vehicle.model}</Link>
            </h3>
          </div>
          <button
            aria-label="Salva nei preferiti"
            className="save-button"
            type="button"
          >
            <HeartIcon />
          </button>
        </div>
        <p className="vehicle-card__version">{vehicle.version}</p>
        <div className="vehicle-card__specs">
          <span>{vehicle.year}</span>
          <span>{formatMileage(vehicle.mileage)}</span>
          <span>{vehicle.fuel}</span>
        </div>
        <div className="vehicle-card__footer">
          <div>
            <strong>{formatPrice(vehicle.price)}</strong>
            <span>
              <MapPinIcon /> {vehicle.location}
            </span>
          </div>
          <Link aria-label="Apri il veicolo" href={`/veicoli/${vehicle.slug}`}>
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </article>
  );
}
