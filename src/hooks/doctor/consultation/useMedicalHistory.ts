import { useQuery } from "@tanstack/react-query";
import { fetchPatientMedicalRecordForConsultationAPi } from "../../../api/apiService/doctor/doctor.consultation";
import type { MedicalRecord } from "../../../types/doctor/doctor.consulation.types";

interface Pagination {
  total: number;
  page: number;
  limit: number;
}

interface MedicalHistoryResponse {
  data: MedicalRecord[];
  pagination: Pagination;
}

export const useMedicalHistory = (
  appointmentId: string | undefined,
  patientId: string | null,
  debouncedDiagnosisKeyword: string,
  pageMedical: number,
  limit: number,
) => {
  return useQuery<MedicalHistoryResponse>({
    queryKey: [
      "doctor:consultation:patient:medical-history",
      patientId,
      debouncedDiagnosisKeyword,
      pageMedical,
    ],
    queryFn: () =>
      fetchPatientMedicalRecordForConsultationAPi(
        appointmentId as string,
        debouncedDiagnosisKeyword,
        pageMedical,
        limit,
      ),
    enabled: !!appointmentId,
  });
};
