import { lazy } from "react";

import PatientLayout from "../layout/PatientLayout";
import PatientProfileLayout from "../layout/patientProfile.layout";
import PatientSessionBoundary from "./PatientRealTime";
import ProtectedRoute from "./protectRoutes";

const DoctorListing = lazy(
  () => import("../pages/patient/DoctorListing/DoctorListing"),
);
const DoctorProfile = lazy(
  () => import("../pages/patient/DoctorProfile/DoctorProfile"),
);
const DoctorSlots = lazy(
  () => import("../pages/patient/DoctorBooking/DoctorSlot"),
);
const DoctorBooking = lazy(
  () => import("../pages/patient/DoctorBooking/DoctorBooking"),
);
const AppointmentSuccess = lazy(
  () => import("../pages/patient/apponimentBookingStatus/AppointmentSuccess"),
);

const PatientDashboard = lazy(
  () => import("../pages/patient/Dashboard/PatientDashboard"),
);
const PatientAppointments = lazy(
  () => import("../pages/patient/apponimentBookingStatus/AppointmentListing"),
);
const AppointmentViewPage = lazy(
  () =>
    import("../pages/patient/apponimentBookingStatus/PatientViewAppointment"),
);
const PatientLiveQueueStatus = lazy(
  () => import("../pages/patient/apponimentBookingStatus/LivePatientQueue"),
);
const PatientProfileSettings = lazy(
  () =>
    import("../pages/patient/patientProfileSettings/PatientProfileSettings"),
);
const WalletPatient = lazy(
  () => import("../pages/patient/wallet/PatientWallet"),
);

const PatientMedicalRecordListingPage = lazy(
  () => import("../pages/patient/medical-record/PatientMedicalRecordListing"),
);
const PatientPrescriptionViewPage = lazy(
  () => import("../pages/patient/medical-record/PatientPercriptionView"),
);
const PatientLabOrderViewPage = lazy(
  () => import("../pages/patient/medical-record/PatientLabReportView"),
);

const patientRoutes = [
  {
    element: <PatientSessionBoundary />,
    children: [
      {
        path: "/patient",
        element: <PatientLayout />,
        children: [
          { path: "doctors", element: <DoctorListing /> },
          { path: "doctor/:id", element: <DoctorProfile /> },

          {
            element: <ProtectedRoute allowedRoles={["PATIENT"]} />,
            children: [
              { path: "doctor/slots/:id", element: <DoctorSlots /> },
              { path: "doctor/booking", element: <DoctorBooking /> },
              { path: "booking-success/:id", element: <AppointmentSuccess /> },
            ],
          },
        ],
      },

      {
        element: <ProtectedRoute allowedRoles={["PATIENT"]} />,
        children: [
          {
            path: "/patient",
            element: <PatientProfileLayout />,
            children: [
              { path: "profile", element: <PatientDashboard /> },
              { path: "settings", element: <PatientProfileSettings /> },
              { path: "appointments", element: <PatientAppointments /> },
              { path: "appointments/:id", element: <AppointmentViewPage /> },
              {
                path: "appointment/queue/:id",
                element: <PatientLiveQueueStatus />,
              },
              { path: "wallet", element: <WalletPatient /> },
              { path: "records", element: <PatientMedicalRecordListingPage /> },
              {
                path: "medical-record/prescription/:id",
                element: <PatientPrescriptionViewPage />,
              },
              {
                path: "medical-record/lab/:id",
                element: <PatientLabOrderViewPage />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default patientRoutes;

// import PatientLayout from "../layout/PatientLayout";
// import PatientProfileLayout from "../layout/patientProfile.layout";
// import PatientAppointments from "../pages/patient/apponimentBookingStatus/AppointmentListing";
// import AppointmentSuccess from "../pages/patient/apponimentBookingStatus/AppointmentSuccess";
// import PatientLiveQueueStatus from "../pages/patient/apponimentBookingStatus/LivePatientQueue";
// import { AppointmentViewPage } from "../pages/patient/apponimentBookingStatus/PatientViewAppointment";
// import DoctorBooking from "../pages/patient/DoctorBooking/DoctorBooking";
// import DoctorSlots from "../pages/patient/DoctorBooking/DoctorSlot";
// import DoctorListing from "../pages/patient/DoctorListing/DoctorListing";
// import DoctorProfile from "../pages/patient/DoctorProfile/DoctorProfile";
// import PatientProfileSettings from "../pages/patient/patientProfileSettings/PatientProfileSettings";
// import { WalletPatient } from "../pages/patient/wallet/PatientWallet";
// import PatientSessionBoundary from "./PatientRealTime";

// import ProtectedRoute from "./protectRoutes";
// import PatientDashboard from "../pages/patient/Dashboard/PatientDashboard";
// import PatientMedicalRecordListingPage from "../pages/patient/medical-record/PatientMedicalRecordListing";
// import PatientPrescriptionViewPage from "../pages/patient/medical-record/PatientPercriptionView";
// import PatientLabOrderViewPage from "../pages/patient/medical-record/PatientLabReportView";

// export const patientRoutes = {
//   path: "/patient",
//   element: <PatientSessionBoundary />,
//   children: [
//     {
//       element: <PatientLayout />,
//       children: [
//         {
//           path: "doctors",
//           element: <DoctorListing />,
//         },
//         {
//           path: "doctor/:id",
//           element: <DoctorProfile />,
//         },
//         {
//           element: <ProtectedRoute allowedRoles={["PATIENT"]} />,
//           children: [
//             {
//               path: "doctor/slots/:id",
//               element: <DoctorSlots />,
//             },
//             {
//               path: "doctor/booking",
//               element: <DoctorBooking />,
//             },
//             {
//               path: "booking-success/:id",
//               element: <AppointmentSuccess />,
//             },
//           ],
//         },
//       ],
//     },

//     {
//       element: <ProtectedRoute allowedRoles={["PATIENT"]} />,
//       children: [
//         {
//           element: <PatientProfileLayout />,
//           children: [
//             {
//               path: "profile",
//               element: <PatientDashboard />,
//             },
//             {
//               path: "settings",
//               element: <PatientProfileSettings />,
//             },
//             {
//               path: "appointments",
//               element: <PatientAppointments />,
//             },
//             {
//               path: "appointments/:id",
//               element: <AppointmentViewPage />,
//             },
//             {
//               path: "appointment/queue/:id",
//               element: <PatientLiveQueueStatus />,
//             },
//             {
//               path: "wallet",
//               element: <WalletPatient />,
//             },
//             {
//               path: "records",
//               element: <PatientMedicalRecordListingPage />,
//             },
//             {
//               path: "medical-record/prescription/:id",
//               element: <PatientPrescriptionViewPage />,
//             },
//             {
//               path: "medical-record/lab/:id",
//               element: <PatientLabOrderViewPage />,
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };
