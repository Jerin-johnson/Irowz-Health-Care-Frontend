import {
  LayoutDashboard,
  Calendar,
  Heart,
  Users,
  FileText,
  Wallet,
  FileCheck,
  Video,
  Settings,
  LogOut,
  ChevronRight,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/patient/profile" },
  { label: "Appointments", icon: Calendar, path: "/patient/appointments" },
  { label: "Favourites", icon: Heart, path: "/patient/favourites" },
  { label: "Dependents", icon: Users, path: "/patient/dependents" },
  { label: "Medical Records", icon: FileText, path: "/patient/records" },
  { label: "Wallet", icon: Wallet, path: "/patient/wallet" },
  { label: "Invoices", icon: FileCheck, path: "/patient/invoices" },
  { label: "Video", icon: Video, path: "/patient/video" },
  { label: "Settings", icon: Settings, path: "/patient/settings" },
];

const PatientSidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 bg-white shadow-lg transform transition-transform
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Close Button (Mobile) */}
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile */}
        <div className="p-6 border-b">
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
              className="w-24 h-24 rounded-full mx-auto mb-3"
            />
            <h3 className="font-bold">Hendrita</h3>
            <p className="text-xs text-gray-500">Patient ID: #P564654</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                  flex items-center justify-between px-4 py-3 rounded-lg text-sm
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50"
                  }
                `
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  {item.label}
                </div>
                <ChevronRight className="w-4 h-4" />
              </NavLink>
            );
          })}

          {/* Logout */}
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
};

export default PatientSidebar;
