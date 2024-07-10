import React from "react";
import ResultItem from "./ResultItem";
import { GroupResults } from "../types";
import { useABG } from "../contexts/ABGContext";

interface ResultsGroupProps {
  title: string;
  results: GroupResults;
}

const ResultsGroup: React.FC<ResultsGroupProps> = ({ title, results }) => {
  const { state } = useABG();

  return (
    <div
      className={`p-4 rounded-lg shadow transition-colors duration-200 ${
        state.darkMode ? "bg-gray-700" : "bg-white"
      }`}
    >
      <h3
        className={`font-semibold mb-3 text-lg ${
          state.darkMode ? "text-gray-200" : "text-gray-700"
        }`}
      >
        {title}
      </h3>
      <div className="space-y-2">
        {Object.entries(results).map(([key, { value, status, unit }]) => (
          <ResultItem
            key={key}
            label={key.toUpperCase()}
            value={value}
            status={status}
            unit={unit}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultsGroup;
