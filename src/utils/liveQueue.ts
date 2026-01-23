import {
  Activity,
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import type {
  DoctorStatus,
  PatientState,
} from "../types/patient/liveQueue.types";

export const formatWaitTime = (minutes?: number | null): string => {
  if (minutes === null || minutes === undefined) return "Calculating...";
  if (minutes <= 0) return "Any moment now";
  if (minutes < 60) return `${minutes} minutes`;

  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} hours` : `${h}h ${m}m`;
};

export const getStatusConfigLiveQueue = (
  state: PatientState,
  doctorStatus?: DoctorStatus,
) => {
  switch (state) {
    case "ONGOING":
      return {
        icon: Activity,
        color: "green",
        title: "Consultation in Progress",
        description: "You are currently with the doctor",
      };

    case "NEXT":
      return {
        icon: AlertCircle,
        color: "blue",
        title: "You're Next",
        description:
          doctorStatus === "ON_LUNCH_BREAK"
            ? "Doctor is on a short break"
            : "Please be ready. You will be called shortly.",
      };

    case "WAITING":
      return {
        icon: Clock,
        color: "amber",
        title: "You are in the Queue",
        description: "Please wait for your turn",
      };

    case "NOT_IN_QUEUE":
      return {
        icon: Calendar,
        color: "gray",
        title: "Not in Today's Queue",
        description: "Live queue is available only on your appointment day",
      };

    case "COMPLETED":
      return {
        icon: CheckCircle,
        color: "green",
        title: "Consultation Completed",
        description: "Your consultation has been completed",
      };

    case "CANCELLED":
    case "NO_SHOW":
      return {
        icon: XCircle,
        color: "red",
        title: "Appointment Closed",
        description: "This appointment is no longer active",
      };

    default:
      return {
        icon: Clock,
        color: "gray",
        title: "Queue Status",
        description: "Fetching status...",
      };
  }
};
