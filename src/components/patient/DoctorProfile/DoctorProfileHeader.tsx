import {
  MapPin,
  Star,
  Heart,
  CreditCard,
  Phone,
  User,
  MessageSquare,
} from "lucide-react";
import type { Doctor } from "../../../types/patient/DoctorProfile/doctor.profile.types";
import { useNavigate } from "react-router-dom";

interface Props {
  doctor: Doctor;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  setActiveTab: any;
}

const DoctorProfileHeader: React.FC<Props> = ({
  doctor,
  isFavorite,
  onToggleFavorite,
  setActiveTab,
}) => {
  const navigate = useNavigate();

  function handleBooking(doctorId: string) {
    navigate(`/patient/doctor/slots/${doctorId}`);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-200">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-grow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {doctor.name}
              </h1>

              <p className="text-blue-500 font-medium">{doctor.specialty}</p>

              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= doctor.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <button
                onClick={onToggleFavorite}
                className="mt-3 text-sm text-gray-600 hover:text-red-500 flex items-center gap-1"
              >
                <Heart
                  size={16}
                  className={isFavorite ? "fill-red-500 text-red-500" : ""}
                />
                Add to Favourites
              </button>
            </div>

            <div className="text-right space-y-2 text-sm">
              <div className="flex items-center gap-2 justify-end">
                <User size={16} className="text-gray-400" />
                <span>{doctor.patientsTreated} Patients Treated</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <Star size={16} className="text-gray-400" />
                <span>{doctor.votes} Votes</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <MessageSquare size={16} className="text-gray-400" />
                <span>{doctor.feedback} Feedback</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="font-semibold">Clinic</p>
              <p className="text-gray-600">{doctor.clinicName}</p>
            </div>
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-gray-600">{doctor.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <MapPin size={16} />
            <span>{doctor.address}</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <CreditCard size={16} className="text-gray-400" />
            <span className="text-xl font-bold">
              ${doctor.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Phone size={16} />
            <span>{doctor.phone}</span>
          </div>

          <div className="flex gap-3">
            <button
              className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50"
              onClick={() => setActiveTab("reviews")}
            >
              Add Feedback
            </button>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleBooking(doctor.id)}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileHeader;
