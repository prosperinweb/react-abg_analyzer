import React from "react";
import { ArrowRight } from "lucide-react";
import { analyzeABG } from "../utils/analysis";
import { useABG } from "../contexts/ABGContext";

const AnalyzeButton: React.FC = () => {
  const { state, dispatch } = useABG();

  const handleAnalyze = () => {
    if (Object.keys(state.errors).length === 0) {
      dispatch({ type: "SET_LOADING", payload: true });
      setTimeout(() => {
        try {
          const analysisResults = analyzeABG(state.inputs);
          dispatch({ type: "SET_RESULTS", payload: analysisResults });
          dispatch({
            type: "ADD_TO_HISTORY",
            payload: { ...analysisResults, timestamp: new Date() },
          });
        } catch (error) {
          console.error("Analysis failed:", error);
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      }, 1500);
    }
  };

  return (
    <div className="mt-8 flex justify-center">
      <button
        onClick={handleAnalyze}
        disabled={state.loading || Object.keys(state.errors).length > 0}
        className={`
          flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-full
          transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
          ${
            state.loading || Object.keys(state.errors).length > 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }
        `}
      >
        {state.loading ? (
          <svg
            className="animate-spin h-5 w-5 mr-3 text-white"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            Analyze <ArrowRight className="ml-2" size={20} />
          </>
        )}
      </button>
    </div>
  );
};

export default AnalyzeButton;
