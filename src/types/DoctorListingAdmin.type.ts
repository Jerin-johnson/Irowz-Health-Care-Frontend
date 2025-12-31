export interface Doctor {
  _id: string;
  experienceYears: number;
  consultationFee: number;
  bio: string;
  medicalRegistrationNumber: string;
  medicalCouncil: string;
  teleConsultationEnabled: boolean;
  isActive: boolean;
  createdAt: string;

  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };

  specialty: {
    _id: string;
    name: string;
  };
}
