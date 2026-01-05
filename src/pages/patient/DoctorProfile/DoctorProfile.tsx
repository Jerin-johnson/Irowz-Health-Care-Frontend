import { useState } from "react";
import type {
  Doctor,
  Review,
} from "../../../types/patient/DoctorProfile/doctor.profile.types";
import DoctorProfileHeader from "../../../components/patient/DoctorProfile/DoctorProfileHeader";
import DoctorProfileTabs from "../../../components/patient/DoctorProfile/DoctorProfileTabs";
import DoctorOverview from "../../../components/patient/DoctorProfile/DoctorOverview";
import DoctorLocation from "../../../components/patient/DoctorProfile/DoctorLocation";
import DoctorReviews from "../../../components/patient/DoctorProfile/DoctorReviews";

const DoctorProfile = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "location" | "reviews"
  >("overview");
  const [isFavorite, setIsFavorite] = useState(false);

  const doctor: Doctor = {
    id: "1",
    name: "Dr Ruby Perrin",
    specialty: "Dentist",
    verified: true,
    patientsTreated: 3,
    votes: 0,
    feedback: 0,
    rating: 0,
    address: "213 Old Trafford UK",
    location: "New York",
    price: 300,
    phone: "9876543210",
    clinicName: "The Family Dentistry Clinic",
    about: "Lorem ipsum dolor sit amet...",
  };

  const reviews: Review[] = [
    {
      id: "1",
      patientName: "Sarah Johnson",
      rating: 5,
      date: "Dec 15, 2024",
      comment: "Excellent doctor",
      recommended: true,
    },
  ];

  return (
    <>
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

      <div className="min-h-screen bg-gray-50 py-8 px-4 max-w-6xl mx-auto">
        <DoctorProfileHeader
          doctor={doctor}
          isFavorite={isFavorite}
          onToggleFavorite={() => setIsFavorite(!isFavorite)}
        />

        <div className="bg-white rounded-lg shadow-md">
          <DoctorProfileTabs activeTab={activeTab} onChange={setActiveTab} />

          <div className="p-6">
            {activeTab === "overview" && (
              <DoctorOverview name={doctor.name} about={doctor.about} />
            )}
            {activeTab === "location" && <DoctorLocation doctor={doctor} />}
            {activeTab === "reviews" && <DoctorReviews reviews={reviews} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
