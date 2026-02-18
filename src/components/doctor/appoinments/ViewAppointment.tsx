// components/ViewAppointment.tsx
import React from "react";
import type { AppointmentDto } from "../../../types/appointment.types";
import { VisitTypeBadge, StatusBadge } from "./Badge";

interface ViewAppointmentProps {
  appointment: AppointmentDto;
  onClose?: () => void;
}

const formatTime = (time: string) => time.slice(0, 5); // "14:30" -> "14:30"
const fullName = (first: string, last: string) => `${first} ${last}`.trim();

export const ViewAppointment: React.FC<ViewAppointmentProps> = ({
  appointment,
}) => {
  const {
    id,
    date,
    startTime,
    timezone,
    visitType,
    status,
    patient,
    address,
    consultationFee,
    discountAmount,
    totalAmount,
    paymentStatus,
    paymentMethod,
    queuePriority,
    isLate,
    createdAt,
  } = appointment;

  return (
    <div className="w-full max-w-3xl rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Appointment details
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {date} · {formatTime(startTime)} ({timezone})
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <VisitTypeBadge visitType={visitType} />
            <StatusBadge status={status} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6 px-6 py-5 md:grid-cols-2">
        {/* Patient */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Patient
          </h3>
          <div className="mt-3 space-y-1.5 text-sm text-slate-700">
            <p className="font-medium text-slate-900">
              {fullName(patient.firstName, patient.lastName)}
            </p>
            <p>Phone: {patient.phone}</p>
            <p>Email: {patient.email}</p>
          </div>
        </section>

        {/* Appointment meta */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Appointment
          </h3>
          <dl className="mt-3 space-y-1.5 text-sm text-slate-700">
            <div className="flex justify-between">
              <dt className="text-slate-500">Appointment Id</dt>
              <dd className="text-slate-900">{id.slice(-18)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Time</dt>
              <dd className="font-medium text-slate-900">
                {formatTime(startTime)} ({timezone})
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Queue priority</dt>
              <dd className="text-slate-900">#{queuePriority}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Late</dt>
              <dd className="text-slate-900">{isLate ? "Yes" : "No"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Created</dt>
              <dd className="text-slate-900">
                {new Date(createdAt).toLocaleString()}
              </dd>
            </div>
          </dl>
        </section>

        {/* Billing */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Billing
          </h3>
          <dl className="mt-3 space-y-1.5 text-sm text-slate-700">
            <div className="flex justify-between">
              <dt className="text-slate-500">Consultation fee</dt>
              <dd className="text-slate-900">₹{consultationFee}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Discount</dt>
              <dd className="text-slate-900">₹{discountAmount}</dd>
            </div>
            <div className="flex justify-between border-t border-dashed border-slate-200 pt-2">
              <dt className="font-medium text-slate-900">Total</dt>
              <dd className="font-semibold text-slate-900">₹{totalAmount}</dd>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-slate-500">Payment</span>
              <span className="font-medium text-slate-900">
                {paymentStatus} · {paymentMethod}
              </span>
            </div>
          </dl>
        </section>

        {/* Location */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Location
          </h3>
          <div className="mt-3 space-y-1.5 text-sm text-slate-700">
            <p className="font-medium text-slate-900">{address.city}</p>
            <p>{address.street}</p>
            <p>
              {address.state}, {address.country} · {address.zip}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
