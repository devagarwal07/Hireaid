import { useState } from "react";

interface GenerateInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (data: {
    templates: string[];
    purpose: string;
    maxQuestions: string;
  }) => void;
}

export default function GenerateInterviewModal({
  isOpen,
  onClose,
  onGenerate,
}: GenerateInterviewModalProps) {
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [purpose, setPurpose] = useState("");
  const [maxQuestions, setMaxQuestions] = useState("");

  if (!isOpen) return null;

  const templates = ["Technical Evaluation", "Complete Evaluation"];

  const toggleTemplate = (template: string) => {
    if (selectedTemplates.includes(template)) {
      setSelectedTemplates(selectedTemplates.filter((t) => t !== template));
    } else {
      setSelectedTemplates([...selectedTemplates, template]);
    }
  };

  const handleGenerate = () => {
    onGenerate({ templates: selectedTemplates, purpose, maxQuestions });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 border-4 border-blue-600">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Generate interview structure
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Interview Templates */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <label className="text-sm font-medium text-gray-700">
                Interview Templates{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex flex-wrap gap-3">
              {templates.map((template) => (
                <button
                  key={template}
                  onClick={() => toggleTemplate(template)}
                  className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                    selectedTemplates.includes(template)
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-300 bg-white text-gray-700 hover:border-blue-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    {template}
                  </div>
                </button>
              ))}
              <button className="px-4 py-2 rounded-lg border-2 border-gray-300 bg-white text-gray-700 hover:border-blue-400 text-sm font-medium">
                Complete Evaluation
              </button>
              <button className="px-4 py-2 rounded-lg border-2 border-gray-300 bg-white text-gray-700 hover:border-blue-400 text-sm font-medium">
                C
              </button>
            </div>
          </div>

          {/* Define Purpose */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <label className="text-sm font-medium text-gray-700">
                Define purpose of the interview
              </label>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Describe the type of interview you want to conduct, be specific about the objective and what are the areas you want to evaluate the candidate in"
              className="w-full h-24 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>

          {/* Maximum Number of Questions */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <label className="text-sm font-medium text-gray-700">
                Maximum Number of Questions
              </label>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={maxQuestions}
              onChange={(e) => setMaxQuestions(e.target.value)}
              placeholder="Enter number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={handleGenerate}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
          >
            Generate Questions
          </button>
        </div>
      </div>
    </div>
  );
}
