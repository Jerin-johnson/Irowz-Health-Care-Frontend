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
import {
  AlertCircle,
  CheckCircle2,
  Hospital,
  IndianRupee,
  StethoscopeIcon,
  User,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchSuperAdminDashboard } from "../../../api/apiService/superAdmin/dashboard";
import StatCard from "../../../components/common/DashboardCard";

// ───────────────── TYPES ─────────────────

interface KPI {
  totalUsers: number;
  totalDoctors: number;
  totalHospitals: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  totalRevenue: number;
}

interface Growth {
  newHospitalsThisMonth: number;
  revenueGrowthPercent: number;
}

interface MonthlyRevenue {
  month: string;
  amount: number;
}

interface DashboardData {
  kpis: KPI;
  alerts: { expiringSoon: number };
  growth: Growth;
  charts: { monthlyRevenue: MonthlyRevenue[] };
}

const SuperAdminDashboard: React.FC = () => {
  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ["superadmin:dashboard"],
    queryFn: fetchSuperAdminDashboard,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  if (!data) return <div>Error loading dashboard</div>;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);

  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Super Admin Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Platform-wide control, monitoring, and financial authority
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Hospitals"
          value={formatNumber(data.kpis.totalHospitals)}
          icon={Hospital}
          color="blue"
        />

        <StatCard
          title="Total Doctors"
          value={formatNumber(data.kpis.totalDoctors)}
          icon={StethoscopeIcon}
          color="green"
        />

        <StatCard
          title="Total Patients"
          value={formatNumber(data.kpis.totalUsers)}
          icon={User}
          color="orange"
        />

        <StatCard
          title="Active Subscriptions"
          value={formatNumber(data.kpis.activeSubscriptions)}
          icon={CheckCircle2}
          color="green"
        />

        <StatCard
          title="Monthly Revenue"
          value={formatCurrency(data.kpis.monthlyRevenue)}
          icon={IndianRupee}
          color="purple"
          trend={{
            value: data.growth.revenueGrowthPercent,
            positive: true,
          }}
        />

        <StatCard
          title="Total Revenue"
          value={formatCurrency(data.kpis.totalRevenue)}
          icon={IndianRupee}
          color="orange"
        />

        <StatCard
          title="Plans Expiring Soon"
          value={data.alerts.expiringSoon}
          icon={AlertCircle}
          color="blue"
        />
      </div>

      {/* Revenue Chart */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Monthly Revenue Trend</h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.charts.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="month" />

              <YAxis tickFormatter={(v: number) => `₹${v / 1000}k`} />

              <Tooltip
                formatter={(value: number | undefined) =>
                  formatCurrency(value ?? 0)
                }
              />

              <Area
                type="monotone"
                dataKey="amount"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.15}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
