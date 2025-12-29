import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  resendOtpThunk,
  signupUserThunk,
  verifyOtpThunk,
  type UserRole,
} from "./auth.thunks";
import { stat } from "fs";

interface AuthState {
  userId: string | null;
  role: UserRole | null;
  email?: string | null;
  isAuthenticated: boolean;
  loading?: boolean;
  error?: string | null;
  name?: string | null;
  accessToken?: string | null;
  hospitalId?: string | null;
  doctorId?: string | null;
  patientId?: string | null;
}

const initialState: AuthState = {
  userId: null,
  role: null,
  email: "email@gmail.com",
  isAuthenticated: false,
  loading: false,
  error: "",
  name: "",
  accessToken: null,
  hospitalId: null,
  patientId: null,
  doctorId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        userId: string;
        role: UserRole;
        email: string;
        name: string;
        accessToken: string;
        doctorId: string;
        patientId: string;
        hospitalId: string;
      }>
    ) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
      state.hospitalId = action.payload.hospitalId;
      state.doctorId = action.payload.doctorId;
      state.patientId = action.payload.patientId;
      state.isAuthenticated = true;
    },
    setError: (state, action) => {
      state.error = action.payload.error;
    },
    clearAuth: (state) => {
      state.userId = null;
      state.role = null;
      state.email = null;
      state.isAuthenticated = false;
      state.name = null;
      state.accessToken = null;
      state.doctorId = null;
      state.patientId = null;
      state.hospitalId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUserThunk.fulfilled, (state, action) => {
        state.loading = false;

        // user is NOT authenticated yet
        state.userId = action.payload.userId;
        state.role = action.payload.role;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.doctorId = action.payload.doctorId || null;
        state.patientId = action.payload.patientId || null;
        state.hospitalId = action.payload.hospitalId || null;
        state.isAuthenticated = false;
      })
      .addCase(signupUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //verify-otp
      .addCase(verifyOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // RESEND OTP
      .addCase(resendOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtpThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //logout

      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;

        state.userId = null;
        state.hospitalId = null;
        state.doctorId = null;
        state.patientId = null;
        state.role = null;
        state.email = null;
        state.name = null;
        state.accessToken = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //login api

      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setAuth, clearAuth, setError } = authSlice.actions;
export default authSlice.reducer;
