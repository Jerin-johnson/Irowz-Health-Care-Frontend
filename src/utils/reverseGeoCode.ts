export interface ReverseGeocodeResult {
  displayName: string;
  city?: string;
  state?: string;
  country?: string;
}

export const reverseGeocode = async (
  latitude: number,
  longitude: number
): Promise<ReverseGeocodeResult> => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch location");
  }

  const data = await res.json();

  const address = data.address || {};

  return {
    displayName: data.display_name,
    city: address.city || address.town || address.village || address.suburb,
    state: address.state,
    country: address.country,
  };
};
