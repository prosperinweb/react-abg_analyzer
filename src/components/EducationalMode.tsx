import React, { useState } from "react";

const EducationalMode = () => {
  const [activeTopic, setActiveTopic] = useState(null);

  const topics = {
    pH: "pH is a measure of acidity or alkalinity. In blood, normal pH is tightly regulated between 7.35 and 7.45.",
    PaCO2:
      "PaCO2 represents the partial pressure of carbon dioxide in arterial blood. It's primarily controlled by respiration.",
    HCO3: "Bicarbonate (HCO3-) is the most important buffer in the blood. It's regulated by the kidneys.",
    "Anion Gap":
      "The anion gap is the difference between measured cations and anions. An elevated anion gap often indicates the presence of unmeasured anions, such as in certain types of metabolic acidosis.",
  };

  return (
    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Educational Mode</h3>
      <div className="space-y-2">
        {Object.entries(topics).map(([topic, explanation]) => (
          <div key={topic}>
            <button
              onClick={() =>
                setActiveTopic(activeTopic === topic ? null : topic)
              }
              className="w-full text-left px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded transition-colors"
            >
              {topic}
            </button>
            {activeTopic === topic && (
              <p className="mt-2 px-4 py-2 bg-white rounded">{explanation}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationalMode;
