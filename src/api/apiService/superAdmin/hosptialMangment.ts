import { api } from "../../axios.config";

export const getHospitalRequestsActual = async (params: {
  page: number;
  limit: number;
  search?: string;
  city?: string;
  isActive?: boolean;
}) => {
  try {
    const res = await api.get("/super-admin/hospital", { params });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const blockOrUnBlockHospital = async (params: {
  userId: string;
  status: string | boolean;
}) => {
  const res = await api.patch("/super-admin/hospital/toggle/status", {
    userId: params.userId,
    status: params.status,
  });
  return res.data;
};
