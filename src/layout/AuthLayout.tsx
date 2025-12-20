import { Outlet } from "react-router-dom";
// import AlreadyAuthGuard from "../components/guards/AlreadyAuthGuard";

const AuthLayout = () => {
  return (
    // <AlreadyAuthGuard>
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Outlet />
    </div>
    // </AlreadyAuthGuard>
  );
};

export default AuthLayout;
