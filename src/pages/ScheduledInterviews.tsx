import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBanner from "@/assets/images/header_banner.png";
import { getScheduledInterviews } from "@/data/candidatesData";

// Interview data type
interface ScheduledInterview {
    id: string;
    candidateId: string;
    candidateName: string;
    jobTitle: string;
    date: Date;
    startTime: string;
    endTime: string;
    interviewer: string;
    description?: string;
}

// Parse time string like "9:00 am - 10:00 am" to get start and end times
const parseTimeRange = (timeRange: string): { start: string; end: string } => {
    const parts = timeRange.split(" - ");
    if (parts.length === 2) {
        // Convert "9:00 am" to "09:00"
        const convertTo24h = (time: string): string => {
            const [timePart, period] = time.toLowerCase().split(" ");
            let [hours, minutes] = timePart.split(":").map(Number);
            if (period === "pm" && hours !== 12) hours += 12;
            if (period === "am" && hours === 12) hours = 0;
            return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        };
        return { start: convertTo24h(parts[0]), end: convertTo24h(parts[1]) };
    }
    return { start: "09:00", end: "10:00" };
};

// Parse date string like "26-09-24" to Date object
const parseDateString = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split("-").map(Number);
    return new Date(2000 + year, month - 1, day);
};

// Generate interviews from dynamic candidate data
const generateDynamicInterviews = (): ScheduledInterview[] => {
    const scheduledCandidates = getScheduledInterviews();
    return scheduledCandidates.map((candidate) => {
        const timeRange = parseTimeRange(candidate.scheduledTime || "9:00 am - 10:00 am");
        const date = candidate.scheduledDate ? parseDateString(candidate.scheduledDate) : new Date();

        return {
            id: candidate.id,
            candidateId: candidate.id,
            candidateName: candidate.name,
            jobTitle: candidate.role,
            date: date,
            startTime: timeRange.start,
            endTime: timeRange.end,
            interviewer: "John Doe",
            description: `Interview for ${candidate.role}`,
        };
    });
};

// Get all interviews (dynamic + any additional static ones)
const getAllInterviews = (): ScheduledInterview[] => {
    return generateDynamicInterviews();
};

// Calendar icon
const CalendarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="#181D27" strokeWidth="2" />
        <path d="M16 2V6M8 2V6M3 10H21" stroke="#181D27" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

