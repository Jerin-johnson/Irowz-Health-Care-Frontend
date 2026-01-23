export type VisitType = "OPD" | "Teleconsult" | "Emergency";

export type AppointmentStatus =
  | "BOOKED"
  | "STARTED"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export interface Appointment {
  appointmentId: string;
  startTime: string;
  patientName: string;
  visitType: VisitType;
  status: AppointmentStatus;
  queuePriority: number;
}

export interface DoctorLiveQueueResponse {
  success: boolean;
  message: string;
  data: {
    currentAppointmentId: string | null;
    nextAppointmentId: string | null;
    stats: {
      totalToday: number;
      completed: number;
      pending: number;
      inConsultation: number;
    };
    appointments: Appointment[];
  };
}
