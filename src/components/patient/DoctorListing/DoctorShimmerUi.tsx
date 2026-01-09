import { User } from "lucide-react";

export const DoctorCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex gap-4">
        {/* Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center">
            <User className="text-gray-300" size={40} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
              <div className="h-3 w-24 bg-blue-100 rounded"></div>
              <div className="h-3 w-28 bg-gray-200 rounded"></div>
            </div>

            <div className="space-y-2 text-right">
              <div className="h-3 w-16 bg-gray-200 rounded ml-auto"></div>
              <div className="h-3 w-20 bg-gray-200 rounded ml-auto"></div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-2">
            <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
            <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
          </div>

          {/* Clinic Info */}
          <div className="space-y-2">
            <div className="h-3 w-52 bg-gray-200 rounded"></div>
            <div className="h-3 w-44 bg-gray-200 rounded"></div>
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4">
            <div className="h-6 w-24 bg-green-100 rounded-full"></div>
            <div className="h-9 w-28 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