// Chevron icons
const ChevronLeft = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 15L7.5 10L12.5 5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronRight = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 15L12.5 10L7.5 5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 5L5 15M5 5L15 15" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function ScheduledInterviews(): React.ReactElement {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState<"Day" | "Week" | "Month">("Week");
    const [currentDate, setCurrentDate] = useState(new Date(2024, 8, 25)); // Sept 25, 2024
    const [selectedInterview, setSelectedInterview] = useState<ScheduledInterview | null>(null);

    const timeSlots = [
        "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
        "19:00", "20:00", "21:00"
    ];

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const shortDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Get the week dates starting from the current date
    const getWeekDates = () => {
        const dates = [];
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Start from Sunday

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const weekDates = getWeekDates();

    const navigateWeek = (direction: "prev" | "next") => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
        setCurrentDate(newDate);
    };

    // Get interviews for a specific date and time
    const getInterviewsForSlot = (date: Date, time: string): ScheduledInterview[] => {
        const allInterviews = getAllInterviews();
        return allInterviews.filter((interview: ScheduledInterview) => {
            return (
                interview.date.toDateString() === date.toDateString() &&
                interview.startTime === time
            );
        });
    };

    // Calculate interview height based on duration
    const getInterviewHeight = (startTime: string, endTime: string) => {
        const start = parseInt(startTime.split(":")[0]);
        const end = parseInt(endTime.split(":")[0]);
        return (end - start) * 48; // 48px per hour slot
    };

    return (
        <div className="min-h-screen w-full bg-[#F0F4FF]">
            <div className="w-full px-6 py-6">
                {/* Header Section */}
                <div className="relative bg-white rounded-2xl p-6 mb-6 border border-[#E2E8F0] overflow-hidden">
                    {/* Background banner image */}
                    <div
                        className="absolute top-0 right-0 h-full w-1/2 bg-no-repeat bg-right bg-contain pointer-events-none"
                        style={{ backgroundImage: `url(${HeaderBanner})` }}
                    />

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm mb-3 relative z-10">
                        <button
                            onClick={() => navigate("/job-dashboard")}
                            className="text-[#717171] hover:text-[#0857A1] transition-colors"
                        >
                            Homepage
                        </button>
                        <span className="text-[#717171]">/</span>
                        <span className="text-[#0857A1] font-medium">Interviews</span>
                    </div>

                    {/* Title */}
                    <div className="flex items-center gap-3 relative z-10">
                        <CalendarIcon />
                        <h1 className="text-2xl font-semibold text-[#181D27]">
                            Scheduled Interviews
                        </h1>
                    </div>
                </div>

                {/* Interview Dashboard */}
                <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
                    <h2 className="text-lg font-semibold text-[#181D27] mb-6">Interview Dashboard</h2>

                    {/* Calendar Controls */}
                    <div className="flex items-center justify-between mb-6">
                        {/* Month Navigation */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigateWeek("prev")}
                                className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <ChevronLeft />
                            </button>
                            <button
                                onClick={() => navigateWeek("next")}
                                className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <ChevronRight />
                            </button>
                            <span className="text-lg font-medium text-[#181D27] ml-2">
                                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </span>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                            {(["Day", "Week", "Month"] as const).map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === mode
                                        ? "bg-[#1e3a5f] text-white"
                                        : "bg-white text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        {/* Header Row */}
                        <div className="grid grid-cols-8 border-b border-gray-200">
                            <div className="p-3 text-center text-sm text-gray-500 border-r border-gray-200 bg-gray-50">
                                GMT +5
                            </div>
                            {weekDates.map((date, index) => (
                                <div
                                    key={index}
                                    className={`p-3 text-center border-r border-gray-200 last:border-r-0 ${date.toDateString() === new Date().toDateString() ? "bg-blue-50" : "bg-gray-50"
                                        }`}
                                >
                                    <div className="text-lg font-semibold text-[#181D27]">{date.getDate()}</div>
                                    <div className="text-xs text-gray-500">
                                        {shortMonthNames[date.getMonth()]}, {shortDayNames[date.getDay()]}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Time Slots */}
                        <div className="relative">
                            {timeSlots.map((time) => (
                                <div key={time} className="grid grid-cols-8 border-b border-gray-100 last:border-b-0">
                                    <div className="p-3 text-right text-sm text-gray-500 border-r border-gray-200 bg-gray-50">
                                        {time}
                                    </div>
                                    {weekDates.map((date, dateIndex) => {
                                        const interviews = getInterviewsForSlot(date, time);
                                        return (
                                            <div
                                                key={dateIndex}
                                                className="relative h-12 border-r border-gray-100 last:border-r-0"
                                            >
                                                {interviews.map((interview: ScheduledInterview) => (
                                                    <button
                                                        key={interview.id}
                                                        onClick={() => setSelectedInterview(interview)}
                                                        className="absolute left-1 right-1 bg-blue-100 border border-blue-300 rounded-lg p-2 text-left hover:bg-blue-200 transition-colors cursor-pointer z-10"
                                                        style={{ height: `${getInterviewHeight(interview.startTime, interview.endTime)}px` }}
                                                    >
                                                        <div className="text-xs font-medium text-blue-900 truncate">
                                                            {interview.candidateName}
                                                        </div>
                                                        <div className="text-xs text-blue-700 truncate">
                                                            {interview.jobTitle}
                                                        </div>
                                                        <div className="mt-1">
                                                            <span className="text-[10px] bg-white text-blue-700 px-2 py-0.5 rounded border border-blue-300">
                                                                Interview Prep
                                                            </span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Interview Detail Popup */}
            {selectedInterview && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-[400px] relative">
                        <button
                            onClick={() => setSelectedInterview(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <CloseIcon />
                        </button>

                        <h3 className="text-lg font-semibold text-[#181D27] mb-4">
                            {selectedInterview.candidateName} Interview
                        </h3>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Candidate Name</p>
                                <p className="text-sm font-medium text-[#181D27]">{selectedInterview.candidateName}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Interviewer Name</p>
                                <p className="text-sm font-medium text-[#181D27]">{selectedInterview.interviewer} (You)</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-xs text-gray-500 mb-1">Description</p>
                            <p className="text-sm font-medium text-[#181D27]">
                                {selectedInterview.description || `Meeting scheduled for ${dayNames[selectedInterview.date.getDay()]} at ${selectedInterview.startTime}`}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setSelectedInterview(null)}
                                className="flex-1 px-4 py-2.5 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => navigate(`/job/1/candidate/${selectedInterview.candidateId}`)}
                                className="flex-1 px-4 py-2.5 bg-[#1e3a5f] text-white rounded-lg font-medium hover:bg-[#162d4d] transition-colors"
                            >
                                Interview Prep
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
