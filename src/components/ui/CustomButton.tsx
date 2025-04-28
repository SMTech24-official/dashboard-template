import React from "react";
import Spinner from "./Spinner";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
};

const CustomButton = ({
  children,
  onClick,
  type = "button",
  isLoading = false,
  disabled = false,
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        cursor-pointer 
        text-md 
        font-semibold 
        text-blue-600 
        bg-gray-50 
        py-1 px-2
        rounded-lg 
        border-[3px] 
        border-indigo-300 
        shadow-[0_8px_#1f35ff]
        active:relative 
        active:top-2 
        active:border-indigo-400 
        active:shadow-none
        disabled:opacity-70
        disabled:cursor-not-allowed
        transition-all
        duration-200
        ${className}
      `}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Spinner className="h-4 w-4" /> {/* Adjust spinner size as needed */}
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default CustomButton;
