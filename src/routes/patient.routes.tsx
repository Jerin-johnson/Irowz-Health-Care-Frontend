import PatientLayout from "../layout/PatientLayout";
import PatientProfileLayout from "../layout/patientProfile.layout";

import PatientAppointments from "../pages/patient/apponimentBookingStatus/AppointmentListing";

import AppointmentSuccess from "../pages/patient/apponimentBookingStatus/AppointmentSuccess";
import PatientLiveQueueStatus from "../pages/patient/apponimentBookingStatus/LivePatientQueue";
import { AppointmentViewPage } from "../pages/patient/apponimentBookingStatus/PatientViewAppointment";
import DoctorBooking from "../pages/patient/DoctorBooking/DoctorBooking";
import DoctorSlots from "../pages/patient/DoctorBooking/DoctorSlot";
import DoctorListing from "../pages/patient/DoctorListing/DoctorListing";
import DoctorProfile from "../pages/patient/DoctorProfile/DoctorProfile";
import PatientProfileSettings from "../pages/patient/patientProfileSettings/PatientProfileSettings";
import PatientProfile from "../pages/patient/proflile/PatientProfile";
import { WalletPatient } from "../pages/patient/wallet/PatientWallet";
import PatientSessionBoundary from "./PatientRealTime";

import ProtectedRoute from "./protectRoutes";

export const patientRoutes = {
  path: "/patient",
  element: <PatientSessionBoundary />,
  children: [
    // ===========================
    // MAIN PATIENT LAYOUT
    // ===========================
    {
      element: <PatientLayout />,
      children: [
        {
          path: "doctors",
          element: <DoctorListing />,
        },
        {
          path: "doctor/:id",
          element: <DoctorProfile />,
        },
        {
          element: <ProtectedRoute allowedRoles={["PATIENT"]} />,
          children: [
            {
              path: "doctor/slots/:id",
              element: <DoctorSlots />,
            },
            {
              path: "doctor/booking",
              element: <DoctorBooking />,
            },
            {
              path: "booking-success/:id",
              element: <AppointmentSuccess />,
            },
          ],
        },
      ],
    },

    {
      element: <ProtectedRoute allowedRoles={["PATIENT"]} />,
      children: [
        {
          element: <PatientProfileLayout />,
          children: [
            {
              path: "profile",
              element: <PatientProfile />,
            },
            {
              path: "settings",
              element: <PatientProfileSettings />,
            },
            {
              path: "appointments",
              element: <PatientAppointments />,
            },
            {
              path: "appointments/:id",
              element: <AppointmentViewPage />,
            },
            {
              path: "appointment/queue/:id",
              element: <PatientLiveQueueStatus />,
            },
            {
              path: "wallet",
              element: <WalletPatient />,
            },
          ],
        },
      ],
    },
  ],
};
