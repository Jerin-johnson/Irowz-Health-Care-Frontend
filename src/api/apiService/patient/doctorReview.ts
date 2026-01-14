import { api } from "../../axios.config";

export const postDoctorReviewAPi = async (payload: {
  rating: number;
  doctorId: string;
  comment: string;
}) => {
  const res = await api.post("/patient/doctor/review", payload);
  return res.data;
};

export const getDoctorReviewAPi = async (doctorId: string) => {
  const res = await api.get(`/patient/doctor/review/${doctorId}`);
  return res.data.data;
};
