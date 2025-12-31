import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { useEffect, useRef } from "react";
import { notify } from "../shared/notification/toast";

interface ForcePasswordResetGuardProps {
  redirectTo?: string;
  children: React.ReactNode;
}

const ForcePasswordResetGuard = ({
  redirectTo = "/doctor/settings",
  children,
}: ForcePasswordResetGuardProps) => {
  const { forcePasswordReset } = useAppSelector((state) => state.auth);
  const hasNotified = useRef(false);

  useEffect(() => {
    if (forcePasswordReset && !hasNotified.current) {
      notify.error(
        "For security reasons, please reset your password to continue."
      );
      hasNotified.current = true;
    }
  }, [forcePasswordReset]);

  if (forcePasswordReset) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ForcePasswordResetGuard;
