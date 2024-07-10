import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import { useABG } from "../contexts/ABGContext";
import EducationalModeToggle from "./EducationaModeToggle";

const Header: React.FC = () => {
  const { state } = useABG();

  return (
    <div className="flex justify-between items-center mb-8">
      <h1
        className={`text-3xl font-bold ${
          state.darkMode ? "text-blue-400" : "text-blue-600"
        }`}
      >
        Advanced ABG Analysis
      </h1>
      <div className="flex space-x-2">
        <EducationalModeToggle />
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default Header;
