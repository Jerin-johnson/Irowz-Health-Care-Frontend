import { useState } from "react";

import { SearchInput } from "../SearchInput";
import { SelectDropdown } from "../SelectDropDown";
import { MapPin, Stethoscope, User } from "lucide-react";
import { Button } from "../Button";
import type { FilterOptions } from "../../../types/patient/search.types";

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
  const [searchText, setSearchText] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Search Filter
      </h3>

      <SearchInput
        placeholder="Search doctors, clinics, etc."
        value={searchText}
        onChange={setSearchText}
      />

      <SelectDropdown
        label="Location"
        value={filters.location}
        options={[
          { value: "", label: "Select a location" },
          { value: "new-york", label: "New York" },
          { value: "los-angeles", label: "Los Angeles" },
          { value: "chicago", label: "Chicago" },
        ]}
        onChange={(value) => onFilterChange({ ...filters, location: value })}
        icon={<MapPin size={16} />}
      />

      <SelectDropdown
        label="Gender"
        value={filters.gender}
        options={[
          { value: "", label: "Search by gender" },
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "any", label: "Any" },
        ]}
        onChange={(value) => onFilterChange({ ...filters, gender: value })}
        icon={<User size={16} />}
      />

      <SelectDropdown
        label="Specialist"
        value={filters.specialty}
        options={[
          { value: "", label: "Select a specialty" },
          { value: "cardiologist", label: "Cardiologist" },
          { value: "dermatologist", label: "Dermatologist" },
          { value: "dentist", label: "Dentist" },
          { value: "general", label: "General Practice" },
        ]}
        onChange={(value) => onFilterChange({ ...filters, specialty: value })}
        icon={<Stethoscope size={16} />}
      />

      <Button onClick={onSearch} fullWidth>
        SEARCH
      </Button>
    </div>
  );
};
