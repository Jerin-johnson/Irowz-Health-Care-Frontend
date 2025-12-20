import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/PublicLandingPage";
import { authRoutes } from "./auth.routes";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  authRoutes,
]);

export default routers;
