export type AppointmentStatus =
  | "BOOKED"
  | "STARTED"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export type PatientState =
  | "ONGOING"
  | "NEXT"
  | "WAITING"
  | "NOT_IN_QUEUE"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export type DoctorStatus = "NOT_STARTED" | "CONSULTING" | "ON_LUNCH_BREAK";

export interface QueueStatusResponse {
  appointmentId: string;
  status: AppointmentStatus;
  patientState: PatientState;
  doctorStatus?: DoctorStatus;
  queuePosition?: number | null;
  patientsAhead?: number | null;
  estimatedWaitMinutes?: number | null;
  message?: string;
  patientInfo?: PatientInfo;
}

export interface PatientInfo {
  name: string;
  appointmentTime: string;
  doctorName: string;
  appointmentDate: string;
}
