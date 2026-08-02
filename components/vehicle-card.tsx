import Link from "next/link";

import { HeartIcon, MapPinIcon } from "@/components/icons";
import { VehicleVisual } from "@/components/vehicle-visual";
import {
  formatMileage,
  formatPrice,
  getVehicleLabel,
  type Vehicle,
} from "@/lib/vehicles";

type VehicleCardProps = {
  vehicle: Vehicle;
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const label = getVehicleLabel(vehicle);

  return (
    <article className="vehicle-card">
      <Link
        aria-label={`Scopri ${vehicle.brand} ${vehicle.model}`}
        className="vehicle-card__visual-link"
        href={`/veicoli/${vehicle.slug}`}
      >
        <VehicleVisual compact vehicle={vehicle} />
        {label && (
          <span
            className={[
              "vehicle-card__tag",
              label === "Elettrico" ? "vehicle-card__tag--electric" : undefined,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {label}
          </span>
        )}
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
          <span>{vehicle.year ?? "Nuovo"}</span>
          <span>
            {vehicle.mileage === undefined
              ? "— km"
              : formatMileage(vehicle.mileage)}
          </span>
          <span>{vehicle.fuel}</span>
        </div>
        <div className="vehicle-card__footer">
          <div>
            <strong>{formatPrice(vehicle.price)}</strong>
            <span>
              <MapPinIcon /> {vehicle.location}
            </span>
          </div>
        </div>
      </div>
      <Link
        aria-hidden="true"
        className="vehicle-card__touch-link"
        href={`/veicoli/${vehicle.slug}`}
        tabIndex={-1}
      />
    </article>
  );
}
