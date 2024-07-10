import React, { useState } from "react";
import { useABG } from "../contexts/ABGContext";
import { abgEducationalData } from "../data/abgEducationalData";
import Modal from "./Modal";
import {
  ABGEducationalData,
  Interpretation,
  Parameter,
  DerivedValue,
  CompensationMechanism,
  ClinicalScenario,
} from "../data/types";

const EducationalMode: React.FC = () => {
  const [activeSection, setActiveSection] = useState<
    keyof ABGEducationalData | null
  >(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const { state, dispatch } = useABG();

  const closeModal = () => {
    dispatch({ type: "TOGGLE_EDUCATIONAL_MODE" });
  };

  const renderContent = (
    content: string | string[] | Interpretation[]
  ): JSX.Element => {
    if (typeof content === "string") {
      return (
        <p
          className={`mt-2 ${
            state.darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {content}
        </p>
      );
    }
    if (Array.isArray(content)) {
      return (
        <ul
          className={`list-disc list-inside mt-2 ${
            state.darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {content.map((item, index) => (
            <li key={index}>
              {typeof item === "object" ? renderObjectContent(item) : item}
            </li>
          ))}
        </ul>
      );
    }
    return <span>{String(content)}</span>;
  };

  const renderObjectContent = (obj: Record<string, unknown>): JSX.Element => {
    return (
      <div className="ml-4">
        {Object.entries(obj).map(([key, value]) => (
          <div key={key} className="mb-2">
            <strong className="capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}:{" "}
            </strong>
            {renderContent(value as string | string[] | Interpretation[])}
          </div>
        ))}
      </div>
    );
  };

  const renderSection = (
    sectionName: keyof ABGEducationalData,
    data: (
      | Parameter
      | DerivedValue
      | CompensationMechanism
      | ClinicalScenario
    )[]
  ) => (
    <div key={sectionName} className="mb-4">
      <button
        onClick={() =>
          setActiveSection(activeSection === sectionName ? null : sectionName)
        }
        className={`w-full text-left px-4 py-2 rounded transition-colors duration-200 ${
          state.darkMode
            ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
            : "bg-blue-100 hover:bg-blue-200 text-gray-800"
        }`}
      >
        {sectionName}
      </button>
      {activeSection === sectionName && (
        <div className="mt-2 space-y-2">
          {data.map((item) => (
            <div key={item.name} className="ml-4">
              <button
                onClick={() =>
                  setActiveTopic(activeTopic === item.name ? null : item.name)
                }
                className={`w-full text-left px-3 py-1 rounded transition-colors duration-200 ${
                  state.darkMode
                    ? "bg-gray-600 hover:bg-gray-500 text-gray-200"
                    : "bg-blue-50 hover:bg-blue-100 text-gray-800"
                }`}
              >
                {item.name}
              </button>
              {activeTopic === item.name && (
                <div
                  className={`mt-2 p-3 rounded ${
                    state.darkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {Object.entries(item).map(
                    ([key, value]) =>
                      key !== "name" && (
                        <div key={key} className="mb-2">
                          <strong className="capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}:{" "}
                          </strong>
                          {renderContent(
                            value as string | string[] | Interpretation[]
                          )}
                        </div>
                      )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Modal isOpen={state.showEducationalMode} onClose={closeModal}>
      <h2
        className={`text-2xl font-bold mb-4 ${
          state.darkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        ABG Analysis Educational Guide
      </h2>
      {renderSection("parameters", abgEducationalData.parameters)}
      {renderSection("derivedValues", abgEducationalData.derivedValues)}
      {renderSection(
        "compensationMechanisms",
        abgEducationalData.compensationMechanisms
      )}
      {renderSection("clinicalScenarios", abgEducationalData.clinicalScenarios)}
    </Modal>
  );
};

export default EducationalMode;
