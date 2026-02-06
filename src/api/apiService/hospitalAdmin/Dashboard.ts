import { api } from "../../axios.config";

export const fetchHosptialAdminDashboard = async () => {
  const result = await api.get("/hospital-admin/dashboard/overview");
  return result.data.data;
};
