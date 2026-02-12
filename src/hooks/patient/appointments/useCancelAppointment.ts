import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  cancelAppointmentPatients,
  checkCancelEligibility,
} from "../../../api/apiService/patient/appointment";
import { notify } from "../../../shared/notification/toast";
import type { ApiError } from "../../../types/api/Api.error";

export const useCancelEligibility = () =>
  useMutation({
    mutationFn: (appointmentId: string) =>
      checkCancelEligibility(appointmentId),
  });

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelAppointmentPatients,
    onSuccess: () => {
      notify.success("Appointment cancelled successfully");
      queryClient.invalidateQueries({ queryKey: ["patient:appointments"] });
    },
    onError: (err: ApiError) => {
      notify.error(err.response?.data?.message || "Cancel failed");
    },
  });
};
