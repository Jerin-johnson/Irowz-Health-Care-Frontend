import React, { useState } from "react";

import type {
  Appointment,
  AppointmentStatus,
} from "../../../types/patient/appointmentListingPatient.type";
// import { getFilteredAppointments } from "../../../utils/patientAppointment.listng";
import {
  EmptyState,
  LoadingState,
} from "../../../components/patient/appointment/common/Empty&Loading";
import AppointmentFilters from "../../../components/patient/appointment/AppointmentFilters";
import AppointmentCard from "../../../components/patient/appointment/AppointmentCard";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../../store/hooks";
import { Pagination } from "../../../components/common/Pagination";
import { fetchPatientAppointments } from "../../../api/apiService/patient/appointment";
import { notify } from "../../../shared/notification/toast";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

const PatientAppointments: React.FC = () => {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.auth.userId);
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "ALL">(
    "ALL",
  );
  const [dateFilter, setDateFilter] = useState<string>("");

  const [page, setPage] = useState(1);

  const handleClearFilters = () => {
    setStatusFilter("ALL");
    setDateFilter("");
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["patient:appointments", userId, statusFilter, dateFilter, page],
    queryFn: () =>
      fetchPatientAppointments({
        status: statusFilter !== "ALL" ? statusFilter : undefined,
        date: dateFilter || undefined,
        page,
        limit: PAGE_SIZE,
      }),
    enabled: !!userId,
  });

  const appointments: Appointment[] = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleViewAppointment = (appointmentId: string) => {
    console.log("View appointment:", appointmentId);
    navigate(`/patient/appointments/${appointmentId}`);
    return;
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      const response = await fetch(
        `/api/appointments/${appointmentId}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to cancel appointment");
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Failed to cancel appointment. Please try again.");
    }
  };

  const handleViewLiveStatus = (appointmentId: string) => {
    console.log("View live status:", appointmentId);
    navigate(`/patient/appointment/queue/${appointmentId}`);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    notify.error("something went wrong");
    return <EmptyState />;
  }

  console.log("The appointment is", appointments);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Appointments
          </h1>
          <p className="text-gray-600">
            View and manage your medical appointments
          </p>
        </header>

        <AppointmentFilters
          statusFilter={statusFilter}
          dateFilter={dateFilter}
          onStatusChange={(status) => {
            setStatusFilter(status);
            setPage(1);
          }}
          onDateChange={(date) => {
            setDateFilter(date);
            setPage(1);
          }}
          onClear={handleClearFilters}
        />

        <div className="space-y-4">
          {appointments.length === 0 ? (
            <EmptyState />
          ) : (
            appointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onView={handleViewAppointment}
                onCancel={handleCancelAppointment}
                onViewLiveStatus={handleViewLiveStatus}
              />
            ))
          )}
        </div>

        {appointments.length > 0 && (
          <footer className="mt-6 text-center text-sm text-gray-600">
            Showing {appointments.length} of {appointments.length} appointments
          </footer>
        )}
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            key={`pagination-${page}`}
          />
        )}
      </div>
    </div>
  );
};

export default PatientAppointments;
