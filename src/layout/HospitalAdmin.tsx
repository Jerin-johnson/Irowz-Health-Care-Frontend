import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/ReuseableComponets/sidebar/sidebar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoutThunk } from "../store/slice/Auth/auth.thunks";

const HospitalAdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { role, name } = useAppSelector((state) => state.auth);

  return (
    <div className="flex h-screen">
      <Sidebar
        userType="admin"
        userName={name as string}
        userRole={role as string}
        // badges={{ doctors: 5, appointments: 12 }}
        onItemClick={(_, path) => navigate(path)}
        onLogout={async () => {
          await dispatch(logoutThunk());
          navigate("/hospital/login");
        }}
      />

      <main className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default HospitalAdminLayout;
