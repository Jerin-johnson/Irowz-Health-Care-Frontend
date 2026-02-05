import { useState } from "react";
import type {
  Doctor,
  // Review,
} from "../../../types/patient/DoctorProfile/doctor.profile.types";
import DoctorProfileHeader from "../../../components/patient/DoctorProfile/DoctorProfileHeader";
import DoctorProfileTabs from "../../../components/patient/DoctorProfile/DoctorProfileTabs";
import DoctorOverview from "../../../components/patient/DoctorProfile/DoctorOverview";
import DoctorLocation from "../../../components/patient/DoctorProfile/DoctorLocation";
import DoctorReviews from "../../../components/patient/DoctorProfile/DoctorReviews";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctorProfile } from "../../../api/apiService/patient/doctorListing";
import { useParams } from "react-router-dom";
import { mapDoctorProfileToDoctor } from "../../../mapper/doctor.profile.mapper";
import DoctorProfileShimmer from "../../../components/patient/DoctorProfile/DoctorProfileShimmer";

const DoctorProfile = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "location" | "reviews"
  >("overview");
  const [isFavorite, setIsFavorite] = useState(false);

  const { id: doctorId } = useParams();

  const { data: doctor, isLoading } = useQuery({
    queryKey: ["doctor:profile", doctorId],
    queryFn: async () => {
      const raw = await fetchDoctorProfile(doctorId!);
      return mapDoctorProfileToDoctor(raw);
    },
    enabled: !!doctorId,
  });

  if (isLoading) {
    return (
      <div>
        <DoctorProfileShimmer />
      </div>
    );
  }

  if (!doctor) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      {/* Header */}
      <div className="bg-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Search Doctors
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Home → Search → Doctor
          </p>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-8 px-4 max-w-6xl mx-auto">
        <DoctorProfileHeader
          doctor={doctor as Doctor}
          isFavorite={isFavorite}
          onToggleFavorite={() => setIsFavorite(!isFavorite)}
          setActiveTab={setActiveTab}
        />

        <div className="bg-white rounded-lg shadow-md">
          <DoctorProfileTabs activeTab={activeTab} onChange={setActiveTab} />

          <div className="p-6">
            {activeTab === "overview" && (
              <DoctorOverview name={doctor.name} about={doctor.about} />
            )}
            {activeTab === "location" && <DoctorLocation doctor={doctor} />}
            {activeTab === "reviews" && <DoctorReviews doctorId={doctor.id} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
