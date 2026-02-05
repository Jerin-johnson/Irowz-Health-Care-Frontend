import {
  Activity,
  Building2,
  Calendar,
  Clock,
  Eye,
  Video,
  X,
} from "lucide-react";
import type { Appointment } from "../../../types/patient/appointmentListingPatient.type";
import StatusBadge from "./common/StatusBadge";
import {
  canViewLiveStatus,
  formatDate,
} from "../../../utils/patientAppointment.listng";

interface AppointmentCardProps {
  appointment: Appointment;
  onView: (id: string) => void;
  onCancel: (id: string) => void;
  onReschedule: (id: string, doctorId: string) => void;
  onViewLiveStatus: (id: string) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onView,
  onCancel,
  onReschedule,
  onViewLiveStatus,
}) => {
  const showLiveStatus = canViewLiveStatus(
    appointment.date,
    appointment.status,
  );
  const canCancel =
    appointment.status === "BOOKED" && !appointment.isRescheduleAppointment;

  const availabilityAffected =
    canCancel && appointment.availabilityAffected?.isAffected === true;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 font-semibold text-lg">
              {appointment.doctorId.firstName.charAt(0)}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="text-lg font-semibold text-gray-900">
                {`${appointment.doctorId.firstName} ${appointment.doctorId.lastName}`}
              </h3>
              <StatusBadge status={appointment.status} />
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-2 flex-wrap">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(appointment.date)}</span>
                <Clock className="w-4 h-4 ml-2" />
                <span>{appointment.startTime}</span>
              </div>

              <div className="flex items-center gap-2">
                {appointment.visitType === "ONLINE" ? (
                  <>
                    <Video className="w-4 h-4" />
                    <span>Video Call</span>
                  </>
                ) : (
                  <>
                    <Building2 className="w-4 h-4" />
                    <span>Direct Visit</span>
                  </>
                )}
              </div>

              <div className="text-xs text-gray-500 mt-1">
                {appointment.patientSnapshot.email} •{" "}
                {appointment.patientSnapshot.phone}
              </div>
              {availabilityAffected && (
                <h4 className="text-xs text-red-500 mt-1">
                  Action required...cancel or reschedule appointment
                </h4>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:flex-shrink-0">
          {showLiveStatus && (
            <button
              onClick={() => onViewLiveStatus(appointment._id)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              <Activity className="w-4 h-4" />
              Live Status
            </button>
          )}

          <button
            onClick={() => onView(appointment._id)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            <Eye className="w-4 h-4" />
            View
          </button>

          {canCancel && (
            <button
              onClick={() => onCancel(appointment._id)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          )}

          {canCancel && (
            <button
              onClick={() =>
                onReschedule(appointment._id, appointment.doctorId._id)
              }
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              <Calendar className="w-4 h-4" />
              Reschedule
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
