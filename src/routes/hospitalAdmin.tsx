import HospitalAdminLayout from "../layout/HospitalAdmin";
import AddDoctor from "../pages/hospitaladmin/DoctorMangement/AddDoctor";
import DoctorListing from "../pages/hospitaladmin/DoctorMangement/DoctorLIsting";
import HospitalAdminDashboard from "../pages/hospitaladmin/HospitalDashBoard";
import SpecialityListing from "../pages/hospitaladmin/SpecialityMangement/SpecialityListing";
import HospitalAdminSubscriptionListing from "../pages/hospitaladmin/Subcription/SubscriptionListing.HospitalAdmin";

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
        { path: "dashboard", element: <HospitalAdminDashboard /> },
        { path: "speciality", element: <SpecialityListing /> },
        { path: "doctor", element: <DoctorListing /> },
        { path: "doctor/add", element: <AddDoctor /> },
        { path: "plans", element: <HospitalAdminSubscriptionListing /> },
      ],
    },
  ],
};
