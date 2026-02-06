import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

const LandingPage = lazy(() => import("../pages/PublicLandingPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const BlogPage = lazy(() => import("../pages/BlogPage"));
const Unauthorized = lazy(() => import("../pages/UnAuthorized.page"));

import { authRoutes } from "./auth.routes";
import { doctorRoutes } from "./doctor.routes";
import { superAdminRoutes } from "./superAdmin.routes";
import { HospitalAdminRoutes } from "./hospitalAdmin";
import { patientRoutes } from "./patient.routes";
import Loader from "../components/common/Loader";

const routers = createBrowserRouter([
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
  {
    path: "/blog",
    element: (
      <Suspense fallback={<Loader />}>
        <BlogPage />
      </Suspense>
    ),
  },

  authRoutes,
  doctorRoutes,
  superAdminRoutes,
  HospitalAdminRoutes,
  patientRoutes,
]);

export default routers;
