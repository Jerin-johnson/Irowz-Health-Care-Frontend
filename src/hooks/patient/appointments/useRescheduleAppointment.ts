import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  checkRescheduleEligibility,
  rescheduleAppointment,
} from "../../../api/apiService/patient/appointment";
import { notify } from "../../../shared/notification/toast";
import type { ApiError } from "../../../types/api/Api.error";

export const useRescheduleAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rescheduleAppointment,

    onSuccess: () => {
      notify.success("Appointment rescheduled successfully");

      queryClient.invalidateQueries({
        queryKey: ["patient:appointments"],
      });
    },

    onError: (error: ApiError) => {
      notify.error(error?.response?.data?.message || "Reschedule failed");
    },
  });
};

export const useRescheduleEligibility = () =>
  useMutation({
    mutationFn: checkRescheduleEligibility,
  });
