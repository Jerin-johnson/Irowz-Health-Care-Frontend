import DoctorLayout from "../layout/DoctorLayout";
import { AppointmentViewPage } from "../pages/doctor/appoinments/VewAppoinments";
import AppointmentsQueue from "../pages/doctor/consultation/AppointmentsQueue";
import PatientConsultationOverView from "../pages/doctor/consultation/PatientOverview";
import PatientVitals from "../pages/doctor/consultation/PatientVital.Page";
import DoctorAvailabilitySetup from "../pages/doctor/DoctorAvailability/DoctorAvailabilitySetup";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import DoctorSchedule from "../pages/doctor/DoctorSchedule/DoctorSchedule";
import DoctorProfileSettings from "../pages/doctor/Profile/DoctorProfileSettingd";
import DoctorSessionBoundary from "./DoctorRealTime";
import ForcePasswordResetGuard from "./forcePasswordReset";
import ProtectedRoute from "./protectRoutes";

// import Appointments from "../pages/doctor/Appointments";

export const doctorRoutes = {
  element: (
    <ProtectedRoute allowedRoles={["DOCTOR"]} redirectTo="/doctor/login" />
  ),
  children: [
    {
      element: <DoctorSessionBoundary />,
      children: [
        {
          path: "/doctor",
          element: <DoctorLayout />,
          children: [
            {
              path: "dashboard",
              element: (
                <ForcePasswordResetGuard>
                  <DoctorDashboard />
                </ForcePasswordResetGuard>
              ),
            },
            {
              path: "availability",
              element: (
                <ForcePasswordResetGuard>
                  <DoctorAvailabilitySetup />
                </ForcePasswordResetGuard>
              ),
            },
            { path: "settings", element: <DoctorProfileSettings /> },
            { path: "schedule", element: <DoctorSchedule /> },
            { path: "queue", element: <AppointmentsQueue /> },
            { path: "appointment/:id", element: <AppointmentViewPage /> },
            {
              path: "patient/overview/:id",
              element: <PatientConsultationOverView />,
            },
            {
              path: "consultation/vitals/add",
              element: <PatientVitals />,
            },
          ],
        },
      ],
    },
  ],
};
