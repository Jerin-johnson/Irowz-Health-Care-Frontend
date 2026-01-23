const Button: React.FC<{
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "danger";
  icon?: React.ReactNode;
  fullWidth?: boolean;
  type?: "button" | "submit";
}> = ({
  onClick,
  children,
  variant = "primary",
  icon,
  fullWidth,
  type = "button",
}) => {
  const baseClasses =
    "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${fullWidth ? "w-full" : ""}`}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
