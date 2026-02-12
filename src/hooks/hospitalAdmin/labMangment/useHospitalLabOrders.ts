import { useQuery } from "@tanstack/react-query";
import type { LabOrdersApiResponse } from "../../../types/hosptial/labOrder.types";
import { fetchHospitalLabOrders } from "../../../api/apiService/hospitalAdmin/LabOrder";

export function useHospitalLabOrders(
  page: number,
  limit: number,
  status?: "PENDING" | "RESULT_UPLOADED",
) {
  return useQuery<LabOrdersApiResponse>({
    queryKey: ["hospital-lab-orders", page, limit, status],
    queryFn: () =>
      fetchHospitalLabOrders({
        page,
        limit,
        status,
      }),
  });
}
