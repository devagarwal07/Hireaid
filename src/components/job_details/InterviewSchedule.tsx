export type Interview = {
  id: string | number;
  title: string;
  time: string; // e.g. "11:30 am - 12:30 pm"
  interviewer: string;
  accentColor: "blue" | "purple" | "orange" | "teal" | "yellow" | "pink";
  candidateId?: string;
};

// Import useNavigate from react-router-dom
import { useNavigate } from "react-router-dom";
import { getScheduledInterviews } from "@/data/candidatesData";

// Accent color configurations matching Figma
const accentColors = {
  blue: {
    bar: "#0857A1",
    barLight: "rgba(8, 87, 161, 0.15)",
  },
  purple: {
    bar: "#7C5CFC",
    barLight: "rgba(124, 92, 252, 0.15)",
  },
  orange: {
    bar: "#FF9F43",
    barLight: "rgba(255, 159, 67, 0.15)",
  },
  teal: {
    bar: "#2ED5BD",
    barLight: "rgba(46, 213, 189, 0.15)",
  },
  yellow: {
    bar: "#FFCA28",
    barLight: "rgba(255, 202, 40, 0.15)",
  },
  pink: {
    bar: "#FF6B9D",
    barLight: "rgba(255, 107, 157, 0.15)",
  },
};

// Color palette for dynamic candidates
const colorPalette: Array<"blue" | "purple" | "orange" | "teal" | "yellow" | "pink"> = [
  "blue", "purple", "orange", "teal", "yellow", "pink"
];

// Generate interviews from dynamic candidate data
const generateInterviewsFromCandidates = (): Interview[] => {
  const scheduledCandidates = getScheduledInterviews();
  return scheduledCandidates.map((candidate, index) => ({
    id: candidate.id,
    title: `${candidate.name} Interview`,
    time: candidate.scheduledTime || "TBD",
    interviewer: "John Doe",
    accentColor: colorPalette[index % colorPalette.length],
    candidateId: candidate.id,
  }));
};

// Static fallback interviews
const staticInterviews: Interview[] = [
  {
    id: "static-1",
    title: "Product Design Interview",
    time: "11:30 am - 12:30 pm",
    interviewer: "Tony Smith",
    accentColor: "blue",
  },
  {
    id: "static-2",
    title: "Fullstack Engineer Interview",
    time: "11:30 am - 12:30 pm",
    interviewer: "Tony Smith",
    accentColor: "purple",
  },
  {
    id: "static-3",
    title: "Accountant Interview",
    time: "11:30 am - 12:30 pm",
    interviewer: "Tony Smith",
    accentColor: "orange",
  },
];

// Get combined interviews - dynamic + static
const getInterviews = (): Interview[] => {
  const dynamicInterviews = generateInterviewsFromCandidates();
  // If we have dynamic interviews, use them; otherwise fallback to static
  return dynamicInterviews.length > 0 ? dynamicInterviews : staticInterviews;
};

export default function InterviewSchedule({
  items,
  className = "",
}: {
  items?: Interview[];
  className?: string;
}) {
  const navigate = useNavigate();
  const displayItems = items || getInterviews();

  return (
    <div
      className={`flex flex-col bg-white rounded-2xl p-4 ${className}`}
      style={{ width: "463px" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-['Poppins'] font-semibold text-lg text-[#181D27]">
          Interview Schedule
        </h3>
        <button
          onClick={() => navigate("/scheduled-interviews")}
          className="font-['Poppins'] font-normal text-sm text-[#0857A1] hover:underline"
        >
          View All
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#E2E2E2] mb-4" />

      {/* Interview Cards */}
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] pr-1">
        {displayItems.map((interview) => {
          const colors = accentColors[interview.accentColor];
          return (
            <button
              key={interview.id}
              onClick={() => {
                // Navigate to candidate details page
                if (interview.candidateId) {
                  navigate(`/job/1/candidate/${interview.candidateId}`);
                } else {
                  navigate('/scheduled-interviews');
                }
              }}
              className="flex items-center gap-3 p-3 bg-white border border-[#EBEBEB] rounded-lg hover:shadow-sm transition-shadow w-full text-left"
              style={{ height: "112px" }}
            >
              {/* Left Color Bar */}
              <div
                className="w-1.5 h-full rounded-full shrink-0"
                style={{ backgroundColor: colors.bar }}
              />

              {/* Content */}
              <div className="flex-1 flex flex-col gap-2">
                {/* Title Row */}
                <div className="flex justify-between items-center">
                  <span className="font-['Poppins'] font-medium text-sm text-[#181D27]">
                    {interview.title}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#989898]"
                  >
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Time Row */}
                <div className="flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                      stroke="#717171"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 4.66667V8L10.6667 9.33333"
                      stroke="#717171"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-['Poppins'] font-normal text-xs text-[#717171]">
                    {interview.time}
                  </span>
                </div>

                {/* Interviewer Row */}
                <div className="flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3333 14V12.6667C13.3333 11.9594 13.0524 11.2811 12.5523 10.781C12.0522 10.281 11.3739 10 10.6667 10H5.33333C4.62609 10 3.94781 10.281 3.44772 10.781C2.94762 11.2811 2.66667 11.9594 2.66667 12.6667V14"
                      stroke="#717171"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 7.33333C9.47276 7.33333 10.6667 6.13943 10.6667 4.66667C10.6667 3.19391 9.47276 2 8 2C6.52724 2 5.33333 3.19391 5.33333 4.66667C5.33333 6.13943 6.52724 7.33333 8 7.33333Z"
                      stroke="#717171"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-['Poppins'] font-normal text-xs text-[#717171]">
                    {interview.interviewer}
                  </span>
                </div>
              </div>
            </button>
          );
        })}

        {/* Empty State */}
        {displayItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 opacity-60">
              <svg
                width="96"
                height="72"
                viewBox="0 0 96 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="6"
                  y="10"
                  width="84"
                  height="56"
                  rx="6"
                  stroke="#E6EEF8"
                  strokeWidth="2"
                  fill="#F9FBFF"
                />
                <rect x="6" y="22" width="84" height="6" rx="2" fill="#EEF6FF" />
                <circle cx="30" cy="40" r="4" fill="#D9EEF9" />
                <circle cx="48" cy="40" r="4" fill="#D9EEF9" />
                <circle cx="66" cy="40" r="4" fill="#D9EEF9" />
              </svg>
            </div>
            <p className="text-sm text-[#626262]">
              No scheduled interviews.
              <br />
              Add a job to proceed in interview creation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}