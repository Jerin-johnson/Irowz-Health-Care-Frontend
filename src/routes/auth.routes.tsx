import AuthLayout from "../layout/AuthLayout";
import DoctorLoginPage from "../pages/auth/doctor/Login";
import HospitalAdminLoginPage from "../pages/auth/hosptial_admin/Login";
import SuperAdminLoginPage from "../pages/auth/superAdmin/Login";
import LoginPageUser from "../pages/auth/user/Login";
import UserSignupPage from "../pages/auth/user/Register";

export const authRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    { path: "user/login", element: <LoginPageUser /> },
    { path: "user/register", element: <UserSignupPage /> },
    { path: "doctor/login", element: <DoctorLoginPage /> },
    { path: "hospital/login", element: <HospitalAdminLoginPage /> },
    { path: "superadmin/login", element: <SuperAdminLoginPage /> },
  ],
};
