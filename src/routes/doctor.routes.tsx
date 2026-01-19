import DoctorLayout from "../layout/DoctorLayout";
import DoctorAvailabilitySetup from "../pages/doctor/DoctorAvailability/DoctorAvailabilitySetup";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import DoctorSchedule from "../pages/doctor/DoctorSchedule/DoctorSchedule";
import DoctorProfileSettings from "../pages/doctor/Profile/DoctorProfileSettingd";
import ForcePasswordResetGuard from "./forcePasswordReset";
import ProtectedRoute from "./protectRoutes";

// import Appointments from "../pages/doctor/Appointments";

export const doctorRoutes = {
  element: (
    <ProtectedRoute allowedRoles={["DOCTOR"]} redirectTo="/doctor/login" />
  ),
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
      ],
    },
  ],
};
