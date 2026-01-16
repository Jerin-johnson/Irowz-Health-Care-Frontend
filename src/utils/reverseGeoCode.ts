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
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
    {
      headers: {
        "User-Agent": "MyHealthcareApp/1.0 (support@myapp.com)",
      },
    }
  );

  const data = await res.json();
  console.log("Reverse geocode:", data);

  if (!res.ok) {
    throw new Error("Failed to fetch location");
  }

  const address = data.address || {};

  return {
    displayName: data.display_name,
    city: address.city || address.town || address.village || address.suburb,
    state: address.state,
    country: address.country,
  };
};
