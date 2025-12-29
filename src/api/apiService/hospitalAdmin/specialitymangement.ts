import { api } from "../../axios.config";

export const createSpecialityApi = async (
  name: string,
  description: string
) => {
  try {
    const res = await api.post(`/hospital-admin/speciality`, {
      name,
      description,
    });
    console.log("service side", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getHospitalSpeicalityApi = async (params: {
  page: number;
  limit: number;
  search?: string;
  isActive?: boolean | null;
}) => {
  try {
    const res = await api.get("/hospital-admin/speciality", { params });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const blockOrUnBlockSpecialty = async (params: {
  specailtyId: string;
  status: string | boolean;
}) => {
  const res = await api.patch("/hospital-admin/speciality/toggle/status", {
    specailtyId: params.specailtyId,
    isActive: params.status,
  });
  return res.data;
};

export const editSpecialityApi = async (
  id: string,
  name: string,
  description: string
) => {
  try {
    const res = await api.patch(`/hospital-admin/speciality/${id}`, {
      name,
      description,
    });
    console.log("service side", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
