// App.js
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import InputSection from "./components/InputSection";
import AnalyzeButton from "./components/AnalyzeButton";
import ResultsSection from "./components/ResultsSection";
import ActionButtons from "./components/ActionButtons";
import TrendChart from "./components/TrendChart";
import CustomThresholds from "./components/CustomThresholds";
import EducationalMode from "./components/EducationalMode";
import { analyzeABG } from "./utils/analysis";

const App = () => {
  const [inputs, setInputs] = useState({
    ph: "",
    paco2: "",
    hco3: "",
    na: "",
    k: "",
    cl: "",
    ca: "",
    hb: "",
    o2hb: "",
    cohb: "",
    methb: "",
    glucose: "",
    lactate: "",
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [history, setHistory] = useState([]);
  const [customThresholds, setCustomThresholds] = useState({
    ph: { low: 7.35, high: 7.45 },
    paco2: { low: 35, high: 45 },
    hco3: { low: 22, high: 26 },
    // ... add other parameters
  });
  const [showEducationalMode, setShowEducationalMode] = useState(false);

  useEffect(() => {
    validateInputs();
  }, [inputs]);
  const validateInputs = () => {
    const newErrors = {};
    Object.entries(inputs).forEach(([key, value]) => {
      if (value && isNaN(parseFloat(value))) {
        newErrors[key] = "Must be a number";
      }
    });
    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnalyze = () => {
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      setTimeout(() => {
        const analysisResults = analyzeABG(inputs, customThresholds);
        setResults(analysisResults);
        setHistory((prev) => [
          ...prev,
          { ...analysisResults, timestamp: new Date() },
        ]);
        setLoading(false);
      }, 1500);
    }
  };

  const handleReset = () => {
    setInputs({
      ph: "",
      paco2: "",
      hco3: "",
      na: "",
      k: "",
      cl: "",
      ca: "",
      hb: "",
      o2hb: "",
      cohb: "",
      methb: "",
      glucose: "",
      lactate: "",
    });
    setResults(null);
    setErrors({});
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.entries(inputs)
        .map(([key, value]) => `${key},${value}`)
        .join("\n") +
      "\n\nResults:\n" +
      Object.entries(results)
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

  const handleThresholdChange = (parameter, bound, value) => {
    setCustomThresholds((prev) => ({
      ...prev,
      [parameter]: { ...prev[parameter], [bound]: parseFloat(value) },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
        <Header />
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => setShowEducationalMode(!showEducationalMode)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {showEducationalMode ? 'Hide' : 'Show'} Educational Mode
          </button>
        </div>
        <InputSection 
          inputs={inputs}
          onChange={handleInputChange}
          errors={errors}
        />
        <CustomThresholds 
          thresholds={customThresholds}
          onChange={handleThresholdChange}
        />
        <AnalyzeButton 
          onClick={handleAnalyze}
          disabled={loading || Object.keys(errors).length > 0}
          loading={loading}
        />
        {results && (
          <>
            <ResultsSection results={results} showEducationalMode={showEducationalMode} />
            <TrendChart history={history} />
          </>
        )}
        <ActionButtons 
          onReset={handleReset}
          onExport={handleExport}
          showExport={!!results}
        />
        {showEducationalMode && <EducationalMode />}
      </div>
    </div>
  );
};

export default App;
