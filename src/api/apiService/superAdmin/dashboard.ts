import { api } from "../../axios.config";

export const fetchSuperAdminDashboard = async () => {
  const result = await api.get("/super-admin/dashboard/overview");
  return result.data.data;
};
