import type { LabOrdersApiResponse } from "../../../types/hosptial/labOrder.types";
import { api } from "../../axios.config";

export async function fetchHospitalLabOrders(params: {
  page: number;
  limit: number;
  status?: "PENDING" | "RESULT_UPLOADED";
}) {
  const res = await api.get<LabOrdersApiResponse>(
    "/hospital-admin/lab-orders",
    {
      params,
    },
  );

  return res.data;
}

export async function uploadHospitalLabResult(formData: FormData) {
  const res = await api.post("/hospital-admin/lab-orders", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}
