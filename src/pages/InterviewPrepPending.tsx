import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderBanner from "@/assets/images/header_banner.png";
import { getCandidateById, interviewStructure } from "@/data/candidatesData";
import type { Candidate } from "@/data/candidatesData";

// Icons
const PersonIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const ClockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
    </svg>
);

const CalendarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
);

const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const ExternalLinkIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15,3 21,3 21,9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const ViewIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const TrashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3,6 5,6 21,6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const DragIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="5" r="1" />
        <circle cx="9" cy="12" r="1" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="15" cy="5" r="1" />
        <circle cx="15" cy="12" r="1" />
        <circle cx="15" cy="19" r="1" />
    </svg>
);

export default function InterviewPrepPending(): React.ReactElement {
    const navigate = useNavigate();
    const { candidateId } = useParams();
    const [currentStep, setCurrentStep] = useState<1 | 2>(1);
    const [showNotesModal, setShowNotesModal] = useState(false);

    // Get candidate data from shared data source
    const candidate = getCandidateById(candidateId || "1");

    const steps = [
        { id: 1, label: "Review Candidate Details" },
        { id: 2, label: "Review Interview Structure" },
    ];

    if (!candidate) {
        return (
            <div className="min-h-screen w-full bg-page-bg flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Candidate not found</h2>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-primary hover:underline"
                    >
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-page-bg">
            <div className="w-full px-6 py-6">
                {/* Header Section */}
                <div className="relative bg-white rounded-2xl p-6 mb-6 border border-border-card overflow-hidden">
                    {/* Background banner */}
                    <div
                        className="absolute top-0 right-0 h-full w-1/2 bg-no-repeat bg-right bg-contain pointer-events-none"
                        style={{ backgroundImage: `url(${HeaderBanner})` }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <PersonIcon />
                            <h1 className="text-xl font-semibold text-text-primary">
                                {candidate.name} Report
                            </h1>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            {candidate.interviewScheduled ? (
                                <>
                                    <div className="flex items-center gap-1">
                                        <ClockIcon />
                                        <span>{candidate.scheduledTime}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CalendarIcon />
                                        <span>{candidate.scheduledDate}</span>
                                    </div>
                                    <span>• Conducted by John Doe</span>
                                </>
                            ) : (
                                <span className="text-orange-500 font-medium">Interview Not Scheduled</span>
                            )}
                        </div>

                        <button className="text-primary text-sm font-medium flex items-center gap-1">
                            Check Details
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6,9 12,15 18,9" />
                            </svg>
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-6 right-6 flex gap-3 z-10">
                        {candidate.interviewScheduled ? (
                            <>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2 hover:bg-gray-50">
                                    <ClockIcon />
                                    Reschedule Interview
                                </button>
                                <button className="px-4 py-2 bg-secondary text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-secondary-hover">
                                    <PlusIcon />
                                    Join Meeting
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => navigate(-1)}
                                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-primary-dark"
                            >
                                <CalendarIcon />
                                Schedule Interview
                            </button>
                        )}
                    </div>
                </div>

                {/* Interview Prep Dashboard */}
                <div className="bg-white rounded-2xl p-6 border border-border-card">
                    <h2 className="text-lg font-semibold text-text-primary mb-6">Interview Prep Dashboard</h2>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-4 mb-8">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.id}>
                                <button
                                    onClick={() => setCurrentStep(step.id as 1 | 2)}
                                    className={`flex items-center gap-2 ${currentStep === step.id
                                        ? "text-primary"
                                        : currentStep > step.id
                                            ? "text-success"
                                            : "text-gray-400"
                                        }`}
                                >
                                    <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === step.id
                                            ? "bg-primary text-white"
                                            : currentStep > step.id
                                                ? "bg-success text-white"
                                                : "bg-gray-200 text-gray-500"
                                            }`}
                                    >
                                        {currentStep > step.id ? "✓" : step.id}
                                    </div>
                                    <span className="text-sm font-medium">{step.label}</span>
                                </button>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`flex-1 h-0.5 ${currentStep > step.id ? "bg-success" : "bg-primary"
                                            }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Step Content */}
                    {currentStep === 1 ? (
                        <ReviewCandidateDetails
                            candidate={candidate}
                            onAddNotes={() => setShowNotesModal(true)}
                        />
                    ) : (
                        <ReviewInterviewStructure />
                    )}

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                        <button
                            onClick={() => {
                                if (currentStep === 1) {
                                    navigate(-1);
                                } else {
                                    setCurrentStep(1);
                                }
                            }}
                            className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Back
                        </button>
                        <button
                            onClick={() => {
                                if (currentStep === 1) {
                                    setCurrentStep(2);
                                } else {
                                    // Start interview or go to interview page
                                    navigate("/interview");
                                }
                            }}
                            className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Notes Modal */}
            <NotesModal
                isOpen={showNotesModal}
                onClose={() => setShowNotesModal(false)}
                candidate={candidate}
            />
        </div>
    );
}

