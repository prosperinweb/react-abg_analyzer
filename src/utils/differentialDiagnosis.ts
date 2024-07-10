import { ABGResults } from "../types";

export const getDifferentialDiagnosis = (results: ABGResults): string[] => {
  const differentials: string[] = [];

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
  // Add more conditions as needed

  return differentials;
};
