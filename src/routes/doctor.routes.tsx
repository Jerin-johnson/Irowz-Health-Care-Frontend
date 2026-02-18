import { lazy } from "react";

import DoctorLayout from "../layout/DoctorLayout";
import DoctorSessionBoundary from "./DoctorRealTime";
import ProtectedRoute from "./protectRoutes";
import ForcePasswordResetGuard from "./forcePasswordReset";
import { ROUTES } from "./constants/route.constants";

// ─── Lazy load doctor pages ────────────────────────────────────
const DoctorDashboard = lazy(() => import("../pages/doctor/DoctorDashboard"));
const DoctorAvailabilitySetup = lazy(
  () => import("../pages/doctor/DoctorAvailability/DoctorAvailabilitySetup"),
);
const DoctorProfileSettings = lazy(
  () => import("../pages/doctor/Profile/DoctorProfileSettingd"),
);
const DoctorSchedule = lazy(
  () => import("../pages/doctor/DoctorSchedule/DoctorSchedule"),
);
const AppointmentsQueue = lazy(
  () => import("../pages/doctor/consultation/AppointmentsQueue"),
);
const AppointmentViewPage = lazy(
  () => import("../pages/doctor/appoinments/VewAppoinments"),
);
const PatientConsultationOverView = lazy(
  () => import("../pages/doctor/consultation/PatientOverview"),
);
const DoctorPrescriptionViewPage = lazy(
  () => import("../pages/doctor/consultation/DoctorPrescriptionPage"),
);
const DoctorLabOrderViewPage = lazy(
  () => import("../pages/doctor/consultation/DoctorLabTestViewPage"),
);
const PatientVitals = lazy(
  () => import("../pages/doctor/consultation/PatientVital.Page"),
);

const doctorRoutes = [
  {
    element: (
      <ProtectedRoute
        allowedRoles={["DOCTOR"]}
        redirectTo={ROUTES.AUTH.DOCTOR_LOGIN}
      />
    ),
    children: [
      {
        element: <DoctorSessionBoundary />,
        children: [
          {
            path: ROUTES.DOCTOR.ROOT,
            element: <DoctorLayout />,
            children: [
              {
                path: ROUTES.DOCTOR.DASHBOARD,
                element: (
                  <ForcePasswordResetGuard>
                    <DoctorDashboard />
                  </ForcePasswordResetGuard>
                ),
              },
              {
                path: ROUTES.DOCTOR.AVAILABILITY,
                element: (
                  <ForcePasswordResetGuard>
                    <DoctorAvailabilitySetup />
                  </ForcePasswordResetGuard>
                ),
              },
              {
                path: ROUTES.DOCTOR.SETTINGS,
                element: <DoctorProfileSettings />,
              },
              { path: ROUTES.DOCTOR.SCHEDULE, element: <DoctorSchedule /> },
              { path: ROUTES.DOCTOR.QUEUE, element: <AppointmentsQueue /> },
              {
                path: ROUTES.DOCTOR.APPOINTMENT,
                element: <AppointmentViewPage />,
              },
              {
                path: ROUTES.DOCTOR.PATIENT_OVERVIEW,
                element: <PatientConsultationOverView />,
              },
              {
                path: ROUTES.DOCTOR.PRESCRIPTION_VIEW,
                element: <DoctorPrescriptionViewPage />,
              },
              {
                path: ROUTES.DOCTOR.LAB_VIEW,
                element: <DoctorLabOrderViewPage />,
              },
              { path: ROUTES.DOCTOR.VITALS_ADD, element: <PatientVitals /> },
            ],
          },
        ],
      },
    ],
  },
];

export default doctorRoutes;

// import DoctorLayout from "../layout/DoctorLayout";
// import { AppointmentViewPage } from "../pages/doctor/appoinments/VewAppoinments";
// import AppointmentsQueue from "../pages/doctor/consultation/AppointmentsQueue";
// import DoctorLabOrderViewPage from "../pages/doctor/consultation/DoctorLabTestViewPage";
// import DoctorPrescriptionViewPage from "../pages/doctor/consultation/DoctorPrescriptionPage";
// import PatientConsultationOverView from "../pages/doctor/consultation/PatientOverview";
// import PatientVitals from "../pages/doctor/consultation/PatientVital.Page";
// import DoctorAvailabilitySetup from "../pages/doctor/DoctorAvailability/DoctorAvailabilitySetup";
// import DoctorDashboard from "../pages/doctor/DoctorDashboard";
// import DoctorSchedule from "../pages/doctor/DoctorSchedule/DoctorSchedule";
// import DoctorProfileSettings from "../pages/doctor/Profile/DoctorProfileSettingd";
// import DoctorSessionBoundary from "./DoctorRealTime";
// import ForcePasswordResetGuard from "./forcePasswordReset";
// import ProtectedRoute from "./protectRoutes";

// // import Appointments from "../pages/doctor/Appointments";

// export const doctorRoutes = {
//   element: (
//     <ProtectedRoute allowedRoles={["DOCTOR"]} redirectTo="/doctor/login" />
//   ),
//   children: [
//     {
//       element: <DoctorSessionBoundary />,
//       children: [
//         {
//           path: "/doctor",
//           element: <DoctorLayout />,
//           children: [
//             {
//               path: "dashboard",
//               element: (
//                 <ForcePasswordResetGuard>
//                   <DoctorDashboard />
//                 </ForcePasswordResetGuard>
//               ),
//             },
//             {
//               path: "availability",
//               element: (
//                 <ForcePasswordResetGuard>
//                   <DoctorAvailabilitySetup />
//                 </ForcePasswordResetGuard>
//               ),
//             },
//             { path: "settings", element: <DoctorProfileSettings /> },
//             { path: "schedule", element: <DoctorSchedule /> },
//             { path: "queue", element: <AppointmentsQueue /> },
//             { path: "appointment/:id", element: <AppointmentViewPage /> },
//             {
//               path: "patient/overview/:id",
//               element: <PatientConsultationOverView />,
//             },
//             {
//               path: "prescription/view/:id",
//               element: <DoctorPrescriptionViewPage />,
//             },
//             {
//               path: "lab-report/view/:id",
//               element: <DoctorLabOrderViewPage />,
//             },
//             {
//               path: "consultation/vitals/add",
//               element: <PatientVitals />,
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };
