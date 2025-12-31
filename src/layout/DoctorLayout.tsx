import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/ReuseableComponets/sidebar/sidebar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoutThunk } from "../store/slice/Auth/auth.thunks";

const DoctorLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { role, name, forcePasswordReset, email } = useAppSelector(
    (state) => state.auth
  );
  console.log("the forcePassword reset", forcePasswordReset, email);

  return (
    <div className="flex h-screen">
      <Sidebar
        userType="doctor"
        userName={name as string}
        userRole={role as string}
        // badges={{ appointments: 3, queue: 2 }}
        onItemClick={(_, path) => navigate(path)}
        onLogout={async () => {
          await dispatch(logoutThunk());
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