// Notes Modal Component
function NotesModal({ isOpen, onClose, candidate }: { isOpen: boolean; onClose: () => void; candidate: Candidate }) {
    const [newNote, setNewNote] = useState("");

    if (!isOpen) return null;

    const notes = candidate.notes || [];

    const handleSaveComment = () => {
        if (newNote.trim()) {
            // In a real app, this would save to backend
            console.log("Saving note:", newNote, "for candidate:", candidate.name);
            setNewNote("");
            // For now, just close the modal
            // onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-[500px] max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-text-primary">Candidate Overview Notes</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Notes List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {notes.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <p>No notes yet. Be the first to add one!</p>
                        </div>
                    ) : (
                        notes.map((note) => (
                            <div key={note.id} className="flex gap-3">
                                {/* Author Photo */}
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                    {note.authorPhoto ? (
                                        <img
                                            src={note.authorPhoto}
                                            alt={note.author}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                                            {note.author.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    )}
                                </div>

                                {/* Note Content */}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-text-primary">{note.author}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">{note.content}</p>
                                    <span className="text-xs text-gray-400">{note.timestamp}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Add Note Input */}
                <div className="p-4 border-t border-gray-200">
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Write a note..."
                            className="w-full p-3 text-sm resize-none focus:outline-none"
                            rows={3}
                        />
                        <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                                <button className="text-primary text-sm flex items-center gap-1 hover:underline">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                    </svg>
                                    Attach File
                                </button>
                                <button className="text-primary text-sm flex items-center gap-1 hover:underline">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <path d="M21 15l-5-5L5 21" />
                                    </svg>
                                    Upload Image
                                </button>
                            </div>
                            <button
                                onClick={handleSaveComment}
                                disabled={!newNote.trim()}
                                className="px-4 py-2 bg-secondary text-white rounded-lg text-sm font-medium hover:bg-secondary-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Save Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Step 1: Review Candidate Details Component
function ReviewCandidateDetails({ candidate, onAddNotes }: { candidate: Candidate; onAddNotes: () => void }) {
    return (
        <div>
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-6">
                    {["Candidate Overview", "360 Evaluation", "Interview"].map((tab, index) => (
                        <button
                            key={tab}
                            className={`pb-3 text-sm font-medium border-b-2 ${index === 0
                                ? "border-primary text-primary"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Candidate Overview Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <PersonIcon />
                        <h3 className="text-base font-semibold text-text-primary">Candidate Overview</h3>
                    </div>
                    <button
                        onClick={onAddNotes}
                        className="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
                    >
                        <PlusIcon />
                        Add Notes
                    </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex gap-6">
                        {/* Profile Image */}
                        <div className="w-24 h-24 rounded-lg bg-gray-300 overflow-hidden flex-shrink-0">
                            <img
                                src={candidate.photo}
                                alt={candidate.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).parentElement!.innerHTML = `
                                        <div class="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-semibold">
                                            ${candidate.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    `;
                                }}
                            />
                        </div>

                        {/* Info Grid */}
                        <div className="flex-1 grid grid-cols-4 gap-4">
                            <div>
                                <h4 className="font-semibold text-text-primary mb-1">{candidate.name}</h4>
                                <p className="text-sm text-gray-500">Applied for {candidate.role}</p>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    {candidate.isRecommendedByAI && (
                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                            ✨ Recommended by AI
                                        </span>
                                    )}
                                    {candidate.isTop10Rated && (
                                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                                            Top 10 Rated
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div>
                                    <p className="text-xs text-gray-400">Application Date</p>
                                    <p className="text-sm font-medium">{candidate.applicationDate}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Status</p>
                                    <p className={`text-sm font-medium ${candidate.interviewScheduled ? "text-green-600" : "text-orange-600"
                                        }`}>
                                        {candidate.status}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div>
                                    <p className="text-xs text-gray-400">Email Address</p>
                                    <p className="text-sm font-medium text-primary">{candidate.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Contact Number</p>
                                    <p className="text-sm font-medium">{candidate.phone}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div>
                                    <p className="text-xs text-gray-400">Current Location</p>
                                    <p className="text-sm font-medium">{candidate.location}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">LinkedIn Profile</p>
                                    <p className="text-sm font-medium text-primary">{candidate.linkedin}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2 whitespace-nowrap">
                                View All links
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9,18 15,12 9,6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 360 Evaluation Section */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg">✨</span>
                    <h3 className="text-base font-semibold text-text-primary">360 Evaluation</h3>
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl font-bold text-success">
                        {candidate.resumeScore}<span className="text-lg text-gray-400">/10</span>
                    </div>
                    <span className="text-sm text-gray-500">Score</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {candidate.evaluationTags.map((tag, index) => (
                        <span
                            key={index}
                            className={`px-3 py-1.5 text-sm rounded-full ${tag.color === "green" ? "bg-green-50 text-green-700" :
                                tag.color === "orange" ? "bg-orange-50 text-orange-700" :
                                    "bg-blue-50 text-blue-700"
                                }`}
                        >
                            {tag.label}
                        </span>
                    ))}
                </div>
            </div>

            {/* Candidate Skills Section */}
            {candidate.skills.length > 0 && (
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">🎯</span>
                        <h3 className="text-base font-semibold text-text-primary">Candidate Skills</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-full flex items-center gap-1"
                            >
                                {skill}
                                <button className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Overall Statistics Section */}
            {candidate.statistics.length > 0 && (
                <div className="mb-8">
                    <div className="grid grid-cols-2 gap-6">
                        {/* Total Score */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-lg">📊</span>
                                <h4 className="text-sm font-semibold text-text-primary">Total Score</h4>
                            </div>
                            <div className="text-2xl font-bold text-primary mb-4">
                                {candidate.overallScore}<span className="text-sm text-gray-400"> / 10</span>
                            </div>
                            <div className="space-y-2">
                                {candidate.statistics.slice(0, 9).map((stat, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500 w-24">{stat.label}</span>
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: `${(stat.score / 10) * 100}%`,
                                                    backgroundColor: stat.color
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Recommendation */}
                        <div className="bg-green-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-lg">✨</span>
                                <h4 className="text-sm font-semibold text-text-primary">AI Recommendation</h4>
                            </div>
                            <div className="text-2xl font-bold text-success mb-4">
                                {candidate.aiScore}<span className="text-sm text-gray-400"> / 10</span>
                            </div>
                            <div className="space-y-2">
                                {candidate.aiRecommendation.points.map((point, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                        <span className={point.positive ? "text-green-500" : "text-red-500"}>
                                            {point.positive ? "✓" : "✗"}
                                        </span>
                                        <p className={`text-xs ${point.positive ? "text-gray-700" : "text-red-600"}`}>
                                            {point.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Strengths & Improvements */}
            {(candidate.strengths.length > 0 || candidate.improvements.length > 0) && (
                <div className="mb-8">
                    <div className="grid grid-cols-2 gap-6">
                        {/* Strengths */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-lg">💪</span>
                                <h4 className="text-sm font-semibold text-text-primary">Strengths</h4>
                            </div>
                            <ul className="space-y-2">
                                {candidate.strengths.map((strength, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className="text-gray-400">•</span>
                                        {strength}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Improvements */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-lg">📈</span>
                                <h4 className="text-sm font-semibold text-text-primary">What Needs Improvement</h4>
                            </div>
                            <ul className="space-y-2">
                                {candidate.improvements.map((improvement, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className="text-gray-400">•</span>
                                        {improvement}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Career Overview */}
            {candidate.careerOverview.length > 0 && (
                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-text-primary mb-2">Career Overview</h4>
                    <ul className="space-y-1">
                        {candidate.careerOverview.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-gray-400">•</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Current Work Experience */}
            {candidate.currentWork.length > 0 && (
                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-text-primary mb-2">Current Work Experience</h4>
                    <ul className="space-y-1">
                        {candidate.currentWork.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-gray-400">•</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Previous Roles */}
            {candidate.previousRoles.length > 0 && (
                <div className="mb-8">
                    <h4 className="text-sm font-semibold text-text-primary mb-3">Previous Roles</h4>
                    <div className="space-y-3">
                        {candidate.previousRoles.map((role, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                                <span className="text-gray-400">•</span>
                                <div>
                                    <span className="font-medium text-primary">{role.company}:</span>
                                    <span className="text-gray-600 ml-1">{role.description}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Interview Section */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg">🎤</span>
                    <h3 className="text-base font-semibold text-text-primary">Interview</h3>
                </div>
                {candidate.interviewScheduled ? (
                    <p className="text-green-600 text-sm">
                        Interview scheduled for {candidate.scheduledDate} at {candidate.scheduledTime}
                    </p>
                ) : (
                    <p className="text-orange-500 text-sm">Interview Pending</p>
                )}
            </div>
        </div>
    );
}

// Step 2: Review Interview Structure Component
function ReviewInterviewStructure() {
    return (
        <div>
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-2">
                <EditIcon />
                <h3 className="text-base font-semibold text-text-primary">
                    Technical Interview <span className="text-gray-400 font-normal">(Interview)</span>
                </h3>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9" />
                </svg>
            </div>
            <p className="text-sm text-gray-500 mb-6">Add Step Description</p>

            <p className="text-sm text-gray-600 mb-6">
                Interview can be set up later during Interview prep. Enter interview details here to standardize Interview for all candidate
            </p>

            {/* Questions Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
                    <div className="col-span-6">QUESTION</div>
                    <div className="col-span-3">TYPE</div>
                    <div className="col-span-3">ACTIONS</div>
                </div>

                {/* Sections */}
                {interviewStructure.map((section) => (
                    <div key={section.id}>
                        {/* Section Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-text-primary">{section.title}</span>
                                <ExternalLinkIcon />
                            </div>
                            <button className="text-primary text-sm font-medium flex items-center gap-1">
                                <PlusIcon />
                                Add Question
                            </button>
                        </div>

                        {/* Questions */}
                        {section.questions.map((question) => (
                            <div
                                key={question.id}
                                className="grid grid-cols-12 gap-4 px-4 py-4 border-b border-gray-100 items-start"
                            >
                                {/* Question */}
                                <div className="col-span-6 flex items-start gap-3">
                                    <div className="text-gray-400 cursor-grab">
                                        <DragIcon />
                                    </div>
                                    <p className="text-sm text-gray-700">{question.text}</p>
                                </div>

                                {/* Type */}
                                <div className="col-span-3 flex flex-col gap-1">
                                    {question.type === "MCQ" && "options" in question && (
                                        <span className="text-xs text-gray-500">{question.options} Options</span>
                                    )}
                                    <span className={`text-xs px-2 py-1 rounded w-fit ${question.type === "MCQ"
                                        ? "bg-blue-50 text-blue-600"
                                        : "bg-green-50 text-green-600"
                                        }`}>
                                        ≡ {question.type}
                                    </span>
                                    {question.aiGenerated && (
                                        <span className="text-xs text-green-600 flex items-center gap-1">
                                            ✨ AI Generated
                                        </span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="col-span-3 flex items-center gap-3">
                                    <button className="text-primary text-sm flex items-center gap-1">
                                        <ViewIcon />
                                        View
                                    </button>
                                    <button className="text-primary text-sm flex items-center gap-1">
                                        <EditIcon />
                                        Edit
                                    </button>
                                    <button className="text-red-500 text-sm flex items-center gap-1">
                                        <TrashIcon />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Add New Section Button */}
            <button className="mt-4 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-2 hover:bg-gray-50">
                <PlusIcon />
                Add New Section
            </button>

            {/* Bottom Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
                <button className="px-4 py-2 border border-primary text-primary rounded-lg text-sm font-medium flex items-center gap-2">
                    <PlusIcon />
                    Add Question
                </button>
                <button className="px-4 py-2 border border-primary text-primary rounded-lg text-sm font-medium flex items-center gap-2">
                    <EditIcon />
                    Edit Interview Structure
                </button>
            </div>
        </div>
    );
}
