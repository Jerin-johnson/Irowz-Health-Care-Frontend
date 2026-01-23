import type { AppointmentStatus } from "../types/patient/appointmentListingPatient.type";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const isToday = (dateString: string): boolean => {
  const today = new Date().toISOString().split("T")[0];
  return dateString === today;
};

export const isTomorrow = (dateString: string): boolean => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return dateString === tomorrow.toISOString().split("T")[0];
};

export const canViewLiveStatus = (
  date: string,
  status: AppointmentStatus,
): boolean => {
  return (isToday(date) || isTomorrow(date)) && status === "BOOKED";
};
