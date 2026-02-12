// import SuperAdminLayout from "../layout/SuperAdminLayout";
// import HospitalApprovalRequests from "../pages/superadmin/HosptialVerfication/HosptialVerficationRequest";
// import HospitalVerificationReview from "../pages/superadmin/HosptialVerfication/HosptialVerficationReview";
// import SuperAdminDashboard from "../pages/superadmin/dashborad/SuperAdminDashBoard";
// import CreatePlanPage from "../pages/superadmin/subscription/CreatePlanPage";
// import PlanListingPage from "../pages/superadmin/subscription/PlanListingPage";
// import SuperAdminUserManagement from "../pages/superadmin/userMangment/SuperAdminUserMangment";
// import VerfiedHospitalListing from "../pages/superadmin/verfiedHostial/VerfiedHospitalListing";
// import { SuperAdminWallet } from "../pages/superadmin/wallet/SuperAdminWallet";
// import ProtectedRoute from "./protectRoutes";

// export const superAdminRoutes = {
//   element: (
//     <ProtectedRoute
//       allowedRoles={["SUPER_ADMIN"]}
//       redirectTo="/superadmin/login"
//     />
//   ),
//   children: [
//     {
//       path: "/super-admin",
//       element: <SuperAdminLayout />,
//       children: [
//         { path: "dashboard", element: <SuperAdminDashboard /> },
//         { path: "verfication-request", element: <HospitalApprovalRequests /> },
//         {
//           path: "verfication-request/:id",
//           element: <HospitalVerificationReview />,
//         },
//         { path: "hospitals", element: <VerfiedHospitalListing /> },
//         { path: "plans", element: <PlanListingPage /> },
//         { path: "plan/create", element: <CreatePlanPage /> },
//         { path: "wallet", element: <SuperAdminWallet /> },
//         { path: "users", element: <SuperAdminUserManagement /> },
//       ],
//     },
//   ],
// };

import { lazy } from "react";

import SuperAdminLayout from "../layout/SuperAdminLayout";
import ProtectedRoute from "./protectRoutes";

const SuperAdminDashboard = lazy(
  () => import("../pages/superadmin/dashborad/SuperAdminDashBoard"),
);
const HospitalApprovalRequests = lazy(
  () =>
    import("../pages/superadmin/HosptialVerfication/HosptialVerficationRequest"),
);
const HospitalVerificationReview = lazy(
  () =>
    import("../pages/superadmin/HosptialVerfication/HosptialVerficationReview"),
);
const VerfiedHospitalListing = lazy(
  () => import("../pages/superadmin/verfiedHostial/VerfiedHospitalListing"),
);
const PlanListingPage = lazy(
  () => import("../pages/superadmin/subscription/PlanListingPage"),
);
const CreatePlanPage = lazy(
  () => import("../pages/superadmin/subscription/CreatePlanPage"),
);
const SuperAdminWallet = lazy(
  () => import("../pages/superadmin/wallet/SuperAdminWallet"),
);
const SuperAdminUserManagement = lazy(
  () => import("../pages/superadmin/userMangment/SuperAdminUserMangment"),
);

const superAdminRoutes = [
  {
    element: (
      <ProtectedRoute
        allowedRoles={["SUPER_ADMIN"]}
        redirectTo="/superadmin/login"
      />
    ),
    children: [
      {
        path: "/", // ← becomes /super-admin/...
        element: <SuperAdminLayout />,
        children: [
          { path: "dashboard", element: <SuperAdminDashboard /> },
          {
            path: "verfication-request",
            element: <HospitalApprovalRequests />,
          },
          {
            path: "verfication-request/:id",
            element: <HospitalVerificationReview />,
          },
          { path: "hospitals", element: <VerfiedHospitalListing /> },
          { path: "plans", element: <PlanListingPage /> },
          { path: "plan/create", element: <CreatePlanPage /> },
          { path: "wallet", element: <SuperAdminWallet /> },
          { path: "users", element: <SuperAdminUserManagement /> },
        ],
      },
    ],
  },
];

export default superAdminRoutes;
