import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/ReuseableComponets/sidebar/sidebar";

const DoctorLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <Sidebar
        userType="doctor"
        userName="Dr. Sarah Johnson"
        userRole="Cardiologist"
        badges={{ appointments: 3, queue: 2 }}
        onItemClick={(_, path) => navigate(path)}
        onLogout={() => {
          console.log("doctor logout");
          navigate("/doctor/login");
        }}
      />

      <main className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorLayout;
