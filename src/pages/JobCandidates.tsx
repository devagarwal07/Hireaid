import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useJobs } from "@/context/JobContext";
import UploadApplicationsModal from "@/components/UploadApplicationsModal";
import ScheduleInterviewModal from "@/components/ScheduleInterviewModal";
import HeaderBanner from "@/assets/images/header_banner.png";

interface CandidateSkill {
    label: string;
    type: "experience" | "skill" | "requirement";
}

interface Candidate {
    id: string;
    name: string;
    email: string;
    evaluation360: number | string | null;
    interviewStatus: "schedule" | "not-recommended" | "none" | "completed";
    status: "pending-interview" | "pending-evaluation" | "cancelled" | "completed";
    skills: CandidateSkill[];
}

// Sample candidates data
const sampleCandidates: Candidate[] = [
    {
        id: "1",
        name: "Marcus Greg",
        email: "marcus.greg@email.com",
        evaluation360: 9.5,
        interviewStatus: "schedule",
        status: "pending-interview",
        skills: [
            { label: "5-7 Years", type: "experience" },
            { label: "English_Fluency", type: "skill" },
            { label: "Knowledge of HR policies and regulatory requirements", type: "requirement" },
            { label: "Advanced Excel skills", type: "skill" },
        ],
    },
    {
        id: "2",
        name: "Samuel Baker",
        email: "samuel.baker@email.com",
        evaluation360: 8.4,
        interviewStatus: "completed",
        status: "completed",
        skills: [
            { label: "3-5 Years", type: "experience" },
            { label: "Communication Skills", type: "skill" },
        ],
    },
    {
        id: "3",
        name: "Samuel Baker",
        email: "s.baker@email.com",
        evaluation360: 8.4,
        interviewStatus: "schedule",
        status: "pending-interview",
        skills: [
            { label: "4-6 Years", type: "experience" },
            { label: "Team Management", type: "skill" },
        ],
    },
    {
        id: "4",
        name: "Klein Morgan",
        email: "klein.morgan@email.com",
        evaluation360: "Under Evaluation",
        interviewStatus: "none",
        status: "pending-evaluation",
        skills: [
            { label: "2-4 Years", type: "experience" },
        ],
    },
    {
        id: "5",
        name: "Alvin Rodriguez",
        email: "alvin.rodriguez@email.com",
        evaluation360: "Under Evaluation",
        interviewStatus: "none",
        status: "pending-evaluation",
        skills: [
            { label: "1-3 Years", type: "experience" },
            { label: "Data Analysis", type: "skill" },
        ],
    },
    {
        id: "6",
        name: "Philip Drew",
        email: "philip.drew@email.com",
        evaluation360: 5.5,
        interviewStatus: "not-recommended",
        status: "cancelled",
        skills: [
            { label: "1-2 Years", type: "experience" },
        ],
    },
];

// Icons
const EyeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9l6 6 6-6" />
    </svg>
);

const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
    </svg>
);

const FilterIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="6" y1="12" x2="18" y2="12" />
        <line x1="8" y1="18" x2="16" y2="18" />
    </svg>
);

const UploadIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17,8 12,3 7,8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);

const DuplicateIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
);

const CloseOpeningIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6M9 9l6 6" />
    </svg>
);

const DeleteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3,6 5,6 21,6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const PencilIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0857A1" strokeWidth="2">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
);

const SortIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L3 6h6L6 9z" fill="#6B7280" />
    </svg>
);

const ClockIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
    </svg>
);

const DotsIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="5" r="1.5" fill="#9CA3AF" />
        <circle cx="12" cy="12" r="1.5" fill="#9CA3AF" />
        <circle cx="12" cy="19" r="1.5" fill="#9CA3AF" />
    </svg>
);

const ViewIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

// Tooltip Component - now click-based, positioned to the left to avoid overflow
const CandidateTooltip = ({
    skills,
    isOpen,
    onClose,
    onViewDetails
}: {
    skills: CandidateSkill[];
    isOpen: boolean;
    onClose: () => void;
    onViewDetails: () => void;
}) => {
    if (!isOpen || skills.length === 0) return null;

    return (
        <>
            {/* Backdrop to close on click outside */}
            <div className="fixed inset-0 z-40" onClick={onClose} />
            <div className="absolute right-0 top-full mt-2 z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-3 w-[280px]">
                <div className="flex flex-wrap gap-2 mb-2">
                    {skills.map((skill, idx) => (
                        <span
                            key={idx}
                            className={`px-2 py-1 rounded text-xs font-medium ${skill.type === "experience"
                                ? "bg-orange-100 text-orange-600"
                                : skill.type === "skill"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-blue-50 text-blue-600"
                                }`}
                        >
                            {skill.label}
                        </span>
                    ))}
                </div>
                <button
                    onClick={onViewDetails}
                    className="flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                >
                    <ViewIcon />
                    View full details
                </button>
                {/* Arrow pointing up - positioned on right side */}
                <div className="absolute right-4 top-0 transform -translate-y-full">
                    <div className="border-8 border-transparent border-b-white" />
                </div>
            </div>
        </>
    );
};

