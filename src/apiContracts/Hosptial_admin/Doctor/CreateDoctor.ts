export interface CreateDoctorDTO {
  fullName: string;
  email: string;
  phone: string;

  specialtyId: string;

  experienceYears: number;
  consultationFee: number;
  bio: string;

  medicalRegistrationNumber: string;
  medicalCouncil: "MCI" | "NMC" | "STATE_MEDICAL_COUNCIL";

  teleConsultationEnabled?: boolean;
}
