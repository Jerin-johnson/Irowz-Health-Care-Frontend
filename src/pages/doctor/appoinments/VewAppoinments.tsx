import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ViewAppointment } from "../../../components/doctor/appoinments/ViewAppointment";
import { fetchAppointment } from "../../../api/apiService/doctor/doctor.consultation";

export const AppointmentViewPage: React.FC = () => {
  const { id: appointmentId } = useParams();
  const navigate = useNavigate();
  const {
    data: appointment,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () => fetchAppointment(appointmentId as string),
    enabled: !!appointmentId,
  });

  function onBack() {
    navigate(-1);
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-500">Loading appointment…</p>
      </div>
    );
  }

  if (isError || !appointment) {
    return (
      <div className="p-6">
        <p className="mb-3 text-sm text-red-600">
          {(error as Error)?.message ?? "Unable to load appointment"}
        </p>
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Optional back button */}
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          ← Back to appointments
        </button>

        {appointment && (
          <ViewAppointment appointment={appointment} onClose={onBack} />
        )}
      </div>
    </div>
  );
};
