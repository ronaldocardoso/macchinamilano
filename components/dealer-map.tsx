import { ArrowIcon } from "@/components/icons";
import { getGoogleMapsUrls } from "@/lib/google-maps";

type DealerMapProps = {
  dealer: string;
  street?: string;
  postalCode?: string;
  city: string;
  province?: string;
};

export function DealerMap({
  dealer,
  street,
  postalCode,
  city,
  province,
}: DealerMapProps) {
  const { embedUrl, externalUrl, query } = getGoogleMapsUrls({
    name: dealer,
    street,
    postalCode,
    city,
    province,
    country: "Italia",
  });

  return (
    <div className="dealer-map-wrap">
      <div className="dealer-map">
        <iframe
          allowFullScreen
          aria-label={`Mappa di ${dealer}`}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          src={embedUrl}
          title={`Google Maps — ${query}`}
        />
      </div>
      <a
        className="dealer-map__link"
        href={externalUrl}
        rel="noreferrer"
        target="_blank"
      >
        Apri in Google Maps <ArrowIcon />
      </a>
    </div>
  );
}