// Status Badge Component
const StatusBadge = ({ status }: { status: Candidate["status"] }) => {
    const config = {
        "pending-interview": { bg: "bg-orange-50", text: "text-orange-500", label: "Pending Interview" },
        "pending-evaluation": { bg: "bg-yellow-50", text: "text-yellow-600", label: "Pending 360 Evaluation" },
        "cancelled": { bg: "bg-red-50", text: "text-red-500", label: "Cancelled by System" },
        "completed": { bg: "bg-green-50", text: "text-green-600", label: "Completed" },
    };

    const { bg, text, label } = config[status];

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
            {label}
        </span>
    );
};

export default function JobCandidates(): React.ReactElement {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { getJobById, duplicateJob, updateJob, removeJob } = useJobs();

    // Get job data from context based on URL param
    const job = id ? getJobById(id) : undefined;

    const [showMoreActions, setShowMoreActions] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [tooltipOpenFor, setTooltipOpenFor] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [candidates] = useState<Candidate[]>(sampleCandidates);
    const [showViewJDModal, setShowViewJDModal] = useState(false);
    const [showViewDetails, setShowViewDetails] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [candidateMenuOpen, setCandidateMenuOpen] = useState<string | null>(null);
    const [showToast, setShowToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const totalPages = 10; // Mocked as per design

    // If job not found, show error
    if (!job) {
        return (
            <div className="min-h-screen w-full bg-page-bg flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">Job Not Found</h1>
                    <p className="text-gray-600 mb-4">The job you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate("/job-dashboard")}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        Back to Job Dashboard
                    </button>
                </div>
            </div>
        );
    }

    // Stats for this job
    const stats = {
        applied: 20,
        evaluation360: 12,
        scheduledForInterview: 6,
        completed: 0,
    };

    const formatNumber = (num: number) => num.toString().padStart(2, "0");

    const handleScheduleInterview = (candidate: Candidate) => {
        setSelectedCandidate(candidate);
        setShowScheduleModal(true);
    };

    const filteredCandidates = candidates.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen w-full bg-page-bg">
            <div className="w-full px-6 py-6">
                {/* Header Section */}
                <div className="relative bg-white rounded-2xl p-6 mb-6 border border-border-card">
                    {/* Background banner image */}
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
                            Interview Schedule
                        </button>
                        <span className="text-text-muted">/</span>
                        <span className="text-primary font-medium">Interview</span>
                    </div>

                    {/* Title and Actions Row */}
                    <div className="flex items-start justify-between relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h1 className="text-2xl font-semibold text-text-primary">
                                    {job.title}
                                </h1>
                                <button className="p-1 hover:bg-white/50 rounded transition-colors">
                                    <PencilIcon />
                                </button>
                            </div>
                            <button
                                onClick={() => setShowViewDetails(!showViewDetails)}
                                className="flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                                View Details
                                <ChevronDownIcon />
                            </button>
                            {/* View Details Dropdown */}
                            {showViewDetails && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setShowViewDetails(false)} />
                                    <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
                                        <div className="text-sm text-gray-600 space-y-2">
                                            <p><strong>Department:</strong> {job.department}</p>
                                            <p><strong>Created:</strong> {job.date}</p>
                                            <p><strong>Status:</strong> <span className="capitalize">{job.status}</span></p>
                                            <p><strong>Applied:</strong> {job.applied}</p>
                                            <p><strong>In Process:</strong> {job.inProcess}</p>
                                            <p><strong>Qualified:</strong> {job.qualified}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowViewJDModal(true)}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary text-primary text-sm font-medium hover:bg-hover-bg transition-colors"
                            >
                                <EyeIcon />
                                View JD
                            </button>
                            <button
                                onClick={() => {
                                    setShowToast({ message: "Hiring process editor will open here", type: "success" });
                                    setTimeout(() => setShowToast(null), 3000);
                                }}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary text-primary text-sm font-medium hover:bg-hover-bg transition-colors"
                            >
                                <EditIcon />
                                Edit Hiring Process
                            </button>

                            {/* More Actions Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowMoreActions(!showMoreActions)}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-secondary text-white text-sm font-medium hover:bg-secondary-hover transition-colors"
                                >
                                    More Actions
                                    <ChevronDownIcon />
                                </button>

                                {showMoreActions && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                                        <button
                                            onClick={() => {
                                                setShowMoreActions(false);
                                                if (id) duplicateJob(id);
                                                setShowToast({ message: "Job duplicated successfully!", type: "success" });
                                                setTimeout(() => {
                                                    setShowToast(null);
                                                    navigate("/job-dashboard");
                                                }, 1500);
                                            }}
                                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <DuplicateIcon />
                                            Duplicate JD
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowMoreActions(false);
                                                if (id) updateJob(id, { status: 'closed' });
                                                setShowToast({ message: "Job opening closed", type: "success" });
                                                setTimeout(() => setShowToast(null), 3000);
                                            }}
                                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <CloseOpeningIcon />
                                            Close Opening
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowMoreActions(false);
                                                setShowDeleteConfirm(true);
                                            }}
                                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <DeleteIcon />
                                            Delete Job
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards - 4 columns */}
                <div className="grid grid-cols-4 gap-0 bg-white rounded-2xl border border-border-card mb-6 overflow-hidden">
                    <div className="p-6 text-center border-r border-border-card">
                        <div className="text-3xl font-semibold text-text-primary mb-1">
                            {formatNumber(stats.applied)}
                        </div>
                        <div className="text-sm text-text-muted">Applied</div>
                    </div>
                    <div className="p-6 text-center border-r border-border-card">
                        <div className="text-3xl font-semibold text-text-primary mb-1">
                            {formatNumber(stats.evaluation360)}
                        </div>
                        <div className="text-sm text-text-muted">360 Evaluation</div>
                    </div>
                    <div className="p-6 text-center border-r border-border-card">
                        <div className="text-3xl font-semibold text-text-primary mb-1">
                            {formatNumber(stats.scheduledForInterview)}
                        </div>
                        <div className="text-sm text-text-muted">Scheduled for Interview</div>
                    </div>
                    <div className="p-6 text-center">
                        <div className="text-3xl font-semibold text-text-primary mb-1">
                            {formatNumber(stats.completed)}
                        </div>
                        <div className="text-sm text-text-muted">Completed</div>
                    </div>
                </div>

                {/* Candidates List Section */}
                <div className="bg-white rounded-2xl border border-border-card">
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b border-border-card">
                        <div className="flex items-center gap-4">
                            <h2 className="text-lg font-semibold text-text-primary">Candidates List</h2>
                            <button
                                onClick={() => setShowUploadModal(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <UploadIcon />
                                Upload Files
                            </button>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Search */}
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <SearchIcon />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-[200px] pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                />
                            </div>

                            {/* Filters Button */}
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                <FilterIcon />
                                Filters
                            </button>
                        </div>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-[1fr_150px_180px_180px_80px] gap-4 px-5 py-3 border-b border-border-card bg-gray-50/50">
                        <div className="text-sm font-medium text-text-label">Candidate Names</div>
                        <div className="flex items-center gap-1 text-sm font-medium text-text-label">
                            360 Evaluation
                            <SortIcon />
                        </div>
                        <div className="text-sm font-medium text-text-label">Interview</div>
                        <div className="text-sm font-medium text-text-label">Status</div>
                        <div></div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-[#E5E7EB]">
                        {filteredCandidates.map((candidate) => (
                            <div
                                key={candidate.id}
                                className="grid grid-cols-[1fr_150px_180px_180px_80px] gap-4 px-5 py-4 hover:bg-gray-50 transition-colors items-center"
                            >
                                {/* Candidate Name - clickable to go to details */}
                                <span
                                    onClick={() => navigate(`/job/${id}/candidate/${candidate.id}`)}
                                    className="text-sm font-medium text-primary cursor-pointer hover:underline"
                                >
                                    {candidate.name}
                                </span>

                                {/* 360 Evaluation */}
                                <div className="text-sm">
                                    {typeof candidate.evaluation360 === "number" ? (
                                        <span className="text-text-primary">
                                            <span className="text-lg font-semibold">{candidate.evaluation360}</span>
                                            <span className="text-gray-400 text-xs">/10</span>
                                        </span>
                                    ) : (
                                        <span className="text-gray-500">{candidate.evaluation360}</span>
                                    )}
                                </div>

                                {/* Interview */}
                                <div className="flex items-center gap-2">
                                    {candidate.interviewStatus === "completed" ? (
                                        <>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="10" fill="#22C55E" />
                                                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="text-sm text-green-600 font-medium">Interview Completed</span>
                                        </>
                                    ) : (
                                        <>
                                            <ClockIcon />
                                            {candidate.interviewStatus === "schedule" ? (
                                                <button
                                                    onClick={() => handleScheduleInterview(candidate)}
                                                    className="text-sm text-primary hover:underline"
                                                >
                                                    Schedule Interview
                                                </button>
                                            ) : candidate.interviewStatus === "not-recommended" ? (
                                                <span className="text-sm text-red-500">Not Recommended</span>
                                            ) : (
                                                <span className="text-sm text-gray-400">-</span>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* Status */}
                                <div className="flex items-center gap-2">
                                    <ClockIcon />
                                    <StatusBadge status={candidate.status} />
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 justify-end relative">
                                    <button
                                        onClick={() => setTooltipOpenFor(tooltipOpenFor === candidate.id ? null : candidate.id)}
                                        className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                                    >
                                        <ViewIcon />
                                    </button>
                                    <button
                                        onClick={() => setCandidateMenuOpen(candidateMenuOpen === candidate.id ? null : candidate.id)}
                                        className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                                    >
                                        <DotsIcon />
                                    </button>

                                    {/* Candidate Actions Dropdown */}
                                    {candidateMenuOpen === candidate.id && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setCandidateMenuOpen(null)} />
                                            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                                <button
                                                    onClick={() => {
                                                        setCandidateMenuOpen(null);
                                                        navigate(`/job/${id}/candidate/${candidate.id}`);
                                                    }}
                                                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                >
                                                    <ViewIcon />
                                                    View Details
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setCandidateMenuOpen(null);
                                                        handleScheduleInterview(candidate);
                                                    }}
                                                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                >
                                                    <ClockIcon />
                                                    Schedule Interview
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setCandidateMenuOpen(null);
                                                        setShowToast({ message: `${candidate.name} removed from candidates`, type: "error" });
                                                        setTimeout(() => setShowToast(null), 3000);
                                                    }}
                                                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                >
                                                    <DeleteIcon />
                                                    Remove Candidate
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {/* Tooltip - positioned relative to this cell */}
                                    <CandidateTooltip
                                        skills={candidate.skills}
                                        isOpen={tooltipOpenFor === candidate.id}
                                        onClose={() => setTooltipOpenFor(null)}
                                        onViewDetails={() => {
                                            setTooltipOpenFor(null);
                                            navigate(`/job/${id}/candidate/${candidate.id}`);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-end gap-4 px-5 py-4 border-t border-border-card">
                        <span className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Click outside to close dropdown */}
            {showMoreActions && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setShowMoreActions(false)}
                />
            )}

            {/* Upload Applications Modal */}
            <UploadApplicationsModal
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                onUploadAll={(files) => {
                    console.log("Uploading files:", files);
                }}
            />

            {/* Schedule Interview Modal */}
            <ScheduleInterviewModal
                isOpen={showScheduleModal}
                onClose={() => {
                    setShowScheduleModal(false);
                    setSelectedCandidate(null);
                }}
                onSchedule={(data) => {
                    console.log("Scheduling interview:", data, "for candidate:", selectedCandidate);
                }}
                candidateName={selectedCandidate?.name}
                candidateEmail={selectedCandidate?.email}
            />

            {/* View JD Modal */}
            {showViewJDModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowViewJDModal(false)} />
                    <div className="relative bg-white rounded-xl shadow-2xl w-[600px] max-w-[90vw] max-h-[80vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-text-primary">Job Description</h2>
                            <button onClick={() => setShowViewJDModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-text-primary mb-2">{job?.title}</h3>
                                <p className="text-sm text-gray-600"><strong>Department:</strong> {job?.department}</p>
                                <p className="text-sm text-gray-600"><strong>Posted:</strong> {job?.date}</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-text-primary mb-2">Description</h4>
                                <p className="text-sm text-gray-600">We are looking for a talented {job?.title} to join our {job?.department} team. This role requires strong analytical skills and the ability to work in a fast-paced environment.</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-text-primary mb-2">Requirements</h4>
                                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                                    <li>3+ years of relevant experience</li>
                                    <li>Strong communication skills</li>
                                    <li>Bachelor's degree or equivalent</li>
                                    <li>Proficiency in industry tools</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowDeleteConfirm(false)} />
                    <div className="relative bg-white rounded-xl shadow-2xl w-[400px] max-w-[90vw] p-6">
                        <div className="flex justify-center mb-4">
                            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary text-center mb-2">Delete Job</h3>
                        <p className="text-sm text-gray-500 text-center mb-6">
                            Are you sure you want to delete <span className="font-medium text-text-primary">"{job?.title}"</span>? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (id) removeJob(id);
                                    setShowDeleteConfirm(false);
                                    navigate("/job-dashboard");
                                }}
                                className="flex-1 px-4 py-2.5 bg-red-600 rounded-lg text-sm font-medium text-white hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {showToast && (
                <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${showToast.type === "success" ? "bg-green-600" : "bg-red-600"} text-white`}>
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
