import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadHospitalLabResult } from "../../../api/apiService/hospitalAdmin/LabOrder";
import type { ApiError } from "../../../types/api/Api.error";
import { notify } from "../../../shared/notification/toast";

export function useUploadHospitalLabResult() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadHospitalLabResult,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["hospital-lab-orders"],
      });
    },
    onError: (error: ApiError) => {
      notify.error(error.response.data.message || "upload failded");
    },
  });
}
