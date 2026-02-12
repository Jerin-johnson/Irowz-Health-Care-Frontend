import { useQuery } from "@tanstack/react-query";
import { fetchConsulationPatientProfile } from "../../../api/apiService/doctor/doctor.consultation";
import type { Patient } from "../../../types/doctor/doctor.consulation.types";

export const usePatientProfile = (
  appointmentId: string | undefined,
  patientId: string | null,
) => {
  return useQuery<Patient>({
    queryKey: ["doctor:consultation:patient:overview", patientId],
    queryFn: () => fetchConsulationPatientProfile(appointmentId as string),
    enabled: !!appointmentId,
  });
};
