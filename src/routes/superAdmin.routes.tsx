import SuperAdminLayout from "../layout/SuperAdminLayout";
import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashBoard";
import ProtectedRoute from "./protectRoutes";

export const superAdminRoutes = {
  element: (
    <ProtectedRoute
      allowedRoles={["SUPER_ADMIN"]}
      redirectTo="/superadmin/login"
    />
  ),
  children: [
    {
      path: "/super-admin",
      element: <SuperAdminLayout />,
      children: [{ path: "dashboard", element: <SuperAdminDashboard /> }],
    },
  ],
};
