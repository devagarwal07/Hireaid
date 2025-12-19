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
    onScheduleTest?: () => void;
}

// Icons
const CheckCircleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#22C55E" />
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

const DownloadIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7,10 12,15 17,10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const ShareIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
);

const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const InfoIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0857A1" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
);

export default function PostInterviewReport({ candidateName, interviewData, onScheduleTest }: PostInterviewReportProps): React.ReactElement {
    const [activeTab, setActiveTab] = useState<"summary" | "transcript" | "notes">("summary");
    const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({ 0: true });
    const [showTakeAction, setShowTakeAction] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showScheduleTestModal, setShowScheduleTestModal] = useState(false);
    const [testDate, setTestDate] = useState("");
    const [testTime, setTestTime] = useState("");
    const [testDuration, setTestDuration] = useState("60");
    const [shareEmails, setShareEmails] = useState<string[]>(["JohnDoe@HireAide.com", "PhilipSam@HireAide.com"]);
    const [newEmail, setNewEmail] = useState("");
    const [shareFormat, setShareFormat] = useState("PDF");
    const [shareMessage, setShareMessage] = useState(`Subject: Interview with ${candidateName} - HR Specialist Role

Hi ${candidateName},

Thank you for taking the time to speak with us regarding the [Role Name] position at [Company Name]. We enjoyed learning more about your background and experiences.

Our team will be reviewing all interview feedback, and we'll get back to you with the next steps shortly. If you have any questions in the meantime, please feel free to reach out.

Best regards,
John Doe`);
    const [shareOptions, setShareOptions] = useState({
        evaluatedScore: true,
        criteria: true,
        aiSummary: true,
    });

    const toggleQuestion = (index: number) => {
        setExpandedQuestions(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleShare = () => {
        setShowShareModal(false);
        setSuccessMessage(`Report has been successfully shared to ${shareEmails.join(" and ")}.`);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    const handleDownload = () => {
        setShowTakeAction(false);
        setSuccessMessage("Report has been successfully downloaded.");
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
        console.log("Downloading report for", candidateName);
    };

    const removeEmail = (email: string) => {
        setShareEmails(shareEmails.filter(e => e !== email));
    };

    const addEmail = () => {
        if (newEmail && !shareEmails.includes(newEmail)) {
            setShareEmails([...shareEmails, newEmail]);
            setNewEmail("");
        }
    };

    const handleEditEvaluation = () => {
        setShowTakeAction(false);
        setIsEditMode(true);
    };

    const handleApplyChanges = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmEdit = () => {
        setShowConfirmModal(false);
        setIsEditMode(false);
        setSuccessMessage("Report evaluation has been successfully edited.");
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    return (
        <div className="space-y-6 relative">
            {/* Success Toast */}
            {showSuccessToast && (
                <div className="fixed top-6 right-6 z-50 bg-white rounded-lg shadow-lg border border-green-200 p-4 flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-medium text-[#181D27]">Success</h4>
                        <p className="text-sm text-gray-600">{successMessage}</p>
                    </div>
                    <button onClick={() => setShowSuccessToast(false)} className="text-gray-400 hover:text-gray-600">
                        <CloseIcon />
                    </button>
                </div>
            )}

            {/* Confirmation Modal for Edit */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-[450px] p-6">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <InfoIcon />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-[#181D27]">Confirmation</h3>
                                <p className="text-sm text-gray-600 mt-2">
                                    Are you sure you want to proceed ahead with the evaluation edit?
                                </p>
                            </div>
                            <button onClick={() => setShowConfirmModal(false)} className="text-gray-400 hover:text-gray-600 ml-auto">
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmEdit}
                                className="px-4 py-2 bg-[#0857A1] text-white text-sm font-medium rounded-lg hover:bg-[#064a85] transition-colors"
                            >
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                {/* Report Header with Take Action or Apply Changes */}
                <div className="flex items-center justify-between p-5 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-2">
                        <SparkleIcon color="#0857A1" />
                        <h4 className="text-base font-semibold text-[#181D27]">Interview Report</h4>
                    </div>
                    {isEditMode ? (
                        <button
                            onClick={handleApplyChanges}
                            className="text-sm text-[#0857A1] font-medium hover:underline"
                        >
                            Apply Changes
                        </button>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setShowTakeAction(!showTakeAction)}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-[#0857A1] font-medium hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                Take Action
                                <ChevronDownIcon />
                            </button>
                            {showTakeAction && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setShowTakeAction(false)} />
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                                        <button
                                            onClick={handleDownload}
                                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <DownloadIcon />
                                            Download Report
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowTakeAction(false);
                                                setShowShareModal(true);
                                            }}
                                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <ShareIcon />
                                            Share Report
                                        </button>
                                        <button
                                            onClick={handleEditEvaluation}
                                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[#0857A1] bg-blue-50 hover:bg-blue-100 transition-colors"
                                        >
                                            <EditIcon />
                                            Edit Evaluation
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Score and Evaluation Tags */}
                <div className="p-5 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-4">
                        <div className="text-center pr-4 border-r border-gray-200">
                            <div className="text-3xl font-bold text-[#1e3a5f]">
                                8.4<span className="text-sm font-normal text-gray-400">/10</span>
                            </div>
                            <div className="text-xs text-gray-500">Score</div>
                        </div>
                        <div className="flex-1 flex flex-wrap gap-2">
                            {interviewData.evaluationTags.map((tag, idx) => (
                                <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                                    {tag}
                                </span>
                            ))}
                            <span className="px-3 py-1.5 bg-green-50 text-green-600 text-xs font-medium rounded-full border border-green-200">
                                Some answers believed to use AI assistance
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-[#E5E7EB]">
                    <div className="flex">
                        {[
                            { id: "summary", label: "AI Summary", icon: "✨" },
                            { id: "transcript", label: "Interview Transcript", icon: "📝" },
                            { id: "notes", label: "Interviewer Notes", icon: "📋" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === tab.id
                                    ? "border-[#0857A1] text-[#0857A1] bg-blue-50/30"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === "summary" && (
                        <>
                            {/* Voice Analysis and AI Analysis */}
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                {/* Voice Analysis */}
                                <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                            <line x1="12" y1="19" x2="12" y2="23" />
                                            <line x1="8" y1="23" x2="16" y2="23" />
                                        </svg>
                                        <h5 className="text-sm font-semibold text-[#181D27]">Voice Analysis</h5>
                                    </div>
                                    <div className="flex items-start gap-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-gray-300">
                                                0.0<span className="text-sm font-normal text-gray-400">/10</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Speech Clarity</span>
                                                <span className="text-gray-400">-</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Pace & Flow</span>
                                                <span className="text-gray-400">-</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Confidence</span>
                                                <span className="text-gray-400">-</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* AI Analysis */}
                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <SparkleIcon color="#0857A1" />
                                        <h5 className="text-sm font-semibold text-[#0857A1]">AI Analysis</h5>
                                    </div>
                                    <div className="flex items-start gap-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-gray-300">
                                                0.0<span className="text-sm font-normal text-gray-400">/10</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <p className="text-xs text-gray-600 flex items-start gap-2">
                                                <CheckCircleIcon />
                                                <span>All candidates have been thoroughly evaluated for any mention of cheating in an open book online test.</span>
                                            </p>
                                            <p className="text-xs text-gray-600 flex items-start gap-2">
                                                <CheckCircleIcon />
                                                <span>Any candidate found using any third party tools for help with be automatically red flagged.</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Strengths and Improvements */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-green-50/30 rounded-lg p-4 border border-green-100">
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
                                <div className="bg-amber-50/30 rounded-lg p-4 border border-amber-100">
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
                        </>
                    )}
                    {activeTab === "transcript" && (
                        <div className="py-8 text-center text-gray-500">Interview transcript will be displayed here</div>
                    )}
                    {activeTab === "notes" && (
                        <div className="py-8 text-center text-gray-500">Interview notes will be displayed here</div>
                    )}
                </div>

                {/* View Transcript and Notes Buttons */}
                <div className="flex items-center gap-3 px-6 pb-6">
                    <button
                        onClick={() => setActiveTab("transcript")}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#0857A1] text-[#0857A1] rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14,2 14,8 20,8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10,9 9,9 8,9" />
                        </svg>
                        View Interview Transcript
                    </button>
                    <button
                        onClick={() => setActiveTab("notes")}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="23,7 16,12 23,17 23,7" />
                            <rect x="1" y="5" width="15" height="14" rx="2" />
                        </svg>
                        Video Interview Notes
                    </button>
                </div>
            </div>

            {/* Per Question Evaluation */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-2">
                        <SparkleIcon color="#0857A1" />
                        <h4 className="text-base font-semibold text-[#181D27]">Per Question Evaluation</h4>
                    </div>
                    <button className="text-sm text-[#0857A1] hover:underline flex items-center gap-1">
                        Collapse <ChevronUpIcon />
                    </button>
                </div>

                <div className="px-5 pt-4 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-2 overflow-x-auto pb-3">
                        {interviewData.questions.slice(0, 10).map((_, idx) => (
                            <button
                                key={idx}
                                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${idx === 0 ? "bg-[#1e3a5f] text-white" : "text-gray-600 hover:bg-gray-100"}`}
                            >
                                Question {idx + 1}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="divide-y divide-[#E5E7EB]">
                    {interviewData.questions.map((q, qIdx) => (
                        <div key={qIdx} className="p-5">
                            <button onClick={() => toggleQuestion(qIdx)} className="w-full flex items-start justify-between text-left">
                                <div className="flex items-start gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-[#1e3a5f]">{q.score}<span className="text-sm font-normal text-gray-400">/10</span></div>
                                        <div className="text-xs text-gray-500">Score</div>
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-medium text-[#181D27] mb-1">Question {qIdx + 1}: {q.question}</h5>
                                    </div>
                                </div>
                                {expandedQuestions[qIdx] ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            </button>
                            {expandedQuestions[qIdx] && (
                                <div className="mt-4 ml-16 space-y-2">
                                    {q.criteria.map((criterion, cIdx) => (
                                        <div key={cIdx} className="flex items-center gap-3">
                                            {criterion.checked ? <CheckboxChecked /> : <CheckboxUnchecked />}
                                            <span className={`text-sm ${criterion.checked ? "text-gray-600" : "text-red-500"}`}>{criterion.text}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Technical Test Section */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
                <div className="flex items-center gap-2 p-5 border-b border-[#E5E7EB]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M8 7h8M8 12h8M8 17h4" />
                    </svg>
                    <h4 className="text-base font-semibold text-[#181D27]">Technical Test</h4>
                </div>
                <div className="p-8 text-center">
                    <p className="text-gray-500 mb-4">Test not scheduled</p>
                    <button
                        onClick={() => setShowScheduleTestModal(true)}
                        className="px-6 py-2.5 bg-[#1e3a5f] text-white rounded-lg font-medium hover:bg-[#162d4d] transition-colors"
                    >
                        Schedule Test
                    </button>
                </div>
            </div>

            {/* Schedule Test Modal */}
            {showScheduleTestModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-[500px] p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0857A1" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                <h3 className="text-lg font-semibold text-[#181D27]">Schedule Technical Test</h3>
                            </div>
                            <button onClick={() => setShowScheduleTestModal(false)} className="text-gray-400 hover:text-gray-600">
                                <CloseIcon />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Test Date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    value={testDate}
                                    onChange={(e) => setTestDate(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Test Time <span className="text-red-500">*</span></label>
                                <input
                                    type="time"
                                    value={testTime}
                                    onChange={(e) => setTestTime(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                                <select
                                    value={testDuration}
                                    onChange={(e) => setTestDuration(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="30">30 minutes</option>
                                    <option value="45">45 minutes</option>
                                    <option value="60">60 minutes</option>
                                    <option value="90">90 minutes</option>
                                    <option value="120">120 minutes</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowScheduleTestModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowScheduleTestModal(false);
                                    if (onScheduleTest) {
                                        onScheduleTest();
                                    } else {
                                        setSuccessMessage(`Technical test scheduled for ${testDate} at ${testTime} (${testDuration} minutes)`);
                                        setShowSuccessToast(true);
                                        setTimeout(() => setShowSuccessToast(false), 3000);
                                    }
                                }}
                                disabled={!testDate || !testTime}
                                className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#162d4d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Schedule Test
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Share Report Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-[900px] max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">📤</span>
                                <h3 className="text-xl font-semibold text-[#181D27]">Preview & Share Report</h3>
                            </div>
                            <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-gray-600">
                                <CloseIcon />
                            </button>
                        </div>

                        <div className="p-6 grid grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Select Content to Show</label>
                                    <div className="flex gap-4">
                                        {[
                                            { key: "evaluatedScore", label: "Evaluated Score" },
                                            { key: "criteria", label: "Criteria" },
                                            { key: "aiSummary", label: "AI Summary" },
                                        ].map((option) => (
                                            <label key={option.key} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={shareOptions[option.key as keyof typeof shareOptions]}
                                                    onChange={(e) => setShareOptions({ ...shareOptions, [option.key]: e.target.checked })}
                                                    className="w-4 h-4 text-[#0857A1] rounded border-gray-300"
                                                />
                                                <span className="text-sm text-gray-700">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Add People</label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {shareEmails.map((email) => (
                                            <span key={email} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm flex items-center gap-2">
                                                {email}
                                                <button onClick={() => removeEmail(email)} className="text-gray-400 hover:text-gray-600">×</button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="email"
                                            value={newEmail}
                                            onChange={(e) => setNewEmail(e.target.value)}
                                            placeholder="Add email address..."
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onKeyPress={(e) => e.key === "Enter" && addEmail()}
                                        />
                                        <button onClick={addEmail} className="px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">Add</button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Enter Share Format <span className="text-red-500">*</span></label>
                                    <select value={shareFormat} onChange={(e) => setShareFormat(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="PDF">PDF</option>
                                        <option value="Word">Word Document</option>
                                        <option value="Email">Email Only</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Enter Message <span className="text-red-500">*</span></label>
                                    <textarea value={shareMessage} onChange={(e) => setShareMessage(e.target.value)} rows={8} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-4">Report Preview</h4>
                                <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <span>📋</span>
                                        <span className="font-medium">Interview Report</span>
                                    </div>
                                    {shareOptions.evaluatedScore && (
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <div className="text-2xl font-bold text-[#1e3a5f]">8.4<span className="text-sm text-gray-400">/10</span></div>
                                                <div className="text-xs text-gray-500">Score</div>
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {interviewData.evaluationTags.slice(0, 3).map((tag, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] rounded-full">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {shareOptions.aiSummary && (
                                        <div className="grid grid-cols-2 gap-3 text-xs">
                                            <div className="bg-green-50 rounded p-2">
                                                <div className="font-medium text-green-600 mb-1">Strengths</div>
                                                {interviewData.strengths.slice(0, 2).map((s, i) => (
                                                    <div key={i} className="text-gray-600 truncate">• {s}</div>
                                                ))}
                                            </div>
                                            <div className="bg-amber-50 rounded p-2">
                                                <div className="font-medium text-amber-600 mb-1">Areas of Improvement</div>
                                                {interviewData.improvements.slice(0, 2).map((s, i) => (
                                                    <div key={i} className="text-gray-600 truncate">• {s}</div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end p-6 border-t border-gray-200">
                            <button onClick={handleShare} className="px-6 py-2.5 bg-[#1e3a5f] text-white rounded-lg font-medium hover:bg-[#162d4d] transition-colors flex items-center gap-2">
                                Share Report
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22,2 15,22 11,13 2,9 22,2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
