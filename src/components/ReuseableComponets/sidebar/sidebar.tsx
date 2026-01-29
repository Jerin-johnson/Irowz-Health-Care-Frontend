import React, { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Video,
  FileText,
  Pill,
  BarChart3,
  Settings,
  LogOut,
  Building2,
  ChevronRight,
  Bell,
  UserCog,
  Shield,
  Hospital,
  Stethoscope,
  ClipboardList,
  Activity,
  Database,
  UserPlus,
  TrendingUp,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

interface SidebarConfig {
  logo: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
  };
  menuItems: MenuItem[];
}

interface SidebarProps {
  userType: "doctor" | "admin" | "superadmin" | "patient";
  userName: string | null;
  userRole: string;
  userAvatar?: string;
  activeItem?: string;
  onItemClick?: (itemId: string, path: string) => void;
  onLogout?: () => void;
  badges?: Record<string, number>;
}

// ==================== CONFIGURATIONS ====================

// Doctor Configuration
const doctorConfig: SidebarConfig = {
  logo: {
    icon: <Stethoscope className="w-6 h-6 text-white" />,
    title: "IrowzCure",
    subtitle: "Doctor Portal",
  },
  menuItems: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/doctor/dashboard",
    },
    // {
    //   id: "appointments",
    //   label: "My Appointments",
    //   icon: <Calendar className="w-5 h-5" />,
    //   path: "/doctor/appointments",
    // },
    {
      id: "queue",
      label: "Live Queue",
      icon: <Users className="w-5 h-5" />,
      path: "/doctor/queue",
    },
    {
      id: "consultations",
      label: "Video Consultations",
      icon: <Video className="w-5 h-5" />,
      path: "/doctor/consultations",
    },
    {
      id: "schedule",
      label: "Booking schedule",
      icon: <FileText className="w-5 h-5" />,
      path: "/doctor/schedule",
    },
    // {
    //   id: "prescriptions",
    //   label: "Prescriptions",
    //   icon: <Pill className="w-5 h-5" />,
    //   path: "/doctor/prescriptions",
    // },
    // {
    //   id: "reports",
    //   label: "Reports",
    //   icon: <BarChart3 className="w-5 h-5" />,
    //   path: "/doctor/reports",
    // },
    {
      id: "availability",
      label: "availability & Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/doctor/availability",
    },

    {
      id: "settings",
      label: "Profile & Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/doctor/settings",
    },
  ],
};

// Admin Configuration
const adminConfig: SidebarConfig = {
  logo: {
    icon: <Hospital className="w-6 h-6 text-white" />,
    title: "IrowzCure",
    subtitle: "Hospital Admin Panel",
  },
  menuItems: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/hospital-admin/dashboard",
    },
    {
      id: "doctors",
      label: "Manage Doctors",
      icon: <Stethoscope className="w-5 h-5" />,
      path: "/hospital-admin/doctor",
    },
    {
      id: "patients",
      label: "Manage Patients",
      icon: <Users className="w-5 h-5" />,
      path: "/admin/patients",
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: <Calendar className="w-5 h-5" />,
      path: "/admin/appointments",
    },
    {
      id: "speciality",
      label: "Speciality Mangament",
      icon: <Building2 className="w-5 h-5" />,
      path: "/hospital-admin/speciality",
    },
    {
      id: "reports",
      label: "Reports & Analytics",
      icon: <TrendingUp className="w-5 h-5" />,
      path: "/admin/reports",
    },
    {
      id: "billing",
      label: "Billing",
      icon: <FileText className="w-5 h-5" />,
      path: "/admin/billing",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/admin/settings",
    },
  ],
};

// Super Admin Configuration
const superAdminConfig: SidebarConfig = {
  logo: {
    icon: <Shield className="w-6 h-6 text-white" />,
    title: "IrowzCure",
    subtitle: "Super Admin",
  },
  menuItems: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/super-admin/dashboard",
    },
    {
      id: "hospitals",
      label: "Manage Hospitals",
      icon: <Hospital className="w-5 h-5" />,
      path: "/super-admin/hospitals",
    },
    {
      id: "verification",
      label: "Verification Requests",
      icon: <ClipboardList className="w-5 h-5" />,
      path: "/super-admin/verfication-request",
    },
    {
      id: "admins",
      label: "Hospital Admins",
      icon: <UserCog className="w-5 h-5" />,
      path: "/super-admin/admins",
    },
    {
      id: "doctors",
      label: "All Doctors",
      icon: <Stethoscope className="w-5 h-5" />,
      path: "/super-admin/doctors",
    },
    {
      id: "analytics",
      label: "System Analytics",
      icon: <Activity className="w-5 h-5" />,
      path: "/super-admin/analytics",
    },
    {
      id: "database",
      label: "Database Management",
      icon: <Database className="w-5 h-5" />,
      path: "/super-admin/database",
    },
    {
      id: "users",
      label: "User Management",
      icon: <UserPlus className="w-5 h-5" />,
      path: "/super-admin/users",
    },
    {
      id: "settings",
      label: "System Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/super-admin/settings",
    },
  ],
};

// Config selector
const getConfig = (
  userType: "doctor" | "admin" | "superadmin" | "patient",
): SidebarConfig => {
  switch (userType) {
    case "doctor":
      return doctorConfig;
    case "admin":
      return adminConfig;
    case "superadmin":
      return superAdminConfig;
    default:
      return doctorConfig;
  }
};

// ==================== SIDEBAR COMPONENT ====================

const Sidebar: React.FC<SidebarProps> = ({
  userType,
  userName,
  userRole,
  userAvatar,
  activeItem,
  onItemClick,
  onLogout,
  badges = {},
}) => {
  const [active, setActive] = useState(activeItem);
  //   const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const config = getConfig(userType);

  const handleItemClick = (itemId: string, path: string) => {
    setActive(itemId);
    onItemClick?.(itemId, path);
  };

  const handleLogout = () => {
    onLogout?.();
    console.log("Logout clicked");
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            {config.logo.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-900 truncate">
              {config.logo.title}
            </h1>
            <p className="text-xs text-gray-500 truncate">
              {config.logo.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
          <div className="relative">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName as string}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                {(userName as string)
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {userName}
            </p>
            <p className="text-xs text-gray-500 truncate">{userRole}</p>
          </div>
          <Bell className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {config.menuItems.map((item) => {
            const isActive = active === item.id;
            const badge = badges[item.id];

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id, item.path)}
                // onMouseEnter={() => setHoveredItem(item.id)}
                // onMouseLeave={() => setHoveredItem(null)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                <span
                  className={`${isActive ? "text-blue-600" : "text-gray-500"}`}
                >
                  {item.icon}
                </span>
                <span className="flex-1 text-sm">{item.label}</span>
                {badge && badge > 0 && (
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full">
                    {badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-4 h-4 text-blue-600" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
