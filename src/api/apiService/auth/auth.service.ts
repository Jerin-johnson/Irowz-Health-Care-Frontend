import type { UserSignupFormData } from "../../../validators/userSignup.schema";
import { api } from "../../axios.config";

export const signupApi = async (data: UserSignupFormData) => {
  console.log("This is form signUp api", data);
  const payload = {
    name: data.fullName,
    email: data.email,
    phone: data.mobile,
    password: data.password,
    role: "PATIENT",
  };
  const response = await api.post("/auth/register", payload);

  return response.data;
};

export const logoutApi = async () => {
  const response = await api.get("/auth/logout");
  return response;
};

export const verifyOtpApi = (payload: {
  email: string;
  otp: string;
  userId: string;
}) => {
  return api.post("/auth/verify-otp", payload);
};

export const resendOtpApi = (email: string) => {
  return api.post("/auth/resend-otp", { email });
};
