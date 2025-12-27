import { createSlice } from "@reduxjs/toolkit";
import type { HospitalVerificationState } from "./hospitalVerification.types";
import {
  fetchHospitalVerificationStatusThunk,
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
        }
      );
  },
});

export const { resetVerificationState } = hospitalVerificationSlice.actions;
export default hospitalVerificationSlice.reducer;
