import { useQuery } from "@tanstack/react-query";
import type { FilterOptions } from "../../../types/patient/search.types";
import { fetchDoctors } from "../../../api/apiService/patient/doctorListing";
import { mapDoctorFromApi } from "../../../mapper/doctor.mapper";

const PAGE_LIMIT = 2;

export const useDoctors = (filters: FilterOptions, page: number) => {
  return useQuery({
    queryKey: ["doctors", filters, page],
    queryFn: async () => {
      const data = await fetchDoctors(filters, page, PAGE_LIMIT);

      return {
        doctors: data.items.map(mapDoctorFromApi),
        pagination: data.pagination,
      };
    },
    // keepPreviousData: true,
  });
};
