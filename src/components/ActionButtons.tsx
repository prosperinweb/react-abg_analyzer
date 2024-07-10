import { Download } from "lucide-react";

interface ActionButtonsProps {
  onReset: () => void;
  onExport: () => void;
  showExport: boolean;
}

const ActionButtons = ({
  onReset,
  onExport,
  showExport,
}: ActionButtonsProps) => (
  <div className="mt-8 flex justify-center space-x-4">
    <button
      onClick={onReset}
      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors duration-300"
    >
      Reset
    </button>
    {showExport && (
      <button
        onClick={onExport}
        className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300 flex items-center"
      >
        <Download size={18} className="mr-2" /> Export Results
      </button>
    )}
  </div>
);

export default ActionButtons;
