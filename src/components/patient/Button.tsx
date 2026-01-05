interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  fullWidth = false,
  disabled = false,
}) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors";
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-50",
  };
  const widthStyle = fullWidth ? "w-full" : "";
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${disabledStyle}`}
    >
      {children}
    </button>
  );
};
