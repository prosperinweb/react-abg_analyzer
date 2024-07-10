export interface Interpretation {
  range: string;
  meaning: string;
  possibleCauses: string[];
}

export interface Parameter {
  name: string;
  normalRange: string;
  description: string;
  interpretation: Interpretation[];
  clinicalImplications: string;
  compensationMechanisms: string;
}

export interface DerivedValue {
  name: string;
  formula?: string;
  normalRange: string;
  description: string;
  interpretation: Interpretation[];
  clinicalImplications: string;
}

export interface CompensationMechanism {
  disorder: string;
  acuteCompensation?: string;
  chronicCompensation?: string;
  compensation?: string;
  expectedChange: string;
}

export interface ClinicalScenario {
  name: string;
  typicalFindings: string;
  explanation: string;
}

export interface ABGEducationalData {
  parameters: Parameter[];
  derivedValues: DerivedValue[];
  compensationMechanisms: CompensationMechanism[];
  clinicalScenarios: ClinicalScenario[];
}
