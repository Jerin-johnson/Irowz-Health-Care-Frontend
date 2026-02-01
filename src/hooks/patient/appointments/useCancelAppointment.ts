import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  cancelAppointmentPatients,
  checkCancelEligibility,
} from "../../../api/apiService/patient/appointment";
import { notify } from "../../../shared/notification/toast";

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
    onError: (err) => {
      notify.error(err.response?.data?.message || "Cancel failed");
    },
  });
};
