import type { Slot } from "../../../types/doctor/doctor.schudele.types";

const SlotCard: React.FC<{
  slot: Slot;
  onBlock: () => void;
  onUnblock: () => void;
}> = ({ slot, onBlock, onUnblock }) => {
  const borderColors = {
    available: "border-l-green-500",
    booked: "border-l-blue-500",
    blocked: "border-l-gray-400",
  };

  const bgColors = {
    available: "bg-green-50",
    booked: "bg-blue-50",
    blocked: "bg-gray-50",
  };

  return (
    <div
      className={`border-l-4 ${borderColors[slot.status]} ${bgColors[slot.status]} rounded-lg p-4 min-h-[140px] flex flex-col justify-between`}
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="font-semibold text-gray-900">
            {slot.startTime} – {slot.endTime}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded ${
              slot.status === "available"
                ? "bg-green-200 text-green-800"
                : slot.status === "booked"
                  ? "bg-blue-200 text-blue-800"
                  : "bg-gray-200 text-gray-800"
            }`}
          >
            {slot.status === "blocked"
              ? "unavailable"
              : slot.status === "booked"
                ? "Booked"
                : "Available"}
          </span>
        </div>

        <div className="text-sm text-gray-600 mb-1">{slot.type}</div>

        {slot.patientName && (
          <div className="font-medium text-gray-900 mb-1">
            {slot.patientName}
          </div>
        )}

        {slot.appointmentId && (
          <div className="text-xs text-gray-500">{slot.appointmentId}</div>
        )}

        {slot.note && !slot.patientName && (
          <div className="text-sm text-gray-600">{slot.note}</div>
        )}
      </div>

      {/* 👇 DOCTOR ACTIONS */}
      {slot.status === "available" && (
        <button
          onClick={onBlock}
          className="mt-3 w-full bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Block Slot
        </button>
      )}

      {slot.status === "blocked" && (
        <button
          disabled={true}
          onClick={onUnblock}
          className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          unavailable
        </button>
      )}

      {slot.status === "booked" && (
        <button className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          View Appointment
        </button>
      )}
    </div>
  );
};

export default SlotCard;
