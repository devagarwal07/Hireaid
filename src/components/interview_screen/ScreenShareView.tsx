import { useState, useEffect } from "react";

interface ScreenShareViewProps {
    candidateName?: string;
    onSubmit?: () => void;
}

export function ScreenShareView({ candidateName = "Samuel Baker", onSubmit }: ScreenShareViewProps) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    // Prevent body scroll when MCQ screen is active
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleSubmit = () => {
        onSubmit?.();
    };

    return (
        <div className="fixed top-0 right-0 bottom-0 left-[80px] z-[9999] bg-page-bg flex flex-col overflow-hidden">
            {/* Main Content Area */}
            <div className="flex-1 px-8 pt-6 pb-8 overflow-hidden relative">
                {/* Header */}
                <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F5E9] text-sm">
                        <span className="w-2 h-2 rounded-full bg-[#4CAF50]"></span>
                        <span className="text-[#2E7D32] font-medium">Technical Evaluation</span>
                    </div>
                </div>

                {/* Question Tag */}
                <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#E3F2FD] text-[#1565C0] text-xs font-medium">
                        <span className="text-[#1976D2]">MCQ</span>
                    </span>
                </div>

                {/* Question */}
                <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-8 leading-relaxed">
                    Which of the following tools can be used to handle finances in an international operation
                </h2>

                {/* Options Label */}
                <div className="mb-4">
                    <span className="text-sm font-medium text-[#666]">Options</span>
                </div>

                {/* Options List */}
                <div className="space-y-3 mb-8">
                    {[
                        "Request for their home address",
                        "Request for details about other household members",
                        "Request for their mobile number",
                        "Request for their criminal history"
                    ].map((option, index) => (
                        <label
                            key={index}
                            className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedOption === index
                                    ? "border-primary bg-[#F0F7FF]"
                                    : "border-border-card bg-white hover:border-[#D1D5DB]"
                                }`}
                            onClick={() => setSelectedOption(index)}
                        >
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${selectedOption === index
                                    ? "border-primary bg-primary"
                                    : "border-[#9CA3AF] bg-white"
                                }`}>
                                {selectedOption === index && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                                )}
                            </div>
                            <span className="text-[#1a1a1a] text-base">{option}</span>
                        </label>
                    ))}
                </div>

                {/* Bottom Right - Small Video and AI Status */}
                <div className="fixed bottom-24 right-8 w-[280px] space-y-3">
                    {/* Candidate Video - Small */}
                    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden aspect-video flex items-center justify-center shadow-lg">
                        <div className="w-16 h-16 rounded-full bg-[#374151] flex items-center justify-center">
                            <span className="text-white text-xl font-semibold">
                                {candidateName.split(' ').map(n => n[0]).join('')}
                            </span>
                        </div>
                    </div>

                    {/* AI Assistant Status - Compact */}
                    <div className="bg-white rounded-lg p-3 border border-[#E0E0E0] shadow-sm">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2DD4BD] to-[#6990F9] flex items-center justify-center flex-shrink-0">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M12 2L2 7L12 12L22 7L12 2Z"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M2 17L12 22L22 17"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M2 12L12 17L22 12"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-semibold text-[#1a1a1a] mb-0.5">AI Assistant</div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] animate-pulse"></div>
                                    <span className="text-xs text-[#666]">Listening...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="border-t border-border-card bg-white px-8 py-4">
                <div className="flex items-center justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={selectedOption === null}
                        className={`px-8 py-3 rounded-full font-semibold text-white shadow-lg transition-all ${selectedOption === null
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-primary hover:bg-primary-dark"
                            }`}
                    >
                        Submit & Next
                    </button>
                </div>
            </div>
        </div>
    );
}
