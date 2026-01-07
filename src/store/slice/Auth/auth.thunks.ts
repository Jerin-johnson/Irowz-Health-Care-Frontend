import {
  logoutApi,
  resendOtpApi,
  signupApi,
  verifyOtpApi,
} from "../../../api/apiService/auth/auth.service";
import { loginUserApi } from "../../../api/apiService/auth/auth.login.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserSignupFormData } from "../../../validators/userSignup.schema";
import { setAuth } from "./auth.slice";

export const signupUserThunk = createAsyncThunk(
  "auth/signup",
  async (data: UserSignupFormData, { rejectWithValue }) => {
    try {
      const res = await signupApi(data);
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    {
      userEmail,
      password,
      UserRole,
    }: { userEmail: string; password: string; UserRole: UserRoleExluce },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await loginUserApi(userEmail, password, UserRole);
      console.log(res);

      const {
        userId,
        email,
        accessToken,
        name,
        role,
        profileImage,
        doctorId,
        hospitalId,
        patientId,
        forcePasswordReset,
      } = res;

      dispatch(
        setAuth({
          userId,
          email,
          name,
          role,
          accessToken,
          doctorId: doctorId || null,
          hospitalId: hospitalId || null,
          patientId: patientId || null,
          forcePasswordReset: forcePasswordReset ? true : false,
          profileImage,
        })
      );

      return true;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const verifyOtpThunk = createAsyncThunk(
  "auth/verifyOtp",
  async (
    { email, otp, userId }: { email: string; otp: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await verifyOtpApi({ email, otp, userId });
      console.log("verify otp async thunk", res);
      return res.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || "Invalid OTP");
    }
  }
);

export const resendOtpThunk = createAsyncThunk(
  "auth/resendOtp",
  async (email: string, { rejectWithValue }) => {
    try {
      await resendOtpApi(email);
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to resend OTP"
      );
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export type UserRole =
  | "PATIENT"
  | "DOCTOR"
  | "SUPER_ADMIN"
  | "HOSPITAL_ADMIN"
  | null;

export type UserRoleExluce = Exclude<UserRole, null>;
