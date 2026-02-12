import { createAsyncThunk } from "@reduxjs/toolkit";
import { resubmit } from "./hospitalVerification.slice";

export const submitHospitalVerificationThunk = createAsyncThunk<
  // Return type
  {
    verificationId: string;
    status: "PENDING";
    city: string;
    name: string;
    email: string;
    registrationNumber: string;
  },
  // Argument type
  FormData,
  // ThunkAPI config
  {
    rejectValue: {
      message: string;
      fieldErrors?: Record<string, string[]>;
    };
  }
>("hospitalVerification/submit", async (formData, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/hospital-admin/verification", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();

    console.log("Hosptial Verfication request data", data);
    console.log("Hosptial Verfication request res", res);

    if (!res.ok) {
      // backend-controlled error message
      return rejectWithValue(data);
    }

    return data.data;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(
      error?.message || "Network error. Please try again.",
    );
  }
});

interface ReSubmitHospitalVerificationArgs {
  hospitalId: string;
  formData: FormData;
}

export const reSubmitHospitalVerificationThunk = createAsyncThunk<
  any,
  ReSubmitHospitalVerificationArgs,
  {
    rejectValue: {
      message: string;
      fieldErrors?: Record<string, string[]>;
    };
  }
>(
  "hospitalVerification/reSubmit",
  async ({ hospitalId, formData }, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch(
        `/api/hospital-admin/verification/reapply/${hospitalId}`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data);
      }

      dispatch(resubmit());

      return data.data;
    } catch (error: any) {
      return rejectWithValue({
        message: error?.message || "Network error. Please try again.",
      });
    }
  },
);

export const fetchHospitalVerificationStatusThunk = createAsyncThunk<
  {
    status: "NOT_SUBMITTED" | "PENDING" | "APPROVED" | "REJECTED";
    adminRemarks?: string;
  },
  string,
  { rejectValue: string }
>("hospitalVerification/status", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/hospital-admin/verification/status/${id}`);

    const data = await res.json();

    console.log("data from fect", data);
    if (!res.ok) {
      return rejectWithValue(
        data?.message || "Failed to fetch verification status",
      );
    }

    return data;
  } catch (error) {
    return rejectWithValue(
      error?.message || "Network error. Please try again.",
    );
  }
});
