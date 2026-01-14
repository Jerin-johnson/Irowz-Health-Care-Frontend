// import { useState, useEffect } from "react";
// import {
//   LayoutDashboard,
//   FileText,
//   Heart,
//   Calendar,
//   Users,
//   Wallet,
//   FileCheck,
//   Video,
//   Settings,
//   LogOut,
//   ChevronRight,
//   Bell,
//   X,
//   Menu,
// } from "lucide-react";

// const PatientSidebar = () => {
//   const [activeItem, setActiveItem] = useState("Dashboard");
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 1024);
//       if (window.innerWidth >= 1024) {
//         setIsSidebarOpen(false);
//       }
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const menuItems = [
//     { icon: LayoutDashboard, label: "Dashboard", badge: null },
//     { icon: Calendar, label: "My Appointments", badge: 3 },
//     { icon: Heart, label: "Favourites", badge: null },
//     { icon: Users, label: "Dependents", badge: null },
//     { icon: FileText, label: "Medical Records", badge: null },
//     { icon: Wallet, label: "Wallet", badge: null },
//     { icon: FileCheck, label: "Invoices", badge: null },
//     { icon: Bell, label: "Message", badge: 5 },
//     { icon: Video, label: "Video", badge: null },
//     { icon: Settings, label: "Settings", badge: null },
//     { icon: LogOut, label: "Logout", badge: null },
//   ];

//   const notifications = [
//     { id: 1, message: "Appointment reminder for tomorrow", time: "2h ago" },
//     { id: 2, message: "New message from Dr. Smith", time: "5h ago" },
//     { id: 3, message: "Lab results are ready", time: "1d ago" },
//   ];

//   const handleMenuClick = (label) => {
//     if (label === "Message") {
//       setShowNotifications(true);
//     } else {
//       setActiveItem(label);
//     }
//     if (isMobile) {
//       setIsSidebarOpen(false);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       {/* Mobile Header */}
//       <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-40 px-4 py-3 flex items-center justify-between">
//         <button
//           onClick={() => setIsSidebarOpen(true)}
//           className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//         >
//           <Menu className="w-6 h-6 text-gray-700" />
//         </button>
//         <h1 className="text-lg font-bold text-gray-900">Patient Dashboard</h1>
//         <button
//           onClick={() => setShowNotifications(true)}
//           className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
//         >
//           <Bell className="w-6 h-6 text-gray-700" />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//         </button>
//       </div>

//       {/* Overlay for mobile */}
//       {isMobile && isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={() => setIsSidebarOpen(false)}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <div
//         className={`
//           ${isMobile ? "fixed inset-y-0 left-0 z-50" : "relative"}
//           w-72 sm:w-80 lg:w-64 bg-white shadow-lg flex flex-col
//           transform transition-transform duration-300 ease-in-out
//           ${isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"}
//         `}
//       >
//         {/* Mobile Close Button */}
//         {isMobile && (
//           <button
//             onClick={() => setIsSidebarOpen(false)}
//             className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
//           >
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         )}

//         {/* Profile Section */}
//         <div className="p-6 border-b border-gray-100">
//           <div className="flex flex-col items-center">
//             {/* Profile Image */}
//             <div className="relative mb-4">
//               <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 via-blue-50 to-white p-1 shadow-md">
//                 <div className="w-full h-full rounded-full bg-white overflow-hidden border-2 border-blue-200">
//                   <img
//                     src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
//                     alt="Hendrita"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>
//               <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white shadow-sm"></div>
//             </div>

//             {/* User Info */}
//             <h3 className="text-lg font-bold text-gray-900 mb-1">Hendrita</h3>
//             <p className="text-xs text-gray-500 mb-1">Patient ID: #P564654</p>
//             <p className="text-xs text-gray-400">Female • 32 years old</p>

//             {/* Quick Action Button */}
//             <button className="mt-4 w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
//               <Calendar className="w-4 h-4" />
//               Book Appointment
//             </button>
//           </div>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="flex-1 overflow-y-auto py-4 px-3">
//           <div className="space-y-1">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = activeItem === item.label;
//               const isLogout = item.label === "Logout";

//               return (
//                 <button
//                   key={item.label}
//                   onClick={() => handleMenuClick(item.label)}
//                   className={`
//                     w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group
//                     ${
//                       isActive
//                         ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
//                         : isLogout
//                         ? "text-red-600 hover:bg-red-50"
//                         : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
//                     }
//                   `}
//                 >
//                   <div className="flex items-center gap-3">
//                     <Icon
//                       className={`w-5 h-5 ${
//                         isActive
//                           ? "text-white"
//                           : isLogout
//                           ? "text-red-600"
//                           : "text-gray-500 group-hover:text-blue-600"
//                       }`}
//                     />
//                     <span>{item.label}</span>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     {item.badge && (
//                       <span
//                         className={`
//                         px-2 py-0.5 text-xs font-semibold rounded-full
//                         ${
//                           isActive
//                             ? "bg-white text-blue-600"
//                             : "bg-blue-100 text-blue-600"
//                         }
//                       `}
//                       >
//                         {item.badge}
//                       </span>
//                     )}
//                     {isActive && (
//                       <ChevronRight className="w-4 h-4 text-white" />
//                     )}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         </nav>

//         {/* Help Card */}
//         <div className="p-4 m-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
//           <div className="flex items-start gap-3">
//             <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
//               <Bell className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h4 className="text-sm font-bold text-gray-900 mb-1">
//                 Need Help?
//               </h4>
//               <p className="text-xs text-gray-600 mb-3">
//                 Contact our support team 24/7
//               </p>
//               <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
//                 Get Support
//                 <ChevronRight className="w-3 h-3" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Notifications Modal */}
//       {showNotifications && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
//             <div className="flex items-center justify-between p-4 border-b border-gray-200">
//               <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
//               <button
//                 onClick={() => setShowNotifications(false)}
//                 className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
//             <div className="overflow-y-auto max-h-80">
//               {notifications.map((notif) => (
//                 <div
//                   key={notif.id}
//                   className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
//                 >
//                   <p className="text-sm text-gray-900 mb-1">{notif.message}</p>
//                   <p className="text-xs text-gray-500">{notif.time}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Content Area */}
//       <div className={`flex-1 overflow-auto ${isMobile ? "pt-16" : ""}`}>
//         <div className="p-4 sm:p-6 lg:p-8">
//           <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 min-h-[calc(100vh-8rem)] flex items-center justify-center">
//             <div className="text-center">
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
//                 {activeItem}
//               </h2>
//               <p className="text-gray-500 text-sm sm:text-base">
//                 Content will appear here
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientSidebar;
