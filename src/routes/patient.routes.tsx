import PatientLayout from "../layout/PatientLayout";
import AppointmentSuccess from "../pages/patient/apponimentBookingStatus/AppointmentSuccess";
import DoctorBooking from "../pages/patient/DoctorBooking/DoctorBooking";
import DoctorSlots from "../pages/patient/DoctorBooking/DoctorSlot";
import DoctorListing from "../pages/patient/DoctorListing/DoctorListing";
import DoctorProfile from "../pages/patient/DoctorProfile/DoctorProfile";
import ProtectedRoute from "./protectRoutes";

export const patientRoutes = {
  path: "/patient",
  element: <PatientLayout />,
  children: [
    // PUBLIC ROUTE
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
};
