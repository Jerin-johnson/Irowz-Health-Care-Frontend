import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/PublicLandingPage";
import { authRoutes } from "./auth.routes";
import { doctorRoutes } from "./doctor.routes";
import { superAdminRoutes } from "./superAdmin.routes";
import Unauthorized from "../pages/UnAuthorized.page";

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
]);

export default routers;
