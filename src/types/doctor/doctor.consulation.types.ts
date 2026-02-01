export interface Patient {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  bloodGroup: string;
  height: number;
  weight: number;
  bmi: number;
  bp: string;
  phone: string;
  email: string;
  city: string;
  allergies: string[];
  chronicConditions: string[];
  visitType: string;
  visitTime: string;
  queue: number;
  status: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  doctorName: string;
  diagnosisSummary: string;
  hospitalName: string;
  visitType: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  dosageUnit: string;
  duration: number;
  durationUnit: string;
  instructions: string;
}

export interface LabTest {
  id: string;
  name: string;
  category: string;
}

export type TabType = "overview" | "history" | "prescription" | "labs";
