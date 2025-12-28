import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const PublicRoute = () => {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    switch (role) {
      case "SUPER_ADMIN":
        return <Navigate to="/super-admin/dashboard" replace />;
      case "DOCTOR":
        return <Navigate to="/hospital-admin/dashboard" replace />;
      case "HOSPITAL_ADMIN":
        return <Navigate to="/hospital/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default PublicRoute;
