// import HospitalAdminLayout from "../layout/HospitalAdmin";
// import AddDoctor from "../pages/hospitaladmin/DoctorMangement/AddDoctor";
// import DoctorListing from "../pages/hospitaladmin/DoctorMangement/DoctorLIsting";
// import HospitalAdminDashboard from "../pages/hospitaladmin/HospitalDashBoard";
// import LabOrdersPage from "../pages/hospitaladmin/LabOrder/LabordersHosptialAdminPage";
// import SpecialityListing from "../pages/hospitaladmin/SpecialityMangement/SpecialityListing";
// import HospitalAdminSubscriptionListing from "../pages/hospitaladmin/Subcription/SubscriptionListing.HospitalAdmin";

// import ProtectedRoute from "./protectRoutes";

// export const HospitalAdminRoutes = {
//   element: (
//     <ProtectedRoute
//       allowedRoles={["HOSPITAL_ADMIN"]}
//       redirectTo="/hospital/login"
//     />
//   ),
//   children: [
//     {
//       path: "/hospital-admin",
//       element: <HospitalAdminLayout />,
//       children: [
//         { path: "dashboard", element: <HospitalAdminDashboard /> },
//         { path: "speciality", element: <SpecialityListing /> },
//         { path: "doctor", element: <DoctorListing /> },
//         { path: "doctor/add", element: <AddDoctor /> },
//         { path: "plans", element: <HospitalAdminSubscriptionListing /> },
//         { path: "lab", element: <LabOrdersPage /> },
//       ],
//     },
//   ],
// };

import { lazy } from "react";

import HospitalAdminLayout from "../layout/HospitalAdmin";
import ProtectedRoute from "./protectRoutes";

const HospitalAdminDashboard = lazy(
  () => import("../pages/hospitaladmin/HospitalDashBoard"),
);
const SpecialityListing = lazy(
  () => import("../pages/hospitaladmin/SpecialityMangement/SpecialityListing"),
);
const DoctorListing = lazy(
  () => import("../pages/hospitaladmin/DoctorMangement/DoctorLIsting"),
);
const AddDoctor = lazy(
  () => import("../pages/hospitaladmin/DoctorMangement/AddDoctor"),
);
const HospitalAdminSubscriptionListing = lazy(
  () =>
    import("../pages/hospitaladmin/Subcription/SubscriptionListing.HospitalAdmin"),
);
const LabOrdersPage = lazy(
  () => import("../pages/hospitaladmin/LabOrder/LabordersHosptialAdminPage"),
);

const hospitalAdminRoutes = [
  {
    element: (
      <ProtectedRoute
        allowedRoles={["HOSPITAL_ADMIN"]}
        redirectTo="/hospital/login"
      />
    ),
    children: [
      {
        path: "/hospital-admin", // ← becomes /hospital-admin/...
        element: <HospitalAdminLayout />,
        children: [
          { path: "dashboard", element: <HospitalAdminDashboard /> },
          { path: "speciality", element: <SpecialityListing /> },
          { path: "doctor", element: <DoctorListing /> },
          { path: "doctor/add", element: <AddDoctor /> },
          { path: "plans", element: <HospitalAdminSubscriptionListing /> },
          { path: "lab", element: <LabOrdersPage /> },
        ],
      },
    ],
  },
];

export default hospitalAdminRoutes;
