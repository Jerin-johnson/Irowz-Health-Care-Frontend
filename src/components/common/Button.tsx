import React from "react";
import type { ButtonProps } from "../../types/landingPage";

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  className = "",
}) => {
  const variants: Record<"primary" | "secondary", string> = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-800 text-white hover:bg-gray-900",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-medium transition ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
