import type { UserRole } from "../../../store/slice/Auth/auth.slice";
import { api } from "../../axios.config";
import { LOGIN_ENDPOINT_BY_ROLE } from "./auth.endpoints";

export const loginUserApi = async (
  email: string,
  password: string,
  role: Exclude<UserRole, null>
) => {
  const endpoint = LOGIN_ENDPOINT_BY_ROLE[role];
  const response = await api.post(endpoint, {
    email,
    password,
  });

  return response.data;
};

// export const loginSuperAdminApi = async (email: string, password: string) => {
//   const response = await api.post("/auth/super-admin/login", {
//     email,
//     password,
//   });

//   return response.data;
// };
