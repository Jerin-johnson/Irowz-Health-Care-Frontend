import type { LabTest } from "../../../types/doctor/doctor.consulation.types";
import type { PrescriptionFormValues } from "../../../validators/doctor/consultation/Percription";
import { api } from "../../axios.config";

export const fetchAppointment = async (id: string) => {
  const result = await api.get(`/doctor/appointment/${id}`);
  return result.data.data;
};

export const fetchDoctorLiveQueueApi = async () => {
  const result = await api.get("/doctor/queue");

  console.log("The response is", result);
  return result.data;
};

export const startConsulationAPi = async (id: string) => {
  const result = await api.post(`/doctor/consultation/start/${id}`);
  return result.data.data;
};

export const markAsNoShowApi = async (id: string) => {
  const result = await api.post(`/doctor/consultation/no-show/${id}`);
  return result.data.data;
};

export const compelteConsulationAPi = async (id: string) => {
  const result = await api.post(`/doctor/consultation/complete/${id}`);
  return result.data.data;
};

export const fetchConsulationPatientProfile = async (id: string) => {
  const result = await api.get(
    `/doctor/consultation/start/patient/overview/${id}`,
  );
  return result.data.data;
};

export const fetchPatientMedicalRecordForConsultationAPi = async (
  id: string,
  diagnosis: string,
  page: number,
  limit: number,
) => {
  const result = await api.get(
    `/doctor/consultation/start/patient/medical-history/${id}`,
    {
      params: { diagnosis, page, limit },
    },
  );
  return result.data.data;
};

export const saveDoctorQuickObservation = async (
  id: string,
  observationNote: string,
) => {
  const result = await api.post(
    `/doctor/consultation/start/patient/quicknote/${id}`,
    {
      observationNote,
    },
  );
  return result.data;
};

export const savePrescriptionFormValuesApi = async (
  id: string,
  data: PrescriptionFormValues,
) => {
  const result = await api.post(
    `/doctor/consultation/start/patient/prescription/${id}`,
    {
      ...data,
    },
  );
  return result.data;
};

export const fetchPrescriptionDoctorApi = async (id: string) => {
  const result = await api.get(
    `/doctor/consultation/medical-record/precription/${id}`,
  );
  return result.data.data;
};

export const fetchLabTestOfMedicalRecordApi = async (id: string) => {
  const result = await api.get(`/doctor/consultation/medical-record/lab/${id}`);
  return result.data.data;
};

interface CreateLabOrderPayload {
  appointmentId: string;
  tests: LabTest[];
  action: "Hospital" | "Outside";
  clinicalReason: string;
}

export async function createLabOrder(payload: CreateLabOrderPayload) {
  const res = await api.post(
    "/doctor/consultation/lab/create-lab-order",
    payload,
  );
  return res.data.data;
}
