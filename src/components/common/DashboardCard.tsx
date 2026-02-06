import { ArrowUpRight } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  color = "blue",
}: {
  title: string;
  value: string | number;
  icon: any;
  trend?: { value: number; positive: boolean };
  color?: "blue" | "orange" | "green" | "purple";
}) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    green: "bg-green-50 text-green-700 border-green-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <div
      className={`rounded-xl border p-6 shadow-sm ${colorClasses[color]} transition-all hover:shadow`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
        <div
          className={`rounded-full p-3 ${colorClasses[color]
            .replace("50", "100")
            .replace("text-", "bg-")
            .replace("border-", "")}`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>

      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
          <span className="text-green-600">{trend.value}%</span>
          <span className="ml-1 text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
