import React from "react";
import { Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";
import StatCard from "../../../components/common/DashboardCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPatientDashboard } from "../../../api/apiService/patient/dashboard";

interface UpcomingAppointment {
  appointmentId: string;
  doctorId: string;
  date: string;
  startTime: string;
  visitType: string;
  status: string;
}

interface ActionRequired {
  appointmentId: string;
  reason: string;
  message: string;
}

interface Stats {
  total: number;
  completed: number;
  cancelled: number;
  noShow: number;
}

interface Bmi {
  value: number;
  category: string;
}

interface DashboardData {
  upcomingAppointments: UpcomingAppointment[];
  actionsRequired: ActionRequired[];
  stats: Stats;
  bmi: Bmi;
}

const BmiCircle = ({
  value,
  category,
}: {
  value: number;
  category: string;
}) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(value / 40, 1); // assuming 40 as max reasonable BMI
  const offset = circumference - percentage * circumference;

  const getColor = () => {
    if (value < 18.5) return "#3b82f6"; // Underweight - blue
    if (value < 25) return "#22c55e"; // Normal - green
    if (value < 30) return "#f59e0b"; // Overweight - amber
    return "#ef4444"; // Obese - red
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180">
        {/* Background circle */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="14"
        />
        {/* Progress circle */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="14"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 90 90)"
        />
        {/* Text in center */}
        <text
          x="90"
          y="85"
          textAnchor="middle"
          className="text-4xl font-bold"
          fill="#1f2937"
        >
          {value.toFixed(1)}
        </text>
        <text
          x="90"
          y="110"
          textAnchor="middle"
          className="text-lg"
          fill="#6b7280"
        >
          BMI
        </text>
      </svg>
      <div className="mt-4 text-center">
        <p className="text-xl font-semibold" style={{ color: getColor() }}>
          {category}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {value < 18.5
            ? "Underweight"
            : value < 25
              ? "Healthy range"
              : value < 30
                ? "Overweight"
                : "Obese"}
        </p>
      </div>
    </div>
  );
};

const PatientDashboard: React.FC = () => {
  const { data, isLoading: loading } = useQuery<DashboardData>({
    queryKey: ["patient:dashboard"],
    queryFn: fetchPatientDashboard,
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-gray-500">Loading your dashboard...</div>
      </div>
    );
  }

  if (!data) return <div>Error loading data</div>;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Patient Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Your health overview, upcoming visits, and recent activity
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Appointments"
          value={data.stats.total}
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="Completed"
          value={data.stats.completed}
          icon={CheckCircle2}
          color="green"
        />
        <StatCard
          title="Cancelled"
          value={data.stats.cancelled}
          icon={XCircle}
          color="orange"
        />
        <StatCard
          title="No-Shows"
          value={data.stats.noShow}
          icon={Clock}
          color="orange"
        />
      </div>

      <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* BMI Section */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Your BMI</h2>
          <BmiCircle value={data.bmi.value} category={data.bmi.category} />
        </div>

        {/* Upcoming Appointments */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Upcoming Appointments</h2>
          {data.upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {data.upcomingAppointments.map((appt) => (
                <div
                  key={appt.appointmentId}
                  className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">{appt.visitType} Visit</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(appt.date)} at {appt.startTime}
                    </p>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-gray-500">
              No upcoming appointments scheduled.
            </div>
          )}

          {data.actionsRequired.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="mb-4 font-medium text-amber-800">
                Actions Required
              </h3>
              {data.actionsRequired.map((action) => (
                <div
                  key={action.appointmentId}
                  className="mb-3 rounded-lg bg-amber-50 p-4"
                >
                  <p className="font-medium text-amber-800">{action.message}</p>
                  <p className="mt-1 text-sm text-amber-700">
                    Appointment ID: {action.appointmentId.slice(0, 8)}...
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Placeholder for Health Trends or Activity Log */}
      {/* <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Health Activity</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { month: "Jan", value: 22.1 },
                { month: "Feb", value: 22.8 },
                { month: "Mar", value: 23.4 },
              ]} // Placeholder - replace with real data when available
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tick={{ fill: "#6b7280" }}
              />
              <YAxis axisLine={false} tick={{ fill: "#6b7280" }} />
              <Tooltip
                formatter={(value: number | undefined) =>
                  `${value?.toFixed(1)} BMI`
                }
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.15}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-center text-sm text-gray-500">
          BMI trend (placeholder — connect real historical data when available)
        </p>
      </div> */}
    </div>
  );
};

export default PatientDashboard;
