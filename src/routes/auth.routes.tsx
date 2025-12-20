import AuthLayout from "../layout/AuthLayout";
import LoginPageUser from "../pages/auth/user/Login";

// import UserLogin from "../pages/auth/user/UserLoginPage";
// import DoctorLogin from "../pages/auth/doctor/DoctorLoginPage";
// import AdminLogin from "../pages/auth/admin/AdminLoginPage";
// import SuperAdminLogin from "../pages/auth/superadmin/SuperAdminLoginPage";

export const authRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    { path: "user/login", element: <LoginPageUser /> },
    // { path: "doctor/login", element: <DoctorLogin /> },
    // { path: "admin/login", element: <AdminLogin /> },
    // { path: "superadmin/login", element: <SuperAdminLogin /> },
  ],
};
