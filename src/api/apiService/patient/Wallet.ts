import { api } from "../../axios.config";

export const GetWalletApi = async () => {
  const result = await api.get("/patient/wallet");
  return result.data.data;
};
