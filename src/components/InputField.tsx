import { Info } from "lucide-react";

interface InputFieldProps {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string;
    normalRange: string;
    }

const InputField = ({ name, label, value, onChange, error, normalRange }: InputFieldProps) => (
  <div className="relative">
    <div className="flex items-center">
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label}`}
        className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none transition-colors duration-300 ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500"
        }`}
      />
      <div className="relative ml-2 group">
        <Info size={18} className="text-gray-400 cursor-help" />
        <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-white border border-gray-200 rounded p-2 shadow-lg z-10">
          <p className="text-sm text-gray-600">Normal range: {normalRange}</p>
        </div>
      </div>
    </div>
    <label
      className={`absolute left-3 -top-2.5 bg-gray-50 px-1 text-sm transition-all duration-300 ${
        value ? "text-blue-500" : "text-gray-500"
      }`}
    >
      {label}
    </label>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default InputField;
