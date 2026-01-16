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
