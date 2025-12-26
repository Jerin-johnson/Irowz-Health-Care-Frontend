import { Navigate } from "react-router-dom";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import type { JSX } from "react";

export const RoleGuard = ({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: JSX.Element;
}) => {
  const { role } = useSelector((state: RootState) => state.auth);

  if (!allowedRoles.includes(role!)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
