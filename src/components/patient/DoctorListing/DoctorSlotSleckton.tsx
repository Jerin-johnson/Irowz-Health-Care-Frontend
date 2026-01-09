const Skeleton = ({ className }: { className: string }) => (
  <div
    className={`relative overflow-hidden rounded bg-gray-200 animate-pulse ${className}`}
  />
);

const DoctorSlotsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full p-8 space-y-8">
        {/* Header */}
        <div className="flex items-start gap-4">
          <Skeleton className="w-16 h-16 rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>

        {/* Calendar + Slots */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar */}
          <div>
            <div className="flex justify-between mb-4">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-6 w-6" />
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-lg" />
              ))}
            </div>
          </div>

          {/* Slots */}
          <div>
            <Skeleton className="h-5 w-40 mb-4" />

            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-12 w-28 rounded-lg" />
          <Skeleton className="h-12 w-40 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default DoctorSlotsSkeleton;
