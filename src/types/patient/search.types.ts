export interface FilterOptions {
  location?: string; // fallback city
  specialty?: string;
  search: string;
  useLocation?: boolean;
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
  locationLabel?: string;
}

export interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}
