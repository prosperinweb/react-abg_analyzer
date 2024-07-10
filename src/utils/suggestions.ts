import { ABGResults } from "../types";

export const generateSuggestions = (results: ABGResults): string[] => {
  const suggestions: string[] = [];

  suggestAcidBase(results, suggestions);
  suggestElectrolytes(results, suggestions);
  suggestOxygenation(results, suggestions);
  suggestMetabolites(results, suggestions);
  suggestAnionGap(results, suggestions);
  addGeneralSuggestions(suggestions);

  return suggestions;
};

const suggestAcidBase = (results: ABGResults, suggestions: string[]) => {
  if (results.acidBase.ph.status !== "normal") {
    suggestions.push(
      "Consider underlying causes of acid-base imbalance (e.g., respiratory issues, metabolic disorders)."
    );
    suggestions.push(
      "Monitor acid-base status closely and reassess after interventions."
    );
  }
};

const suggestElectrolytes = (results: ABGResults, suggestions: string[]) => {
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
};

const suggestOxygenation = (results: ABGResults, suggestions: string[]) => {
  if (results.coOximetry.o2hb.status === "low") {
    suggestions.push(
      "Assess oxygenation status and consider oxygen therapy if appropriate."
    );
    suggestions.push(
      "Evaluate for underlying respiratory or cardiovascular issues."
    );
  }
};

const suggestMetabolites = (results: ABGResults, suggestions: string[]) => {
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
};

const suggestAnionGap = (results: ABGResults, suggestions: string[]) => {
  if (results.calculatedValues.anionGap.status === "high") {
    suggestions.push(
      "Investigate causes of high anion gap metabolic acidosis (e.g., lactic acidosis, ketoacidosis, toxic ingestions)."
    );
  }
};

const addGeneralSuggestions = (suggestions: string[]) => {
  suggestions.push(
    "Correlate ABG results with clinical presentation and other diagnostic findings."
  );
  suggestions.push(
    "Consider trend of values over time rather than single measurements."
  );
  suggestions.push("Reassess after any interventions or treatments.");
};
