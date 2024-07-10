import {
  InputValues,
  ABGResults,
  GroupResults,
  AnalysisResult,
  ParameterGroup,
} from "../types";
import { ACID_BASE, ELECTROLYTES, CO_OXIMETRY, METABOLITES } from "./constants";
import { interpretResults } from "./interpretation";
import { generateSuggestions } from "./suggestions";
import { getDifferentialDiagnosis } from "./differentialDiagnosis";

export const analyzeABG = (inputs: InputValues): ABGResults => {
  const results: ABGResults = {
    acidBase: analyzeGroup(inputs, ACID_BASE),
    electrolytes: analyzeGroup(inputs, ELECTROLYTES),
    coOximetry: analyzeGroup(inputs, CO_OXIMETRY),
    metabolites: analyzeGroup(inputs, METABOLITES),
    calculatedValues: calculateDerivedValues(inputs),
    interpretation: "",
    suggestions: [],
    differentialDiagnosis: [],
  };

  results.interpretation = interpretResults(results);
  results.suggestions = generateSuggestions(results);
  results.differentialDiagnosis = getDifferentialDiagnosis(results);

  return results;
};

const analyzeGroup = (
  inputs: InputValues,
  group: ParameterGroup
): GroupResults => {
  return Object.entries(group).reduce((acc, [key, value]) => {
    const inputValue = parseFloat(inputs[key as keyof InputValues]);
    acc[key] = {
      value: isNaN(inputValue) ? "" : inputValue.toFixed(1),
      status: getStatus(inputValue, value.low, value.high),
      unit: value.units,
    };
    return acc;
  }, {} as GroupResults);
};

const getStatus = (
  value: number,
  min: number,
  max: number
): AnalysisResult["status"] => {
  if (isNaN(value)) return "normal";
  if (value < min) return "low";
  if (value > max) return "high";
  return "normal";
};

const calculateDerivedValues = (inputs: InputValues) => {
  const na = parseFloat(inputs.sodium) || 0;
  const cl = parseFloat(inputs.chloride) || 0;
  const hco3 = parseFloat(inputs.bicarbonate) || 0;
  const hb = parseFloat(inputs.hemoglobin) || 0;
  const o2hb = parseFloat(inputs.oxyhemoglobin) || 0;

  const anionGap = na - (cl + hco3);
  const oxygenContent = 1.34 * hb * (o2hb / 100);

  return {
    anionGap: {
      value: anionGap.toFixed(1),
      status: getStatus(anionGap, 8, 16),
      unit: "mEq/L",
    },
    oxygenContent: {
      value: oxygenContent.toFixed(1),
      status: getStatus(oxygenContent, 18, 22),
      unit: "mL/dL",
    },
  };
};
