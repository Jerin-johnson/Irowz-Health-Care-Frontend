import { api } from "../../axios.config";

export const fetchPatientMedicalRecordAPi = async (
  diagnosis: string,
  page: number,
  limit: number,
) => {
  const result = await api.get(`/patient/medical-records`, {
    params: { diagnosis, page, limit },
  });
  return result.data.data;
};

export const fetchPrescriptionPatientApi = async (id: string) => {
  const result = await api.get(`/patient/medical-record/prescription/${id}`);
  return result.data.data;
};

export const fetchLabTestOfMedicalRecordPatientApi = async (id: string) => {
  const result = await api.get(`/patient/medical-record/lab/${id}`);
  return result.data.data;
};
