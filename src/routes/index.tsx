import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/PublicLandingPage";
import { authRoutes } from "./auth.routes";
import { doctorRoutes } from "./doctor.routes";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  authRoutes,
  doctorRoutes,
]);

export default routers;
