import { useState } from "react";
import GenerateInterviewModal from "./GenerateInterviewModal";

interface HiringPipelineStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function HiringPipelineStep({
  onNext,
  onPrevious,
}: HiringPipelineStepProps) {
  // 360 Evaluation criteria state
  const [evaluationCriteria, setEvaluationCriteria] = useState<string[]>([
    "Minimum : 5-7 Years",
    "Preffered : 10+ Years",
    "Quality Assessment",
    "Auditing",
    "L&D Experience",
    "Advanced Excel skills",
    "Competency with Google tools",
    "Knowledge of HR policies and regulatory requirements",
    "English_Fluency",
    "Hindi_Proficiency",
    "Remote_Work_Ready",
    "Preffered : HR_Certifications",
    "HR_Training_Experience",
  ]);
  const [newCriteria, setNewCriteria] = useState("");

  // Interview section state
  const [interviewType, setInterviewType] = useState<
    "MCQ" | "Interview" | "Custom Test"
  >("Interview");
  const [showInterviewDropdown, setShowInterviewDropdown] = useState(false);
  const [candidateEmail, setCandidateEmail] = useState("");
  const [evaluators, setEvaluators] = useState("");
  const [interviewCriteria, setInterviewCriteria] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Add new criteria
  const addCriteria = () => {
    if (newCriteria.trim()) {
      setEvaluationCriteria([...evaluationCriteria, newCriteria.trim()]);
      setNewCriteria("");
    }
  };

  // Remove criteria
  const removeCriteria = (index: number) => {
    setEvaluationCriteria(evaluationCriteria.filter((_, i) => i !== index));
  };

  // Handle Enter key in textarea
  const handleCriteriaKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addCriteria();
    }
  };

  const handleInterviewTypeChange = (
    type: "MCQ" | "Interview" | "Custom Test"
  ) => {
    setInterviewType(type);
    setShowInterviewDropdown(false);
  };

  const handleGenerateInterview = (data: {
    templates: string[];
    purpose: string;
    maxQuestions: string;
  }) => {
    console.log("Generated interview data:", data);
    // Handle the generated interview data
  };

  return (
    <div className="flex gap-6">
      {/* Left Sidebar */}
      <div className="w-64 flex-shrink-0">
        <div className="space-y-3">
          {/* 360 Evaluation */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <svg
                className="w-5 h-5 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <div className="font-semibold text-gray-900">
                  360 Evaluation
                </div>
                <div className="text-xs text-gray-500">
                  Candidate Resume Scoring
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-medium">
              1
            </div>
          </div>

          {/* Technical Interview */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <svg
                className="w-5 h-5 text-teal-600"
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
              <div>
                <div className="font-medium text-gray-900">
                  Technical Interview
                </div>
                <div className="text-xs text-gray-500">
                  Test Candidates skills
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-gray-600 text-sm font-medium">
              2
            </div>
          </div>

          <button className="text-blue-600 text-sm hover:underline ml-7">
            Edit
          </button>

          {/* Final Interview */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center gap-2 flex-1">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div>
                <div className="font-medium text-gray-400">Final Interview</div>
              </div>
            </div>
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-gray-600 text-sm font-medium">
              3
            </div>
          </div>

          {/* Add Step Button */}
          <button className="w-full mt-6 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
            Add Step
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* 360 Evaluation Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              360 Evaluation
            </h3>
            <p className="text-sm text-gray-500">Candidate Resume Scoring</p>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="text-sm font-medium text-gray-900">
                Recommended Evaluation Criteria
              </h4>
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

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {evaluationCriteria.map((criteria, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-50 text-teal-700 text-sm rounded-md border border-teal-200"
                >
                  {criteria}
                  <button
                    onClick={() => removeCriteria(index)}
                    className="hover:text-teal-900 ml-1"
                    type="button"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium text-gray-900">
                Enter Evaluation Criteria
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
            <div className="relative">
              <textarea
                value={newCriteria}
                onChange={(e) => setNewCriteria(e.target.value)}
                onKeyPress={handleCriteriaKeyPress}
                className="w-full h-40 p-4 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-gray-700"
                placeholder="Use prompts to add/edit Evaluation Criteria (Press Enter to add)"
              />
              {newCriteria.trim() && (
                <button
                  onClick={addCriteria}
                  type="button"
                  className="absolute bottom-3 right-3 px-4 py-1.5 bg-teal-600 text-white text-sm rounded hover:bg-teal-700"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Interview Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {/* Interview Type Header with Dropdown */}
          <div className="mb-6 relative">
            <div className="flex items-center gap-2 mb-1">
              <svg
                className="w-5 h-5 text-gray-600"
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
                onClick={() => setShowInterviewDropdown(!showInterviewDropdown)}
                className="flex items-center gap-2 text-xl font-semibold text-gray-900 hover:text-gray-700"
              >
                {interviewType}
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {showInterviewDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
                <button
                  onClick={() => handleInterviewTypeChange("MCQ")}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                >
                  MCQ
                </button>
                <button
                  onClick={() => handleInterviewTypeChange("Interview")}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                >
                  Interview
                </button>
                <button
                  onClick={() => handleInterviewTypeChange("Custom Test")}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                >
                  Custom Test
                </button>
              </div>
            )}
          </div>

          {/* Interview Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter email to be sent to candidates
              </label>
              <input
                type="email"
                value={candidateEmail}
                onChange={(e) => setCandidateEmail(e.target.value)}
                placeholder="candidate@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign evaluators
              </label>
              <input
                type="text"
                value={evaluators}
                onChange={(e) => setEvaluators(e.target.value)}
                placeholder="Enter evaluator names or emails"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Evaluation criteria
              </label>
              <textarea
                value={interviewCriteria}
                onChange={(e) => setInterviewCriteria(e.target.value)}
                placeholder="Enter evaluation criteria for this interview"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* OK Button */}
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
            >
              OK
            </button>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onPrevious}
            className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
          >
            Back
          </button>

          <button
            type="button"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            Save as Draft
          </button>

          <button
            type="button"
            onClick={onNext}
            className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
          >
            Next
          </button>
        </div>
      </div>

      {/* Generate Interview Modal */}
      <GenerateInterviewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onGenerate={handleGenerateInterview}
      />
    </div>
  );
}
