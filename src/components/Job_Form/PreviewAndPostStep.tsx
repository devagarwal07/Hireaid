import { useState } from "react";

interface PreviewAndPostStepProps {
    onPrevious: () => void;
    onPost: () => void;
    onSaveDraft?: () => void;
    onEdit?: () => void;
    onApplyAISuggestion?: (suggestion: { jobTitle?: string; areaOfWork?: string }) => void;
}

export default function PreviewAndPostStep({
    onPrevious,
    onPost,
    onSaveDraft,
    onEdit,
    onApplyAISuggestion,
}: PreviewAndPostStepProps) {
    const [activeTab, setActiveTab] = useState<"Default" | "LinkedIn" | "Indeed">("Indeed");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showLinkCopied, setShowLinkCopied] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(true);

    // AI Suggestions data
    const aiSuggestions = {
        jobTitle: "Senior HR Recruiter",
        areaOfWork: "Talent acquisition",
    };

    const handlePostJob = () => {
        setShowConfirmation(true);
    };

    const handleConfirmPost = () => {
        setShowConfirmation(false);
        onPost();
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleCopyLink = () => {
        // Copy current job URL to clipboard
        const jobUrl = window.location.href;
        navigator.clipboard.writeText(jobUrl).then(() => {
            setShowLinkCopied(true);
            setTimeout(() => setShowLinkCopied(false), 2000);
        });
    };

    const handleApplyNow = () => {
        // Open application form or redirect
        alert("Application form would open here for candidates to apply.");
    };

    const handleEdit = () => {
        if (onEdit) {
            onEdit();
        } else {
            // Default: go back to first step for editing
            onPrevious();
        }
    };

    const handleClosePreview = () => {
        setIsPreviewOpen(false);
    };

    const handleSaveDraft = () => {
        if (onSaveDraft) {
            onSaveDraft();
        } else {
            alert("Job saved as draft successfully!");
        }
    };

    const handleApplyAISuggestion = () => {
        if (onApplyAISuggestion) {
            onApplyAISuggestion(aiSuggestions);
        } else {
            alert(`AI Suggestions Applied:\n• Job Title: "${aiSuggestions.jobTitle}"\n• Area of Work: "${aiSuggestions.areaOfWork}"`);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Complete Preview & Post Job</h2>

            <div className="flex gap-6">
                {/* Job Description Preview */}
                {isPreviewOpen && (
                    <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h3 className="font-semibold text-gray-900">Job Description Preview</h3>
                            <div className="flex items-center gap-3">
                                <button onClick={handleEdit} className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Edit
                                </button>
                                <button onClick={handleClosePreview} className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            {/* Platform Tabs */}
                            <div className="flex gap-6 mb-6">
                                {(["Default", "LinkedIn", "Indeed"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-2 text-sm font-medium transition-colors ${activeTab === tab
                                            ? "text-blue-600 border-b-2 border-blue-600"
                                            : "text-gray-500 hover:text-gray-700"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Job Card Preview */}
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-gray-900">
                                    HR Quality & Training Specialist
                                </h4>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span>Neuraleap Hire</span>
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </div>

                                <p className="text-sm text-gray-600">Remote</p>
                                <p className="text-sm text-gray-900">₹25,000 - ₹30,000 a month</p>

                                <div className="flex items-center gap-2 pt-2">
                                    <button onClick={handleApplyNow} className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                                        Apply now
                                    </button>
                                    <button onClick={handleBookmark} className={`p-2 rounded-lg transition-colors ${isBookmarked ? 'bg-blue-100' : 'bg-gray-100 hover:bg-gray-200'}`}>
                                        <svg className={`w-5 h-5 ${isBookmarked ? 'text-blue-600' : 'text-gray-600'}`} fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                        </svg>
                                    </button>
                                    <div className="relative">
                                        <button onClick={handleCopyLink} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                        </button>
                                        {showLinkCopied && (
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                                                Link copied!
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <h4 className="font-semibold text-gray-900 mt-8 mb-3">Job details</h4>
                            {/* Job details content placeholder */}
                        </div>
                    </div>
                )}

                {/* AI Assistant */}
                <div className="w-80 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 p-5">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            <span className="font-semibold text-blue-600">AI Assistant</span>
                        </div>
                        <button onClick={handleApplyAISuggestion} className="text-blue-600 text-sm font-medium hover:underline">Apply</button>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-2">Job Title</h5>
                            <p className="text-sm text-gray-700">
                                • HR Quality & Training specialist is not a very commonly used term we recommend
                                changing the title to something along the lines of "<span className="font-semibold">"Senior HR Recruiter"</span>"
                            </p>
                        </div>

                        <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-2">Area of work</h5>
                            <p className="text-sm text-gray-700">
                                • Recruitment is a narrowing down the scope of the request, its better to use
                                "<span className="font-semibold">"Talent acquisition"</span>"
                            </p>
                        </div>
                    </div>
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
                    onClick={handleSaveDraft}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                    Save as Draft
                </button>
                <button
                    type="button"
                    onClick={handlePostJob}
                    className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
                >
                    Post Job
                </button>
            </div>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 relative">
                        {/* Close button */}
                        <button
                            onClick={() => setShowConfirmation(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Header with icon */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Confirmation</h3>
                        </div>

                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to proceed ahead with job creation ? You can always come back and change details if required.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="px-5 py-2 text-gray-600 hover:text-gray-800 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmPost}
                                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                            >
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
