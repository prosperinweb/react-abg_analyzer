import { ABGResults } from "../types";

export const interpretResults = (results: ABGResults): string => {
  const interpretation: string[] = [];

  interpretAcidBase(results, interpretation);
  interpretElectrolytes(results, interpretation);
  interpretMetabolites(results, interpretation);
  interpretCoOximetry(results, interpretation);
  interpretAnionGap(results, interpretation);

  return interpretation.join("\n") || "No significant abnormalities detected.";
};

const interpretAcidBase = (results: ABGResults, interpretation: string[]) => {
  const { ph, paco2, hco3 } = results.acidBase;

  if (!ph || !paco2 || !hco3) return;

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
};

const interpretElectrolytes = (
  results: ABGResults,
  interpretation: string[]
) => {
  const { na, k, cl, ca } = results.electrolytes;

  if (!na || !k || !cl || !ca) return;

  if (na.status === "low") interpretation.push("Hyponatremia");
  if (na.status === "high") interpretation.push("Hypernatremia");
  if (k.status === "low") interpretation.push("Hypokalemia");
  if (k.status === "high") interpretation.push("Hyperkalemia");
  if (cl.status === "low") interpretation.push("Hypochloremia");
  if (cl.status === "high") interpretation.push("Hyperchloremia");
  if (ca.status === "low") interpretation.push("Hypocalcemia");
  if (ca.status === "high") interpretation.push("Hypercalcemia");
};

const interpretMetabolites = (
  results: ABGResults,
  interpretation: string[]
) => {
  const { glucose, lactate } = results.metabolites;
  if (!glucose || !lactate) return;
  if (glucose.status === "high") interpretation.push("Hyperglycemia");
  if (glucose.status === "low") interpretation.push("Hypoglycemia");
  if (lactate.status === "high") interpretation.push("Hyperlactatemia");
};

const interpretCoOximetry = (results: ABGResults, interpretation: string[]) => {
  const { hb, o2hb, cohb, methb } = results.coOximetry;
  if (!hb || !o2hb || !cohb || !methb) return;
  if (hb.status === "low") interpretation.push("Anemia");
  if (hb.status === "high") interpretation.push("Polycythemia");
  if (o2hb.status === "low") interpretation.push("Hypoxemia");
  if (cohb.status === "high")
    interpretation.push("Carbon monoxide poisoning suspected");
  if (methb.status === "high")
    interpretation.push("Methemoglobinemia suspected");
};

const interpretAnionGap = (results: ABGResults, interpretation: string[]) => {
  if (results.calculatedValues.anionGap.status === "high") {
    interpretation.push("High anion gap");
  }
};
