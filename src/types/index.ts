import {
  ACID_BASE,
  ELECTROLYTES,
  CO_OXIMETRY,
  METABOLITES,
} from "../utils/constants";

export type ParameterGroup =
  | typeof ACID_BASE
  | typeof ELECTROLYTES
  | typeof CO_OXIMETRY
  | typeof METABOLITES;

export type InputValues = {
  [K in keyof (typeof ACID_BASE &
    typeof ELECTROLYTES &
    typeof CO_OXIMETRY &
    typeof METABOLITES)]: string;
};

export type AnalysisResult = {
  value: string;
  status: "low" | "normal" | "high";
  unit: string;
};

export type GroupResults = {
  [key: string]: AnalysisResult;
};

export type ABGResults = {
  acidBase: GroupResults;
  electrolytes: GroupResults;
  coOximetry: GroupResults;
  metabolites: GroupResults;
  calculatedValues: {
    anionGap: AnalysisResult;
    oxygenContent: AnalysisResult;
  };
  interpretation: string;
  suggestions: string[];
  differentialDiagnosis: string[];
};
