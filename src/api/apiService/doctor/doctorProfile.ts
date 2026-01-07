import { api } from "../../axios.config";

export const getDoctorProfile = async () => {
  const res = await api.get("/doctor/profile");
  console.log("The doctor profile api", res);
  if (res.data.success) {
    return res.data;
  }

  throw new Error("doctor fech api error");
};

export const resetDoctorPasswordApi = async (
  currentPassword: string,
  newPassword: string
) => {
  const res = await api.patch("/doctor/password", {
    currentPassword,
    newPassword,
  });
  console.log("The doctor profile api", res);
  if (res.data.success) {
    return res.data;
  }

  throw new Error(res?.data?.data?.message || "Reset password Request Failed");
};

export const editDoctorProfileApi = async (formData: FormData) => {
  const res = await api.patch("/doctor/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (res.data.success) {
    return res.data;
  }

  throw new Error(res?.data?.data?.message || "Edit doctor profile failed");
};
