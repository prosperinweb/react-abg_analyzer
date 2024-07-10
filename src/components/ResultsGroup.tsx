import { Stat } from "../types";
import ResultItem from "./ResultItem";

interface ResultsGroupProps {
  title: string;
  results: Record<string, { value: string; status: Stat; unit?: string }>;
}

const ResultsGroup = ({ title, results }: ResultsGroupProps) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="font-semibold mb-3 text-lg text-gray-700">{title}</h3>
    <div className="space-y-2">
      {Object.entries(results).map(([key, { value, status, unit }]) => (
        <ResultItem
          key={key}
          label={key.toUpperCase()}
          value={value}
          status={status}
          unit={unit || ""}
        />
      ))}
    </div>
  </div>
);

export default ResultsGroup;