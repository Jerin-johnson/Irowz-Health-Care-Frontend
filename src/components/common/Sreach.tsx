import React, { useState } from "react";
import { Search } from "lucide-react";

export const SearchBar: React.FC<{
  onSearch?: (location: string, query: string) => void;
}> = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");

  console.log(onSearch);

  return (
    <div className="bg-white rounded-lg shadow-lg p-1 flex flex-col sm:flex-row gap-2 max-w-2xl">
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1 px-4 py-3 outline-none text-gray-600 rounded"
      >
        <option value="">Select a location</option>
        <option value="ny">New York</option>
        <option value="la">Los Angeles</option>
        <option value="chicago">Chicago</option>
      </select>
      <div className="flex-1 flex items-center px-4 py-3">
        <Search className="text-gray-400 mr-2" size={20} />
        <input
          type="text"
          placeholder="Search doctors, clinics, etc."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none"
        />
      </div>
    </div>
  );
};
