import type { SlotStatus } from "../../../types/doctor/doctor.schudele.types";

const StatusBadge: React.FC<{ status: SlotStatus; label: string }> = ({
  status,
  label,
}) => {
  const colors = {
    available: "bg-green-100 text-green-700",
    booked: "bg-blue-100 text-blue-700",
    blocked: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${colors[status]}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          status === "available"
            ? "bg-green-500"
            : status === "booked"
              ? "bg-blue-500"
              : "bg-gray-500"
        }`}
      />
      {label}
    </span>
  );
};

export default StatusBadge;
