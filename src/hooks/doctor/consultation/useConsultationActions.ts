import { useMutation } from "@tanstack/react-query";
import {
  compelteConsulationAPi,
  createLabOrder,
  saveDoctorQuickObservation,
  savePrescriptionFormValuesApi,
} from "../../../api/apiService/doctor/doctor.consultation";
import { notify } from "../../../shared/notification/toast";
import { useNavigate } from "react-router-dom";
import type { PrescriptionFormValues } from "../../../validators/doctor/consultation/Percription";
import type { ApiError } from "../../../types/api/Api.error";

export const useConsultationMutations = () => {
  const navigate = useNavigate();

  const compelteConsulationMutate = useMutation({
    mutationFn: (id: string) => compelteConsulationAPi(id),

    onSuccess: () => {
      notify.success("The patient consultation has completed successfully");
      navigate("/doctor/queue");
    },

    onError: (error: ApiError) => {
      notify.error(error?.response?.data?.message);
    },
  });

  const saveNoteMutateFn = useMutation({
    mutationFn: ({
      id,
      observationNote,
    }: {
      id: string;
      observationNote: string;
    }) => saveDoctorQuickObservation(id, observationNote),

    onSuccess: () => {
      notify.success("observation note saved successfully");
    },

    onError: (error: ApiError) => {
      notify.error(error?.response?.data?.message);
    },
  });

  const PrescriptionMutate = useMutation<
    void,
    ApiError,
    { id: string; data: PrescriptionFormValues }
  >({
    mutationFn: ({ id, data }) => savePrescriptionFormValuesApi(id, data),

    onSuccess: () => {
      notify.success("precritption saved successfully");
    },

    onError: (error) => {
      notify.error(error?.response?.data?.message);
    },
  });

  const createLabOrderMutation = useMutation({
    mutationFn: createLabOrder,

    onSuccess: () => {
      notify.success("Lab order created successfully");
    },

    onError: (error: ApiError) => {
      notify.error(error?.response?.data?.message || "failed to create order");
    },
  });

  return {
    compelteConsulationMutate,
    saveNoteMutateFn,
    PrescriptionMutate,
    createLabOrderMutation,
  };
};
