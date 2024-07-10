import InputGroup from "./InputGroup";

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

const InputSection = ({ inputs, onChange, errors }: InputGroupProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <InputGroup
      title="Acid/Base"
      inputs={[
        {
          name: "ph",
          label: "pH",
          value: inputs.ph,
          normalRange: "7.35 - 7.45",
        },
        {
          name: "paco2",
          label: "PaCO2 (mmHg)",
          value: inputs.paco2,
          normalRange: "35 - 45",
        },
        {
          name: "hco3",
          label: "HCO3- (mEq/L)",
          value: inputs.hco3,
          normalRange: "22 - 26",
        },
      ]}
      onChange={onChange}
      errors={errors}
    />
    <InputGroup
      title="Electrolytes"
      inputs={[
        {
          name: "na",
          label: "Na+ (mEq/L)",
          value: inputs.na,
          normalRange: "135 - 145",
        },
        {
          name: "k",
          label: "K+ (mEq/L)",
          value: inputs.k,
          normalRange: "3.5 - 5.0",
        },
        {
          name: "cl",
          label: "Cl- (mEq/L)",
          value: inputs.cl,
          normalRange: "98 - 106",
        },
        {
          name: "ca",
          label: "Ca2+ (mg/dL)",
          value: inputs.ca,
          normalRange: "8.5 - 10.2",
        },
      ]}
      onChange={onChange}
      errors={errors}
    />
    <InputGroup
      title="Co-oximetry"
      inputs={[
        {
          name: "hb",
          label: "Hb (g/dL)",
          value: inputs.hb,
          normalRange: "12 - 17",
        },
        {
          name: "o2hb",
          label: "O2Hb (%)",
          value: inputs.o2hb,
          normalRange: "94 - 98",
        },
        {
          name: "cohb",
          label: "COHb (%)",
          value: inputs.cohb,
          normalRange: "0.5 - 1.5",
        },
        {
          name: "methb",
          label: "MetHb (%)",
          value: inputs.methb,
          normalRange: "0.0 - 1.5",
        },
      ]}
      onChange={onChange}
      errors={errors}
    />
    <InputGroup
      title="Metabolites"
      inputs={[
        {
          name: "glucose",
          label: "Glucose (mg/dL)",
          value: inputs.glucose,
          normalRange: "70 - 100",
        },
        {
          name: "lactate",
          label: "Lactate (mmol/L)",
          value: inputs.lactate,
          normalRange: "0.5 - 1.0",
        },
      ]}
      onChange={onChange}
      errors={errors}
    />
  </div>
);

export default InputSection;
