import React, { useState } from "react";
import { Info } from "lucide-react";
import { useABG } from "../contexts/ABGContext";

interface InputFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  normalRange: string;
  units: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  normalRange,
  units,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { state } = useABG();

  return (
    <div className="relative">
      <div className="flex items-center">
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`Enter ${label}`}
          className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none transition-colors duration-300
            ${state.darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}
            ${
              error
                ? "border-red-500 focus:border-red-500"
                : state.darkMode
                ? "border-gray-600 focus:border-blue-400"
                : "border-gray-300 focus:border-blue-500"
            }`}
        />
        <div
          className="relative ml-2 group"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Info
            size={18}
            className={`cursor-help ${
              state.darkMode ? "text-blue-400" : "text-blue-500"
            }`}
          />
          <div
            className={`
              absolute right-0 bottom-full mb-2 
              ${
                state.darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-blue-200"
              }
              border rounded-lg p-3 shadow-lg z-10
              transform origin-bottom-right transition-all duration-200 ease-in-out
              ${
                showTooltip
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-0 pointer-events-none"
              }
            `}
          >
            <p
              className={`text-sm ${
                state.darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <span className="font-semibold">Normal range:</span> {normalRange}{" "}
              {units}
            </p>
            <div
              className={`absolute bottom-0 right-0 transform translate-y-1/2 rotate-45 w-2 h-2 
              ${
                state.darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-blue-200"
              }
              border-r border-b`}
            ></div>
          </div>
        </div>
      </div>
      <label
        className={`absolute left-3 -top-2.5 px-1 text-sm transition-all duration-300
          ${state.darkMode ? "bg-gray-800" : "bg-white"}
          ${
            value
              ? "text-blue-500"
              : state.darkMode
              ? "text-gray-400"
              : "text-gray-500"
          }`}
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
