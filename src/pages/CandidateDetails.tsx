import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ScheduleInterviewModal from "@/components/ScheduleInterviewModal";
import ScheduleTestModal from "@/components/ScheduleTestModal";
import PostInterviewReport from "@/components/PostInterviewReport";
import HeaderBanner from "@/assets/images/header_banner.png";
import { getCandidateById } from "@/data/candidatesData";

// Sample candidate data
const candidateData = {
    id: "1",
    name: "Samuel Baker",
    role: "HR Quality & Training Specialist Role",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    applicationDate: "24-07-25",
    status: "Pending Interview",
    email: "jondoe@hotmail.com",
    phone: "+1 (312) 471-5436",
    location: "New York",
    linkedin: "johndoeworks.xyz",
    isRecommendedByAI: true,
    isTop10Rated: true,
    resumeScore: 8.4,
    overallScore: 8.8,
    aiScore: 8.8,
    evaluationTags: [
        { label: "5-7 Years", color: "orange" },
        { label: "Relevant awards and experiences", color: "green" },
        { label: "English_Fluency", color: "green" },
        { label: "Knowledge of HR policies and regulatory requirements", color: "blue" },
        { label: "Matches Job Description Very well", color: "green" },
        { label: "Hands on knowledge", color: "green" },
        { label: "Great Communication Skills", color: "green" },
        { label: "Advanced Excel skills", color: "orange" },
    ],
    skills: [
        "Quality Assessment",
        "Auditing",
        "L&D Experience",
        "Advanced Excel skills",
        "Competency with Google tools",
        "Knowledge of HR policies and regulatory requirements",
        "English_Fluency",
        "Hindi_Proficiency",
        "Remote_Work_Ready",
    ],
    statistics: [
        { label: "Problem Solving", score: 9.5, color: "#1e3a5f" },
        { label: "Communication", score: 8.5, color: "#3b82f6" },
        { label: "Technical Skills", score: 7.5, color: "#3b82f6" },
        { label: "Leadership", score: 8, color: "#3b82f6" },
        { label: "Experience", score: 7, color: "#3b82f6" },
        { label: "Organizational", score: 6.5, color: "#3b82f6" },
        { label: "Experience", score: 4, color: "#3b82f6" },
        { label: "Job Description", score: 3.5, color: "#3b82f6" },
        { label: "Skills", score: 3, color: "#3b82f6" },
    ],
    aiRecommendation: {
        points: [
            { text: "The candidate articulated their thoughts and experiences clearly and confidently.", positive: true },
            { text: "Their background aligned well with the role's requirements and responsibilities.", positive: true },
            { text: "They demonstrated structured thinking and logical reasoning during technical/problem-solving questions.", positive: true },
            { text: "The candidate showed values, attitude, and mindset aligned with the team and company culture.", positive: true },
            { text: "Time management during answers could be improved to cover more ground efficiently.", positive: false },
        ],
    },
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
    careerOverview: [
        "48 months relevant experience in product management",
        "Almost nil experience in business development",
    ],
    currentWork: [
        "Senior Product Manager at Newton School",
        "Designing tutor centric ed-tech dashboards",
    ],
    previousRoles: [
        { company: "Meesho", description: "Improved the discoverability of our free products by 52%, leading to the conversion of organic traffic into paying users and collaborating to increase monthly revenue." },
        { company: "Procol", description: "Designed an interface that automated and centralised quality checks for B2B clients, although the full impact of my work was yet to be realised as the product was still in development" },
        { company: "Intelsys", description: "Designed an interface that automated and centralised quality checks for B2B clients, although the full impact of my work was yet to be realised as the product was still in development" },
        { company: "Persistent Systems", description: "Designed an interface that automated and centralised quality checks for B2B clients, although the full impact of my work was yet to be realised as the product was still in development" },
    ],
    hiringSteps: [
        { label: "360 Resume Evaluation", score: 8.4, status: "completed" },
        { label: "Interview Round 1", score: 8.4, status: "completed" },
        { label: "Technical Test", score: null, status: "current" },
        { label: "Interview Round 2", score: null, status: "pending" },
    ],
    interviewCompleted: true,
    interviewData: {
        conductedBy: "John Doe",
        date: "8-07-25",
        time: "10:00 am - 12:30 pm",
        duration: "4 hours",
        evaluationTags: [
            "Showed clear technical knowledge",
            "Brilliant communication skills",
            "Leadership",
        ],
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
    },
};

