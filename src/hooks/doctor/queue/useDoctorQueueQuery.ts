import { useQuery } from "@tanstack/react-query";
import type { DoctorLiveQueueResponse } from "../../../types/doctor/doctor.live.queue.types";
import { fetchDoctorLiveQueueApi } from "../../../api/apiService/doctor/doctor.consultation";

export function useDoctorQueueQuery(doctorId: string | null, date: string) {
  return useQuery<DoctorLiveQueueResponse>({
    queryKey: ["doctor:queue", doctorId, date],
    queryFn: fetchDoctorLiveQueueApi,
    enabled: !!doctorId,
    staleTime: 0,
  });
}
