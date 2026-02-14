import {
  LayoutDashboard,
  Shield,
  Hospital,
  ClipboardList,
  UserPlus,
  CreditCard,
  Wallet,
} from "lucide-react";
import type { SidebarConfig } from "../sidebar";

export const superAdminConfig: SidebarConfig = {
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
    // {
    //   id: "admins",
    //   label: "Hospital Admins",
    //   icon: <UserCog className="w-5 h-5" />,
    //   path: "/super-admin/admins",
    // },
    // {
    //   id: "doctors",
    //   label: "All Doctors",
    //   icon: <Stethoscope className="w-5 h-5" />,
    //   path: "/super-admin/doctors",
    // },

    {
      id: "subcription",
      label: "Subcription Management",
      icon: <CreditCard className="w-5 h-5" />,
      path: "/super-admin/plans",
    },
    {
      id: "analytics",
      label: "Wallet",
      icon: <Wallet className="w-5 h-5" />,
      path: "/super-admin/wallet",
    },
    {
      id: "users",
      label: "User Management",
      icon: <UserPlus className="w-5 h-5" />,
      path: "/super-admin/users",
    },
    // {
    //   id: "settings",
    //   label: "System Settings",
    //   icon: <Settings className="w-5 h-5" />,
    //   path: "/super-admin/settings",
    // },
  ],
};
