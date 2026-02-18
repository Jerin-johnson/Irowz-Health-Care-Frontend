import { lazy } from "react";
import AuthLayout from "../layout/AuthLayout";
import PublicRoute from "./PublicRoute";
import { ROUTES } from "./constants/route.constants";

const DoctorLoginPage = lazy(() => import("../pages/auth/doctor/Login"));
const HospitalVerificationPage = lazy(
  () => import("../pages/auth/hosptial_admin/HosptialVerfication"),
);
const HospitalAdminLoginPage = lazy(
  () => import("../pages/auth/hosptial_admin/Login"),
);
const VerificationStatus = lazy(
  () => import("../pages/auth/hosptial_admin/VerficationPendingPage"),
);
const SuperAdminLoginPage = lazy(
  () => import("../pages/auth/superAdmin/Login"),
);
const LoginPageUser = lazy(() => import("../pages/auth/user/Login"));
const UserSignupPage = lazy(() => import("../pages/auth/user/Register"));
const OTPVerification = lazy(() => import("../pages/auth/user/Otp"));
const ReApplyHosptialVerficationRequest = lazy(
  () =>
    import("../pages/auth/hosptial_admin/ReApplyHospitalVerficationRequest"),
);
const ForgotPassword = lazy(
  () => import("../pages/auth/forgotPassword/ForgotPassword"),
);
const ResetPassword = lazy(
  () => import("../pages/auth/forgotPassword/ResetPassword"),
);

const authRoutes = [
  {
    element: <PublicRoute />,
    children: [
      {
        path: ROUTES.AUTH.ROOT,
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
            path: "hospital/verification/reapply",
            element: <ReApplyHosptialVerficationRequest />,
          },
          {
            path: "hospital/verification/pending",
            element: <VerificationStatus />,
          },
          { path: "hospital/login", element: <HospitalAdminLoginPage /> },
          { path: "superadmin/login", element: <SuperAdminLoginPage /> },
          { path: "forgot-password", element: <ForgotPassword /> },
          { path: "reset-password", element: <ResetPassword /> },
        ],
      },
    ],
  },
];

export default authRoutes;

// import AuthLayout from "../layout/AuthLayout";
// import DoctorLoginPage from "../pages/auth/doctor/Login";
// import HospitalVerificationPage from "../pages/auth/hosptial_admin/HosptialVerfication";
// import HospitalAdminLoginPage from "../pages/auth/hosptial_admin/Login";
// import VerificationStatus from "../pages/auth/hosptial_admin/VerficationPendingPage";
// import SuperAdminLoginPage from "../pages/auth/superAdmin/Login";
// import LoginPageUser from "../pages/auth/user/Login";
// import UserSignupPage from "../pages/auth/user/Register";
// import OTPVerification from "../pages/auth/user/Otp";
// import PublicRoute from "./PublicRoute";
// import ReApplyHosptialVerficationRequest from "../pages/auth/hosptial_admin/ReApplyHospitalVerficationRequest";
// import ForgotPassword from "../pages/auth/forgotPassword/ForgotPassword";
// import ResetPassword from "../pages/auth/forgotPassword/ResetPassword";

// export const authRoutes = {
//   element: <PublicRoute />,
//   children: [
//     {
//       path: "/",
//       element: <AuthLayout />,

//       children: [
//         { path: "user/login", element: <LoginPageUser /> },
//         { path: "user/register", element: <UserSignupPage /> },
//         { path: "verify-otp", element: <OTPVerification /> },
//         { path: "doctor/login", element: <DoctorLoginPage /> },
//         {
//           path: "hospital/verification",
//           element: <HospitalVerificationPage />,
//         },
//         {
//           path: "hospital/verification/reapply",
//           element: <ReApplyHosptialVerficationRequest />,
//         },
//         {
//           path: "hospital/verification/pending",
//           element: <VerificationStatus />,
//         },
//         { path: "hospital/login", element: <HospitalAdminLoginPage /> },
//         { path: "superadmin/login", element: <SuperAdminLoginPage /> },
//         { path: "forgot-password", element: <ForgotPassword /> },
//         { path: "reset-password", element: <ResetPassword /> },
//       ],
//     },
//   ],
// };
