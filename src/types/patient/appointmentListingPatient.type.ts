export type VisitType = "OPD" | "ONLINE";

export type AppointmentStatus =
  | "PENDING"
  | "BOOKED"
  | "CANCELLED"
  | "COMPLETED"
  | "NO_SHOW"
  | "STARTED";

export interface PatientSnapshot {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface DoctorInfo {
  _id: string;
  firstName: string;
  lastName: string;
  specialty?: string;
  avatar?: string;
}

export interface Appointment {
  _id: string;
  doctorId: DoctorInfo;
  patientId: string;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  visitType: VisitType;
  patientSnapshot: PatientSnapshot;
  consultationFee: number;
  discountAmount: number;
  taxAmount?: number;
  isRescheduleAppointment: boolean;
  totalAmount: number;
  status: AppointmentStatus;
  cancelledAt?: Date;
  cancelReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
