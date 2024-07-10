import React from "react";
import { Moon, Sun } from "lucide-react";
import { useABG } from "../contexts/ABGContext";

const DarkModeToggle: React.FC = () => {
  const { state, dispatch } = useABG();

  return (
    <button
      title="Toggle dark mode"
      onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <div className="relative w-6 h-6">
        <Sun
          className={`absolute transition-opacity duration-200 ${
            state.darkMode ? "opacity-0" : "opacity-100"
          }`}
        />
        <Moon
          className={`absolute transition-opacity duration-200 ${
            state.darkMode ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </button>
  );
};

export default DarkModeToggle;
