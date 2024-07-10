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

const TrendChart = ({ history }) => {
  const data = history.map((item) => ({
    timestamp: item.timestamp.toLocaleTimeString(),
    ph: item.acidBase.ph.value,
    paco2: item.acidBase.paco2.value,
    hco3: item.acidBase.hco3.value,
  }));

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3">Trend Analysis</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ph" stroke="#8884d8" />
          <Line type="monotone" dataKey="paco2" stroke="#82ca9d" />
          <Line type="monotone" dataKey="hco3" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
