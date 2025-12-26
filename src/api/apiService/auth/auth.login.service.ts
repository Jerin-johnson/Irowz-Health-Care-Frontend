import { api } from "../../axios.config";

export const loginUserApi = async (email: string, password: string) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};
