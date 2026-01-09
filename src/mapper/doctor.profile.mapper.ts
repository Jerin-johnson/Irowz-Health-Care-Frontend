import type { Doctor } from "../types/patient/DoctorProfile/doctor.profile.types";

export interface DoctorProfileApiResponse {
  _id: string;

  userId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    profileImage?: string;
  };

  hospitalId: {
    _id: string;
    name: string;
    city: string;
    state: string;
    isActive: boolean;
  };

  specialtyId: {
    _id: string;
    name: string;
    description: string;
  };

  experienceYears: number;
  consultationFee: number;
  bio: string;

  medicalRegistrationNumber: string;
  medicalCouncil: string;

  teleConsultationEnabled: boolean;

  averageRating: number;
  totalReviews: number;

  isActive: boolean;
  createdAt: string;
}

export const mapDoctorProfileToDoctor = (
  data: DoctorProfileApiResponse
): Doctor => {
  return {
    id: data._id,

    name: data.userId.name,
    specialty: data.specialtyId.name,

    image: data.userId.profileImage,

    verified: data.isActive,

    patientsTreated: 0,

    votes: data.totalReviews,
    feedback: data.totalReviews,

    rating: data.averageRating,

    address: `${data.hospitalId.city}, ${data.hospitalId.state}`,
    location: data.hospitalId.city,

    price: data.consultationFee,

    phone: data.userId.phone,

    clinicName: data.hospitalId.name,

    about: data.bio,
  };
};
