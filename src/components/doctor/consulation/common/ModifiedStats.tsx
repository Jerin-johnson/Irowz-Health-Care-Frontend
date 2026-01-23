export interface StatData {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  variant: "blue" | "green" | "orange" | "purple";
}

// Reusable StatCard Component
const StatCard: React.FC<StatData & { className?: string }> = ({
  label,
  value,
  icon,
  variant,
  className = "",
}) => {
  const variants = {
    blue: {
      border: "border-blue-100",
      iconBg: "bg-blue-500",
    },
    green: {
      border: "border-green-100",
      iconBg: "bg-green-500",
    },
    orange: {
      border: "border-orange-100",
      iconBg: "bg-orange-500",
    },
    purple: {
      border: "border-purple-100",
      iconBg: "bg-purple-500",
    },
  };

  const colors = variants[variant];

  return (
    <div
      className={`bg-white rounded-xl p-4 border ${colors.border} shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
            {label}
          </p>
          <p className="text-2xl font-bold text-gray-900 tabular-nums">
            {value}
          </p>
        </div>
        <div
          className={`${colors.iconBg} p-2.5 rounded-lg flex-shrink-0 text-white`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
