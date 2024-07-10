import React from "react";
import InputGroup from "./InputGroup";

import { InputValues } from "../types";
import { useABG } from "../contexts/ABGContext";
import {
  ACID_BASE,
  ELECTROLYTES,
  CO_OXIMETRY,
  METABOLITES,
} from "../utils/constants";

const InputSection: React.FC = () => {
  const { state, dispatch } = useABG();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_INPUT", payload: { name, value } });
  };

  const createInputGroup = (
    title: string,
    group:
      | typeof ACID_BASE
      | typeof ELECTROLYTES
      | typeof CO_OXIMETRY
      | typeof METABOLITES
  ) => (
    <InputGroup
      title={title}
      inputs={Object.entries(group).map(([key, value]) => ({
        name: key,
        label: value.label,
        value: state.inputs[key as keyof InputValues] || "",
        normalRange: `${value.low} - ${value.high}`,
        units: value.units,
      }))}
      onChange={handleInputChange}
      errors={state.errors}
    />
  );

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${
        state.darkMode ? "text-gray-200" : "text-gray-800"
      }`}
    >
      {createInputGroup("Acid/Base", ACID_BASE)}
      {createInputGroup("Electrolytes", ELECTROLYTES)}
      {createInputGroup("Co-oximetry", CO_OXIMETRY)}
      {createInputGroup("Metabolites", METABOLITES)}
    </div>
  );
};

export default InputSection;
