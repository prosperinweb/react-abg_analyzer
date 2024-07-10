// src/data/abgEducationalData.ts

export const abgEducationalData = {
  parameters: [
    {
      name: "pH",
      normalRange: "7.35 - 7.45",
      description: "Measure of acidity or alkalinity of the blood.",
      interpretation: [
        {
          range: "< 7.35",
          meaning: "Acidemia",
          possibleCauses: ["Respiratory acidosis", "Metabolic acidosis"],
        },
        {
          range: "> 7.45",
          meaning: "Alkalemia",
          possibleCauses: ["Respiratory alkalosis", "Metabolic alkalosis"],
        },
      ],
      clinicalImplications:
        "pH affects enzyme function, electrolyte balance, and cellular processes.",
      compensationMechanisms:
        "Respiratory system adjusts CO2 levels, kidneys adjust bicarbonate levels.",
    },
    {
      name: "PaCO2",
      normalRange: "35 - 45 mmHg",
      description: "Partial pressure of carbon dioxide in arterial blood.",
      interpretation: [
        {
          range: "< 35 mmHg",
          meaning: "Hypocapnia",
          possibleCauses: ["Hyperventilation", "Anxiety", "High altitude"],
        },
        {
          range: "> 45 mmHg",
          meaning: "Hypercapnia",
          possibleCauses: [
            "Hypoventilation",
            "COPD",
            "Neuromuscular disorders",
          ],
        },
      ],
      clinicalImplications: "Affects respiratory drive and acid-base balance.",
      compensationMechanisms:
        "Kidneys adjust bicarbonate reabsorption and excretion.",
    },
    {
      name: "HCO3-",
      normalRange: "22 - 26 mEq/L",
      description:
        "Bicarbonate concentration in blood, main buffer in extracellular fluid.",
      interpretation: [
        {
          range: "< 22 mEq/L",
          meaning: "Metabolic acidosis",
          possibleCauses: [
            "Kidney disease",
            "Diabetic ketoacidosis",
            "Lactic acidosis",
          ],
        },
        {
          range: "> 26 mEq/L",
          meaning: "Metabolic alkalosis",
          possibleCauses: ["Vomiting", "Diuretic use", "Hypokalemia"],
        },
      ],
      clinicalImplications: "Critical for maintaining acid-base balance.",
      compensationMechanisms:
        "Respiratory system adjusts ventilation to alter CO2 levels.",
    },
    {
      name: "PaO2",
      normalRange: "80 - 100 mmHg",
      description: "Partial pressure of oxygen in arterial blood.",
      interpretation: [
        {
          range: "< 80 mmHg",
          meaning: "Hypoxemia",
          possibleCauses: [
            "Pulmonary diseases",
            "Low inspired oxygen",
            "High altitude",
          ],
        },
        {
          range: "> 100 mmHg",
          meaning: "Hyperoxemia",
          possibleCauses: ["Oxygen therapy", "Hyperbaric conditions"],
        },
      ],
      clinicalImplications:
        "Crucial for tissue oxygenation and cellular metabolism.",
      compensationMechanisms:
        "Increased respiratory rate, cardiac output, and hemoglobin affinity for oxygen.",
    },
  ],
  derivedValues: [
    {
      name: "Anion Gap",
      formula: "[Na+] - ([Cl-] + [HCO3-])",
      normalRange: "8 - 16 mEq/L",
      description:
        "Difference between unmeasured anions and unmeasured cations in blood.",
      interpretation: [
        {
          range: "> 16 mEq/L",
          meaning: "High anion gap metabolic acidosis",
          possibleCauses: ["Ketoacidosis", "Lactic acidosis", "Renal failure"],
        },
        {
          range: "< 8 mEq/L",
          meaning: "Low anion gap",
          possibleCauses: [
            "Hypoalbuminemia",
            "Multiple myeloma",
            "Lithium toxicity",
          ],
        },
      ],
      clinicalImplications: "Helps differentiate causes of metabolic acidosis.",
    },
    {
      name: "Base Excess",
      normalRange: "-2 to +2 mEq/L",
      description: "Amount of base required to return blood pH to normal.",
      interpretation: [
        {
          range: "< -2 mEq/L",
          meaning: "Metabolic acidosis",
          possibleCauses: [
            "Renal tubular acidosis",
            "Diarrhea",
            "Ketoacidosis",
          ],
        },
        {
          range: "> +2 mEq/L",
          meaning: "Metabolic alkalosis",
          possibleCauses: ["Vomiting", "Diuretic use", "Cushing's syndrome"],
        },
      ],
      clinicalImplications:
        "Indicates metabolic component of acid-base disorders.",
    },
  ],
  compensationMechanisms: [
    {
      disorder: "Respiratory Acidosis",
      acuteCompensation: "Minimal - buffering by extracellular fluid",
      chronicCompensation: "Renal retention of bicarbonate",
      expectedChange:
        "For every 10 mmHg PaCO2 increase above 40, HCO3- increases by 1 mEq/L (acute) or 3.5 mEq/L (chronic)",
    },
    {
      disorder: "Respiratory Alkalosis",
      acuteCompensation: "Minimal - cellular buffering",
      chronicCompensation: "Renal excretion of bicarbonate",
      expectedChange:
        "For every 10 mmHg PaCO2 decrease below 40, HCO3- decreases by 2 mEq/L (acute) or 5 mEq/L (chronic)",
    },
    {
      disorder: "Metabolic Acidosis",
      compensation: "Respiratory - increased ventilation to lower PaCO2",
      expectedChange:
        "PaCO2 should decrease by 1.2 mmHg for every 1 mEq/L decrease in HCO3-",
    },
    {
      disorder: "Metabolic Alkalosis",
      compensation: "Respiratory - decreased ventilation to increase PaCO2",
      expectedChange:
        "PaCO2 should increase by 0.7 mmHg for every 1 mEq/L increase in HCO3-",
    },
  ],
  clinicalScenarios: [
    {
      name: "Diabetic Ketoacidosis",
      typicalFindings:
        "Low pH, low HCO3-, normal or low PaCO2, elevated anion gap",
      explanation:
        "Insulin deficiency leads to ketone production, causing metabolic acidosis. Respiratory compensation occurs with Kussmaul breathing.",
    },
    {
      name: "COPD Exacerbation",
      typicalFindings:
        "High PaCO2, low pH (acutely), normal or high HCO3- (chronically)",
      explanation:
        "Chronic CO2 retention leads to renal compensation with increased bicarbonate. Acute exacerbations may overwhelm compensation.",
    },
    {
      name: "Salicylate Overdose",
      typicalFindings:
        "Initial respiratory alkalosis followed by metabolic acidosis, increased anion gap",
      explanation:
        "Salicylates stimulate the respiratory center causing hyperventilation, then cause metabolic acidosis as they are metabolized.",
    },
  ],
};
