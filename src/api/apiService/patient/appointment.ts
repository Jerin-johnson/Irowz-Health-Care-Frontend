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

export const checkCancelEligibility = async (appointmentId: string) => {
  const res = await api.get(
    `/patient/appointment/cancel-eligibility/${appointmentId}`,
  );
  console.log("the response check cancelEligibility", res.data.data);
  return res.data.data;
};

export const cancelAppointmentPatients = async (appointmentId: string) => {
  const res = await api.post(`/patient/appointment/cancel/${appointmentId}`);
  console.log("the response check cancel", res.data.data);
  return res.data.data;
};

export const rescheduleAppointment = async ({
  appointmentId,
  doctorId,
  date,
  startTime,
  endTime,
}: {
  appointmentId: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
}) => {
  const res = await api.post(
    `/patient/appointment/reschedule/${appointmentId}`,
    {
      doctorId,
      date,
      startTime,
      endTime,
    },
  );
  return res.data;
};

export const checkRescheduleEligibility = async (appointmentId: string) => {
  const res = await api.get(
    `/patient/appointment/reschedule-eligibility/${appointmentId}`,
  );
  return res.data.data;
};
