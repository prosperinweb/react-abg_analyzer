export const ACID_BASE = {
  potential_of_hydrogen: {
    label: "pH",
    units: "",
    low: 7.35,
    high: 7.45,
  },
  partial_pressure_of_carbon_dioxide: {
    label: "pCO2",
    units: "mmHg",
    low: 35,
    high: 45,
  },
  bicarbonate: {
    label: "HCO3",
    units: "mEq/L",
    low: 22,
    high: 26,
  },
};

export const ELECTROLYTES = {
  sodium: {
    label: "Na+",
    units: "mEq/L",
    low: 135,
    high: 145,
  },
  potassium: {
    label: "K+",
    units: "mEq/L",
    low: 3.5,
    high: 5.1,
  },
  chloride: {
    label: "Cl-",
    units: "mEq/L",
    low: 98,
    high: 108,
  },
  calcium: {
    label: "Ca2+",
    units: "mg/dL",
    low: 8.5,
    high: 10.5,
  },
  magnesium: {
    label: "Mg2+",
    units: "mg/dL",
    low: 1.5,
    high: 2.5,
  },
  phosphate: {
    label: "PO4",
    units: "mg/dL",
    low: 2.5,
    high: 4.5,
  },
};

export const CO_OXIMETRY = {
  hemoglobin: {
    label: "Hb",
    units: "g/dL",
    low: 12,
    high: 17,
  },
  oxyhemoglobin: {
    label: "O2Hb",
    units: "%",
    low: 94,
    high: 98,
  },
  carboxyhemoglobin: {
    label: "COHb",
    units: "%",
    low: 0.5,
    high: 1.5,
  },
  methemoglobin: {
    label: "MetHb",
    units: "%",
    low: 0,
    high: 1.5,
  },
};

export const METABOLITES = {
  lactate: {
    label: "Lactate",
    units: "mmol/L",
    low: 0.5,
    high: 1.5,
  },
  glucose: {
    label: "Glucose",
    units: "mg/dL",
    low: 70,
    high: 100,
  },
};
