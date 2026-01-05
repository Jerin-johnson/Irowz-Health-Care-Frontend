import { MapPin } from "lucide-react";
import type { Doctor } from "../../../types/patient/DoctorProfile/doctor.profile.types";

interface Props {
  doctor: Doctor;
}

const DoctorLocation: React.FC<Props> = ({ doctor }) => {
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

      <div className="mt-6 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
        <MapPin size={48} className="text-gray-400" />
      </div>
    </div>
  );
};

export default DoctorLocation;
