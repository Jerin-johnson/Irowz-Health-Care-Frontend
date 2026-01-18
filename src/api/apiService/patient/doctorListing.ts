import type { FilterOptions } from "../../../types/patient/search.types";
import { api } from "../../axios.config";

export const fetchDoctors = async (
  filters: FilterOptions,
  page: number,
  limit: number,
) => {
  const res = await api.get("/patient/doctors", {
    params: {
      location: filters.location,
      specialtyId: filters.specialtyId,
      search: filters.search,
      lat: filters.latitude,
      lng: filters.longitude,
      radiusKm: filters.radiusKm,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      page,
      limit,
    },
  });

  return res.data.data;
};

export const fetchDoctorProfile = async (doctorId: string) => {
  const res = await api.get(`/patient/doctor/${doctorId}`);

  return res.data.data;
};

export const fetchSpecailtyApi = async () => {
  const res = await api.get("/patient/doctor/speciality");
  return res.data.data;
};
