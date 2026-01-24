import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  patientId: string | null;
  medicalRecordId: string | null;
  appointmentId: string | null;
} = {
  patientId: null,
  medicalRecordId: null,
  appointmentId: null,
};

const doctorConsultationSlice = createSlice({
  name: "doctorConsulationSlice",
  initialState,
  reducers: {
    reset: () => initialState,
    setPatient: (state, action) => {
      state.patientId = action.payload.patientId;
      state.medicalRecordId = action.payload.medicalRecordId;
      state.appointmentId = action.payload.appointmentId;
    },
  },
});

export const { reset, setPatient } = doctorConsultationSlice.actions;
export default doctorConsultationSlice.reducer;
