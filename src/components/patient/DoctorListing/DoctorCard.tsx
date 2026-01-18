import { Calendar, DollarSign, MapPin, User } from "lucide-react";
import { RatingDisplay } from "../RatingDisplay";
import { Badge } from "../Badge";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { Button } from "../Button";
import type { Doctor } from "../../../types/patient/doctorListing.type";
import { formatDistance } from "../../../utils/distance";

interface DoctorCardProps {
  doctor: Doctor;
  onViewProfile: (doctorId: string) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onViewProfile,
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex gap-4">
      {/* Doctor Image */}
      <div className="flex-shrink-0">
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200">
          {doctor.image ? (
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User size={48} className="text-gray-400" />
            </div>
          )}
        </div>
      </div>

      {/* Doctor Info */}
      <div className="flex-grow">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {doctor.name}
            </h3>
            <p className="text-sm text-blue-500 font-medium">
              {doctor.specialty}
            </p>
            <div className="mt-2">
              <RatingDisplay rating={doctor.rating} votes={doctor.votes} />
            </div>
          </div>
          <div className="text-right space-y-2">
            <div className="text-sm text-gray-600 flex items-center gap-1 justify-end">
              <Calendar size={14} />
              {doctor.votes} Votes
            </div>
            {/* Distance */}
            {doctor.distance !== undefined && (
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <MapPin size={14} />
                <span>{formatDistance(doctor.distance)} away</span>
              </div>
            )}
          </div>
        </div>

        {/* Badges */}
        {doctor.badges && doctor.badges.length > 0 && (
          <div className="mt-2 flex gap-2">
            {doctor.badges.map((badge, index) => (
              <Badge key={index} text={badge} />
            ))}
          </div>
        )}

        {/* Clinic Info */}
        <div className="mt-3 space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{doctor.clinic}</span>
          </div>
          {doctor.schedule && (
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{doctor.schedule.join(", ")}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="font-medium">₹{doctor.price.toFixed(2)}</span>
          </div>
        </div>

        {/* Availability & Actions */}
        <div className="mt-4 flex items-center justify-between">
          <AvailabilityBadge
            availability={doctor.availability}
            nextAvailable={doctor.nextAvailable}
          />
          <Button onClick={() => onViewProfile(doctor.id)} variant="outline">
            View Profile
          </Button>
        </div>
      </div>
    </div>
  </div>
);
