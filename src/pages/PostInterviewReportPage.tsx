import React, { useState } from "react";
import HeaderBanner from "@/assets/images/header_banner.png";

// Sample interview data for completed interview
const interviewReportData = {
    candidateName: "Samuel Baker",
    conductedBy: "John Doe",
    date: "8-07-25",
    time: "10:00 am - 12:30 pm",
    duration: "4 hours",
    score: 8.4,
    evaluationTags: [
        "Showed clear technical knowledge",
        "Brilliant communication skills",
        "Leadership",
    ],
    greenNote: "Same answers followed to use in database",
    strengths: [
        "The candidate articulated their thoughts and experiences clearly and confidently.",
        "Their background aligned well with the role's requirements and responsibilities.",
        "They demonstrated structured thinking and logical reasoning during technical/problem-solving questions.",
        "The candidate showed values, attitude, and mindset aligned with the team and company culture.",
        "They were genuinely interested in the role and asked insightful questions about the team, product, or mission.",
    ],
    improvements: [
        "The candidate could improve clarity and structure when explaining their past work or problem-solving approach.",
        "They lacked depth in certain technical areas relevant to the role.",
        "Some responses were generic and didn't showcase specific examples or outcomes.",
        "There was limited engagement or curiosity shown through follow-up questions.",
        "Time management during answers could be improved to cover more ground efficiently.",
    ],
    questions: [
        {
            question: "Can you tell me a bit about yourself",
            score: 8.4,
            criteria: [
                { text: "The candidate articulated their thoughts and experiences clearly and confidently.", checked: true },
                { text: "Their background aligned well with the role's requirements and responsibilities.", checked: true },
                { text: "They demonstrated structured thinking and logical reasoning during technical/problem-solving questions.", checked: true },
                { text: "The candidate showed values, attitude, and mindset aligned with the team and company culture.", checked: true },
                { text: "Time management during answers could be improved to cover more ground efficiently.", checked: false },
            ],
        },
        {
            question: "Can you tell me a bit about yourself",
            score: 8.4,
            criteria: [
                { text: "The candidate articulated their thoughts and experiences clearly and confidently.", checked: true },
                { text: "Their background aligned well with the role's requirements and responsibilities.", checked: true },
                { text: "They demonstrated structured thinking and logical reasoning during technical/problem-solving questions.", checked: true },
                { text: "The candidate showed values, attitude, and mindset aligned with the team and company culture.", checked: true },
                { text: "Time management during answers could be improved to cover more ground efficiently.", checked: false },
            ],
        },
        {
            question: "Can you tell me a bit about yourself",
            score: 8.4,
            criteria: [
                { text: "The candidate articulated their thoughts and experiences clearly and confidently.", checked: true },
                { text: "Their background aligned well with the role's requirements and responsibilities.", checked: true },
                { text: "They demonstrated structured thinking and logical reasoning during technical/problem-solving questions.", checked: true },
                { text: "The candidate showed values, attitude, and mindset aligned with the team and company culture.", checked: true },
                { text: "Time management during answers could be improved to cover more ground efficiently.", checked: false },
            ],
        },
        {
            question: "Can you tell me a bit about yourself",
            score: 8.4,
            criteria: [
                { text: "The candidate articulated their thoughts and experiences clearly and confidently.", checked: true },
                { text: "Their background aligned well with the role's requirements and responsibilities.", checked: true },
                { text: "They demonstrated structured thinking and logical reasoning during technical/problem-solving questions.", checked: true },
                { text: "The candidate showed values, attitude, and mindset aligned with the team and company culture.", checked: true },
                { text: "Time management during answers could be improved to cover more ground efficiently.", checked: false },
            ],
        },
    ],
};

// Icons
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

const CheckCircleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#22C55E" />
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

