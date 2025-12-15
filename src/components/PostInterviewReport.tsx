import React, { useState } from "react";

interface QuestionEvaluation {
    question: string;
    score: number;
    criteria: {
        text: string;
        checked: boolean;
    }[];
}

interface InterviewData {
    conductedBy: string;
    date: string;
    time: string;
    duration: string;
    evaluationTags: string[];
    strengths: string[];
    improvements: string[];
    questions: QuestionEvaluation[];
}

interface PostInterviewReportProps {
    candidateName: string;
    interviewData: InterviewData;
}

// Icons
const CheckCircleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#22C55E" />
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const WarningCircleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#F59E0B" />
        <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const CalendarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const ClockIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
    </svg>
);

const DurationIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
    </svg>
);

const NoteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0857A1" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 7h8M8 12h8M8 17h4" />
    </svg>
);

const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0857A1" strokeWidth="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const SparkleIcon = ({ color = "#22C55E" }: { color?: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9l6 6 6-6" />
    </svg>
);

const ChevronUpIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 15l-6-6-6 6" />
    </svg>
);

const CheckboxChecked = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#22C55E" />
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CheckboxUnchecked = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="#D1D5DB" strokeWidth="2" />
    </svg>
);

export default function PostInterviewReport({ candidateName, interviewData }: PostInterviewReportProps): React.ReactElement {
    const [activeTab, setActiveTab] = useState<"summary" | "transcript" | "notes">("summary");
    const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({ 0: true });

    const toggleQuestion = (index: number) => {
        setExpandedQuestions(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <UserIcon />
                        </div>
                        <h2 className="text-xl font-semibold text-[#181D27]">{candidateName} Report</h2>
                        <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                            <CheckCircleIcon />
                            Interview Completed
                        </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                            <ClockIcon />
                            {interviewData.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <CalendarIcon />
                            {interviewData.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <DurationIcon />
                            {interviewData.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <UserIcon />
                            Conducted by {interviewData.conductedBy}
                        </span>
                    </div>
                </div>
            </div>

            {/* Dashboard Title */}
            <div className="border-b border-[#E5E7EB] pb-4">
                <h3 className="text-lg font-semibold text-[#181D27]">Interview Prep Dashboard - Interview Completed</h3>
            </div>

            {/* Interview Report Card */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
                {/* Report Header */}
                <div className="flex items-center justify-between p-5 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-2">
                        <SparkleIcon color="#0857A1" />
                        <h4 className="text-base font-semibold text-[#181D27]">Interview Report</h4>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 text-sm text-[#0857A1] hover:underline">
                            <NoteIcon />
                            Add Notes
                        </button>
                        <button className="flex items-center gap-2 text-sm text-[#0857A1] hover:underline">
                            <EditIcon />
                            Edit Evaluation
                        </button>
                    </div>
                </div>

                {/* Evaluation Tags */}
                <div className="p-5 border-b border-[#E5E7EB]">
                    <div className="flex flex-wrap gap-2">
                        {interviewData.evaluationTags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                        <span className="px-3 py-1.5 bg-green-50 text-green-600 text-xs font-medium rounded-full border border-green-200">
                            Same answers followed to use in database
                        </span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-[#E5E7EB]">
                    <div className="flex">
                        {[
                            { id: "summary", label: "AI Summary" },
                            { id: "transcript", label: "Interview Transcript" },
                            { id: "notes", label: "Interview Notes" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                                    ? "border-[#0857A1] text-[#0857A1] bg-blue-50/30"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === "summary" && (
                        <div className="grid grid-cols-2 gap-6">
                            {/* Strengths */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <SparkleIcon color="#22C55E" />
                                    <h5 className="text-sm font-semibold text-green-600">Strengths</h5>
                                </div>
                                <ul className="space-y-3">
                                    {interviewData.strengths.map((item, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                            <span className="text-gray-400 mt-0.5">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Improvements */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <SparkleIcon color="#F59E0B" />
                                    <h5 className="text-sm font-semibold text-amber-500">What Needs Improvement</h5>
                                </div>
                                <ul className="space-y-3">
                                    {interviewData.improvements.map((item, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                            <span className="text-gray-400 mt-0.5">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === "transcript" && (
                        <div className="py-8 text-center text-gray-500">
                            Interview transcript will be displayed here
                        </div>
                    )}

                    {activeTab === "notes" && (
                        <div className="py-8 text-center text-gray-500">
                            Interview notes will be displayed here
                        </div>
                    )}
                </div>
            </div>

            {/* Per Question Evaluation */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-2">
                        <SparkleIcon color="#0857A1" />
                        <h4 className="text-base font-semibold text-[#181D27]">Per Question Evaluation</h4>
                    </div>
                    <button className="text-sm text-[#0857A1] hover:underline">
                        Collapse
                    </button>
                </div>

                <div className="divide-y divide-[#E5E7EB]">
                    {interviewData.questions.map((q, qIdx) => (
                        <div key={qIdx} className="p-5">
                            <button
                                onClick={() => toggleQuestion(qIdx)}
                                className="w-full flex items-start justify-between text-left"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-[#1e3a5f]">
                                            {q.score}<span className="text-sm font-normal text-gray-400">/10</span>
                                        </div>
                                        <div className="text-xs text-gray-500">Score</div>
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-medium text-[#181D27] mb-1">
                                            Question {qIdx + 1}: {q.question}
                                        </h5>
                                    </div>
                                </div>
                                {expandedQuestions[qIdx] ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            </button>

                            {expandedQuestions[qIdx] && (
                                <div className="mt-4 ml-16 space-y-2">
                                    {q.criteria.map((criterion, cIdx) => (
                                        <div key={cIdx} className="flex items-center gap-3">
                                            {criterion.checked ? <CheckboxChecked /> : <CheckboxUnchecked />}
                                            <span className="text-sm text-gray-600">{criterion.text}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
