import { useState, useRef } from "react";

export interface Question {
    id: number;
    sectionId: number;
    text: string;
    type: "Descriptive" | "MCQ" | "Presentation";
    aiGenerated: boolean;
    options?: string[];
    correctOption?: number;
    explanation?: string;
    evaluationCriteria?: string[];
}

export interface Section {
    id: number;
    name: string;
}

interface AddQuestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (question: Omit<Question, "id">) => void;
    onSaveAll?: (questions: Omit<Question, "id">[]) => void;
    sections: Section[];
    editingQuestion?: Question | null;
}

type TabType = "Upload" | "Manual" | "AI Prompt";
type ViewType = "create" | "review";

export default function AddQuestionModal({
    isOpen,
    onClose,
    onSave,
    onSaveAll,
    sections,
    editingQuestion,
}: AddQuestionModalProps) {
    // Tab and view state
    const [activeTab, setActiveTab] = useState<TabType>("Manual");
    const [currentView, setCurrentView] = useState<ViewType>("create");

    // Manual tab state
    const [questionType, setQuestionType] = useState<"Descriptive" | "MCQ" | "Presentation">("Descriptive");
    const [questionText, setQuestionText] = useState("");

    // Upload tab state
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // AI Prompt tab state
    const [aiPrompt, setAiPrompt] = useState("");
    const [numQuestions, setNumQuestions] = useState("5");

    // Review state
    const [generatedQuestions, setGeneratedQuestions] = useState<Omit<Question, "id">[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [evaluationCriteria, setEvaluationCriteria] = useState<string[]>([
        "HR_Managing_Experience",
        "Solution_Scalability",
        "Solution_Relevance",
        "HR_Training_Experience",
    ]);
    const [newCriteria, setNewCriteria] = useState("");

    // Reset form when modal opens
    const resetForm = () => {
        setActiveTab("Manual");
        setCurrentView("create");
        setQuestionType("Descriptive");
        setQuestionText("");
        setUploadedFile(null);
        setAiPrompt("");
        setNumQuestions("5");
        setGeneratedQuestions([]);
        setCurrentQuestionIndex(0);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    // Handle file upload
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
        }
    };

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setUploadedFile(e.dataTransfer.files[0]);
        }
    };

    const removeFile = () => {
        setUploadedFile(null);
    };

    // Handle adding question from Manual tab
    const handleAddQuestion = () => {
        if (!questionText.trim()) return;

        const newQuestion: Omit<Question, "id"> = {
            sectionId: sections[0]?.id || 1,
            text: questionText,
            type: questionType,
            aiGenerated: false,
        };

        // Add to generated questions and switch to review
        setGeneratedQuestions([...generatedQuestions, newQuestion]);
        setCurrentQuestionIndex(generatedQuestions.length);
        setQuestionText("");
        setCurrentView("review");
    };

    // Handle upload questions
    const handleUploadQuestions = () => {
        if (!uploadedFile) return;
        // Simulate parsing questions from file
        const mockQuestions: Omit<Question, "id">[] = [
            {
                sectionId: 1,
                text: "What are the primary options when it comes to handling a large team which works remotely spread across various countries?",
                type: "Descriptive",
                aiGenerated: false,
            },
        ];
        setGeneratedQuestions(mockQuestions);
        setCurrentView("review");
    };

    // Handle generate questions with AI
    const handleGenerateQuestions = () => {
        if (!aiPrompt.trim()) return;
        // Simulate AI generation
        const mockQuestions: Omit<Question, "id">[] = Array.from(
            { length: parseInt(numQuestions) || 5 },
            (_, i) => ({
                sectionId: 1,
                text: `AI generated question ${i + 1} based on prompt: "${aiPrompt.substring(0, 50)}..."`,
                type: "Descriptive" as const,
                aiGenerated: true,
                evaluationCriteria: ["HR_Managing_Experience", "Solution_Scalability"],
            })
        );
        setGeneratedQuestions(mockQuestions);
        setCurrentQuestionIndex(0);
        setCurrentView("review");
    };

    // Handle adding current question
    const handleAddCurrentQuestion = () => {
        const question = generatedQuestions[currentQuestionIndex];
        if (question) {
            onSave({
                ...question,
                evaluationCriteria,
            });
        }
        handleClose();
    };

    // Handle adding all questions
    const handleAddAllQuestions = () => {
        generatedQuestions.forEach((q) => {
            onSave({
                ...q,
                evaluationCriteria,
            });
        });
        handleClose();
    };

    // Remove evaluation criteria
    const removeCriteria = (index: number) => {
        setEvaluationCriteria(evaluationCriteria.filter((_, i) => i !== index));
    };

    if (!isOpen) return null;

    const currentQuestion = generatedQuestions[currentQuestionIndex];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-200">
                    {currentView === "review" ? (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentView("create")}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ← Create Question
                            </button>
                            <span className="text-gray-400">/</span>
                            <span className="font-semibold text-gray-900">Review Question</span>
                        </div>
                    ) : (
                        <h2 className="text-lg font-semibold text-gray-900">Create Questions</h2>
                    )}
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Create View */}
                {currentView === "create" && (
                    <>
                        {/* Tabs */}
                        <div className="flex border-b border-gray-200 px-5">
                            {(["Upload", "Manual", "AI Prompt"] as TabType[]).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="p-5">
                            {/* Upload Tab */}
                            {activeTab === "Upload" && (
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-sm font-medium text-gray-700">Upload Questions Bank</label>
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>

                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={handleFileDrop}
                                    >
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".pdf,.xls,.xlsx,.docx"
                                            onChange={handleFileSelect}
                                            className="hidden"
                                        />
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="inline-flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                            Upload Document
                                        </button>
                                        <p className="text-xs text-gray-500 mt-3">
                                            Upload file formats to be in PDF or XLS format
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            Maximum file size: 50KB • Maximum files allowed: 10
                                        </p>
                                    </div>

                                    {uploadedFile && (
                                        <div className="flex items-center justify-between mt-4 p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">{uploadedFile.name}</p>
                                                    <p className="text-xs text-gray-500">{Math.round(uploadedFile.size / 1024)}KB</p>
                                                </div>
                                            </div>
                                            <button onClick={removeFile} className="text-gray-400 hover:text-gray-600">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}

                                    <div className="flex justify-end mt-6">
                                        <button
                                            onClick={handleUploadQuestions}
                                            disabled={!uploadedFile}
                                            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Upload Questions
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Manual Tab */}
                            {activeTab === "Manual" && (
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-medium text-gray-700">Question Type</label>
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>

                                    <div className="flex gap-4 mb-5">
                                        {(["Descriptive", "MCQ", "Presentation"] as const).map((type) => (
                                            <label key={type} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="questionType"
                                                    checked={questionType === type}
                                                    onChange={() => setQuestionType(type)}
                                                    className="w-4 h-4 text-blue-600"
                                                />
                                                <span className="text-sm text-gray-700">
                                                    {type === "Descriptive" && "◇ "}
                                                    {type === "MCQ" && "≡ "}
                                                    {type === "Presentation" && "⊞ "}
                                                    {type}
                                                </span>
                                            </label>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-medium text-gray-700">Enter Questions</label>
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <textarea
                                        value={questionText}
                                        onChange={(e) => setQuestionText(e.target.value)}
                                        placeholder="Enter Question"
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                                    />

                                    <div className="flex justify-end mt-6">
                                        <button
                                            onClick={handleAddQuestion}
                                            disabled={!questionText.trim()}
                                            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Add Question
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* AI Prompt Tab */}
                            {activeTab === "AI Prompt" && (
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-medium text-gray-700">Enter Prompt</label>
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <textarea
                                        value={aiPrompt}
                                        onChange={(e) => setAiPrompt(e.target.value)}
                                        placeholder="Generate a mix of voice and MCQ questions to evaluate the candidates proficiency with privacy laws in EU"
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                                    />

                                    <div className="mt-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-sm font-medium text-gray-700">
                                                Number of Questions to Generate (default 1)
                                            </label>
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="number"
                                            value={numQuestions}
                                            onChange={(e) => setNumQuestions(e.target.value)}
                                            min="1"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        />
                                        <p className="text-xs text-red-500 mt-1">Required</p>
                                    </div>

                                    <div className="flex justify-end mt-6">
                                        <button
                                            onClick={handleGenerateQuestions}
                                            disabled={!aiPrompt.trim() || !numQuestions}
                                            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Generate Questions
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Review View */}
                {currentView === "review" && currentQuestion && (
                    <div className="p-5">
                        {/* Question Navigation */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">
                                    Question {String(currentQuestionIndex + 1).padStart(2, "0")}
                                </span>
                                <span className="text-gray-500">
                                    (Total {generatedQuestions.length} Questions)
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                                    disabled={currentQuestionIndex === 0}
                                    className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                >
                                    ◯ Previous
                                </button>
                                <button
                                    onClick={() => setCurrentQuestionIndex(Math.min(generatedQuestions.length - 1, currentQuestionIndex + 1))}
                                    disabled={currentQuestionIndex === generatedQuestions.length - 1}
                                    className="text-blue-600 hover:text-blue-700 disabled:opacity-50"
                                >
                                    Next ◯
                                </button>
                            </div>
                        </div>

                        {/* Question Content */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Question</span>
                                <div className="flex items-center gap-3">
                                    <button className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        Edit
                                    </button>
                                    <button className="text-red-600 text-sm hover:underline flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Remove
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-700 text-sm">{currentQuestion.text}</p>
                        </div>

                        {/* MCQ Options - Show for MCQ type */}
                        {currentQuestion.type === "MCQ" && currentQuestion.options && (
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Options</span>
                                </div>
                                <div className="space-y-2">
                                    {currentQuestion.options.map((option, index) => (
                                        <div
                                            key={index}
                                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${currentQuestion.correctOption === index
                                                    ? "border-teal-500 bg-teal-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            <span className="text-sm text-gray-700">{option}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Explanation */}
                                {currentQuestion.explanation && (
                                    <div className="mt-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">Explanation</span>
                                        </div>
                                        <p className="text-sm text-gray-600">{currentQuestion.explanation}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* AI Assistant */}
                        {currentQuestion.aiGenerated && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-blue-600 font-medium text-sm">AI Assistant</span>
                                    <button className="text-blue-600 text-sm hover:underline">Apply</button>
                                </div>
                                <p className="text-sm text-gray-700">
                                    HR Quality & Training specialist is not a very commonly used term we recommend changing
                                    the title to something along the lines of "Senior HR Recruiter"
                                </p>
                            </div>
                        )}

                        {/* Evaluation Criteria */}
                        <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-3">Answer Evaluation Criteria</h4>

                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium text-gray-700">Recommended Evaluation Criteria</label>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {evaluationCriteria.map((criteria, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                                    >
                                        {criteria}
                                        <button onClick={() => removeCriteria(index)} className="hover:text-blue-900">
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium text-gray-700">Enter Evaluation Criteria</label>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <textarea
                                value={newCriteria}
                                onChange={(e) => setNewCriteria(e.target.value)}
                                placeholder="Use prompts to add/edit Evaluation Criteria"
                                rows={3}
                                className="w-full px-4 py-3 border border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none text-sm"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-3 pt-4">
                            <button
                                onClick={handleAddAllQuestions}
                                className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium"
                            >
                                Add All Questions
                            </button>
                            <button
                                onClick={handleAddCurrentQuestion}
                                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                            >
                                Add Current Question
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
