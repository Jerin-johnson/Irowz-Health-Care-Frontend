import { api } from "../../axios.config";

export const fetchPatientAppointments = async ({
  status,
  date,
  page,
  limit,
}: {
  status?: string;
  date?: string;
  page: number;
  limit: number;
}) => {
  const res = await api.get("/patient/appointments", {
    params: { status, date, page, limit },
  });

  return res.data.data; // { data: Appointment[], total: number }
};

export const fetchLiveQueueApi = async (appointmentId: string) => {
  const res = await api.get(`/patient/live/queue/${appointmentId}`);
  return res.data.data;
};
