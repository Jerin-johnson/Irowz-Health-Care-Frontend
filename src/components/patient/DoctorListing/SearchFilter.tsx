import { useState } from "react";
import { MapPin, X } from "lucide-react";
import { SearchInput } from "../SearchInput";
import { SelectDropdown } from "../SelectDropDown";
import { Button } from "../Button";
import type { FilterOptions } from "../../../types/patient/search.types";
import { reverseGeocode } from "../../../utils/reverseGeoCode";
import { notify } from "../../../shared/notification/toast";

export const getUserLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error("Geolocation not supported"));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(
          new Error(
            error.code === error.PERMISSION_DENIED
              ? "Location permission denied"
              : "Unable to fetch location"
          )
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};

interface SearchFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onSearch: () => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  filters,
  onFilterChange,
  onSearch,
}) => {
  const [locLoading, setLocLoading] = useState(false);

  const enableLocation = async () => {
    try {
      setLocLoading(true);

      const { latitude, longitude } = await getUserLocation();
      const place = await reverseGeocode(latitude, longitude);

      console.log("The place is ", place);

      onFilterChange({
        ...filters,
        useLocation: true,
        latitude,
        longitude,
        radiusKm: filters.radiusKm ?? 5,
        locationLabel: place.city
          ? `${place.city}, ${place.state}`
          : place.displayName,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to detect location";

      console.error(err);
      notify.error(message);
    } finally {
      setLocLoading(false);
    }
  };

  const disableLocation = () => {
    onFilterChange({
      ...filters,
      useLocation: false,
      latitude: undefined,
      longitude: undefined,
      radiusKm: undefined,
      locationLabel: undefined,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-5">
      <h3 className="text-lg font-semibold text-gray-900">Search & Filters</h3>

      {/* Search */}
      <SearchInput
        placeholder="Search doctors, clinics, specialties..."
        value={filters.search}
        onChange={(value: string) =>
          onFilterChange({ ...filters, search: value })
        }
      />

      {/* Location (CLEAN VERSION – ONLY THIS CHANGED) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-800">
            <MapPin size={18} className="text-gray-500" />
            <span className="text-sm font-medium">Use current location</span>
          </div>

          {filters.useLocation ? (
            <button
              onClick={disableLocation}
              className="text-xs text-red-500 hover:underline"
            >
              Disable
            </button>
          ) : (
            <button
              onClick={enableLocation}
              disabled={locLoading}
              className="text-xs text-blue-600 hover:underline disabled:opacity-50"
            >
              {locLoading ? "Detecting..." : "Enable"}
            </button>
          )}
        </div>

        {/* Location label */}
        {filters.useLocation && (
          <div className="flex items-center gap-2 text-sm text-gray-600 pl-1">
            <MapPin size={14} />
            <span className="truncate">{filters.locationLabel}</span>
          </div>
        )}
      </div>

      {/* Distance */}
      {filters.useLocation && (
        <SelectDropdown
          label="Distance"
          value={String(filters.radiusKm)}
          options={[
            { value: "2", label: "Within 2 km" },
            { value: "5", label: "Within 5 km" },
            { value: "10", label: "Within 10 km" },
            { value: "15", label: "Within 15 km" },
            { value: "50", label: "Within 50 km" },
          ]}
          onChange={(value) =>
            onFilterChange({
              ...filters,
              radiusKm: Number(value),
            })
          }
        />
      )}

      {/* Search Button */}
      <Button onClick={onSearch} fullWidth>
        SEARCH
      </Button>
    </div>
  );
};