// Icons
const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
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

const ChevronRightIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18l6-6-6-6" />
    </svg>
);

const SparkleIcon = ({ color = "#22C55E" }: { color?: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#22C55E" />
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const WarningCircleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#EF4444" />
        <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const NoteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0857A1" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 7h8M8 12h8M8 17h4" />
    </svg>
);

const CloseIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const CalendarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#181D27" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const BanIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
);

const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20,6 9,17 4,12" />
    </svg>
);

export default function CandidateDetails(): React.ReactElement {
    const navigate = useNavigate();
    const { jobId, candidateId } = useParams<{ jobId: string; candidateId: string }>();
    const [activeTab, setActiveTab] = useState<"overview" | "evaluation" | "interview">("overview");
    const [showDetails, setShowDetails] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showScheduleTestModal, setShowScheduleTestModal] = useState(false);
    const [showLinksModal, setShowLinksModal] = useState(false);
    const [showNotesModal, setShowNotesModal] = useState(false);
    const [noteText, setNoteText] = useState("");
    const [qualificationStatus, setQualificationStatus] = useState<"pending" | "qualified" | "not-qualified">("pending");
    const [showToast, setShowToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    // Get candidate data dynamically from shared data source
    const dynamicCandidate = getCandidateById(candidateId || "1");

    // Merge with default structure (fallback to static data if not found)
    const candidate = dynamicCandidate ? {
        ...candidateData,
        id: dynamicCandidate.id,
        name: dynamicCandidate.name,
        role: dynamicCandidate.role,
        photo: dynamicCandidate.photo,
        applicationDate: dynamicCandidate.applicationDate,
        status: dynamicCandidate.status,
        email: dynamicCandidate.email,
        phone: dynamicCandidate.phone,
        location: dynamicCandidate.location,
        linkedin: dynamicCandidate.linkedin,
        isRecommendedByAI: dynamicCandidate.isRecommendedByAI,
        isTop10Rated: dynamicCandidate.isTop10Rated,
        resumeScore: dynamicCandidate.resumeScore || candidateData.resumeScore,
        overallScore: dynamicCandidate.overallScore || candidateData.overallScore,
        aiScore: dynamicCandidate.aiScore || candidateData.aiScore,
        evaluationTags: dynamicCandidate.evaluationTags.length > 0 ? dynamicCandidate.evaluationTags : candidateData.evaluationTags,
        skills: dynamicCandidate.skills.length > 0 ? dynamicCandidate.skills : candidateData.skills,
        statistics: dynamicCandidate.statistics.length > 0 ? dynamicCandidate.statistics : candidateData.statistics,
        aiRecommendation: dynamicCandidate.aiRecommendation.points.length > 0 ? dynamicCandidate.aiRecommendation : candidateData.aiRecommendation,
        strengths: dynamicCandidate.strengths.length > 0 ? dynamicCandidate.strengths : candidateData.strengths,
        improvements: dynamicCandidate.improvements.length > 0 ? dynamicCandidate.improvements : candidateData.improvements,
        careerOverview: dynamicCandidate.careerOverview.length > 0 ? dynamicCandidate.careerOverview : candidateData.careerOverview,
        currentWork: dynamicCandidate.currentWork.length > 0 ? dynamicCandidate.currentWork : candidateData.currentWork,
        previousRoles: dynamicCandidate.previousRoles.length > 0 ? dynamicCandidate.previousRoles : candidateData.previousRoles,
        hiringSteps: dynamicCandidate.hiringSteps,
        interviewCompleted: dynamicCandidate.interviewCompleted,
        interviewData: dynamicCandidate.interviewData || candidateData.interviewData,
    } : candidateData;

    const getTagColor = (color: string) => {
        switch (color) {
            case "orange": return "bg-orange-100 text-orange-600";
            case "green": return "bg-green-100 text-green-600";
            case "blue": return "bg-blue-100 text-blue-600";
            case "red": return "bg-red-100 text-red-600";
            default: return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="min-h-screen w-full bg-page-bg">
            <div className="w-full px-6 py-6">
                {/* Header Section */}
                <div className="relative bg-white rounded-2xl p-6 mb-6 border border-border-card overflow-hidden">
                    {/* Background banner image - same as PageHeader */}
                    <div
                        className="absolute top-0 right-0 h-full w-1/2 bg-no-repeat bg-right bg-contain pointer-events-none"
                        style={{ backgroundImage: `url(${HeaderBanner})` }}
                    />

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm mb-3 relative z-10">
                        <button
                            onClick={() => navigate("/job-dashboard")}
                            className="text-text-muted hover:text-primary transition-colors"
                        >
                            Job List
                        </button>
                        <span className="text-text-muted">/</span>
                        <button
                            onClick={() => navigate(`/job/${jobId}/candidates`)}
                            className="text-text-muted hover:text-primary transition-colors"
                        >
                            HR Quality & Training Specialist
                        </button>
                        <span className="text-text-muted">/</span>
                        <span className="text-primary font-medium">{candidate.name}</span>
                    </div>

                    {/* Title Row */}
                    <div className="flex items-start justify-between relative z-10">
                        <div className="flex-1">
                            {/* Candidate Name */}
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                                    <UserIcon />
                                </div>
                                <h1 className="text-2xl font-semibold text-text-primary">
                                    {candidate.name}
                                </h1>
                            </div>

                            {/* Job Details Row - directly below name */}
                            {showDetails && (
                                <div className="flex items-center gap-10 mt-2 mb-1">
                                    <div>
                                        <div className="text-xs text-gray-400 mb-0.5">Created On</div>
                                        <div className="text-sm font-medium text-text-primary">24-07-25</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 mb-0.5">Work Type</div>
                                        <div className="text-sm font-medium text-text-primary">Permanent</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 mb-0.5">Duration</div>
                                        <div className="text-sm font-medium text-text-primary">Full Time</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 mb-0.5">Years of Experience</div>
                                        <div className="text-sm font-medium text-text-primary">5+</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 mb-0.5">Hiring Process</div>
                                        <div className="text-sm font-medium text-text-primary">In Progress</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 mb-0.5">Salary Range</div>
                                        <div className="text-sm font-medium text-text-primary">$20,000 - $30,000</div>
                                    </div>
                                </div>
                            )}

                            {/* Hide/View Details Button */}
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="flex items-center gap-1 text-sm text-primary hover:underline mt-1"
                            >
                                {showDetails ? "Hide Details" : "View Details"}
                                {showDetails ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 self-start mt-1">
                            <button
                                onClick={() => {
                                    setQualificationStatus("not-qualified");
                                    setShowToast({ message: `${candidate.name} marked as Not Qualified`, type: "error" });
                                    setTimeout(() => setShowToast(null), 3000);
                                }}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 text-sm font-medium transition-colors ${qualificationStatus === "not-qualified" ? "border-red-600 bg-red-600 text-white" : "border-red-400 text-red-500 hover:bg-red-50 bg-white"}`}
                            >
                                <BanIcon />
                                Not Qualified
                            </button>
                            <button
                                onClick={() => {
                                    setQualificationStatus("qualified");
                                    setShowToast({ message: `${candidate.name} marked as Qualified!`, type: "success" });
                                    setTimeout(() => setShowToast(null), 3000);
                                }}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${qualificationStatus === "qualified" ? "bg-success-hover text-white ring-2 ring-green-300" : "bg-success text-white hover:bg-success-hover"}`}
                            >
                                <CheckIcon />
                                Qualified
                            </button>
                        </div>
                    </div>
                </div>

                {/* Candidate Details Card */}
                <div className="bg-white rounded-2xl border border-border-card mb-6 overflow-hidden">
                    <div className="p-5 border-b border-border-card flex items-center gap-2">
                        <UserIcon />
                        <h2 className="text-lg font-semibold text-text-primary">Candidate Details</h2>
                    </div>

                    {/* Hiring Steps Progress */}
                    <div className="grid grid-cols-4 border-b border-border-card">
                        {candidate.hiringSteps.map((step, index) => (
                            <div
                                key={index}
                                className={`p-6 text-center ${index < 3 ? "border-r border-border-card" : ""}`}
                            >
                                {step.status === "completed" ? (
                                    <div className="text-2xl font-semibold text-success mb-2">
                                        {step.score}<span className="text-sm font-normal text-gray-400">/10</span>
                                    </div>
                                ) : step.status === "current" ? (
                                    <div className="flex flex-col items-center gap-2 mb-2">
                                        {step.label.toLowerCase().includes("test") ? (
                                            <>
                                                <button
                                                    onClick={() => setShowScheduleTestModal(true)}
                                                    className="px-5 py-2.5 bg-secondary text-white text-sm font-medium rounded-full hover:bg-secondary-hover transition-colors"
                                                >
                                                    Schedule Test
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/job/${jobId}/candidate/${candidateId}/test-prep`)}
                                                    className="text-primary text-sm font-medium hover:underline"
                                                >
                                                    Test Prep →
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => setShowScheduleModal(true)}
                                                    className="px-5 py-2.5 bg-secondary text-white text-sm font-medium rounded-full hover:bg-secondary-hover transition-colors"
                                                >
                                                    Schedule Interview
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/job/${jobId}/candidate/${candidateId}/interview-prep`)}
                                                    className="text-primary text-sm font-medium hover:underline"
                                                >
                                                    Interview Prep →
                                                </button>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-2xl font-semibold text-gray-300 mb-2">NA</div>
                                )}
                                <div className="text-sm text-gray-500">{step.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-border-card">
                        <div className="flex">
                            {[
                                { id: "overview", label: "Candidate Overview" },
                                { id: "evaluation", label: "360 Evaluation" },
                                { id: "interview", label: "Interview" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                                        ? "border-primary text-primary"
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
                        {activeTab === "overview" && (
                            <div>
                                {/* Candidate Overview Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <UserIcon />
                                        <h3 className="text-base font-semibold text-text-primary">Candidate Overview</h3>
                                    </div>
                                    <button
                                        onClick={() => setShowNotesModal(true)}
                                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                                    >
                                        <NoteIcon />
                                        Add Notes
                                    </button>
                                </div>

                                {/* Profile Card */}
                                <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
                                    <div className="flex gap-8">
                                        {/* Photo */}
                                        <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                                            <img
                                                src={candidate.photo}
                                                alt={candidate.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="text-lg font-semibold text-text-primary mb-1">{candidate.name}</h4>
                                                    <p className="text-sm text-gray-500 mb-3">Applied for {candidate.role}</p>
                                                    <div className="flex gap-2">
                                                        {candidate.isRecommendedByAI && (
                                                            <span className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-primary text-xs rounded-full">
                                                                <SparkleIcon color="#0857A1" />
                                                                Recommended by AI
                                                            </span>
                                                        )}
                                                        {candidate.isTop10Rated && (
                                                            <span className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full">
                                                                Top 10 Rated
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Details Grid */}
                                        <div className="grid grid-cols-3 gap-x-12 gap-y-4">
                                            <div>
                                                <div className="text-xs text-gray-400 mb-1">Application Date</div>
                                                <div className="text-sm font-medium text-text-primary">{candidate.applicationDate}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-400 mb-1">Email Address</div>
                                                <div className="text-sm font-medium text-primary">{candidate.email}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-400 mb-1">Current Location</div>
                                                <div className="text-sm font-medium text-text-primary">{candidate.location}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-400 mb-1">Status</div>
                                                <div className="text-sm font-medium text-text-primary">{candidate.status}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-400 mb-1">Contact Number</div>
                                                <div className="text-sm font-medium text-text-primary">{candidate.phone}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-400 mb-1">LinkedIn Profile</div>
                                                <div className="text-sm font-medium text-primary">{candidate.linkedin}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            onClick={() => setShowLinksModal(true)}
                                            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 bg-gray-100 px-4 py-2 rounded-lg"
                                        >
                                            View All links
                                            <ChevronRightIcon />
                                        </button>
                                    </div>
                                </div>

                                {/* 360 Evaluation Section */}
                                <div className="bg-white rounded-xl border border-border-card p-6 mb-6">
                                    <div className="flex items-center gap-2 mb-5">
                                        <SparkleIcon color="#0857A1" />
                                        <h3 className="text-base font-semibold text-primary">360 Evalution</h3>
                                    </div>

                                    <div className="flex items-start gap-8">
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-text-primary">
                                                {candidate.resumeScore}<span className="text-lg font-normal text-gray-400">/10</span>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">Score</div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 flex-1">
                                            {candidate.evaluationTags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${getTagColor(tag.color)}`}
                                                >
                                                    {tag.label}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Candidate Skills */}
                                <div className="bg-white rounded-xl border border-border-card p-6 mb-6">
                                    <div className="flex items-center gap-2 mb-5">
                                        <SparkleIcon color="#0857A1" />
                                        <h3 className="text-base font-semibold text-primary">Candidate Skills</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {candidate.skills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm rounded-full hover:bg-gray-50"
                                            >
                                                {skill}
                                                <CloseIcon />
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Overall Statistics */}
                                <div className="bg-white rounded-xl border border-border-card p-6 mb-6">
                                    <div className="flex items-center gap-2 mb-5">
                                        <SparkleIcon color="#0857A1" />
                                        <h3 className="text-base font-semibold text-primary">Overall Statistics</h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        {/* Left: Bar Chart */}
                                        <div className="border border-gray-100 rounded-xl p-5">
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-gray-400 text-sm">◉</span>
                                                <span className="text-sm font-medium text-text-primary">Total Score</span>
                                            </div>
                                            <div className="text-3xl font-bold text-text-primary mb-6">
                                                {candidate.overallScore}<span className="text-lg font-normal text-gray-400"> / 10</span>
                                            </div>
                                            <div className="space-y-3">
                                                {candidate.statistics.map((stat, idx) => (
                                                    <div key={idx} className="flex items-center gap-3">
                                                        <div className="w-24 text-xs text-gray-500 text-right">{stat.label}</div>
                                                        <div className="flex-1 h-4 bg-gray-100 rounded relative">
                                                            <div
                                                                className="h-full rounded"
                                                                style={{
                                                                    width: `${stat.score * 10}%`,
                                                                    backgroundColor: idx === 0 ? '#1e3a5f' : '#3b82f6'
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                                {/* X-axis labels */}
                                                <div className="flex items-center gap-3 mt-2">
                                                    <div className="w-24" />
                                                    <div className="flex-1 flex justify-between text-xs text-gray-400">
                                                        <span>00</span>
                                                        <span>02</span>
                                                        <span>04</span>
                                                        <span>06</span>
                                                        <span>08</span>
                                                        <span>10</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right: AI Recommendation */}
                                        <div className="bg-[#E6F7F7] rounded-xl p-5">
                                            <div className="flex items-center gap-2 mb-4">
                                                <SparkleIcon color="#22C55E" />
                                                <span className="text-sm font-medium text-green-600">AI Recommendation</span>
                                            </div>
                                            <div className="text-3xl font-bold text-text-primary mb-2">
                                                {candidate.aiScore}<span className="text-lg font-normal text-gray-400"> / 10</span>
                                            </div>
                                            <div className="text-sm font-semibold text-text-primary mb-4">Problem Solving</div>
                                            <div className="space-y-3">
                                                {candidate.aiRecommendation.points.map((point, idx) => (
                                                    <div key={idx} className="flex items-start gap-2">
                                                        {point.positive ? <CheckCircleIcon /> : <WarningCircleIcon />}
                                                        <span className="text-xs text-gray-600 leading-relaxed">{point.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Strengths & Improvements */}
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div className="bg-white rounded-xl border border-border-card p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <SparkleIcon color="#22C55E" />
                                            <h4 className="text-sm font-semibold text-green-600">Strengths</h4>
                                        </div>
                                        <ul className="space-y-3">
                                            {candidate.strengths.map((item, idx) => (
                                                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                    <span className="text-gray-400 mt-1">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-white rounded-xl border border-border-card p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <SparkleIcon color="#F59E0B" />
                                            <h4 className="text-sm font-semibold text-amber-500">What Needs Improvement</h4>
                                        </div>
                                        <ul className="space-y-3">
                                            {candidate.improvements.map((item, idx) => (
                                                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                    <span className="text-gray-400 mt-1">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Career Overview */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-bold text-text-primary mb-3">Career Overview</h4>
                                    <ul className="space-y-1">
                                        {candidate.careerOverview.map((item, idx) => (
                                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                <span className="text-gray-400">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Current Work Experience */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-bold text-text-primary mb-3">Current Work Experience</h4>
                                    <ul className="space-y-1">
                                        {candidate.currentWork.map((item, idx) => (
                                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                <span className="text-gray-400">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Previous Roles */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-bold text-text-primary mb-3">Previous Roles</h4>
                                    <ul className="space-y-3">
                                        {candidate.previousRoles.map((role, idx) => (
                                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                <span className="text-gray-400">•</span>
                                                <span><strong className="text-text-primary">{role.company}:</strong> {role.description}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeTab === "evaluation" && (
                            <div className="py-8 text-center text-gray-500">
                                360 Evaluation details will be shown here
                            </div>
                        )}

                        {activeTab === "interview" && (
                            <div>
                                {candidate.interviewCompleted ? (
                                    <PostInterviewReport
                                        candidateName={candidate.name}
                                        interviewData={candidate.interviewData}
                                    />
                                ) : (
                                    <div className="py-8 text-center">
                                        <p className="text-gray-500 mb-4">Interview not scheduled</p>
                                        <button
                                            onClick={() => setShowScheduleModal(true)}
                                            className="px-6 py-2.5 bg-secondary text-white text-sm font-medium rounded-full hover:bg-secondary-hover transition-colors"
                                        >
                                            Schedule Interview
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Interview Section */}
                <div className="bg-white rounded-2xl border border-border-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <CalendarIcon />
                        <h3 className="text-base font-semibold text-text-primary">Interview</h3>
                    </div>
                    {candidate.interviewCompleted ? (
                        <PostInterviewReport
                            candidateName={candidate.name}
                            interviewData={candidate.interviewData}
                        />
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-sm text-gray-500 mb-4">Interview not scheduled</p>
                            <button
                                onClick={() => setShowScheduleModal(true)}
                                className="px-6 py-2.5 bg-secondary text-white text-sm font-medium rounded-full hover:bg-secondary-hover transition-colors"
                            >
                                Schedule Interview
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Schedule Interview Modal */}
            <ScheduleInterviewModal
                isOpen={showScheduleModal}
                onClose={() => setShowScheduleModal(false)}
                onSchedule={(data) => {
                    console.log("Scheduling interview:", data);
                }}
                candidateName={candidate.name}
                candidateEmail={candidate.email}
            />

            {/* Schedule Test Modal */}
            <ScheduleTestModal
                isOpen={showScheduleTestModal}
                onClose={() => setShowScheduleTestModal(false)}
                onSchedule={(data) => {
                    console.log("Scheduling test:", data);
                }}
                candidateName={candidate.name}
                candidateEmail={candidate.email}
            />

            {/* View All Links Modal */}
            {showLinksModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowLinksModal(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-xl shadow-2xl w-[600px] max-w-[90vw] p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-text-primary">Candidate Overview</h2>
                            <button
                                onClick={() => setShowLinksModal(false)}
                                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Grid of info */}
                        <div className="grid grid-cols-3 gap-x-8 gap-y-5">
                            {/* Row 1 */}
                            <div>
                                <div className="text-xs text-gray-400 mb-1">Application Date</div>
                                <div className="text-sm font-medium text-text-primary">{candidate.applicationDate}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 mb-1">Email Address</div>
                                <div className="text-sm font-medium text-text-primary">{candidate.email}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 mb-1">Current Location</div>
                                <div className="text-sm font-medium text-text-primary">{candidate.location}</div>
                            </div>

                            {/* Row 2 */}
                            <div>
                                <div className="text-xs text-gray-400 mb-1">Status</div>
                                <div className="text-sm font-medium text-text-primary">{candidate.status}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 mb-1">Contact Number</div>
                                <div className="text-sm font-medium text-text-primary">{candidate.phone}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 mb-1">LinkedIn Profile</div>
                                <a href={`https://${candidate.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                                    {candidate.linkedin}
                                </a>
                            </div>

                            {/* Row 3 - Links */}
                            <div>
                                <div className="text-xs text-gray-400 mb-1">Github Link</div>
                                <a href="https://johndoeworks.xyz" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                                    johndoeworks.xyz
                                </a>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 mb-1">Website Link</div>
                                <a href="https://johndoeworks.xyz" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                                    johndoeworks.xyz
                                </a>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 mb-1">Website Link 1</div>
                                <a href="https://johndoeworks.xyz" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                                    johndoeworks.xyz
                                </a>
                            </div>

                            {/* Row 4 - More Links */}
                            <div>
                                <div className="text-xs text-gray-400 mb-1">Website Link 2</div>
                                <a href="https://johndoeworks.xyz" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                                    johndoeworks.xyz
                                </a>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 mb-1">Website Link 3</div>
                                <a href="https://johndoeworks.xyz" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                                    johndoeworks.xyz
                                </a>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 mb-1">Website Link 4</div>
                                <a href="https://johndoeworks.xyz" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                                    johndoeworks.xyz
                                </a>
                            </div>

                            {/* Resume */}
                            <div>
                                <div className="text-xs text-gray-400 mb-1">Resume</div>
                                <a href="#" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                                    View Resume
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15,3 21,3 21,9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Close Button */}
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => setShowLinksModal(false)}
                                className="px-8 py-2.5 bg-secondary text-white text-sm font-medium rounded-lg hover:bg-secondary-hover transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notes Modal */}
            {showNotesModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowNotesModal(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-xl shadow-2xl w-[500px] max-w-[90vw] p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-text-primary">Add Note for {candidate.name}</h2>
                            <button
                                onClick={() => setShowNotesModal(false)}
                                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Note Input */}
                        <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Enter your notes about this candidate..."
                            className="w-full h-32 p-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setShowNotesModal(false)}
                                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (noteText.trim()) {
                                        setShowToast({ message: "Note added successfully!", type: "success" });
                                        setTimeout(() => setShowToast(null), 3000);
                                        setNoteText("");
                                        setShowNotesModal(false);
                                    }
                                }}
                                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                            >
                                Save Note
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {showToast && (
                <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transition-all ${showToast.type === "success" ? "bg-green-600" : "bg-red-600"} text-white`}>
                    {showToast.type === "success" ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22,4 12,14.01 9,11.01" />
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                    )}
                    <span className="text-sm font-medium">{showToast.message}</span>
                </div>
            )}
        </div>
    );
}
