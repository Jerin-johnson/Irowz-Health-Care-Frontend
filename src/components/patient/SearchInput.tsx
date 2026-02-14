import { Search } from "lucide-react";
import type { SearchInputProps } from "../../types/patient/search.types";

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  onChange,
  icon,
}) => (
  <div className="relative">
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
      {icon || <Search size={18} />}
    </div>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
