import React from "react";
import {
  Clock,
  Users,
  Activity,
  Coffee,
  XCircle,
  Calendar,
} from "lucide-react";
import type { QueueStatusResponse } from "../../../types/patient/liveQueue.types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchLiveQueueApi } from "../../../api/apiService/patient/appointment";
import {
  formatWaitTime,
  getStatusConfigLiveQueue,
} from "../../../utils/liveQueue";
import { usePatientQueueSocket } from "../../../hooks/patient/queue/usePatientQueueSocket";
import { useAppSelector } from "../../../store/hooks";

const PatientLiveQueueStatus: React.FC = () => {
  const { id } = useParams();

  const userId = useAppSelector((state) => state.auth.userId);
  usePatientQueueSocket(userId, id as string);

  const {
    data: queueStatus,
    isPending,
    error,
  } = useQuery<QueueStatusResponse>({
    queryKey: ["patient:live:queue", id],
    queryFn: () => fetchLiveQueueApi(id as string),
    enabled: !!id,
    refetchInterval: 10_000,
  });

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading queue status…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border border-red-200 rounded-lg p-6 max-w-md text-center">
          <XCircle className="w-10 h-10 text-red-600 mx-auto mb-3" />
          <p className="text-gray-700">
            {error instanceof Error
              ? error.message
              : "Failed to load queue status"}
          </p>
        </div>
      </div>
    );
  }

  if (!queueStatus) return null;

  const {
    patientState,
    doctorStatus,
    queuePosition,
    patientsAhead,
    estimatedWaitMinutes,
    appointmentId,
    message,
    patientInfo,
  } = queueStatus;

  const config = getStatusConfigLiveQueue(patientState, doctorStatus);
  const StatusIcon = config.icon;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Patient Info */}
        {patientInfo && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {patientInfo.name}
              </h1>
              <div className="flex gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{patientInfo.appointmentDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{patientInfo.appointmentTime}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-500">Appointment ID</div>
              <div className="text-sm font-medium text-gray-900">
                {appointmentId}
              </div>
            </div>
          </div>
        )}

        {/* Status Card */}
        <div
          className={`bg-${config.color}-50 border-2 border-${config.color}-200 rounded-lg p-8`}
        >
          <div className="text-center">
            <div
              className={`w-20 h-20 mx-auto mb-4 rounded-full bg-${config.color}-100 flex items-center justify-center`}
            >
              <StatusIcon className={`w-10 h-10 text-${config.color}-600`} />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {config.title}
            </h2>

            <p className="text-gray-700">{config.description}</p>

            {message && (
              <p className="text-sm text-gray-500 mt-2 italic">{message}</p>
            )}
          </div>

          {/* Queue Details */}
          {["WAITING", "NEXT", "ONGOING"].includes(patientState) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {queuePosition !== null && (
                <Metric label="Your Position" value={queuePosition} />
              )}
              {patientsAhead !== null && (
                <Metric
                  label="Patients Ahead"
                  value={patientsAhead}
                  icon={<Users className="w-5 h-5" />}
                />
              )}
              {estimatedWaitMinutes !== null && (
                <Metric
                  label="Estimated Wait"
                  value={formatWaitTime(estimatedWaitMinutes)}
                  icon={<Clock className="w-5 h-5" />}
                />
              )}
            </div>
          )}

          {/* Doctor Status */}
          {doctorStatus && (
            <div className="mt-6 flex justify-center">
              {doctorStatus === "CONSULTING" && (
                <StatusPill
                  color="green"
                  text="Doctor is Consulting"
                  icon={<Activity className="w-4 h-4" />}
                />
              )}
              {doctorStatus === "ON_LUNCH_BREAK" && (
                <StatusPill
                  color="orange"
                  text="Doctor is on Lunch Break"
                  icon={<Coffee className="w-4 h-4" />}
                />
              )}
              {doctorStatus === "NOT_STARTED" && (
                <StatusPill
                  color="gray"
                  text="Consultations Not Started Yet"
                  icon={<Clock className="w-4 h-4" />}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Metric = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <div className="bg-white border rounded-lg p-4 text-center">
    <div className="flex items-center justify-center gap-2 text-xl font-bold text-gray-900">
      {icon}
      {value}
    </div>
    <div className="text-sm text-gray-600 mt-1">{label}</div>
  </div>
);

const StatusPill = ({
  text,
  icon,
  color,
}: {
  text: string;
  icon: React.ReactNode;
  color: "green" | "orange" | "gray";
}) => {
  const map = {
    green: "bg-green-100 text-green-700",
    orange: "bg-orange-100 text-orange-700",
    gray: "bg-gray-100 text-gray-700",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${map[color]}`}
    >
      {icon}
      {text}
    </div>
  );
};

export default PatientLiveQueueStatus;
