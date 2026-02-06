import { api } from "../../axios.config";

export const fetchDoctorDashboard = async () => {
  const result = await api.get("/doctor/dashboard/overview");
  return result.data.data;
};
