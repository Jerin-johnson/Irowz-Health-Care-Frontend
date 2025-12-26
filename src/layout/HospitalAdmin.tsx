// import { Outlet, useNavigate } from "react-router-dom";
// import Sidebar from "../components/sidebar/Sidebar";

// const AdminLayout = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex h-screen">
//       <Sidebar
//         userType="admin"
//         userName="John Smith"
//         userRole="Hospital Administrator"
//         badges={{ doctors: 5, appointments: 12 }}
//         onItemClick={(_, path) => navigate(path)}
//         onLogout={() => navigate("/hospital/login")}
//       />

//       <main className="flex-1 overflow-auto bg-gray-50">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;
