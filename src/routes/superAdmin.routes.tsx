import SuperAdminLayout from "../layout/SuperAdminLayout";
import HospitalApprovalRequests from "../pages/superadmin/HosptialVerfication/HosptialVerficationRequest";
import HospitalVerificationReview from "../pages/superadmin/HosptialVerfication/HosptialVerficationReview";
import SuperAdminDashboard from "../pages/superadmin/dashborad/SuperAdminDashBoard";
import CreatePlanPage from "../pages/superadmin/subscription/CreatePlanPage";
import PlanListingPage from "../pages/superadmin/subscription/PlanListingPage";
import VerfiedHospitalListing from "../pages/superadmin/verfiedHostial/VerfiedHospitalListing";
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
      children: [
        { path: "dashboard", element: <SuperAdminDashboard /> },
        { path: "verfication-request", element: <HospitalApprovalRequests /> },
        {
          path: "verfication-request/:id",
          element: <HospitalVerificationReview />,
        },
        { path: "hospitals", element: <VerfiedHospitalListing /> },
        { path: "plans", element: <PlanListingPage /> },
        { path: "plan/create", element: <CreatePlanPage /> },
      ],
    },
  ],
};
