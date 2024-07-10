import InputField from "./InputField";

interface InputGroupProps {
  title: string;
  inputs: {
    name: string;
    label: string;
    value: string;
    normalRange: string;
  }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}

const InputGroup = ({ title, inputs, onChange, errors }: InputGroupProps) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
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
        />
      ))}
    </div>
  </div>
);

export default InputGroup;
