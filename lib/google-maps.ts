type GoogleMapsPlace = {
  name?: string;
  street?: string;
  postalCode?: string;
  city: string;
  province?: string;
  country?: string;
};

export function formatGoogleMapsQuery(place: GoogleMapsPlace) {
  return [
    place.name,
    place.street,
    place.postalCode,
    place.city,
    place.province,
    place.country ?? "Italia",
  ]
    .filter((value): value is string => Boolean(value?.trim()))
    .join(", ");
}

export function getGoogleMapsUrls(
  place: GoogleMapsPlace,
  apiKey = process.env.GOOGLE_MAPS_EMBED_API_KEY,
) {
  const query = formatGoogleMapsQuery(place);
  const encodedQuery = encodeURIComponent(query);

  return {
    embedUrl: apiKey
      ? `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(apiKey)}&q=${encodedQuery}&language=it&region=IT`
      : `https://www.google.com/maps?q=${encodedQuery}&output=embed&hl=it`,
    externalUrl: `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`,
    query,
  };
}
