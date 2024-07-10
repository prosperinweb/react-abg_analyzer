export const analyzeABG = (inputs, customThresholds) => {
  const results = {
    acidBase: analyzeAcidBase(inputs, customThresholds),
    electrolytes: analyzeElectrolytes(inputs, customThresholds),
    coOximetry: analyzeCoOximetry(inputs, customThresholds),
    metabolites: analyzeMetabolites(inputs, customThresholds),
    calculatedValues: calculateDerivedValues(inputs, customThresholds),
  };

  results.interpretation = interpretResults(results);
  results.suggestions = generateSuggestions(results);
  results.differentialDiagnosis = getDifferentialDiagnosis(results);

  return results;
};

const analyzeAcidBase = ({ ph, paco2, hco3 }, thresholds) => ({
  ph: {
    value: parseFloat(ph).toFixed(2),
    status: getStatus(ph, thresholds.ph.low, thresholds.ph.high),
    unit: "",
  },
  paco2: {
    value: parseFloat(paco2).toFixed(1),
    status: getStatus(paco2, thresholds.paco2.low, thresholds.paco2.high),
    unit: "mmHg",
  },
  hco3: {
    value: parseFloat(hco3).toFixed(1),
    status: getStatus(hco3, thresholds.hco3.low, thresholds.hco3.high),
    unit: "mEq/L",
  },
});

const analyzeElectrolytes = ({ na, k, cl, ca }) => ({
  na: {
    value: parseFloat(na).toFixed(1),
    status: getStatus(na, 135, 145),
    unit: "mEq/L",
  },
  k: {
    value: parseFloat(k).toFixed(1),
    status: getStatus(k, 3.5, 5.0),
    unit: "mEq/L",
  },
  cl: {
    value: parseFloat(cl).toFixed(1),
    status: getStatus(cl, 98, 106),
    unit: "mEq/L",
  },
  ca: {
    value: parseFloat(ca).toFixed(1),
    status: getStatus(ca, 8.5, 10.2),
    unit: "mg/dL",
  },
});

const analyzeCoOximetry = ({ hb, o2hb, cohb, methb }) => ({
  hb: {
    value: parseFloat(hb).toFixed(1),
    status: getStatus(hb, 12, 17),
    unit: "g/dL",
  },
  o2hb: {
    value: parseFloat(o2hb).toFixed(1),
    status: getStatus(o2hb, 94, 98),
    unit: "%",
  },
  cohb: {
    value: parseFloat(cohb).toFixed(1),
    status: getStatus(cohb, 0.5, 1.5),
    unit: "%",
  },
  methb: {
    value: parseFloat(methb).toFixed(1),
    status: getStatus(methb, 0, 1.5),
    unit: "%",
  },
});

const analyzeMetabolites = ({ glucose, lactate }) => ({
  glucose: {
    value: parseFloat(glucose).toFixed(1),
    status: getStatus(glucose, 70, 100),
    unit: "mg/dL",
  },
  lactate: {
    value: parseFloat(lactate).toFixed(1),
    status: getStatus(lactate, 0.5, 1),
    unit: "mmol/L",
  },
});

const calculateDerivedValues = ({ na, cl, hco3, hb, o2hb }) => {
  const anionGap = parseFloat(na) - (parseFloat(cl) + parseFloat(hco3));
  const oxygenContent = 1.34 * parseFloat(hb) * (parseFloat(o2hb) / 100);
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

const getDifferentialDiagnosis = (results) => {
  let differentials = [];
  if (
    results.acidBase.ph.status === "low" &&
    results.acidBase.hco3.status === "low"
  ) {
    differentials.push(
      "Metabolic Acidosis (consider: diabetic ketoacidosis, lactic acidosis, renal failure)"
    );
  }
  if (
    results.acidBase.ph.status === "high" &&
    results.acidBase.paco2.status === "low"
  ) {
    differentials.push(
      "Respiratory Alkalosis (consider: hyperventilation, sepsis, liver disease)"
    );
  }
  // Add more conditions...
  return differentials;
};

const getStatus = (value, min, max) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return "normal";
  if (numValue < min) return "low";
  if (numValue > max) return "high";
  return "normal";
};

