import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ScheduleTestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSchedule?: (data: ScheduleTestData) => void;
    candidateName?: string;
    candidateEmail?: string;
}

interface ScheduleTestData {
    candidate: string;
    proctors: string[];
    timeZone: string;
    duration: string;
    testType: string;
    description: string;
    selectedDate: Date | null;
    fromTime: string;
    toTime: string;
}

interface Proctor {
    id: string;
    name: string;
    email: string;
}

const timeZones = [
    "Select Timezone",
    "(GMT-08:00) Pacific Time",
    "(GMT-07:00) Mountain Time",
    "(GMT-06:00) Central Time",
    "(GMT-05:00) Eastern Time",
    "(GMT+00:00) UTC",
    "(GMT+01:00) Central European Time",
    "(GMT+05:30) India Standard Time",
    "(GMT+08:00) China Standard Time",
    "(GMT+09:00) Japan Standard Time",
];

const durations = [
    "Select Duration",
    "30 minutes",
    "45 minutes",
    "1 hour",
    "1.5 hours",
    "2 hours",
    "3 hours",
];

const testTypes = [
    "Select Test Type",
    "Technical Assessment",
    "Coding Challenge",
    "System Design",
    "Database & SQL",
    "Frontend Development",
    "Backend Development",
    "Full Stack Assessment",
    "Behavioral Assessment",
];

const timeOptions = [
    "Select Time",
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
];

const sampleProctors: Proctor[] = [
    { id: "1", name: "John Doe", email: "JohnDoe@HireAide" },
    { id: "2", name: "Jane Smith", email: "JaneSmith@HireAide" },
    { id: "3", name: "Mike Johnson", email: "MikeJ@HireAide" },
];

const InfoIcon: React.FC = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gray-400"
    >
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path
            d="M8 7V11M8 5V5.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
);

