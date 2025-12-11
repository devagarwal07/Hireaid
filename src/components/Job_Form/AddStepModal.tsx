import { useState, useRef, useEffect } from "react";

interface AddStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStep: (step: {
    type: "Interview" | "MCQ" | "Custom Test";
    title: string;
    description: string;
  }) => void;
}

type AssessmentType = "Interview" | "MCQ" | "Custom Test";

export default function AddStepModal({
  isOpen,
  onClose,
  onAddStep,
}: AddStepModalProps) {
  const [selectedType, setSelectedType] = useState<AssessmentType | null>(null);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [stepTitle, setStepTitle] = useState("Technical Interview");
  const [stepDescription, setStepDescription] = useState("Test Candidate Skills");
  
  // Custom Test specific fields
  const [candidateEmail, setCandidateEmail] = useState("");
  const [evaluators, setEvaluators] = useState("");
  const [evaluationCriteria, setEvaluationCriteria] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowTypeDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleTypeSelect = (type: AssessmentType) => {
    setSelectedType(type);
    setShowTypeDropdown(false);
    // Set default titles based on type
    if (type === "Interview") {
      setStepTitle("Technical Interview");
      setStepDescription("Test Candidate Skills");
    } else if (type === "MCQ") {
      setStepTitle("MCQ Assessment");
      setStepDescription("Multiple Choice Questions");
    } else {
      setStepTitle("Custom Test");
      setStepDescription("Add Step Description");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setUploadedFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleSave = () => {
    if (selectedType) {
      onAddStep({
        type: selectedType,
        title: stepTitle,
        description: stepDescription,
      });
      onClose();
      // Reset state
      setSelectedType(null);
      setStepTitle("");
      setStepDescription("");
      setCandidateEmail("");
      setEvaluators("");
      setEvaluationCriteria("");
      setUploadedFiles([]);
    }
  };

  // Assessment Type Selection View
  if (!selectedType) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-64 mx-4">
          <div className="p-4">
            <p className="text-xs text-gray-400 mb-3">Chip 0</p>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Select Type of Assessment
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => handleTypeSelect("Interview")}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 rounded transition-colors"
              >
                Interview
              </button>
              <button
                onClick={() => handleTypeSelect("MCQ")}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 rounded transition-colors"
              >
                MCQ
              </button>
              <button
                onClick={() => handleTypeSelect("Custom Test")}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 rounded transition-colors"
              >
                Custom Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Interview View
  if (selectedType === "Interview") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
          <div className="p-6">
            {/* Header with type selector */}
            <div className="mb-4 relative" ref={dropdownRef}>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                <button
                  onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                  className="flex items-center gap-2 text-xl font-semibold text-gray-900 hover:text-gray-700"
                >
                  {stepTitle}
                  <span className="text-sm font-normal text-gray-400">
                    ({selectedType})
                  </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {showTypeDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
                  <button
                    onClick={() => handleTypeSelect("Interview")}
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 text-gray-700"
                  >
                    Interview
                  </button>
                  <button
                    onClick={() => handleTypeSelect("MCQ")}
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 text-gray-700"
                  >
                    MCQ
                  </button>
                  <button
                    onClick={() => handleTypeSelect("Custom Test")}
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 text-gray-700"
                  >
                    Custom Test
                  </button>
                </div>
              )}

              <p className="text-sm text-gray-500 mt-1">{stepDescription}</p>
            </div>

            {/* Interview Content */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-6">
                Interview can be set up later during interview prep. Enter interview 
                details here to standardize interview for all candidate
              </p>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Generate Interview Structure
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Question
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MCQ View
  if (selectedType === "MCQ") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
          <div className="p-6">
            {/* Header with type selector */}
            <div className="mb-4 relative" ref={dropdownRef}>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                <button
                  onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                  className="flex items-center gap-2 text-xl font-semibold text-gray-900 hover:text-gray-700"
                >
                  {stepTitle}
                  <span className="text-sm font-normal text-gray-400">
                    ({selectedType})
                  </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {showTypeDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
                  <button
                    onClick={() => handleTypeSelect("Interview")}
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 text-gray-700"
                  >
                    Interview
                  </button>
                  <button
                    onClick={() => handleTypeSelect("MCQ")}
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 text-gray-700"
                  >
                    MCQ
                  </button>
                  <button
                    onClick={() => handleTypeSelect("Custom Test")}
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 text-gray-700"
                  >
                    Custom Test
                  </button>
                </div>
              )}

              <p className="text-sm text-gray-500 mt-1">{stepDescription}</p>
            </div>

            {/* MCQ Content */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Number of Questions
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
                  type="number"
                  placeholder="Enter number of questions"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Time Limit (minutes)
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
                  type="number"
                  placeholder="Enter time limit"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Topics to Cover
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
                  placeholder="Enter topics to be covered in the MCQ"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Custom Test View
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header with type selector */}
          <div className="mb-4 relative" ref={dropdownRef}>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <button
                onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                className="flex items-center gap-2 text-xl font-semibold text-gray-900 hover:text-gray-700"
              >
                {stepTitle}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {showTypeDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
                <button
                  onClick={() => handleTypeSelect("Interview")}
                  className="w-full px-4 py-2 text-left hover:bg-blue-50 text-gray-700"
                >
                  Interview
                </button>
                <button
                  onClick={() => handleTypeSelect("MCQ")}
                  className="w-full px-4 py-2 text-left hover:bg-blue-50 text-gray-700"
                >
                  MCQ
                </button>
                <button
                  onClick={() => handleTypeSelect("Custom Test")}
                  className="w-full px-4 py-2 text-left hover:bg-blue-50 text-gray-700"
                >
                  Custom Test
                </button>
              </div>
            )}

            <p className="text-sm text-gray-500 mt-1">{stepDescription}</p>
          </div>

          {/* Custom Test Content */}
          <div className="space-y-5">
            {/* Field Label with File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Field Label
              </label>
              <div
                className="border border-gray-300 rounded-lg p-4 text-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    Upload Files
                  </button>
                  <span className="text-sm text-gray-500">Or drop files</span>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    {uploadedFiles.map((file, i) => (
                      <div key={i}>{file.name}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Required Email Field */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Enter email to be send to candidates
                </label>
                <span className="text-xs text-red-500">Required</span>
                <svg
                  className="w-4 h-4 text-gray-400 ml-auto"
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
                value={candidateEmail}
                onChange={(e) => setCandidateEmail(e.target.value)}
                placeholder="Compose Email"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Assign Evaluators */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Assign Evaluators
                </label>
                <svg
                  className="w-4 h-4 text-gray-400 ml-auto"
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
                value={evaluators}
                onChange={(e) => setEvaluators(e.target.value)}
                placeholder="Enter Evaluator's Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Evaluation Criteria */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Enter Evaluation Criteria
                </label>
                <svg
                  className="w-4 h-4 text-gray-400 ml-auto"
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
                value={evaluationCriteria}
                onChange={(e) => setEvaluationCriteria(e.target.value)}
                placeholder="Use prompts to add/edit Evaluation Criteria"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
