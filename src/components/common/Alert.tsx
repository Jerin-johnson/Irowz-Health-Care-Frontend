import type React from "react";
import { Info, CheckCircle, AlertCircle } from "lucide-react";

interface AlertProps {
  message: string;
  type: "info" | "success" | "error";
}

const alertConfig = {
  info: {
    icon: Info,
    className: "bg-blue-50 border-blue-200 text-blue-700",
  },
  success: {
    icon: CheckCircle,
    className: "bg-green-50 border-green-200 text-green-700",
  },
  error: {
    icon: AlertCircle,
    className: "bg-red-50 border-red-200 text-red-700",
  },
};

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const { icon: Icon, className } = alertConfig[type];

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${className}`}
      role="alert"
    >
      <Icon className="mt-0.5 h-5 w-5 flex-shrink-0" />
      <p className="leading-relaxed">{message}</p>
    </div>
  );
};

export default Alert;
