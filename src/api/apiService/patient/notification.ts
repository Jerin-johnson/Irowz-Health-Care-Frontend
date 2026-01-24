import { api } from "../../axios.config";

export const fetchNotificationsPatientApi = async () => {
  const result = await api.get("/patient/notification");
  return result.data.data;
};