export default function PostInterviewReportPage(): React.ReactElement {
    const [activeTab, setActiveTab] = useState<"summary" | "transcript" | "notes">("summary");
    const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({ 0: true });
    const [showDetails, setShowDetails] = useState(false);
    const [showNotesModal, setShowNotesModal] = useState(false);

    const data = interviewReportData;

    const toggleQuestion = (index: number) => {
        setExpandedQuestions(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="min-h-screen w-full bg-page-bg">
            <div className="w-full px-6 py-6">
                {/* Header Section */}
                <div className="relative bg-white rounded-2xl p-6 mb-6 border border-border-card overflow-hidden">
                    {/* Background banner image */}
                    <div
                        className="absolute top-0 right-0 h-full w-1/2 bg-no-repeat bg-right bg-contain pointer-events-none"
                        style={{ backgroundImage: `url(${HeaderBanner})` }}
                    />

                    {/* User greeting and avatar */}
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="text-sm text-gray-500">Good Morning, John</div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-700">John Doe</span>
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                                JD
                            </div>
                        </div>
                    </div>

                    {/* Candidate Report Header */}
                    <div className="flex items-start justify-between relative z-10">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                    <UserIcon />
                                </div>
                                <h1 className="text-2xl font-semibold text-text-primary">{data.candidateName} Report</h1>
                                <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                                    <CheckCircleIcon />
                                    Interview Completed
                                </span>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-gray-500 mb-2">
                                <span className="flex items-center gap-1.5">
                                    <ClockIcon />
                                    {data.time}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <CalendarIcon />
                                    {data.date}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <DurationIcon />
                                    {data.duration}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <UserIcon />
                                    Conducted by {data.conductedBy}
                                </span>
                            </div>
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                                {showDetails ? "Hide Details" : "View Details"}
                                {showDetails ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dashboard Title */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-text-primary">Interview Prep Dashboard - Interview Completed</h2>
                </div>

                {/* Interview Report Card */}
                <div className="bg-white rounded-2xl border border-border-card overflow-hidden mb-6">
                    {/* Report Header */}
                    <div className="flex items-center justify-between p-5 border-b border-border-card">
                        <div className="flex items-center gap-3">
                            <SparkleIcon color="#0857A1" />
                            <h3 className="text-base font-semibold text-text-primary">Interview Report</h3>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setShowNotesModal(true)}
                                className="flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                                <NoteIcon />
                                Add Notes
                            </button>
                            <button className="flex items-center gap-2 text-sm text-primary hover:underline">
                                <EditIcon />
                                Edit Evaluation
                            </button>
                        </div>
                    </div>

                    {/* Score and Evaluation Tags */}
                    <div className="p-5 border-b border-border-card">
                        <div className="flex items-start gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-text-primary">
                                    {data.score}<span className="text-sm font-normal text-gray-400">/10</span>
                                </div>
                                <div className="text-xs text-gray-500">Score</div>
                            </div>
                            <div className="flex flex-wrap gap-2 flex-1">
                                {data.evaluationTags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <span className="px-3 py-1.5 bg-green-50 text-green-600 text-xs font-medium rounded-full border border-green-200">
                                {data.greenNote}
                            </span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-border-card">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab("summary")}
                                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "summary"
                                    ? "border-primary text-primary bg-blue-50/30"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                <SparkleIcon color={activeTab === "summary" ? "#0857A1" : "#9CA3AF"} />
                                AI Summary
                            </button>
                            <button
                                onClick={() => setActiveTab("transcript")}
                                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "transcript"
                                    ? "border-primary text-primary bg-blue-50/30"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={activeTab === "transcript" ? "#0857A1" : "#9CA3AF"} strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14,2 14,8 20,8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                </svg>
                                Interview Transcript
                            </button>
                            <button
                                onClick={() => setActiveTab("notes")}
                                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "notes"
                                    ? "border-primary text-primary bg-blue-50/30"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={activeTab === "notes" ? "#0857A1" : "#9CA3AF"} strokeWidth="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                                Interviewer Notes
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === "summary" && (
                            <div className="grid grid-cols-2 gap-8">
                                {/* Strengths */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <SparkleIcon color="#22C55E" />
                                        <h4 className="text-sm font-semibold text-green-600">Strengths</h4>
                                    </div>
                                    <ul className="space-y-3">
                                        {data.strengths.map((item, idx) => (
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
                                        <h4 className="text-sm font-semibold text-amber-500">What Needs Improvement</h4>
                                    </div>
                                    <ul className="space-y-3">
                                        {data.improvements.map((item, idx) => (
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
                            <div className="space-y-4">
                                {/* Transcript conversation */}
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-sm font-semibold text-primary">John Doe</span>
                                        <span className="text-sm text-gray-500"> (Interviewer)</span>
                                    </div>
                                    <p className="text-sm text-gray-700">Good Morning Sam can you hear me?</p>

                                    <div>
                                        <span className="text-sm font-semibold text-text-primary">Samuel Baker</span>
                                        <span className="text-sm text-gray-500"> (Candidate)</span>
                                    </div>
                                    <p className="text-sm text-gray-700">Yes I can</p>

                                    <div>
                                        <span className="text-sm font-semibold text-primary">John Doe</span>
                                        <span className="text-sm text-gray-500"> (Interviewer)</span>
                                    </div>
                                    <p className="text-sm text-gray-700">Yes I can</p>

                                    <div>
                                        <span className="text-sm font-semibold text-primary">John Doe</span>
                                        <span className="text-sm text-gray-500"> (Interviewer)</span>
                                    </div>
                                    <p className="text-sm text-gray-700">Good Morning Sam can you hear me?</p>
                                </div>

                                <button className="text-sm text-primary font-medium hover:underline">
                                    Read More
                                </button>
                            </div>
                        )}

                        {activeTab === "notes" && (
                            <div className="space-y-4">
                                {/* Note card */}
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        The candidate presents a well-structured resume that highlights strong academic background, relevant professional experience, and clearly demonstrated skills. Achievements are quantified, showcasing impact and results, while the overall format is clean, concise, and easy to follow
                                    </p>
                                </div>
                                <div className="text-xs text-gray-400">9:40 AM</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Per Question Evaluation */}
                <div className="bg-white rounded-2xl border border-border-card overflow-hidden">
                    <div className="flex items-center justify-between p-5 border-b border-border-card">
                        <div className="flex items-center gap-2">
                            <SparkleIcon color="#0857A1" />
                            <h3 className="text-base font-semibold text-text-primary">Per Question Evaluation</h3>
                        </div>
                        <button className="text-sm text-primary hover:underline">
                            Collapse
                        </button>
                    </div>

                    <div className="divide-y divide-[#E5E7EB]">
                        {data.questions.map((q, qIdx) => (
                            <div key={qIdx} className="p-5">
                                <button
                                    onClick={() => toggleQuestion(qIdx)}
                                    className="w-full flex items-start justify-between text-left"
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="text-center min-w-[60px]">
                                            <div className="text-2xl font-bold text-secondary">
                                                {q.score}<span className="text-sm font-normal text-gray-400">/10</span>
                                            </div>
                                            <div className="text-xs text-gray-500">Score</div>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-medium text-text-primary">
                                                Question {qIdx + 1}: {q.question}
                                            </h5>
                                        </div>
                                    </div>
                                    {expandedQuestions[qIdx] ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                </button>

                                {expandedQuestions[qIdx] && (
                                    <div className="mt-4 ml-[84px] space-y-3">
                                        {q.criteria.map((criterion, cIdx) => (
                                            <div key={cIdx} className="flex items-start gap-3">
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

            {/* Candidate Overview Notes Modal */}
            {showNotesModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowNotesModal(false)}
                    />

                    {/* Modal */}
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[80vh] flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-text-primary">Candidate Overview Notes</h2>
                            <button
                                onClick={() => setShowNotesModal(false)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Notes List */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-5">
                            {/* Note 1 - John Doe */}
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-white font-medium text-sm">
                                    JD
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-semibold text-text-primary">John Doe</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        The candidate presents a well-structured resume that highlights strong academic background, relevant professional experience, and clearly demonstrated skills. Achievements are quantified, showcasing impact and results, while the overall format is clean, concise, and easy to follow
                                    </p>
                                    <span className="text-xs text-gray-400 mt-2 block">10:00 AM</span>
                                </div>
                            </div>

                            {/* Note 2 - Phillip Sam */}
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center text-white font-medium text-sm">
                                    PS
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-semibold text-text-primary">Phillip Sam</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        The candidate presents a well-structured resume that highlights strong academic background, relevant professional experience, and clearly demonstrated skills. Achievements are quantified, showcasing impact and results, while the overall format is clean, concise, and easy to follow
                                    </p>
                                    <span className="text-xs text-gray-400 mt-2 block">10:00 AM</span>
                                </div>
                            </div>

                            {/* Note 3 - Jordan Blue */}
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-cyan-500 flex-shrink-0 flex items-center justify-center text-white font-medium text-sm">
                                    JB
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-semibold text-text-primary">Jordan Blue</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        The candidate presents a well-structured resume that highlights strong academic background, relevant professional experience, and clearly demonstrated skills. Achievements are quantified, showcasing impact and results, while the overall format is clean, concise, and easy to follow
                                    </p>
                                    <span className="text-xs text-gray-400 mt-2 block">10:00 AM</span>
                                </div>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-5 border-t border-gray-200">
                            <div className="border border-gray-200 rounded-lg p-3">
                                <textarea
                                    placeholder="Write a note..."
                                    className="w-full text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none"
                                    rows={2}
                                />
                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center gap-3">
                                        <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                            </svg>
                                            Attach File
                                        </button>
                                        <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <polyline points="21,15 16,10 5,21" />
                                            </svg>
                                            Upload Image
                                        </button>
                                    </div>
                                    <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
                                        Save Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
