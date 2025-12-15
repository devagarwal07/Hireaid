import React, { useState } from "react";
import ScheduleInterviewModal from "@/components/ScheduleInterviewModal";

export default function ScheduleInterviewDemo(): React.ReactElement {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleSchedule = (data: {
        candidate: string;
        interviewers: string[];
        timeZone: string;
        duration: string;
        description: string;
        selectedDate: Date | null;
        fromTime: string;
        toTime: string;
        selectedTimeSlot: string;
    }) => {
        console.log("Interview scheduled with data:", data);
        alert(`Interview scheduled for ${data.candidate} on ${data.selectedDate?.toDateString() || 'No date selected'} at ${data.selectedTimeSlot || data.fromTime}`);
    };

    return (
        <div className="min-h-screen bg-[#F0F4FF] p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                    Schedule Interview Demo
                </h1>
                <p className="text-gray-600 mb-6">
                    Click the button below to open the Schedule Interview modal.
                </p>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 bg-[#1e3a5f] hover:bg-[#162d4d] text-white font-medium rounded-lg transition-colors"
                >
                    Open Schedule Interview Modal
                </button>
            </div>

            <ScheduleInterviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSchedule={handleSchedule}
            />
        </div>
    );
}
