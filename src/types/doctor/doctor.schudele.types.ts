export type SlotStatus = "available" | "booked" | "blocked";
export type AppointmentType = "OPD" | "Teleconsult" | "Emergency" | "Walk-in";

export interface Slot {
  // id: string;
  startTime: string;
  endTime: string;
  status: SlotStatus;
  type?: AppointmentType;
  patientName?: string;
  appointmentId?: string;
  note?: string;
  date?: string;
}

export interface Stats {
  total: number;
  booked: number;
  available: number;
}
