import { api } from "../../axios.config";

export const fetchPatientDashboard = async () => {
  const result = await api.get("/patient/dashboard/overview");
  return result.data.data;
};
