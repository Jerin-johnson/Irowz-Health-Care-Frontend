import PatientLayout from "../layout/PatientLayout";
import PatientProfileLayout from "../layout/patientProfile.layout";

import AppointmentSuccess from "../pages/patient/apponimentBookingStatus/AppointmentSuccess";
import DoctorBooking from "../pages/patient/DoctorBooking/DoctorBooking";
import DoctorSlots from "../pages/patient/DoctorBooking/DoctorSlot";
import DoctorListing from "../pages/patient/DoctorListing/DoctorListing";
import DoctorProfile from "../pages/patient/DoctorProfile/DoctorProfile";
import PatientProfileSettings from "../pages/patient/patientProfileSettings/PatientProfileSettings";
import PatientProfile from "../pages/patient/proflile/PatientProfile";

import ProtectedRoute from "./protectRoutes";

export const patientRoutes = {
  path: "/patient",
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
          ],
        },
      ],
    },
  ],
};
