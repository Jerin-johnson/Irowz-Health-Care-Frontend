import DoctorLayout from "../layout/DoctorLayout";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
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
        { path: "settings", element: <DoctorProfileSettings /> },
      ],
    },
  ],
};
