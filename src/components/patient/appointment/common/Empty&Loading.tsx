import { Calendar } from "lucide-react";

export const LoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading appointments...</p>
      </div>
    </div>
  );
};

export const EmptyState: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No Appointments Found
      </h3>
      <p className="text-gray-600">
        Try adjusting your filters or book a new appointment
      </p>
    </div>
  );
};
