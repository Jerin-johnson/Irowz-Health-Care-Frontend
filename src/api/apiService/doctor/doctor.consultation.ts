import { api } from "../../axios.config";

export const fetchAppointment = async (id: string) => {
  const result = await api.get(`/doctor/appointment/${id}`);
  return result.data.data;
};

export const fetchDoctorLiveQueueApi = async () => {
  const result = await api.get("/doctor/queue");

  console.log("The response is", result);
  return result.data;
};
