import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { UserSignupFormData } from "../../validators/userSignup.schema";
import {
  logoutApi,
  resendOtpApi,
  signupApi,
  verifyOtpApi,
} from "../../api/apiService/auth/auth.service";
import { loginUserApi } from "../../api/apiService/auth/auth.login.service";

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
    { userEmail, password }: { userEmail: string; password: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await loginUserApi(userEmail, password);
      console.log(res);

      const { userId, email, accessToken, name, role } = res;

      dispatch(
        setAuth({
          userId,
          email,
          name,
          role,
          accessToken,
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
  | "HOSPTIAL_ADMIN"
  | null;

interface AuthState {
  userId: string | null;
  role: UserRole | null;
  email?: string | null;
  isAuthenticated: boolean;
  loading?: boolean;
  error?: string | null;
  name?: string | null;
  accessToken?: string | null;
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
      }>
    ) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
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

        //  clearAuth logic INSIDE reducer
        state.userId = null;
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
