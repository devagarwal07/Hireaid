import { useState, useRef } from "react";
import GenerateInterviewModal from "./GenerateInterviewModal";
import AddStepPopup from "./AddStepPopup";
import AddQuestionModal from "./AddQuestionModal";
import type { Question, Section } from "./AddQuestionModal";

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
  const [showAddStepPopup, setShowAddStepPopup] = useState(false);
  const addRoundButtonRef = useRef<HTMLButtonElement>(null);

  // File upload state for Custom Test
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pipeline steps list
  const [pipelineSteps, setPipelineSteps] = useState<
    { id: number; type: "Interview" | "MCQ" | "Custom Test"; title: string; description: string }[]
  >([
    { id: 1, type: "Interview", title: "360 Evaluation", description: "Candidate Resume Scoring" },
    { id: 2, type: "Interview", title: "Technical Interview", description: "Test Candidate Skills" },
  ]);

  // Currently selected step to edit
  const [selectedStepId, setSelectedStepId] = useState<number>(2);

  // Questions and sections for Interview
  const [sections, setSections] = useState<Section[]>([
    { id: 1, name: "Warmup" },
    { id: 2, name: "Technical Evaluation" },
    { id: 3, name: "Culture Fit" },
  ]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [newSectionName, setNewSectionName] = useState("");

  // Handle adding new step from modal
  const handleAddStep = (step: {
    type: "Interview" | "MCQ" | "Custom Test";
    title: string;
    description: string;
  }) => {
    const newStep = {
      id: pipelineSteps.length + 1,
      ...step,
    };
    setPipelineSteps([...pipelineSteps, newStep]);
    setSelectedStepId(newStep.id); // Select the newly added step
  };

  // Handle adding/updating a question
  const handleSaveQuestion = (questionData: Omit<Question, "id">) => {
    if (editingQuestion) {
      // Update existing question
      setQuestions(questions.map(q =>
        q.id === editingQuestion.id ? { ...questionData, id: q.id } : q
      ));
    } else {
      // Add new question
      const newQuestion: Question = {
        ...questionData,
        id: questions.length + 1,
      };
      setQuestions([...questions, newQuestion]);
    }
    setEditingQuestion(null);
  };

  // Handle removing a question
  const handleRemoveQuestion = (questionId: number) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  // Handle editing a question
  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setShowAddQuestionModal(true);
  };

  // Handle adding new section
  const handleAddSection = () => {
    if (newSectionName.trim()) {
      const newSection: Section = {
        id: sections.length + 1,
        name: newSectionName.trim(),
      };
      setSections([...sections, newSection]);
      setNewSectionName("");
    }
  };

  // Handle file upload for Custom Test
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setUploadedFiles(Array.from(e.dataTransfer.files));
    }
  };

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
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm min-h-[600px] flex flex-col">
          {/* Dynamic Pipeline Steps */}
          <div className="space-y-3">
            {pipelineSteps.map((step, index) => (
              <div key={step.id}>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    {index === 0 ? (
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
                    ) : step.type === "Interview" ? (
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
                    ) : (
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
                    )}
                    <div>
                      <div className={`font-medium ${index === 0 ? 'font-semibold' : ''} text-gray-900`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {step.description}
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center justify-center w-7 h-7 rounded-full ${index === 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} text-sm font-medium`}>
                    {index + 1}
                  </div>
                </div>
                {/* Edit and Remove links for steps after the first one */}
                {index > 0 && (
                  <div className="flex items-center gap-3 ml-7 mt-1">
                    <button
                      onClick={() => {
                        setSelectedStepId(step.id);
                        setInterviewType(step.type);
                      }}
                      className="flex items-center gap-1 text-blue-600 text-xs hover:underline"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => setPipelineSteps(pipelineSteps.filter(s => s.id !== step.id))}
                      className="flex items-center gap-1 text-blue-600 text-xs hover:underline"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add A Round Button */}
          <div className="relative mt-auto pt-4">
            <button
              ref={addRoundButtonRef}
              onClick={() => setShowAddStepPopup(!showAddStepPopup)}
              className="w-full px-4 py-2 border-2 border-blue-600 text-blue-600 text-sm font-medium rounded-full hover:bg-blue-50 transition-colors"
            >
              Add A Round
            </button>
            <AddStepPopup
              isOpen={showAddStepPopup}
              onClose={() => setShowAddStepPopup(false)}
              onSelectType={(type) => {
                const titles = {
                  "Interview": "Technical Interview",
                  "MCQ": "MCQ Assessment",
                  "Custom Test": "Custom Test"
                };
                const descriptions = {
                  "Interview": "Test Candidate Skills",
                  "MCQ": "Multiple Choice Questions",
                  "Custom Test": "Add Step Description"
                };
                handleAddStep({
                  type,
                  title: titles[type],
                  description: descriptions[type]
                });
                setInterviewType(type);
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-[600px]">
        <div className="space-y-6 flex-1">
          {/* Show 360 Evaluation Section only when step 1 is selected */}
          {selectedStepId === 1 && (
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
          )}

          {/* Show Interview/MCQ/Custom Test Section for other steps */}
          {selectedStepId !== 1 && (
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
                    {interviewType === "Interview" ? "Technical Interview" : interviewType}
                    <span className="text-sm font-normal text-gray-400">
                      ({interviewType})
                    </span>
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
                <p className="text-sm text-gray-500">
                  {interviewType === "Interview" ? "Test Candidate Skills" :
                    interviewType === "Custom Test" ? "Add Step Description" :
                      "Multiple Choice Questions"}
                </p>

                {showInterviewDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
                    <button
                      onClick={() => handleInterviewTypeChange("Interview")}
                      className={`w-full px-4 py-2 text-left hover:bg-blue-50 text-gray-700 ${interviewType === "Interview" ? "bg-blue-50" : ""}`}
                    >
                      Interview
                    </button>
                    <button
                      onClick={() => handleInterviewTypeChange("MCQ")}
                      className={`w-full px-4 py-2 text-left hover:bg-blue-50 text-gray-700 ${interviewType === "MCQ" ? "bg-blue-50" : ""}`}
                    >
                      MCQ
                    </button>
                    <button
                      onClick={() => handleInterviewTypeChange("Custom Test")}
                      className={`w-full px-4 py-2 text-left hover:bg-blue-50 text-gray-700 ${interviewType === "Custom Test" ? "bg-blue-50" : ""}`}
                    >
                      Custom Test
                    </button>
                  </div>
                )}
              </div>

              {/* Conditional Form Content based on interviewType */}
              {interviewType === "Interview" && (
                <div>
                  <p className="text-sm text-gray-600 mb-6">
                    Interview can be set up later during interview prep. Enter interview
                    details here to standardize interview for all candidate
                  </p>

                  {/* Questions Table Header */}
                  {questions.length > 0 && (
                    <div className="mb-4">
                      <div className="grid grid-cols-12 gap-4 text-xs text-gray-500 uppercase font-medium pb-2 border-b">
                        <div className="col-span-6">Question</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-4 text-right">Actions</div>
                      </div>
                    </div>
                  )}

                  {/* Sections with Questions */}
                  {sections.map((section) => {
                    const sectionQuestions = questions.filter(q => q.sectionId === section.id);
                    return (
                      <div key={section.id} className="mb-6">
                        {/* Section Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-700">{section.name}</h4>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </div>
                          <button
                            onClick={() => {
                              setEditingQuestion(null);
                              setShowAddQuestionModal(true);
                            }}
                            className="text-blue-600 text-sm hover:underline"
                          >
                            + Add Question
                          </button>
                        </div>

                        {/* Questions in Section */}
                        {sectionQuestions.map((question, idx) => (
                          <div key={question.id} className="grid grid-cols-12 gap-4 py-3 border-b border-gray-100 items-center">
                            {/* Question */}
                            <div className="col-span-6 flex items-start gap-2">
                              <span className="text-gray-400 text-sm">{idx + 1}</span>
                              <span className="text-gray-700 text-sm">{question.text}</span>
                            </div>
                            {/* Type Tags */}
                            <div className="col-span-2 flex flex-wrap gap-1">
                              <span className={`px-2 py-0.5 text-xs rounded ${question.type === "Descriptive" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                                {question.type === "MCQ" ? `${question.options?.length || 4} Options` : "Descriptive"}
                              </span>
                              {question.type === "MCQ" && (
                                <span className="px-2 py-0.5 text-xs rounded bg-purple-100 text-purple-700">MCQ</span>
                              )}
                              {question.aiGenerated && (
                                <span className="px-2 py-0.5 text-xs rounded bg-green-100 text-green-700">AI Generated</span>
                              )}
                            </div>
                            {/* Actions */}
                            <div className="col-span-4 flex items-center justify-end gap-3">
                              <button className="flex items-center gap-1 text-blue-600 text-xs hover:underline">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View
                              </button>
                              <button
                                onClick={() => handleEditQuestion(question)}
                                className="flex items-center gap-1 text-blue-600 text-xs hover:underline"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Edit
                              </button>
                              <button
                                onClick={() => handleRemoveQuestion(question.id)}
                                className="flex items-center gap-1 text-red-600 text-xs hover:underline"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}

                        {sectionQuestions.length === 0 && (
                          <p className="text-gray-400 text-sm italic py-2">No questions in this section yet.</p>
                        )}
                      </div>
                    );
                  })}

                  {/* Add New Section */}
                  <div className="flex items-center gap-2 mb-6">
                    <input
                      type="text"
                      value={newSectionName}
                      onChange={(e) => setNewSectionName(e.target.value)}
                      placeholder="New section name..."
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleAddSection}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      + Add New Section
                    </button>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={() => {
                        setEditingQuestion(null);
                        setShowAddQuestionModal(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
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
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add Question
                    </button>
                    <button
                      onClick={() => setShowModal(true)}
                      className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
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
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      Edit Interview Structure
                    </button>
                  </div>
                </div>
              )}

              {interviewType === "Custom Test" && (
                <div className="space-y-5">
                  {/* Field Label with File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Field Label
                    </label>
                    <div
                      className="border border-gray-300 rounded-lg p-4"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleFileDrop}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
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
                      value={interviewCriteria}
                      onChange={(e) => setInterviewCriteria(e.target.value)}
                      placeholder="Use prompts to add/edit Evaluation Criteria"
                      rows={3}
                      className="w-full px-4 py-2 border border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              )}

              {interviewType === "MCQ" && (
                <div className="space-y-4">
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
              )}
            </div>
          )}
        </div>
        {/* Bottom Buttons */}
        <div className="flex justify-end gap-3 pt-4 mt-auto">
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

      {/* Add Question Modal */}
      <AddQuestionModal
        isOpen={showAddQuestionModal}
        onClose={() => {
          setShowAddQuestionModal(false);
          setEditingQuestion(null);
        }}
        onSave={handleSaveQuestion}
        sections={sections}
        editingQuestion={editingQuestion}
      />
    </div>
  );
}
