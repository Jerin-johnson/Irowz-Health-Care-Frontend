import HospitalAdminLayout from "../layout/HospitalAdmin";
import AddDoctor from "../pages/hospitaladmin/DoctorMangement/AddDoctor";
import DoctorListing from "../pages/hospitaladmin/DoctorMangement/DoctorLIsting";
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
        { path: "doctor", element: <DoctorListing /> },
        { path: "doctor/add", element: <AddDoctor /> },
      ],
    },
  ],
};
