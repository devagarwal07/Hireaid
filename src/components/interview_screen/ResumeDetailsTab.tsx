import React from 'react';

// Helper component for circular progress
function CircularProgress({ value, label, color }: { value: number, label: string, color: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path className="transition-all duration-700 ease-out" stroke={color} strokeDasharray={`${value}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-sm font-bold text-gray-800">{value}%</span>
                </div>
            </div>
            <span className="text-xs text-text-secondary mt-2 font-medium text-center">{label}</span>
        </div>
    );
}

export interface ResumeDetailsProps {
    scores?: {
        overall: number;
        skills: number;
        experience: number;
    };
    atsKeywords?: {
        found: string[];
        missing: string[];
    };
    candidate?: {
        name?: string;
        email?: string;
        phone?: string;
        location?: string;
        experience?: string;
        education?: string;
        role?: string;
    };
}

export default function ResumeDetailsTab({
    scores,
    atsKeywords,
    candidate,
}: ResumeDetailsProps) {
    // Use real data or fallback to mock data
    const overallScore = scores?.overall ?? 85;
    const skillsScore = scores?.skills ?? 92;
    const experienceScore = scores?.experience ?? 78;

    const foundKeys = atsKeywords?.found || ["React", "Node.js", "TypeScript", "System Design", "Agile", "TailwindCSS"];
    const missingKeys = atsKeywords?.missing || ["Docker", "Kubernetes", "GraphQL", "AWS"];

    const cName = candidate?.name || "John Doe";
    const cEmail = candidate?.email || "john.doe@example.com";
    const cPhone = candidate?.phone || "+1 (555) 123-4567";
    const cLocation = candidate?.location || "San Francisco, CA";
    const cExperience = candidate?.experience || "4+ Years in Frontend Development building scalable React applications.";
    const cEducation = candidate?.education || "B.S. Computer Science, University of XYZ";

    return (
        <div className="flex-1 overflow-auto px-1 pb-4 flex flex-col gap-4">
            {/* Resume Match Score Container */}
            <div className="bg-white border border-blue-50 rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-text-primary mb-5 flex items-center gap-2">
                    <span>Resume Match Analysis</span>
                </h3>

                <div className="flex justify-around items-start mb-6 pb-6 border-b border-gray-50">
                    <CircularProgress value={overallScore} label="Overall Match" color="#10B981" />
                    <CircularProgress value={skillsScore} label="Skills Match" color="#6366F1" />
                    <CircularProgress value={experienceScore} label="Experience" color="#F59E0B" />
                </div>

                <div className="mb-5">
                    <h4 className="text-xs font-semibold text-text-secondary mb-3 uppercase tracking-wider flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        ATS Keywords Found
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {foundKeys.map(kw => (
                            <span key={kw} className="px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-medium border border-green-100">
                                {kw}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-semibold text-text-secondary mb-3 uppercase tracking-wider flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        Missing Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {missingKeys.map(kw => (
                            <span key={kw} className="px-2.5 py-1 bg-red-50 text-red-700 rounded-lg text-xs font-medium border border-red-100">
                                {kw}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Candidate Details */}
            <div className="bg-white border border-blue-50 rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    Candidate Details
                </h3>

                <div className="space-y-4 text-sm">
                    <div className="flex">
                        <span className="text-text-secondary w-24 flex-shrink-0">Name:</span>
                        <span className="font-medium text-text-primary">{cName}</span>
                    </div>
                    <div className="flex">
                        <span className="text-text-secondary w-24 flex-shrink-0">Email:</span>
                        <span className="font-medium text-text-primary">{cEmail}</span>
                    </div>
                    <div className="flex">
                        <span className="text-text-secondary w-24 flex-shrink-0">Phone:</span>
                        <span className="font-medium text-text-primary">{cPhone}</span>
                    </div>
                    <div className="flex">
                        <span className="text-text-secondary w-24 flex-shrink-0">Location:</span>
                        <span className="font-medium text-text-primary">{cLocation}</span>
                    </div>

                    <div className="pt-3 border-t border-gray-50 flex flex-col gap-1">
                        <span className="text-text-secondary block">Experience:</span>
                        <span className="font-medium text-text-primary leading-relaxed">{cExperience}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-text-secondary block">Education:</span>
                        <span className="font-medium text-text-primary leading-relaxed">{cEducation}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
