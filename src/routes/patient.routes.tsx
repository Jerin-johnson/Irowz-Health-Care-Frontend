import PatientLayout from "../layout/PatientLayout";
import DoctorBooking from "../pages/patient/DoctorBooking/DoctorBooking";
import DoctorSlots from "../pages/patient/DoctorBooking/DoctorSlot";
import DoctorListing from "../pages/patient/DoctorListing/DoctorListing";
import DoctorProfile from "../pages/patient/DoctorProfile/DoctorProfile";

export const patientRoutes = {
  path: "/patient",
  element: <PatientLayout />,
  children: [
    {
      path: "doctors",
      element: <DoctorListing />,
    },
    {
      path: "doctor/profile",
      element: <DoctorProfile />,
    },
    {
      path: "doctor/slots",
      element: <DoctorSlots />,
    },
    {
      path: "doctor/booking",
      element: <DoctorBooking />,
    },
  ],
};
