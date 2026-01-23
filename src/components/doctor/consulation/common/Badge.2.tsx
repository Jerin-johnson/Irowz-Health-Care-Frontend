import { X } from "lucide-react";

const Badge: React.FC<{
  children: React.ReactNode;
  variant?: "blue" | "purple" | "green" | "gray";
  onRemove?: () => void;
}> = ({ children, variant = "blue", onRemove }) => {
  const variants = {
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    green: "bg-green-100 text-green-700",
    gray: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${variants[variant]}`}
    >
      {children}
      {onRemove && (
        <button onClick={onRemove} className="hover:opacity-70">
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};

export default Badge;
