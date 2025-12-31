export interface DoctorProfile {
  id: string;

  fullName: string;
  email: string;
  phone: string;

  hospitalName: string;
  specialtyName: string;

  bio: string;
  experienceYears: number;
  consultationFee: number;

  medicalRegistrationNumber: string;
  medicalCouncil: string;

  teleConsultationEnabled?: boolean;
}
