import type { Stats } from "../../../types/doctor/doctor.schudele.types";

const ScheduleStats: React.FC<{ stats: Stats }> = ({ stats }) => (
  <div className="flex gap-6 items-center">
    <div className="text-center">
      <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
      <div className="text-sm text-gray-600">Total Slots</div>
    </div>
    <div className="text-center">
      <div className="text-3xl font-bold text-blue-600">{stats.booked}</div>
      <div className="text-sm text-gray-600">Booked</div>
    </div>
    <div className="text-center">
      <div className="text-3xl font-bold text-green-600">{stats.available}</div>
      <div className="text-sm text-gray-600">Available</div>
    </div>
  </div>
);

export default ScheduleStats;
