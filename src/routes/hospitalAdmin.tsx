import HospitalAdminLayout from "../layout/HospitalAdmin";
import HospitalDashBoard from "../pages/hospitaladmin/HospitalDashBoard";
import SpecialityListing from "../pages/hospitaladmin/SpecialityMangement/SpecialityListing";

import ProtectedRoute from "./protectRoutes";

export const HospitalAdminRoutes = {
  element: (
    <ProtectedRoute
      allowedRoles={["HOSPITAL_ADMIN"]}
      redirectTo="/hospital/login"
    />
  ),
  children: [
    {
      path: "/hospital-admin",
      element: <HospitalAdminLayout />,
      children: [
        { path: "dashboard", element: <HospitalDashBoard /> },
        { path: "speciality", element: <SpecialityListing /> },
      ],
    },
  ],
};
