import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loader from "../components/common/Loader";

// Public pages
const LandingPage = lazy(() => import("../pages/PublicLandingPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const Unauthorized = lazy(() => import("../pages/UnAuthorized.page"));

// Import route arrays normally (they are small!)
import authRoutes from "./auth.routes";
import patientRoutes from "./patient.routes";
import doctorRoutes from "./doctor.routes";
import hospitalAdminRoutes from "./hospitalAdmin"; // renamed file
import superAdminRoutes from "./superAdmin.routes";

const router = createBrowserRouter([
  // Public
  {
    path: "/unauthorized",
    element: (
      <Suspense fallback={<Loader />}>
        <Unauthorized />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: "/contact",
    element: (
      <Suspense fallback={<Loader />}>
        <ContactPage />
      </Suspense>
    ),
  },

  ...authRoutes,
  ...patientRoutes,
  ...doctorRoutes,
  ...hospitalAdminRoutes,
  ...superAdminRoutes,

  // 404
  { path: "*", element: <div>404 - Not found</div> },
]);

export default router;

// import { createBrowserRouter } from "react-router-dom";
// import { lazy, Suspense } from "react";

// const LandingPage = lazy(() => import("../pages/PublicLandingPage"));
// const ContactPage = lazy(() => import("../pages/ContactPage"));
// const Unauthorized = lazy(() => import("../pages/UnAuthorized.page"));

// import { authRoutes } from "./auth.routes";
// import { doctorRoutes } from "./doctor.routes";
// import { superAdminRoutes } from "./superAdmin.routes";
// import { HospitalAdminRoutes } from "./hospitalAdmin";
// import { patientRoutes } from "./patient.routes";
// import Loader from "../components/common/Loader";

// const routers = createBrowserRouter([
//   {
//     path: "/unauthorized",
//     element: (
//       <Suspense fallback={<Loader />}>
//         <Unauthorized />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/",
//     element: (
//       <Suspense fallback={<Loader />}>
//         <LandingPage />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/contact",
//     element: (
//       <Suspense fallback={<Loader />}>
//         <ContactPage />
//       </Suspense>
//     ),
//   },

//   authRoutes,
//   doctorRoutes,
//   superAdminRoutes,
//   HospitalAdminRoutes,
//   patientRoutes,
// ]);

// export default routers;