const interpretResults = (results) => {
  const interpretation = [];

  // Acid-Base Interpretation
  const { ph, paco2, hco3 } = results.acidBase;
  if (ph.status === "low") {
    if (paco2.status === "high") {
      interpretation.push("Respiratory acidosis");
      if (hco3.status === "high") {
        interpretation.push("with metabolic compensation");
      }
    } else if (hco3.status === "low") {
      interpretation.push("Metabolic acidosis");
      if (paco2.status === "low") {
        interpretation.push("with respiratory compensation");
      }
    }
  } else if (ph.status === "high") {
    if (paco2.status === "low") {
      interpretation.push("Respiratory alkalosis");
      if (hco3.status === "low") {
        interpretation.push("with metabolic compensation");
      }
    } else if (hco3.status === "high") {
      interpretation.push("Metabolic alkalosis");
      if (paco2.status === "high") {
        interpretation.push("with respiratory compensation");
      }
    }
  }

  // Electrolyte Abnormalities
  const { na, k, cl, ca } = results.electrolytes;
  if (na.status === "low") interpretation.push("Hyponatremia");
  if (na.status === "high") interpretation.push("Hypernatremia");
  if (k.status === "low") interpretation.push("Hypokalemia");
  if (k.status === "high") interpretation.push("Hyperkalemia");
  if (cl.status === "low") interpretation.push("Hypochloremia");
  if (cl.status === "high") interpretation.push("Hyperchloremia");
  if (ca.status === "low") interpretation.push("Hypocalcemia");
  if (ca.status === "high") interpretation.push("Hypercalcemia");

  // Anion Gap
  const { anionGap } = results.calculatedValues;
  if (anionGap.status === "high") interpretation.push("High anion gap");

  // Metabolic Abnormalities
  const { glucose, lactate } = results.metabolites;
  if (glucose.status === "high") interpretation.push("Hyperglycemia");
  if (glucose.status === "low") interpretation.push("Hypoglycemia");
  if (lactate.status === "high") interpretation.push("Hyperlactatemia");

  // Co-oximetry Abnormalities
  const { hb, o2hb, cohb, methb } = results.coOximetry;
  if (hb.status === "low") interpretation.push("Anemia");
  if (hb.status === "high") interpretation.push("Polycythemia");
  if (o2hb.status === "low") interpretation.push("Hypoxemia");
  if (cohb.status === "high")
    interpretation.push("Carbon monoxide poisoning suspected");
  if (methb.status === "high")
    interpretation.push("Methemoglobinemia suspected");

  return interpretation.join(". ") || "No significant abnormalities detected.";
};

const generateSuggestions = (results) => {
  let suggestions = [];

  // Acid-Base Suggestions
  if (results.acidBase.ph.status !== "normal") {
    suggestions.push(
      "Consider underlying causes of acid-base imbalance (e.g., respiratory issues, metabolic disorders)."
    );
    suggestions.push(
      "Monitor acid-base status closely and reassess after interventions."
    );
  }

  // Electrolyte Suggestions
  if (
    results.electrolytes.na.status !== "normal" ||
    results.electrolytes.k.status !== "normal"
  ) {
    suggestions.push(
      "Evaluate fluid status and consider appropriate fluid/electrolyte replacement."
    );
    suggestions.push(
      "Investigate underlying causes of electrolyte imbalances (e.g., renal function, medications)."
    );
  }

  // Oxygenation Suggestions
  if (results.coOximetry.o2hb.status === "low") {
    suggestions.push(
      "Assess oxygenation status and consider oxygen therapy if appropriate."
    );
    suggestions.push(
      "Evaluate for underlying respiratory or cardiovascular issues."
    );
  }

  // Metabolic Suggestions
  if (results.metabolites.glucose.status !== "normal") {
    suggestions.push(
      "Monitor blood glucose levels closely and manage according to protocol."
    );
    if (results.metabolites.glucose.status === "high") {
      suggestions.push(
        "Consider insulin therapy and evaluate for diabetic ketoacidosis if applicable."
      );
    }
  }

  if (results.metabolites.lactate.status === "high") {
    suggestions.push("Evaluate for tissue hypoperfusion and potential sepsis.");
    suggestions.push(
      "Consider fluid resuscitation and source control if infection is suspected."
    );
  }

  // Anion Gap Suggestions
  if (results.calculatedValues.anionGap.status === "high") {
    suggestions.push(
      "Investigate causes of high anion gap metabolic acidosis (e.g., lactic acidosis, ketoacidosis, toxic ingestions)."
    );
  }

  // General Suggestions
  suggestions.push(
    "Correlate ABG results with clinical presentation and other diagnostic findings."
  );
  suggestions.push(
    "Consider trend of values over time rather than single measurements."
  );
  suggestions.push("Reassess after any interventions or treatments.");

  return suggestions;
};
