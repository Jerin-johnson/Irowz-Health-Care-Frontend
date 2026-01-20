import { api } from "../../axios.config";

export const getSchdueleDoctorApi = async (date: string) => {
  const res = await api.get("/doctor/schedule", { params: { date } });

  console.log(res);
  if (res.data.success) {
    return res.data.data;
  }

  throw new Error("doctor schudele api  error");
};
