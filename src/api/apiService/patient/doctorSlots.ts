import { api } from "../../axios.config";

export const fetchDoctorAvailbleSlots = async (
  doctorId: string,
  date?: Date | string
) => {
  const res = await api.get(`/patient/doctor/slot`, {
    params: { id: doctorId, date: date ? String(date) : "2026-01-12" },
  });

  return res.data.data;
};

export const lockDoctorSlots = async (
  doctorId: string,
  date: Date | string,
  startTime: string
) => {
  const res = await api.post(`/patient/doctor/slot/lock`, {
    doctorId,
    date,
    startTime,
  });

  return res.data;
};

export const unlockDoctorSlot = async (payload: {
  doctorId: string;
  date: string;
  startTime: string;
}) => {
  const res = await api.post("/patient/doctor/slot/unlock", payload);
  return res.data;
};
