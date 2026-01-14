const DoctorProfileShimmer = () => {
  return (
    <>
      {/* Page Header Shimmer */}
      <div className="bg-gray-200 py-8 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="h-8 w-64 bg-gray-300 mx-auto rounded" />
          <div className="h-4 w-48 bg-gray-300 mx-auto mt-3 rounded" />
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50 py-8 px-4 max-w-6xl mx-auto animate-pulse">
        {/* Doctor Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="w-32 h-32 bg-gray-300 rounded-lg" />

            {/* Info */}
            <div className="flex-grow space-y-4">
              <div className="h-6 w-1/3 bg-gray-300 rounded" />
              <div className="h-4 w-1/4 bg-gray-300 rounded" />

              {/* Stars */}
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-300 rounded" />
                ))}
              </div>

              <div className="h-4 w-32 bg-gray-300 rounded" />

              <div className="grid grid-cols-2 gap-4">
                <div className="h-4 bg-gray-300 rounded" />
                <div className="h-4 bg-gray-300 rounded" />
              </div>

              <div className="h-4 w-2/3 bg-gray-300 rounded" />
              <div className="h-6 w-24 bg-gray-300 rounded" />

              <div className="flex gap-3">
                <div className="h-10 w-32 bg-gray-300 rounded" />
                <div className="h-10 w-40 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex border-b">
            {["Overview", "Location", "Reviews"].map((_, i) => (
              <div key={i} className="h-12 w-32 bg-gray-300 m-2 rounded" />
            ))}
          </div>

          <div className="p-6 space-y-4">
            <div className="h-4 w-full bg-gray-300 rounded" />
            <div className="h-4 w-5/6 bg-gray-300 rounded" />
            <div className="h-4 w-4/6 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfileShimmer;
