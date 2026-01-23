// types/appointment.ts
export type VisitType = "OPD" | "ONLINE" | "HOME_VISIT";
export type AppointmentStatus =
  | "BOOKED"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export interface AppointmentPatient {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface AppointmentAddress {
  country: string;
  state: string;
  city: string;
  zip: string;
  street: string;
}

export interface AppointmentDto {
  id: string;
  doctorId: string;
  patientId: string;
  date: string; // "2026-01-21"
  startTime: string; // "14:30"
  timezone: string; // "Asia/Kolkata"
  visitType: VisitType;
  patient: AppointmentPatient;
  address: AppointmentAddress;
  consultationFee: number;
  discountAmount: number;
  totalAmount: number;
  paymentStatus: "PAID" | "PENDING" | "FAILED";
  paymentMethod: string;
  queuePriority: number;
  isLate: boolean;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}
