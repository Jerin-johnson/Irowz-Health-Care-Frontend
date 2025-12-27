import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/ReuseableComponets/sidebar/sidebar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoutThunk } from "../store/slice/Auth/auth.thunks";

const SuperAdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { role, name } = useAppSelector((state) => state.auth);

  return (
    <div className="flex h-screen">
      <Sidebar
        userType="superadmin"
        userName={name as string}
        userRole={role as string}
        onItemClick={(_, path) => navigate(path)}
        onLogout={async () => {
          await dispatch(logoutThunk());
          navigate("/superadmin/login");
        }}
      />

      <main className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default SuperAdminLayout;
