import AuthLayout from "../layout/AuthLayout";
import DoctorLoginPage from "../pages/auth/doctor/Login";
import HospitalVerificationPage from "../pages/auth/hosptial_admin/HosptialVerfication";
import HospitalAdminLoginPage from "../pages/auth/hosptial_admin/Login";
import VerificationStatus from "../pages/auth/hosptial_admin/VerficationPendingPage";
import SuperAdminLoginPage from "../pages/auth/superAdmin/Login";
import LoginPageUser from "../pages/auth/user/Login";
import UserSignupPage from "../pages/auth/user/Register";
import OTPVerification from "../pages/auth/user/Otp";

export const authRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    { path: "user/login", element: <LoginPageUser /> },
    { path: "user/register", element: <UserSignupPage /> },
    { path: "verify-otp", element: <OTPVerification /> },
    { path: "doctor/login", element: <DoctorLoginPage /> },
    {
      path: "hospital/verification",
      element: <HospitalVerificationPage />,
    },
    {
      path: "hospital/verification/pending",
      element: <VerificationStatus />,
    },
    { path: "hospital/login", element: <HospitalAdminLoginPage /> },
    { path: "superadmin/login", element: <SuperAdminLoginPage /> },
  ],
};
