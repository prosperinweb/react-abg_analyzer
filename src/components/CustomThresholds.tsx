import React from "react";

const CustomThresholds = ({ thresholds, onChange }) => (
  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
    <h3 className="text-lg font-semibold mb-3">Custom Thresholds</h3>
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(thresholds).map(([param, { low, high }]) => (
        <div key={param} className="flex flex-col">
          <label className="font-medium mb-1">{param.toUpperCase()}</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={low}
              onChange={(e) => onChange(param, "low", e.target.value)}
              className="w-full px-2 py-1 border rounded"
              placeholder="Low"
            />
            <input
              type="number"
              value={high}
              onChange={(e) => onChange(param, "high", e.target.value)}
              className="w-full px-2 py-1 border rounded"
              placeholder="High"
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CustomThresholds;
