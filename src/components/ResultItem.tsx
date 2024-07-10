import { ArrowDown, ArrowUp, AlertTriangle, CheckCircle } from "lucide-react";

type Status = "low" | "high" | "normal";

interface ResultItemProps {
  label: string;
  value: string;
  status: Status;
  unit: string;
}

const ResultItem = ({ label, value, status, unit }: ResultItemProps) => {
  const getStatusColor = (status: Status) => {
    switch (status) {
      case "low":
        return "text-blue-500";
      case "high":
        return "text-red-500";
      case "normal":
        return "text-green-500";
      default:
        return "text-yellow-500";
    }
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case "low":
        return <ArrowDown className="w-4 h-4" />;
      case "high":
        return <ArrowUp className="w-4 h-4" />;
      case "normal":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: Status) => {
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
    <div className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
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
