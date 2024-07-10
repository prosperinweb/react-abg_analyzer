import React from "react";
import InputField from "./InputField";
import { useABG } from "../contexts/ABGContext";

interface InputGroupProps {
  title: string;
  inputs: Array<{
    name: string;
    label: string;
    value: string;
    normalRange: string;
    units: string;
  }>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}

const InputGroup: React.FC<InputGroupProps> = ({
  title,
  inputs,
  onChange,
  errors,
}) => {
  const { state } = useABG();

  return (
    <div
      className={`p-4 rounded-lg ${
        state.darkMode ? "bg-gray-800" : "bg-gray-50"
      }`}
    >
      <h2
        className={`text-lg font-semibold mb-4 ${
          state.darkMode ? "text-gray-200" : "text-gray-700"
        }`}
      >
        {title}
      </h2>
      <div className="space-y-4">
        {inputs.map((input) => (
          <InputField
            key={input.name}
            name={input.name}
            label={input.label}
            value={input.value}
            onChange={onChange}
            error={errors[input.name]}
            normalRange={input.normalRange}
            units={input.units}
          />
        ))}
      </div>
    </div>
  );
};

export default InputGroup;
