import { useState } from "react";
import type { FilterOptions } from "../../../types/patient/search.types";
import type { Doctor } from "../../../types/patient/doctorListing.type";
import { SearchFilter } from "../../../components/patient/DoctorListing/SearchFilter";
import { DoctorCard } from "../../../components/patient/DoctorListing/DoctorCard";

const DoctorListing: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    location: "",
    gender: "",
    specialty: "",
  });

  const [doctors] = useState<Doctor[]>([
    {
      id: "1",
      name: "Dr Saeed Tamer",
      specialty: "DOCTOR",
      rating: 0,
      votes: 0,
      clinic: "The Family Dentistry Clinic",
      availability: "not-available",
      price: 998.0,
      badges: ["Cardiologist"],
    },
    {
      id: "2",
      name: "Dr Ruby Perrin",
      specialty: "DOCTOR",
      rating: 0,
      votes: 0,
      clinic: "The Family Dentistry Clinic",
      availability: "available",
      schedule: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      price: 300.0,
      badges: [],
    },
    {
      id: "3",
      name: "Dr Darren Elder",
      specialty: "Cardiologist",
      rating: 5,
      votes: 1,
      clinic: "The Family Dentistry Clinic",
      availability: "available",
      schedule: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      price: 150.0,
      badges: ["Cardiologist"],
    },
  ]);

  const handleSearch = () => {
    console.log("Searching with filters:", filters);
  };

  const handleViewProfile = (doctorId: string) => {
    console.log("Viewing profile for doctor:", doctorId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Search Doctors
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Home → Search Doctors
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filter */}
          <div className="lg:col-span-1">
            <SearchFilter
              filters={filters}
              onFilterChange={setFilters}
              onSearch={handleSearch}
            />
          </div>

          {/* Doctor List */}
          <div className="lg:col-span-3 space-y-4">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorListing;
