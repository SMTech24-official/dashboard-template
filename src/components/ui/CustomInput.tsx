import React from "react";

type Option = {
  value: string | number;
  label: string;
  image?: string;
};

type CustomInputProps = {
  label?: string;
  type?: "text" | "textarea" | "select" | "password" | "email" | "number" | "image" | "radio";
  value?: string | number | File;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onImageChange?: (file: File) => void;
  fullWidth?: boolean;
  placeholder?: string;
  rows?: number;
  className?: string;
  options?: Option[];
  name?: string;
  disabled?: boolean;
  required?: boolean;
  imagePreviewUrl?: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  onImageChange,
  fullWidth = false,
  placeholder = "",
  rows = 3,
  className = "",
  options = [],
  imagePreviewUrl,
  ...props
}) => {
  const baseInputClasses = `bg-secondary rounded border-gray-300 focus:border-blue-500 outline-none px-3 ${
    type !== "radio" ? "py-4 px-1" : ""
  } ${fullWidth ? "w-full" : "w-1/2"} ${className}`;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange?.(e.target.files[0]);
    }
  };

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            className={`${baseInputClasses} resize-none`}
            value={value as string}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        );
      case "select":
        return (
          <select
            className={baseInputClasses}
            value={value as string}
            onChange={onChange}
            {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.image ? (
                  <div className="flex items-center">
                    <img src={option.image} alt="" className="w-6 h-6 mr-2" />
                    {option.label}
                  </div>
                ) : (
                  option.label
                )}
              </option>
            ))}
          </select>
        );
      case "radio":
        return (
          <div className="space-y-2">
            {/* Group label for radio buttons */}
            {label && (
              <div className="block text-gray-700 text-md font-medium mb-2 ml-1">
                {label}
              </div>
            )}
            <div className="flex flex-wrap gap-4">
              {options.map((option) => (
                <label key={option.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    className="text-blue-500 focus:ring-blue-500"
                    checked={value === option.value}
                    onChange={onChange}
                    value={option.value}
                    {...props}
                  />
                  {option.image ? (
                    <div className="flex items-center">
                      <img src={option.image} alt="" className="w-6 h-6 mr-2" />
                      <span>{option.label}</span>
                    </div>
                  ) : (
                    <span>{option.label}</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        );
      case "image":
        return (
          <div className="flex flex-col items-center">
            {imagePreviewUrl && (
              <img
                src={imagePreviewUrl}
                alt="Preview"
                className="w-32 h-32 object-cover mb-2 rounded"
              />
            )}
            <input
              type="file"
              accept="image/*"
              className={`${baseInputClasses} p-2`}
              onChange={handleImageChange}
              {...props}
            />
          </div>
        );
      default:
        return (
          <input
            type={type}
            className={baseInputClasses}
            value={value as string}
            onChange={onChange}
            placeholder={placeholder}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        );
    }
  };

  return (
    <div className="mb-3">
      {/* Render label only for non-radio inputs (radio labels are handled inside renderInput) */}
      {label && type !== "radio" && (
        <label className="block text-gray-700 text-md font-medium mb-2 ml-1">
          {label}
        </label>
      )}
      {renderInput()}
    </div>
  );
};

export default CustomInput;