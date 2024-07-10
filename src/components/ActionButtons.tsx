import React from "react";
import { Download } from "lucide-react";
import { useABG } from "../contexts/ABGContext";

const ActionButtons: React.FC = () => {
  const { state, dispatch } = useABG();

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  const handleExport = () => {
    if (!state.results) return;

    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.entries(state.inputs)
        .map(([key, value]) => `${key},${value}`)
        .join("\n") +
      "\n\nResults:\n" +
      Object.entries(state.results)
        .flatMap(([category, values]) =>
          typeof values === "string"
            ? [`${category},${values}`]
            : Object.entries(values).map(
                ([key, { value }]) => `${category}_${key},${value}`
              )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "abg_analysis_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-8 flex justify-center space-x-4">
      <button
        onClick={handleReset}
        className={`px-6 py-2 rounded-full transition-colors duration-300
          ${
            state.darkMode
              ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
      >
        Reset
      </button>
      {state.results && (
        <button
          onClick={handleExport}
          className={`px-6 py-2 rounded-full transition-colors duration-300 flex items-center
            ${
              state.darkMode
                ? "bg-green-700 text-white hover:bg-green-600"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
        >
          <Download size={18} className="mr-2" /> Export Results
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
