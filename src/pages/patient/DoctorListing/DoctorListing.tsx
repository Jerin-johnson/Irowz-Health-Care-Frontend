import { useState } from "react";
import type { FilterOptions } from "../../../types/patient/search.types";
import { SearchFilter } from "../../../components/patient/DoctorListing/SearchFilter";
import { DoctorCard } from "../../../components/patient/DoctorListing/DoctorCard";
import { Pagination } from "../../../components/common/Pagination";
import { useDoctors } from "../../../hooks/patient/doctorListing/useSearchDoctor";
import { useNavigate } from "react-router-dom";
import {
  DoctorCardSkeleton,
  EmptyState,
} from "../../../components/patient/DoctorListing/DoctorShimmerUi";
import { useDebounce } from "../../../hooks/common/useDebounce";
import type { Doctor } from "../../../types/patient/doctorListing.type";

const DoctorListing: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    location: "",
    specialty: "",
    search: "",
    useLocation: false,
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedFilters = {
    ...filters,
    search: debouncedSearch,
  };

  const { data, isFetching, refetch } = useDoctors(
    debouncedFilters,
    currentPage,
  );

  const doctors = data?.doctors ?? [];
  const totalPages = data?.pagination.totalPages ?? 1;

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleViewProfile = (doctorId: string) => {
    console.log("View doctor:", doctorId);
    navigate(`/patient/doctor/${doctorId}`);
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
            {!isFetching && doctors.length === 0 && <EmptyState />}

            {doctors.map((doctor: Doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onViewProfile={handleViewProfile}
              />
            ))}
            {isFetching && (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <DoctorCardSkeleton key={i} />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorListing;
