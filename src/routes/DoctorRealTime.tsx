import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { useDoctorSocket } from "../hooks/doctor/socket/useDoctorSocket";

const DoctorSessionBoundary = () => {
  const { isAuthenticated, role, doctorId } = useAppSelector(
    (state) => state.auth,
  );

  const shouldConnect = isAuthenticated && role === "DOCTOR";

  if (shouldConnect) {
    useDoctorSocket(doctorId);
  }

  return <Outlet />;
};

export default DoctorSessionBoundary;
