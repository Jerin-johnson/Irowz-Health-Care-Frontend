import type { Slot } from "../../../types/doctor/doctor.schudele.types";
import { api } from "../../axios.config";

export const getSchdueleDoctorApi = async (date: string) => {
  const res = await api.get("/doctor/schedule", { params: { date } });

  console.log(res);
  if (res.data.success) {
    return res.data.data;
  }

  throw new Error("doctor schudele api  error");
};

export const blockSlotByDoctorApi = async (slot: Slot) => {
  const res = await api.post("/doctor/schedule/lock", {
    date: slot.date,
    startTime: slot.startTime,
  });

  console.log(res);
  if (res.data.success) {
    return res.data.data;
  }

  throw new Error("doctor schudele api  error");
};
