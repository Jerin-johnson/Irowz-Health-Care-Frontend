import React from "react";
import { Calendar, Users, Clock, UserCheck } from "lucide-react";
import Badge from "../../../components/doctor/consulation/common/Badge";
import StatCard, {
  type StatData,
} from "../../../components/doctor/consulation/common/ModifiedStats";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import type { Appointment } from "../../../types/doctor/doctor.live.queue.types";
import { useDoctorQueueSocket } from "../../../hooks/doctor/queue/useDoctorQueueSocket";
import { useDoctorQueueQuery } from "../../../hooks/doctor/queue/useDoctorQueueQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  markAsNoShowApi,
  startConsulationAPi,
} from "../../../api/apiService/doctor/doctor.consultation";
import { notify } from "../../../shared/notification/toast";
import { setPatient } from "../../../store/slice/doctor/consultation.doctor.slice";

const AppointmentsQueue: React.FC = () => {
  const doctorId = useAppSelector((state) => state.auth.doctorId);

  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useDoctorQueueSocket(doctorId as string, today);
  const patientId = useAppSelector(
    (state) => state.doctorConsultation.patientId,
  );

  const queryClient = useQueryClient();

  const { data, isPending } = useDoctorQueueQuery(doctorId as string, today);

  const consulationStartMutationApi = useMutation({
    mutationFn: startConsulationAPi,
    onSuccess: (data) => {
      dispatch(
        setPatient({
          patientId: data.patientId,
          medicalRecordId: data.medicalRecordId,
          appointmentId: data.appointmentId,
        }),
      );
      notify.success(`you started the consulation of ${data.patientName}`);
      navigate(`/doctor/patient/overview/${data.appointmentId}`);
    },
    onError: (error: any) => {
      console.log(error);
      notify.error(error.response.data.message);
    },
  });

  const MarkAsNoShowMutation = useMutation({
    mutationFn: markAsNoShowApi,
    onSuccess: () => {
      notify.success("The patient mark as no show moved last of the queue");
      queryClient.invalidateQueries({
        queryKey: ["doctor:queue", doctorId, today],
      });
    },
    onError: (error: any) => {
      notify.error(error.response.data.message);
    },
  });

  if (isPending) return <div>Loading</div>;
  if (!data || !data.success) return <div>Loading</div>;

  const { appointments, stats, currentAppointmentId, nextAppointmentId } =
    data.data;

  const orderedAppointments = [
    ...appointments.filter((a) => a.status === "STARTED"),
    ...appointments
      .filter((a) => a.status === "BOOKED" || a.status === "NO_SHOW")
      .sort((a, b) => a.queuePriority - b.queuePriority),
    ...appointments.filter((a) =>
      ["COMPLETED", "CANCELLED"].includes(a.status),
    ),
  ];

  const statCards: StatData[] = [
    {
      label: "All Today",
      value: stats.totalToday.toString(),
      icon: <Calendar size={20} />,
      variant: "blue",
    },
    {
      label: "Completed",
      value: stats.completed.toString(),
      icon: <UserCheck size={20} />,
      variant: "green",
    },
    {
      label: "Pending",
      value: stats.pending.toString(),
      icon: <Clock size={20} />,
      variant: "orange",
    },
    {
      label: "In Consultation",
      value: stats.inConsultation.toString(),
      icon: <Users size={20} />,
      variant: "purple",
    },
  ];

  const canStartConsultation = (appointment: Appointment) =>
    (appointment.appointmentId === nextAppointmentId &&
      currentAppointmentId === null) ||
    appointment.status === "NO_SHOW";

  const isActiveConsultation = (appointment: Appointment) =>
    appointment.appointmentId === currentAppointmentId &&
    appointment.status === "STARTED";

  const handleStartConsultation = (appointmentId: string) => {
    consulationStartMutationApi.mutate(appointmentId);
    console.log("Start consultation:", appointmentId);
  };

  const handleResumeConsultation = (appointmentId: string) => {
    if (patientId) {
      navigate(`/doctor/patient/overview/${appointmentId}`);
      return;
    }
    console.log("The appointmentId", appointmentId);
    notify.error("The patient ID does not present actually");
  };

  const handleViewAppointment = (appointmentId: string) => {
    console.log("View appointment:", appointmentId);
    navigate(`/doctor/appointment/${appointmentId}`);
  };

  const handleNoShow = (appointmentId: string) => {
    MarkAsNoShowMutation.mutate(appointmentId);
    console.log("Mark no show:", appointmentId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Today's Appointments
          </h1>
          <p className="text-sm text-gray-500">
            Select a patient to begin consultation
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Visit Type
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {orderedAppointments.map((appointment) => {
                  const canStart = canStartConsultation(appointment);
                  const isActive = isActiveConsultation(appointment);

                  return (
                    <tr
                      key={appointment.appointmentId}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <span className="text-sm font-medium text-gray-900">
                          {appointment.startTime}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="text-sm font-medium text-gray-900">
                          {appointment.patientName}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <Badge variant={appointment.visitType}>
                          {appointment.visitType}
                        </Badge>
                      </td>

                      <td className="py-4 px-4">
                        <Badge variant={appointment.status}>
                          {appointment.status}
                        </Badge>
                      </td>

                      <td className="py-4 px-4 flex gap-2">
                        {canStart && (
                          <>
                            <button
                              onClick={() =>
                                handleStartConsultation(
                                  appointment.appointmentId,
                                )
                              }
                              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors bg-blue-500 hover:bg-blue-600 text-white"
                            >
                              Start Consultation
                            </button>
                            <button
                              onClick={() =>
                                handleNoShow(appointment.appointmentId)
                              }
                              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors bg-red-500 hover:bg-red-600 text-white"
                            >
                              No Show
                            </button>
                          </>
                        )}

                        {isActive && (
                          <>
                            <button
                              onClick={() =>
                                handleResumeConsultation(
                                  appointment.appointmentId,
                                )
                              }
                              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors bg-green-500 hover:bg-green-600 text-white"
                            >
                              Resume
                            </button>

                            <button
                              onClick={() =>
                                handleNoShow(appointment.appointmentId)
                              }
                              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors bg-red-500 hover:bg-red-600 text-white"
                            >
                              No Show
                            </button>
                          </>
                        )}

                        {!canStart && !isActive && (
                          <button
                            onClick={() =>
                              handleViewAppointment(appointment.appointmentId)
                            }
                            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700"
                          >
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsQueue;
