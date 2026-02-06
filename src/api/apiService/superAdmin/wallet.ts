import { api } from "../../axios.config";

export const GetSuperAdminWalletApi = async () => {
  const result = await api.get(`/super-admin/wallet`);
  return result.data.data;
};
