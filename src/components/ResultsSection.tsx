import React from "react";
import ResultsGroup from "./ResultsGroup";
import { useABG } from "../contexts/ABGContext";

const ResultsSection: React.FC = () => {
  const { state } = useABG();

  if (!state.results) return null;

  return (
    <div className="mt-8">
      <h2
        className={`text-2xl font-semibold mb-4 ${
          state.darkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        Results
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultsGroup title="Acid/Base" results={state.results.acidBase} />
        <ResultsGroup
          title="Electrolytes"
          results={state.results.electrolytes}
        />
        <ResultsGroup title="Co-oximetry" results={state.results.coOximetry} />
        <ResultsGroup title="Metabolites" results={state.results.metabolites} />
        <ResultsGroup
          title="Calculated Values"
          results={state.results.calculatedValues}
        />
      </div>
      <div
        className={`mt-6 p-4 rounded-lg ${
          state.darkMode ? "bg-gray-700" : "bg-blue-50"
        }`}
      >
        <h3
          className={`text-xl font-semibold mb-2 ${
            state.darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Interpretation
        </h3>
        <p className={state.darkMode ? "text-gray-300" : "text-blue-800"}>
          {state.results.interpretation}
        </p>
      </div>
      {state.showEducationalMode && (
        <div
          className={`mt-6 p-4 rounded-lg ${
            state.darkMode ? "bg-gray-700" : "bg-green-50"
          }`}
        >
          <h3
            className={`text-xl font-semibold mb-2 ${
              state.darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Suggestions
          </h3>
          <ul
            className={`list-disc list-inside ${
              state.darkMode ? "text-gray-300" : "text-green-800"
            }`}
          >
            {state.results.suggestions.map((suggestion, index) => (
              <li key={index} className="mb-2">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultsSection;
