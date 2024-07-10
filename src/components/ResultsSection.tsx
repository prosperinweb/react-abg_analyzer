import ResultsGroup from "./ResultsGroup";

interface ResultsSectionProps {
  results: {
    acidBase: Record<string, { value: string; status: Stat; unit?: string }>;
    electrolytes: Record<
      string,
      { value: string; status: Stat; unit?: string }
    >;
    coOximetry: Record<string, { value: string; status: Stat; unit?: string }>;
    metabolites: Record<string, { value: string; status: Stat; unit?: string }>;
    calculatedValues: Record<
      string,
      { value: string; status: Stat; unit?: string }
    >;
    interpretation: string;
    suggestions: string[];
  };
}

type Stat = "normal" | "high" | "low";

const ResultsSection = ({ results }: ResultsSectionProps) => (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-4">Results</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ResultsGroup title="Acid/Base" results={results.acidBase} />
      <ResultsGroup title="Electrolytes" results={results.electrolytes} />
      <ResultsGroup title="Co-oximetry" results={results.coOximetry} />
      <ResultsGroup title="Metabolites" results={results.metabolites} />
      <ResultsGroup
        title="Calculated Values"
        results={results.calculatedValues}
      />
    </div>
    <div className="mt-6 bg-blue-50 p-4 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Interpretation</h3>
      <p className="text-blue-800">{results.interpretation}</p>
    </div>
    <div className="mt-6 bg-green-50 p-4 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">
        Suggestions and Considerations
      </h3>
      <ul className="list-disc list-inside text-green-800">
        {results.suggestions.map((suggestion, index) => (
          <li key={index} className="mb-2">
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default ResultsSection;
