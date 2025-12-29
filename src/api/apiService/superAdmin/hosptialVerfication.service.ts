import { api } from "../../axios.config";

export const getHospitalStats = async () => {
  const res = await api.get("/super-admin/hospital-verifications/stats");
  return res.data;
};

export const getHospitalRequests = async (params: {
  page: number;
  limit: number;
  search?: string;
  city?: string;
  status?: string;
}) => {
  const res = await api.get("/super-admin/hospital-verifications", { params });
  return res.data;
};

export const getHospitalRequestByID = async (id: string) => {
  const res = await api.get(`/super-admin/hospital-verifications/${id}`);
  console.log("service side", res);
  return res.data;
};

export const approveHospitalVerficationRequest = async (
  id: string,
  adminRemarks: string
) => {
  const res = await api.patch(
    `/super-admin/hospital-verifications/${id}/approve`,
    { adminRemarks }
  );
  console.log("service side", res);
  return res.data;
};

export const rejectHospitalVerficationRequest = async (
  id: string,
  adminRemarks: string
) => {
  const res = await api.patch(
    `/super-admin/hospital-verifications/${id}/reject`,
    { adminRemarks }
  );
  console.log("service side", res);
  return res.data;
};
