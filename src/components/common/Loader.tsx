const HealthcareDotsLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50">
    <div className="space-y-8">
      {/* Three dots */}
      <div className="flex items-center justify-center space-x-3">
        <div
          className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"
          style={{ animationDelay: "200ms" }}
        ></div>
        <div
          className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"
          style={{ animationDelay: "400ms" }}
        ></div>
      </div>

      {/* Optional status text */}
      <div className="text-center">
        <p className="text-slate-700 font-semibold text-base">Processing</p>
        <p className="text-slate-500 text-sm mt-1">Please wait a moment</p>
      </div>
    </div>
  </div>
);

export default function Loader() {
  return <HealthcareDotsLoader />;
}
