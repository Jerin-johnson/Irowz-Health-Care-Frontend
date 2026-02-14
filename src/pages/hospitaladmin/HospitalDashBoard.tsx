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
import { Activity, CheckCircle2, Users } from "lucide-react";
import { format } from "date-fns";
import StatCard from "../../components/common/DashboardCard";
import { useQuery } from "@tanstack/react-query";
import { fetchHosptialAdminDashboard } from "../../api/apiService/hospitalAdmin/Dashboard";

interface Subscription {
  planName: string;
  doctorLimit: number;
  price: number;
  startDate: string;
  endDate: string;
  status: string;
}

interface Totals {
  doctors: number;
  specialties: number;
  patients: number;
  appointments: number;
}

interface MonthlyData {
  month: number;
  label: string;
  patients?: number;
  revenue?: number;
}

interface DashboardData {
  subscription: Subscription;
  totals: Totals;
  patientGrowth: MonthlyData[];
  revenueStats: MonthlyData[];
}

const HospitalAdminDashboard: React.FC = () => {
  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ["hospital-admin-dashboard"],
    queryFn: fetchHosptialAdminDashboard,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  if (!data) return <div>Error loading data</div>;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);

  const formatNumber = (num: number) => num.toLocaleString();

  const formatDate = (date: string) => format(new Date(date), "MMM dd, yyyy");

  function calculateGrowthPercent(current: number, previous: number): number {
    if (previous === 0) return 0; // avoid divide by zero
    return Number((((current - previous) / previous) * 100).toFixed(2));
  }

  const patientGrowthArr = data.patientGrowth;

  const patientGrowthPercent =
    patientGrowthArr.length >= 2
      ? calculateGrowthPercent(
          patientGrowthArr[patientGrowthArr.length - 1].patients ?? 0,
          patientGrowthArr[patientGrowthArr.length - 2].patients ?? 0,
        )
      : 0;
  const revenueArr = data.revenueStats;

  console.log(revenueArr);

  // const revenueGrowthPercent =
  //   revenueArr.length >= 2
  //     ? calculateGrowthPercent(
  //         revenueArr[revenueArr.length - 1].revenue ?? 0,
  //         revenueArr[revenueArr.length - 2].revenue ?? 0,
  //       )
  //     : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Hospital Admin Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your hospital's operations, doctors, and performance metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Doctors"
          value={formatNumber(data.totals.doctors)}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Specialties"
          value={formatNumber(data.totals.specialties)}
          icon={Activity}
          color="orange"
        />
        <StatCard
          title="Total Patients"
          value={formatNumber(data.totals.patients)}
          icon={Users}
          color="green"
          trend={{ value: patientGrowthPercent, positive: true }}
        />
        <StatCard
          title="Total Appointments"
          value={formatNumber(data.totals.appointments)}
          icon={CheckCircle2}
          color="purple"
        />
      </div>

      <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Subscription Details */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Subscription Details</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Plan</span>
              <span className="text-xl font-bold">
                {data.subscription.planName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Doctor Limit</span>
              <span className="font-bold">{data.subscription.doctorLimit}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Price</span>
              <span className="font-bold">
                {formatCurrency(data.subscription.price)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Start Date</span>
              <span>{formatDate(data.subscription.startDate)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">End Date</span>
              <span>{formatDate(data.subscription.endDate)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Status</span>
              <span
                className={`font-bold ${data.subscription.status === "ACTIVE" ? "text-green-600" : "text-red-600"}`}
              >
                {data.subscription.status}
              </span>
            </div>
          </div>
        </div>

        {/* Patient Growth Chart */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Patient Growth Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data.patientGrowth}
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
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="patients"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.15}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Revenue Trend</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data.revenueStats}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label"
                axisLine={false}
                tick={{ fill: "#6b7280" }}
              />
              <YAxis
                tickFormatter={(value) => `₹${value / 1000}k`}
                axisLine={false}
                tick={{ fill: "#6b7280" }}
              />
              <Tooltip
                formatter={(value: number | undefined) =>
                  formatCurrency(value ?? 0)
                }
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.15}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HospitalAdminDashboard;
