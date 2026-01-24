import { Outlet } from "react-router-dom";
import { useState } from "react";
import PatientSidebar from "../components/patient/profile/PatientSidebar";
import PatientNavbar from "../components/patient/profile/PatientNavbar";
import { useAppSelector } from "../store/hooks";

const PatientProfileLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userId = useAppSelector((state) => state.auth.userId);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <PatientSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <PatientNavbar
          userId={userId as string}
          onMenuToggle={() => setSidebarOpen(true)}
        />

        <main className="pt-20 px-4 sm:px-6 lg:px-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PatientProfileLayout;
