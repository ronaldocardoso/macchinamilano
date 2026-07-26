import type { Vehicle } from "@/lib/vehicles";

type VehicleVisualProps = {
  vehicle: Vehicle;
  compact?: boolean;
  imageUrl?: string;
};

export function VehicleVisual({
  vehicle,
  compact = false,
  imageUrl: selectedImageUrl,
}: VehicleVisualProps) {
  const imageUrl = selectedImageUrl ?? vehicle.imageUrls?.[0];

  if (imageUrl) {
    return (
      <div
        aria-label={`${vehicle.brand} ${vehicle.model}`}
        className={`vehicle-visual vehicle-visual--photo ${
          compact ? "vehicle-visual--compact" : ""
        }`}
        role="img"
        style={{ backgroundImage: `url("${imageUrl.replaceAll('"', "%22")}")` }}
      >
        <span className="vehicle-visual__location">{vehicle.location}</span>
        <span className="vehicle-visual__line" />
      </div>
    );
  }

  return (
    <div
      className={`vehicle-visual vehicle-visual--${vehicle.scene} ${
        compact ? "vehicle-visual--compact" : ""
      }`}
      style={{ "--vehicle-accent": vehicle.accent } as React.CSSProperties}
    >
      <span className="vehicle-visual__location">{vehicle.location}</span>
      <svg
        aria-label={`${vehicle.brand} ${vehicle.model}, rappresentazione grafica`}
        className="vehicle-visual__car"
        role="img"
        viewBox="0 0 720 300"
      >
        <defs>
          <linearGradient
            id={`paint-${vehicle.slug}`}
            x1="0"
            x2="1"
            y1="0"
            y2="1"
          >
            <stop offset="0" stopColor="#ffffff" stopOpacity=".28" />
            <stop offset=".42" stopColor="var(--vehicle-accent)" />
            <stop offset="1" stopColor="#050607" stopOpacity=".58" />
          </linearGradient>
          <linearGradient
            id={`glass-${vehicle.slug}`}
            x1="0"
            x2=".8"
            y1="0"
            y2="1"
          >
            <stop offset="0" stopColor="#dbe5ea" stopOpacity=".92" />
            <stop offset="1" stopColor="#1b2830" stopOpacity=".95" />
          </linearGradient>
        </defs>
        <ellipse cx="365" cy="248" fill="#000" opacity=".18" rx="278" ry="26" />
        <path
          d="M104 212c6-34 23-60 58-74l99-29c30-31 62-56 105-65 56-11 127-4 172 18l78 50c39 10 67 25 82 50l-6 55-52 17H137l-36-14 3-8Z"
          fill={`url(#paint-${vehicle.slug})`}
        />
        <path
          d="m282 108 70-45c43-17 108-12 148 5l67 43-285-3Z"
          fill={`url(#glass-${vehicle.slug})`}
        />
        <path
          d="M384 64 371 108M498 69l-1 42"
          stroke="#f7f8f8"
          strokeOpacity=".5"
          strokeWidth="5"
        />
        <path
          d="m109 187 76-3 21 16-95 9M590 181l100 10"
          fill="none"
          stroke="#f6f0d8"
          strokeWidth="6"
        />
        <path
          d="M237 127c85 4 205 6 328 2"
          fill="none"
          stroke="#fff"
          strokeOpacity=".3"
          strokeWidth="4"
        />
        <circle cx="218" cy="224" fill="#111" r="55" />
        <circle cx="218" cy="224" fill="#86888b" r="28" />
        <circle cx="218" cy="224" fill="#161719" r="12" />
        <circle cx="584" cy="224" fill="#111" r="55" />
        <circle cx="584" cy="224" fill="#86888b" r="28" />
        <circle cx="584" cy="224" fill="#161719" r="12" />
      </svg>
      <span className="vehicle-visual__line" />
    </div>
  );
}
