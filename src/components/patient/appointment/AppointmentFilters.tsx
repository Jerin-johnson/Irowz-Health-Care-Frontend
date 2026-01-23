import type { AppointmentStatus } from "../../../types/patient/appointmentListingPatient.type";

interface AppointmentFiltersProps {
  statusFilter: AppointmentStatus | "ALL";
  dateFilter: string;
  onStatusChange: (status: AppointmentStatus | "ALL") => void;
  onDateChange: (date: string) => void;
  onClear: () => void;
}

const AppointmentFilters: React.FC<AppointmentFiltersProps> = ({
  statusFilter,
  dateFilter,
  onStatusChange,
  onDateChange,
  onClear,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) =>
              onStatusChange(e.target.value as AppointmentStatus | "ALL")
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="ALL">All Appointments</option>
            <option value="BOOKED">Upcoming</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="STARTED">In Progress</option>
            <option value="NO_SHOW">No Show</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Date
          </label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={onClear}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentFilters;
