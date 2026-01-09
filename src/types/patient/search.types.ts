export interface FilterOptions {
  location: string;
  gender?: string;
  specialty: string;
  search?: string;
}

export interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}
