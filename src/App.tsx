import React from "react";
import Header from "./components/Header";
import InputSection from "./components/InputSection";
import AnalyzeButton from "./components/AnalyzeButton";
import ResultsSection from "./components/ResultsSection";
import ActionButtons from "./components/ActionButtons";
import TrendChart from "./components/TrendChart";
import EducationalMode from "./components/EducationalMode";
import { useABG, ABGProvider } from "./contexts/ABGContext";

const AppContent: React.FC = () => {
  const { state } = useABG();

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-200 ${
        state.darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`rounded-lg shadow-xl p-8 max-w-4xl w-full transition-colors duration-200 ${
          state.darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <Header />
        <InputSection />
        <AnalyzeButton />
        <ResultsSection />
        <TrendChart />
        <ActionButtons />
      </div>
      <EducationalMode />
    </div>
  );
};

const App: React.FC = () => (
  <ABGProvider>
    <AppContent />
  </ABGProvider>
);

export default App;
