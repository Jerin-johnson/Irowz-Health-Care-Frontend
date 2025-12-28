import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/PublicLandingPage";
import { authRoutes } from "./auth.routes";
import { doctorRoutes } from "./doctor.routes";
import { superAdminRoutes } from "./superAdmin.routes";
import Unauthorized from "../pages/UnAuthorized.page";
import { HospitalAdminRoutes } from "./hospitalAdmin";

const routers = createBrowserRouter([
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  authRoutes,
  doctorRoutes,
  superAdminRoutes,
  HospitalAdminRoutes,
]);

export default routers;
