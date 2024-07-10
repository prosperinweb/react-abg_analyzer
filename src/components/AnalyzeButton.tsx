import { ArrowRight } from "lucide-react";

interface AnalyzeButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

const AnalyzeButton = ({ onClick, disabled, loading }: AnalyzeButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
          flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-full
          transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}
        `}
  >
    {loading ? (
      <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    ) : (
      <>
        Analyze <ArrowRight className="ml-2" size={20} />
      </>
    )}
  </button>
);

export default AnalyzeButton;
