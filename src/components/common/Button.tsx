import React from "react";
import type { ButtonProps } from "../../types/landingPage";

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  fullWidth = false,
  disabled = false,
  className = "",
}) => {
  const variants: Record<"primary" | "secondary", string> = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-800 text-white hover:bg-gray-900",
  };

  const baseClasses = "px-6 py-2 rounded-full font-medium transition";
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
