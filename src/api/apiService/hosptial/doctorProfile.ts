import { api } from "../../axios.config";

export const getDoctorProfile = async () => {
  const res = await api.get("/doctor/profile");
  console.log("The doctor profile api", res);
  if (res.data.success) {
    return res.data;
  }

  throw new Error("doctor fech api error");
};
