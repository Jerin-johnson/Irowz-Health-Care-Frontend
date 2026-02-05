import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Stethoscope,
} from "lucide-react";
import type { SidebarConfig } from "../sidebar";

export const doctorConfig: SidebarConfig = {
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
    // {
    //   id: "consultations",
    //   label: "Video Consultations",
    //   icon: <Video className="w-5 h-5" />,
    //   path: "/doctor/consultations",
    // },
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
