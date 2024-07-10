import React from "react";
import { BookOpen } from "lucide-react";
import { useABG } from "../contexts/ABGContext";

const EducationalModeToggle: React.FC = () => {
  const { state, dispatch } = useABG();

  const toggleEducationalMode = () => {
    dispatch({ type: "TOGGLE_EDUCATIONAL_MODE" });
  };

  return (
    <button
      onClick={toggleEducationalMode}
      className={`p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400
        ${
          state.showEducationalMode
            ? state.darkMode
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-600"
            : state.darkMode
            ? "bg-gray-700 text-gray-300"
            : "bg-gray-200 text-gray-600"
        }`}
      aria-label="Toggle Educational Mode"
    >
      <BookOpen size={20} />
    </button>
  );
};

export default EducationalModeToggle;
