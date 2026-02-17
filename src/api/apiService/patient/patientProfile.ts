import { api } from "../../axios.config";

export const getPatientProfileAPi = async () => {
  const res = await api.get(`/patient/profile`);

  console.log("The response is ", res.data.data);
  return res.data.data;
};

export const editPatientProfileApi = async (data: FormData) => {
  const res = await api.patch("/patient/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("THe response object is ", res);
  return res.data;
};

export const resetPatientPasswordApi = async (
  currentPassword: string,
  newPassword: string,
) => {
  const res = await api.patch("/patient/password", {
    currentPassword,
    newPassword,
  });
  console.log("The doctor profile api", res);
  if (res.data.success) {
    return res.data;
  }

  throw new Error(res?.data?.data?.message || "Reset password Request Failed");
};
