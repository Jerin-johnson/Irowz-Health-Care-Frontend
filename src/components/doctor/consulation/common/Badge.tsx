// Badge Component
const Badge: React.FC<{ children: React.ReactNode; variant: string }> = ({
  children,
  variant,
}) => {
  const variants: Record<string, string> = {
    opd: "bg-blue-100 text-blue-700",
    revisit: "bg-purple-100 text-purple-700",
    confirmed: "bg-blue-500 text-white",
    booked: "bg-orange-500 text-white",
    completed: "bg-green-500 text-white",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        variants[variant.toLowerCase()] || "bg-gray-100 text-gray-700"
      }`}
    >
      {children}
    </span>
  );
};

export default Badge;
