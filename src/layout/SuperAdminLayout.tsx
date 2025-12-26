// import { Outlet, useNavigate } from "react-router-dom";
// import Sidebar from "../components/sidebar/Sidebar";

// const SuperAdminLayout = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex h-screen">
//       <Sidebar
//         userType="superadmin"
//         userName="Admin Master"
//         userRole="System Administrator"
//         badges={{ verification: 8, hospitals: 3 }}
//         onItemClick={(_, path) => navigate(path)}
//         onLogout={() => navigate("/superadmin/login")}
//       />

//       <main className="flex-1 overflow-auto bg-gray-50">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default SuperAdminLayout;
