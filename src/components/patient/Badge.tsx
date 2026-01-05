interface BadgeProps {
  text: string;
  variant?: "default" | "success" | "warning";
}

export const Badge: React.FC<BadgeProps> = ({ text, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded ${variants[variant]}`}>
      {text}
    </span>
  );
};