const ChevronDown: React.FC = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="#6B7280"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const SearchIcon: React.FC = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
            stroke="#6B7280"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const CloseIcon: React.FC = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M18 6L6 18M6 6L18 18"
            stroke="#374151"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const ChevronLeft: React.FC = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="#374151"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const ChevronRight: React.FC = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7.5 15L12.5 10L7.5 5"
            stroke="#374151"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default function ScheduleTestModal({
    isOpen,
    onClose,
    onSchedule,
    candidateName = "Samuel Baker",
    candidateEmail = "SamBaker@hotmail.com",
}: ScheduleTestModalProps): React.ReactElement | null {
    const navigate = useNavigate();

    const candidateDisplay = `${candidateName} (${candidateEmail})`;

    const [candidateSearch, setCandidateSearch] = useState(candidateDisplay);
    const [selectedProctors, setSelectedProctors] = useState<Proctor[]>([sampleProctors[0]]);
    const [showProctorDropdown, setShowProctorDropdown] = useState(false);
    const [timeZone, setTimeZone] = useState("Select Timezone");
    const [duration, setDuration] = useState("Select Duration");
    const [testType, setTestType] = useState("Select Test Type");
    const [description, setDescription] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2024, 10, 8));
    const [fromTime, setFromTime] = useState("Select Time");
    const [toTime, setToTime] = useState("Select Time");
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [calendarView, setCalendarView] = useState<'days' | 'months' | 'years'>('days');
    const [currentMonth, setCurrentMonth] = useState(10);
    const [currentYear, setCurrentYear] = useState(2024);

    useEffect(() => {
        if (isOpen) {
            setShowConfirmation(false);
            setCalendarView('days');
            setCandidateSearch(candidateDisplay);
        }
    }, [isOpen, candidateDisplay]);

    // Form validation
    const isFormValid = (): boolean => {
        return (
            candidateSearch.trim() !== "" &&
            selectedProctors.length > 0 &&
            testType !== "Select Test Type" &&
            timeZone !== "Select Timezone" &&
            duration !== "Select Duration" &&
            selectedDate !== null &&
            fromTime !== "Select Time"
        );
    };

    if (!isOpen) return null;

    const removeProctor = (id: string) => {
        setSelectedProctors(selectedProctors.filter((p) => p.id !== id));
    };

    const addProctor = (proctor: Proctor) => {
        if (!selectedProctors.find((p) => p.id === proctor.id)) {
            setSelectedProctors([...selectedProctors, proctor]);
        }
        setShowProctorDropdown(false);
    };

    const handleSchedule = () => {
        setShowConfirmation(true);

        if (onSchedule) {
            onSchedule({
                candidate: candidateSearch,
                proctors: selectedProctors.map((p) => p.email),
                timeZone,
                duration,
                testType,
                description,
                selectedDate: selectedDate,
                fromTime,
                toTime,
            });
        }
    };

    const handleDone = () => {
        setShowConfirmation(false);
        onClose();
        navigate('/job-dashboard');
    };

    const handleReschedule = () => {
        setShowConfirmation(false);
    };

    const formatDate = (date: Date | null) => {
        if (!date) return "";
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', weekday: 'long' };
        return date.toLocaleDateString('en-US', options);
    };

    const getCandidateName = () => {
        const match = candidateSearch.match(/^([^(]+)/);
        return match ? match[1].trim() : "Candidate";
    };

    // Confirmation Screen
    if (showConfirmation) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[520px] mx-4">
                    <button
                        onClick={handleDone}
                        className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <CloseIcon />
                    </button>

                    <div className="px-8 py-8">
                        <div className="mb-4">
                            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="28" cy="28" r="26" stroke="#22C55E" strokeWidth="3" fill="none" />
                                <path d="M18 28L25 35L38 22" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            Technical test for {getCandidateName().split(' ')[0]} has been scheduled!
                        </h2>

                        <p className="text-sm font-semibold text-gray-800 mb-4">Check Details Below</p>

                        <div className="bg-gray-50 rounded-lg p-5 mb-5">
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase mb-1">Candidate Name</p>
                                    <p className="text-sm font-medium text-gray-900">{getCandidateName()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase mb-1">Proctors</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {selectedProctors[0]?.name || "John Doe"} (You)
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase mb-1">Time Zone</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {timeZone !== "Select Timezone" ? timeZone.replace(/\([^)]+\)\s*/, "") : "GMT"}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase mb-1">Duration</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {duration !== "Select Duration" ? duration : "1 Hour"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase mb-1">Date of Test</p>
                                    <p className="text-sm font-medium text-gray-900">{formatDate(selectedDate)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase mb-1">Test Type</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {testType !== "Select Test Type" ? testType : "Technical"}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400 uppercase mb-1">Description</p>
                                <p className="text-sm font-medium text-gray-900">
                                    {description || `Technical assessment test for ${getCandidateName()}`}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg mb-6">
                            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 3L10 9L19 3M2 1H18C18.5523 1 19 1.44772 19 2V14C19 14.5523 18.5523 15 18 15H2C1.44772 15 1 14.5523 1 14V2C1 1.44772 1.44772 1 2 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-sm">An email invite for the test will be sent soon to {getCandidateName()}</span>
                        </div>

                        <div className="flex justify-end items-center gap-3">
                            <button
                                onClick={handleReschedule}
                                className="px-5 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                Reschedule
                            </button>
                            <button
                                onClick={handleDone}
                                className="px-6 py-2.5 bg-secondary hover:bg-secondary-hover transition-colors duration-200 text-white text-sm font-medium rounded-lg"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />

            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[800px] max-h-[90vh] overflow-y-auto mx-4">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Schedule Technical Test
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <div className="px-6 py-5">
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-gray-900 mb-4">
                            Add Details
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Add Candidate */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm text-gray-600">Add Candidate</label>
                                    <InfoIcon />
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={candidateSearch}
                                        onChange={(e) => setCandidateSearch(e.target.value)}
                                        placeholder="Search candidate..."
                                        className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <SearchIcon />
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400 mt-1 block">Required</span>
                            </div>

                            {/* Add Proctors */}
                            <div className="relative">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm text-gray-600">Add Proctors</label>
                                    <InfoIcon />
                                </div>
                                <div
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg flex items-center justify-between cursor-pointer hover:border-gray-300"
                                    onClick={() => setShowProctorDropdown(!showProctorDropdown)}
                                >
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {selectedProctors.map((proctor) => (
                                            <span
                                                key={proctor.id}
                                                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-700"
                                            >
                                                You ({proctor.email})
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeProctor(proctor.id);
                                                    }}
                                                    className="ml-1 text-gray-500 hover:text-gray-700"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <ChevronDown />
                                </div>
                                <span className="text-xs text-gray-400 mt-1 block">Required</span>

                                {showProctorDropdown && (
                                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                                        {sampleProctors
                                            .filter((p) => !selectedProctors.find((sel) => sel.id === p.id))
                                            .map((proctor) => (
                                                <div
                                                    key={proctor.id}
                                                    onClick={() => addProctor(proctor)}
                                                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                                                >
                                                    {proctor.name} ({proctor.email})
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>

                            {/* Select Test Type */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm text-gray-600">Select Test Type</label>
                                    <InfoIcon />
                                </div>
                                <div className="relative">
                                    <select
                                        value={testType}
                                        onChange={(e) => setTestType(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                                    >
                                        {testTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronDown />
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400 mt-1 block">Required</span>
                            </div>

                            {/* Select Time Zone */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm text-gray-600">Select Time Zone</label>
                                    <InfoIcon />
                                </div>
                                <div className="relative">
                                    <select
                                        value={timeZone}
                                        onChange={(e) => setTimeZone(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                                    >
                                        {timeZones.map((tz) => (
                                            <option key={tz} value={tz}>{tz}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronDown />
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400 mt-1 block">Required</span>
                            </div>

                            {/* Select Duration */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm text-gray-600">Select Duration</label>
                                    <InfoIcon />
                                </div>
                                <div className="relative">
                                    <select
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                                    >
                                        {durations.map((dur) => (
                                            <option key={dur} value={dur}>{dur}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronDown />
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400 mt-1 block">Required</span>
                            </div>
                        </div>

                        {/* Add Description */}
                        <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm text-gray-600">
                                    Add Description <span className="text-gray-400">(Added as notes to candidate invite)</span>
                                </label>
                                <InfoIcon />
                            </div>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add a description about the test..."
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Select Date & Time Section */}
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-4">
                            Select Date & Time
                        </h3>

                        <div className="flex gap-8">
                            {/* Calendar */}
                            <div className="flex-shrink-0">
                                <label className="text-sm text-gray-600 mb-3 block">Select Date</label>
                                <div className="w-[280px] border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <button
                                            onClick={() => {
                                                if (calendarView === 'days') {
                                                    if (currentMonth === 0) {
                                                        setCurrentMonth(11);
                                                        setCurrentYear(currentYear - 1);
                                                    } else {
                                                        setCurrentMonth(currentMonth - 1);
                                                    }
                                                } else if (calendarView === 'years') {
                                                    setCurrentYear(currentYear - 12);
                                                }
                                            }}
                                            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <ChevronLeft />
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (calendarView === 'days') {
                                                    setCalendarView('months');
                                                } else if (calendarView === 'months') {
                                                    setCalendarView('years');
                                                }
                                            }}
                                            className="text-sm font-semibold text-gray-900 hover:text-blue-600"
                                        >
                                            {calendarView === 'days' && `${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][currentMonth]}  ${currentYear}`}
                                            {calendarView === 'months' && `${currentYear}`}
                                            {calendarView === 'years' && `${currentYear - 5} - ${currentYear + 6}`}
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (calendarView === 'days') {
                                                    if (currentMonth === 11) {
                                                        setCurrentMonth(0);
                                                        setCurrentYear(currentYear + 1);
                                                    } else {
                                                        setCurrentMonth(currentMonth + 1);
                                                    }
                                                } else if (calendarView === 'years') {
                                                    setCurrentYear(currentYear + 12);
                                                }
                                            }}
                                            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <ChevronRight />
                                        </button>
                                    </div>

                                    {/* Days View */}
                                    {calendarView === 'days' && (
                                        <>
                                            <div className="grid grid-cols-7 gap-1 mb-2">
                                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                                                    <div key={day} className="text-center text-xs text-gray-500 font-medium py-1">
                                                        {day}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="grid grid-cols-7 gap-1">
                                                {(() => {
                                                    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
                                                    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
                                                    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
                                                    const days: { day: number; isCurrentMonth: boolean }[] = [];

                                                    for (let i = firstDay - 1; i >= 0; i--) {
                                                        days.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
                                                    }
                                                    for (let i = 1; i <= daysInMonth; i++) {
                                                        days.push({ day: i, isCurrentMonth: true });
                                                    }
                                                    const remainingDays = 42 - days.length;
                                                    for (let i = 1; i <= remainingDays; i++) {
                                                        days.push({ day: i, isCurrentMonth: false });
                                                    }

                                                    return days.slice(0, 35).map((dayObj, index) => {
                                                        const isSelected = selectedDate &&
                                                            dayObj.isCurrentMonth &&
                                                            dayObj.day === selectedDate.getDate() &&
                                                            currentMonth === selectedDate.getMonth() &&
                                                            currentYear === selectedDate.getFullYear();

                                                        return (
                                                            <button
                                                                key={index}
                                                                onClick={() => {
                                                                    if (dayObj.isCurrentMonth) {
                                                                        setSelectedDate(new Date(currentYear, currentMonth, dayObj.day));
                                                                    }
                                                                }}
                                                                className={`
                                  w-8 h-8 flex items-center justify-center text-sm rounded-full transition-colors
                                  ${!dayObj.isCurrentMonth
                                                                        ? "text-gray-300"
                                                                        : isSelected
                                                                            ? "bg-white border-2 border-gray-800 text-gray-900 font-medium"
                                                                            : "text-gray-700 hover:bg-gray-100"
                                                                    }
                                `}
                                                                disabled={!dayObj.isCurrentMonth}
                                                            >
                                                                {dayObj.day}
                                                            </button>
                                                        );
                                                    });
                                                })()}
                                            </div>
                                        </>
                                    )}

                                    {/* Months View */}
                                    {calendarView === 'months' && (
                                        <div className="grid grid-cols-3 gap-2">
                                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                                                <button
                                                    key={month}
                                                    onClick={() => {
                                                        setCurrentMonth(index);
                                                        setCalendarView('days');
                                                    }}
                                                    className={`
                            py-3 text-sm rounded-lg transition-colors
                            ${currentMonth === index
                                                            ? "bg-gray-100 font-medium text-gray-900"
                                                            : "text-gray-700 hover:bg-gray-50"
                                                        }
                          `}
                                                >
                                                    {month}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Years View */}
                                    {calendarView === 'years' && (
                                        <div className="grid grid-cols-3 gap-2">
                                            {Array.from({ length: 12 }, (_, i) => currentYear - 5 + i).map((year) => (
                                                <button
                                                    key={year}
                                                    onClick={() => {
                                                        setCurrentYear(year);
                                                        setCalendarView('months');
                                                    }}
                                                    className={`
                            py-3 text-sm rounded-lg transition-colors
                            ${currentYear === year
                                                            ? "bg-gray-100 font-medium text-gray-900"
                                                            : "text-gray-700 hover:bg-gray-50"
                                                        }
                          `}
                                                >
                                                    {year}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Time Selection */}
                            <div className="flex-1">
                                <label className="text-sm text-gray-600 mb-3 block">Select Time Slot</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1 block">From</label>
                                        <div className="relative">
                                            <select
                                                value={fromTime}
                                                onChange={(e) => setFromTime(e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                                            >
                                                {timeOptions.map((time) => (
                                                    <option key={time} value={time}>{time}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <ChevronDown />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1 block">To</label>
                                        <div className="relative">
                                            <select
                                                value={toTime}
                                                onChange={(e) => setToTime(e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                                            >
                                                {timeOptions.map((time) => (
                                                    <option key={time} value={time}>{time}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <ChevronDown />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {selectedDate && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Selected:</span> {formatDate(selectedDate)}
                                            {fromTime !== "Select Time" && ` at ${fromTime}`}
                                            {toTime !== "Select Time" && ` - ${toTime}`}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSchedule}
                        disabled={!isFormValid()}
                        className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${isFormValid()
                                ? "bg-secondary hover:bg-secondary-hover transition-colors duration-200 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        Schedule Test
                    </button>
                </div>
            </div>
        </div>
    );
}
