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
  const baseStyles =
    "rounded-lg font-medium transition-all duration-200 ease-in-out " +
    "px-3 py-2 text-sm " +
    "sm:px-4 sm:py-2.5 sm:text-base " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 " +
    "active:scale-[0.98]";

  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400",
    outline:
      "border-2 border-blue-500 text-blue-500 hover:bg-blue-50 active:bg-blue-100",
  };

  const widthStyle = fullWidth ? "w-full" : "inline-flex";
  const disabledStyle = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "cursor-pointer";

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
