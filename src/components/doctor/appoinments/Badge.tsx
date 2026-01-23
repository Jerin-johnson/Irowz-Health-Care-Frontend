// components/AppointmentBadges.tsx
import React from "react";
import type {
  AppointmentStatus,
  VisitType,
} from "../../../types/appointment.types";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
  >
    {children}
  </span>
);

export const StatusBadge: React.FC<{ status: AppointmentStatus }> = ({
  status,
}) => {
  const map: Record<AppointmentStatus, string> = {
    BOOKED: "bg-orange-100 text-orange-700 ring-1 ring-orange-200",
    COMPLETED: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
    CANCELLED: "bg-red-100 text-red-700 ring-1 ring-red-200",
    NO_SHOW: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
  };

  return <Badge className={map[status]}>{status.replace("_", " ")}</Badge>;
};

export const VisitTypeBadge: React.FC<{ visitType: VisitType }> = ({
  visitType,
}) => {
  const map: Record<VisitType, string> = {
    OPD: "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
    ONLINE: "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200",
    HOME_VISIT: "bg-teal-100 text-teal-700 ring-1 ring-teal-200",
  };

  return <Badge className={map[visitType]}>{visitType}</Badge>;
};
