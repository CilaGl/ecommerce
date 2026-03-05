import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "secondary",
  size = "medium",
  disabled = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-emerald-900 hover:bg-green-700 text-white focus:ring-green-500 hover:bg-rose-950",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
    success: "bg-blue-400 hover:bg-blue-700 text-white focus:ring-blue-500",
    danger: "bg-red-400 hover:bg-red-700 text-white focus:ring-red-500",
    outline:
      "bg-zinc-100 border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-blue-500",
  };

  const sizes = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
