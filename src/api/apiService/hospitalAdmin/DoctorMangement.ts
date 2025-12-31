import type { CreateDoctorDTO } from "../../../apiContracts/Hosptial_admin/Doctor/CreateDoctor";
import type { UpdateDoctorDTO } from "../../../apiContracts/Hosptial_admin/Doctor/UpdateDoctor";
import { api } from "../../axios.config";

export const createDoctorAdminApi = async (data: CreateDoctorDTO) => {
  const res = await api.post("/hospital-admin/doctor", data);
  return res.data;
};

export const getHospitalDoctorPaginatedApi = async (params: {
  page: number;
  limit: number;
  search?: string;
  isActive?: boolean;
  specialtyId?: string;
}) => {
  const res = await api.get("/hospital-admin/doctor", { params });
  return res.data;
};

export const getAllSpecialtNameApi = async () => {
  const result = await api.get("/hospital-admin/speciality/names");
  return result.data;
};

export const toggleDoctorStatusApi = async (params: {
  doctorId: string;
  isActive: boolean;
}) => {
  const res = await api.patch(`/hospital-admin/doctor/toggle/status`, {
    isActive: params.isActive,
    doctorId: params.doctorId,
  });
  return res.data;
};

export const editDoctorAdminApi = async (
  doctorId: string,
  data: UpdateDoctorDTO
) => {
  const res = await api.patch(`/hospital-admin/doctor/${doctorId}`, data);
  return res.data;
};
