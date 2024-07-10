import React from "react";
import { ArrowDown, ArrowUp, Minus, AlertTriangle } from "lucide-react";
import { AnalysisResult } from "../types";
import { useABG } from "../contexts/ABGContext";

interface ResultItemProps {
  label: string;
  value: string;
  status: AnalysisResult["status"];
  unit: string;
}

const ResultItem: React.FC<ResultItemProps> = ({
  label,
  value,
  status,
  unit,
}) => {
  const { state } = useABG();

  const getStatusColor = (status: AnalysisResult["status"]) => {
    switch (status) {
      case "low":
        return "text-blue-500";
      case "high":
        return "text-red-500";
      case "normal":
        return state.darkMode ? "text-green-400" : "text-green-500";
      default:
        return "text-yellow-500";
    }
  };

  const getStatusIcon = (status: AnalysisResult["status"]) => {
    switch (status) {
      case "low":
        return <ArrowDown className="w-4 h-4" />;
      case "high":
        return <ArrowUp className="w-4 h-4" />;
      case "normal":
        return <Minus className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: AnalysisResult["status"]) => {
    switch (status) {
      case "low":
        return "Low";
      case "high":
        return "High";
      case "normal":
        return "Normal";
      default:
        return "N/A";
    }
  };

  return (
    <div
      className={`flex items-center justify-between py-2 border-b ${
        state.darkMode ? "border-gray-600" : "border-gray-200"
      } last:border-b-0`}
    >
      <span className="font-medium">{label}:</span>
      <div className="flex items-center">
        <span className="mr-2">
          {value} {unit}
        </span>
        <div
          className={`flex items-center ${getStatusColor(
            status
          )} bg-opacity-20 rounded px-2 py-1`}
        >
          {getStatusIcon(status)}
          <span className="ml-1 text-xs font-semibold">
            {getStatusText(status)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultItem;
