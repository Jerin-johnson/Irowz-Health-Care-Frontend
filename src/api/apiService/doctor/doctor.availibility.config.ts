import { api } from "../../axios.config";

export const getDoctorAvailbilityConfigApi = async () => {
  try {
    const result = await api.get("/doctor/availability");
    console.log("the result is ", result);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const postDoctorAvailbilityConfigApi = async (payload: any) => {
  try {
    const result = await api.post("/doctor/availability", payload);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const checkEditDoctorAvailbilityConfigApi = async (payload: any) => {
  try {
    const result = await api.post("/doctor/availability/check", payload);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const confirmEditDoctorAvailbilityConfigApi = async (payload: any) => {
  try {
    const result = await api.patch("/doctor/availability/confirm", payload);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};
