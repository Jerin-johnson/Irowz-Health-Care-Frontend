export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image?: string;
  verified: boolean;
  patientsTreated: number;
  votes: number;
  feedback: number;
  rating: number;
  address: string;
  location: string;
  price: number;
  phone: string;
  clinicName: string;
  about: string;
}

export interface Review {
  id: string;
  patientName: string;
  rating: number;
  date: string;
  comment: string;
  recommended: boolean;
}

export interface Feedback {
  name: string;
  email: string;
  rating: number;
  comment: string;
}
