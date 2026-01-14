import { Navigation } from "lucide-react";
import type { Doctor } from "../../../types/patient/DoctorProfile/doctor.profile.types";

interface Props {
  doctor: Doctor;
}

const DoctorLocation: React.FC<Props> = ({ doctor }) => {
  const lat = doctor.latitude;
  const lng = doctor.longitude;

  console.log(lat, lng);

  const googleMapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  const openDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`,
      "_blank"
    );
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Clinic Location</h3>

      <p>
        <strong>Clinic:</strong> {doctor.clinicName}
      </p>
      <p>
        <strong>Address:</strong> {doctor.address}
      </p>
      <p>
        <strong>City:</strong> {doctor.location}
      </p>
      <p>
        <strong>Phone:</strong> {doctor.phone}
      </p>

      {/* Google Map */}
      <div className="mt-6 rounded-lg overflow-hidden h-64 border">
        <iframe
          src={googleMapSrc}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Directions Button */}
      <button
        onClick={openDirections}
        className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        <Navigation size={18} />
        Get Directions from Current Location
      </button>
    </div>
  );
};

export default DoctorLocation;
