import { api } from "../../axios.config";

export const fetchPlans = async () => {
  const res = await api.get("/super-admin/subscription");
  return res.data.data;
};

export const togglePlanStatus = async (prams: {
  id: string;
  isActive: boolean;
}) => {
  const { id, isActive } = prams;
  return api.patch(`/super-admin/subscription/toggle/${id}`, { isActive });
};

export const deletePlan = async (id: string) => {
  return api.delete(`/super-admin/subscription/${id}`);
};

export const createPlan = async (data: {
  name: string;
  price: number;
  durationInDays: number;
  doctorLimit: number;
  features: string[];
  isActive: boolean;
}) => {
  const result = await api.post("/super-admin/subscription", data);
  return result.data;
};
