import React, { useState } from "react";
import { LogOut, ChevronRight, Bell } from "lucide-react";
import { adminConfig } from "./sidebarConfig/hosptialadmin";
import { superAdminConfig } from "./sidebarConfig/superadmin";
import { doctorConfig } from "./sidebarConfig/doctor";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

export interface SidebarConfig {
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
