import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useABG } from "../contexts/ABGContext";

const TrendChart: React.FC = () => {
  const { state } = useABG();

  if (state.history.length === 0) return null;

  const data = state.history.map((item) => ({
    timestamp: item.timestamp.toLocaleTimeString(),
    ph: parseFloat(item.acidBase.potential_of_hydrogen.value),
    paco2: parseFloat(item.acidBase.partial_pressure_of_carbon_dioxide.value),
    hco3: parseFloat(item.acidBase.bicarbonate.value),
  }));

  return (
    <div
      className={`mt-8 p-4 rounded-lg transition-colors duration-200 ${
        state.darkMode ? "bg-gray-800" : "bg-gray-50"
      }`}
    >
      <h3
        className={`text-lg font-semibold mb-3 ${
          state.darkMode ? "text-gray-200" : "text-gray-700"
        }`}
      >
        Trend Analysis
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={state.darkMode ? "#4B5563" : "#E5E7EB"}
          />
          <XAxis
            dataKey="timestamp"
            stroke={state.darkMode ? "#9CA3AF" : "#4B5563"}
          />
          <YAxis stroke={state.darkMode ? "#9CA3AF" : "#4B5563"} />
          <Tooltip
            contentStyle={{
              backgroundColor: state.darkMode ? "#1F2937" : "#FFFFFF",
              borderColor: state.darkMode ? "#4B5563" : "#E5E7EB",
              color: state.darkMode ? "#E5E7EB" : "#1F2937",
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="ph" stroke="#8884d8" name="pH" />
          <Line type="monotone" dataKey="paco2" stroke="#82ca9d" name="PaCO2" />
          <Line type="monotone" dataKey="hco3" stroke="#ffc658" name="HCO3-" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
