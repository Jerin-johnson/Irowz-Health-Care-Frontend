import React, { type ReactNode } from "react";

type StatCardVariant = "blue" | "green" | "red" | "yellow" | "purple";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  variant?: StatCardVariant;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  variant = "blue",
  className = "",
}) => {
  const variants: Record<
    StatCardVariant,
    { border: string; bg: string; text: string }
  > = {
    blue: {
      border: "border-blue-200",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    green: {
      border: "border-green-200",
      bg: "bg-green-50",
      text: "text-green-600",
    },
    red: { border: "border-red-200", bg: "bg-red-50", text: "text-red-600" },
    yellow: {
      border: "border-yellow-200",
      bg: "bg-yellow-50",
      text: "text-yellow-600",
    },
    purple: {
      border: "border-purple-200",
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
  };

  const colors = variants[variant];

  return (
    <div
      className={`bg-white rounded-lg p-5 border-2 ${colors.border} ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className={`text-3xl font-bold ${colors.text}`}>{value}</p>
        </div>
        <div className={`${colors.bg} p-3 rounded-lg`}>{icon}</div>
      </div>
    </div>
  );
};
