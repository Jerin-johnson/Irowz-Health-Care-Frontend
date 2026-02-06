import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Activity, Award, Calendar, Star } from "lucide-react";
import StatCard from "../../components/common/DashboardCard";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctorDashboard } from "../../api/apiService/doctor/doctor.dashboard";

interface MonthlyTrend {
  month: number;
  label: string;
  appointments: number;
}

interface Rating {
  averageRating: number;
  totalReviews: number;
}

interface DashboardData {
  totalAppointments: number;
  thisMonthAppointments: number;
  monthlyTrend: MonthlyTrend[];
  rating: Rating;
}

const DoctorDashboard: React.FC = () => {
  const { data, isLoading: loading } = useQuery<DashboardData>({
    queryKey: ["doctor:dashboard"],
    queryFn: fetchDoctorDashboard,
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  if (!data) return <div>Error loading data</div>;

  const formatNumber = (num: number) => num.toLocaleString();

  function calculateGrowthPercent(current: number, previous: number): number {
    if (previous === 0) return 0; // avoid divide by zero
    return Number((((current - previous) / previous) * 100).toFixed(2));
  }

  const appointmentGrowthPercent =
    data.monthlyTrend.length >= 2
      ? calculateGrowthPercent(
          data.monthlyTrend[data.monthlyTrend.length - 1].appointments ?? 0,
          data.monthlyTrend[data.monthlyTrend.length - 2].appointments ?? 0,
        )
      : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Doctor Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Track your appointments, patient feedback, and practice performance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Appointments"
          value={formatNumber(data.totalAppointments)}
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="This Month Appointments"
          value={formatNumber(data.thisMonthAppointments)}
          icon={Activity}
          color="green"
          trend={{
            value: appointmentGrowthPercent,
            positive: appointmentGrowthPercent > 0,
          }}
        />
        <StatCard
          title="Average Rating"
          value={`${data.rating.averageRating.toFixed(1)} ★`}
          icon={Star}
          color="purple"
        />
        <StatCard
          title="Total Reviews"
          value={formatNumber(data.rating.totalReviews)}
          icon={Award}
          color="orange"
        />
      </div>

      <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Appointment Trend Chart */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Appointment Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data.monthlyTrend}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tick={{ fill: "#6b7280" }}
                />
                <YAxis axisLine={false} tick={{ fill: "#6b7280" }} />
                <Tooltip
                  formatter={(value: number | undefined) => value ?? 0}
                  labelFormatter={(label) => `Month: ${label}`}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="appointments"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.15}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rating Overview */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Patient Feedback</h2>
          <div className="space-y-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-purple-600">
                {data.rating.averageRating.toFixed(1)}
              </div>
              <div className="mt-2 flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-8 w-8 ${
                      i < Math.floor(data.rating.averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : i < data.rating.averageRating
                          ? "fill-yellow-400/50 text-yellow-400"
                          : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-3 text-gray-600">
                Based on {formatNumber(data.rating.totalReviews)} reviews
              </p>
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-lg font-medium mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">92%</p>
                  <p className="text-sm text-gray-600">Would recommend</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">4m</p>
                  <p className="text-sm text-gray-600">Avg. response time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder for Upcoming Appointments or Recent Activity
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Upcoming Appointments</h2>
        <div className="space-y-4 text-gray-600">
          <p className="text-center py-8">
            No upcoming appointments data available in current API response.
            <br />
            <span className="text-sm">
              (Add upcoming slots / recent patients section here when API
              supports it)
            </span>
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default DoctorDashboard;
