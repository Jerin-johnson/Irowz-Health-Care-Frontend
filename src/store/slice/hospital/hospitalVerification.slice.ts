import { createSlice } from "@reduxjs/toolkit";
import type { HospitalVerificationState } from "./hospitalVerification.types";
import {
  fetchHospitalVerificationStatusThunk,
  reSubmitHospitalVerificationThunk,
  submitHospitalVerificationThunk,
} from "./hospitalVerification.thunks";

const initialState: HospitalVerificationState = {
  verificationId: null,
  status: "NOT_SUBMITTED",
  adminRemarks: null,
  loading: false,
  error: null,
};

const hospitalVerificationSlice = createSlice({
  name: "hospitalVerification",
  initialState,
  reducers: {
    resetVerificationState: () => initialState,
    approveRequest: (state) => {
      state.status = "APPROVED";
    },
    rejectRequest: (state) => {
      state.status = "REJECTED";
    },
    clearError: (state) => {
      state.error = null;
    },
    resubmit: (state) => {
      state.status = "PENDING";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitHospitalVerificationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitHospitalVerificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "PENDING";
        state.verificationId = action.payload.verificationId;
        state.city = action.payload.city;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.register_no = action.payload.registrationNumber;
      })
      .addCase(submitHospitalVerificationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      .addCase(
        fetchHospitalVerificationStatusThunk.fulfilled,
        (state, action) => {
          state.status = action.payload.status;
          state.adminRemarks = action.payload.adminRemarks ?? null;
        },
      )
      .addCase(reSubmitHospitalVerificationThunk.fulfilled, (state, action) => {
        console.log("does this run correctly", state, action);
        state.status = "PENDING";
        state.city = action.payload.city ? action.payload.city : state.city;
      });
  },
});

export const {
  resetVerificationState,
  approveRequest,
  rejectRequest,
  clearError,
  resubmit,
} = hospitalVerificationSlice.actions;
export default hospitalVerificationSlice.reducer;
