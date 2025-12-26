import DoctorLayout from "../layout/DoctorLayout";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";

// import Appointments from "../pages/doctor/Appointments";

export const doctorRoutes = {
  path: "/doctor",
  element: <DoctorLayout />,
  children: [
    { path: "dashboard", element: <DoctorDashboard /> },
    //     { path: "appointments", element: <Appointments /> },
  ],
};
