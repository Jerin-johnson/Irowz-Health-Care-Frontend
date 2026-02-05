import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Settings,
  Building2,
  Hospital,
  Stethoscope,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import type { SidebarConfig } from "../sidebar";

// hosptial Admin Configuration
export const adminConfig: SidebarConfig = {
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
      id: "wallet",
      label: "Wallet",
      icon: <CreditCard className="w-5 h-5" />,
      path: "/hospital-admin/wallet",
    },
    {
      id: "plans",
      label: "Subscription Plans",
      icon: <FileText className="w-5 h-5" />,
      path: "/hospital-admin/plans",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/admin/settings",
    },
  ],
};
