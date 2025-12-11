import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateJobModal from "./CreateJobModal";

// Job type definition
interface Job {
  id: string | number;
  title: string;
  department: string;
  date: string;
  applied: number;
  inProcess: number;
  qualified: number;
  status: "open" | "on-hold" | "closed";
  icon: "design" | "data" | "people" | "code" | "analyze" | "frontend";
}

// Sample job data
const sampleJobs: Job[] = [
  {
    id: 1,
    title: "Product Designer",
    department: "Entertainment",
    date: "11-07-25",
    applied: 24,
    inProcess: 12,
    qualified: 8,
    status: "open",
    icon: "design",
  },
  {
    id: 2,
    title: "Data Engineer",
    department: "Finance",
    date: "11-07-25",
    applied: 18,
    inProcess: 9,
    qualified: 5,
    status: "open",
    icon: "data",
  },
  {
    id: 3,
    title: "HR Talent Acquisition Specialist",
    department: "Human Resources",
    date: "11-07-25",
    applied: 32,
    inProcess: 15,
    qualified: 10,
    status: "open",
    icon: "people",
  },
  {
    id: 4,
    title: "Fullstack Developer",
    department: "Finance",
    date: "11-07-25",
    applied: 45,
    inProcess: 20,
    qualified: 12,
    status: "on-hold",
    icon: "code",
  },
  {
    id: 5,
    title: "Business Analyst",
    department: "Finance",
    date: "11-07-25",
    applied: 28,
    inProcess: 14,
    qualified: 7,
    status: "on-hold",
    icon: "analyze",
  },
  {
    id: 6,
    title: "Frontend Developer",
    department: "Finance",
    date: "11-07-25",
    applied: 36,
    inProcess: 18,
    qualified: 9,
    status: "closed",
    icon: "frontend",
  },
];

// Icon components for different job types
const JobIcon = ({ type }: { type: Job["icon"] }) => {
  const iconMap = {
    design: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    data: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3V21H21" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 14L11 10L15 14L21 8" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    people: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    code: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 18L22 12L16 6" stroke="#2ED5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 6L2 12L8 18" stroke="#2ED5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    analyze: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 14.5L11.5 10L15 13.5L21 7.5" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 7.5H21V11.5" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    frontend: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#2ED5BD" strokeWidth="1.5"/>
        <path d="M3 9H21" stroke="#2ED5BD" strokeWidth="1.5"/>
        <path d="M9 21V9" stroke="#2ED5BD" strokeWidth="1.5"/>
      </svg>
    ),
  };
  return iconMap[type] || iconMap.design;
};

// Status badge component
const StatusBadge = ({ status }: { status: Job["status"] }) => {
  const statusConfig: Record<Job["status"], { bg: string; color: string; dotColor?: string; label: string; icon?: React.ReactNode }> = {
    open: {
      bg: "#D4FFE0",
      color: "#0AB137",
      dotColor: "#0AB037",
      label: "Open",
    },
    "on-hold": {
      bg: "rgba(255, 181, 61, 0.16)",
      color: "#F0A123",
      label: "On Hold",
      icon: (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3.5" y="3.25" width="2" height="6.5" rx="0.5" fill="#F0A123"/>
          <rect x="7.5" y="3.25" width="2" height="6.5" rx="0.5" fill="#F0A123"/>
        </svg>
      ),
    },
    closed: {
      bg: "#FFD9D4",
      color: "#FF7764",
      dotColor: "#FF7765",
      label: "Closed",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1 rounded-full"
      style={{ backgroundColor: config.bg }}
    >
      {status === "on-hold" ? (
        config.icon
      ) : (
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: config.dotColor }}
        />
      )}
      <span
        className="text-xs font-medium font-['Poppins']"
        style={{ color: config.color, lineHeight: "140%" }}
      >
        {config.label}
      </span>
    </div>
  );
};

export default function JobList() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  // Use sample data - in real app this would come from API
  const jobs = sampleJobs;
  const hasJobs = jobs.length > 0;

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col bg-white rounded-2xl px-4 py-0">
      {/* Header Section */}
      <div className="flex justify-between items-center py-3 border-b border-[#E2E2E2]">
        <h2 className="font-['Poppins'] font-semibold text-xl text-[#181D27]">
          Job List
        </h2>
        <button
          onClick={() => navigate("/job-form")}
          className="flex items-center justify-center gap-1.5 px-3 h-10 bg-[#0857A1] rounded-[35px] hover:bg-[#074a8a] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3.33334V12.6667" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.33334 8H12.6667" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-['Poppins'] font-medium text-sm text-white">Create Job</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex justify-between items-center py-4">
        <span className="font-['Poppins'] font-normal text-sm text-[#717171]">
          Showing {filteredJobs.length} created jobs
        </span>
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="flex items-center gap-2 px-3 h-10 bg-white border border-[#D5D7DA] rounded-[45px] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] w-[208px]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#989898" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 font-['Poppins'] text-sm text-[#181D27] bg-transparent outline-none placeholder:text-[#989898]"
            />
          </div>
          {/* Filter Button */}
          <button className="flex items-center justify-center gap-1 px-3.5 h-10 bg-[#F2F2F2] border border-[#D5D7DA] rounded-[36px] hover:bg-[#E8E8E8] transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="#989898" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-['Poppins'] font-medium text-sm text-[#626262]">Filters</span>
          </button>
        </div>
      </div>

      {/* Job Cards Grid or Empty State */}
      {hasJobs ? (
        <div className="flex flex-wrap gap-4 py-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col p-4 gap-4 w-[392px] h-[206px] bg-white border border-[#EBEBEB] rounded-lg"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {/* Icon Box */}
                  <div className="flex items-center justify-center w-[47px] h-[47px] bg-[rgba(39,214,189,0.06)] border border-[#BDE8E2] rounded-[5.68px]">
                    <JobIcon type={job.icon} />
                  </div>
                  {/* Job Info */}
                  <div className="flex flex-col gap-1">
                    <span className="font-['Poppins'] font-semibold text-sm text-[#181D27]">
                      {job.title}
                    </span>
                    <div className="flex items-center gap-2">
                      {/* Department */}
                      <div className="flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.3333 4.66667H2.66667C1.93029 4.66667 1.33334 5.26362 1.33334 6V12.6667C1.33334 13.403 1.93029 14 2.66667 14H13.3333C14.0697 14 14.6667 13.403 14.6667 12.6667V6C14.6667 5.26362 14.0697 4.66667 13.3333 4.66667Z" stroke="#717171" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M10.6667 14V3.33333C10.6667 2.97971 10.5262 2.64057 10.2761 2.39052C10.0261 2.14048 9.68696 2 9.33334 2H6.66667C6.31305 2 5.97391 2.14048 5.72386 2.39052C5.47381 2.64057 5.33334 2.97971 5.33334 3.33333V14" stroke="#717171" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="font-['Poppins'] font-normal text-xs text-[#717171]">
                          {job.department}
                        </span>
                      </div>
                      {/* Separator */}
                      <div className="w-1 h-1 rounded-full bg-[#AEAEAE]" />
                      {/* Date */}
                      <div className="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.6667 2.66667H3.33334C2.59696 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59696 14.6667 3.33334 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z" stroke="#717171" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M10.6667 1.33334V4.00001" stroke="#717171" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5.33334 1.33334V4.00001" stroke="#717171" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 6.66667H14" stroke="#717171" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="font-['Poppins'] font-normal text-xs text-[#717171]">
                          {job.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Options Menu */}
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="4" r="1.5" fill="#989898"/>
                    <circle cx="9" cy="9" r="1.5" fill="#989898"/>
                    <circle cx="9" cy="14" r="1.5" fill="#989898"/>
                  </svg>
                </button>
              </div>

              {/* Stats Row */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <span className="font-['Poppins'] font-semibold text-xl text-[#181D27]">
                    {job.applied}
                  </span>
                  <span className="font-['Poppins'] font-normal text-xs text-[#717171]">
                    Applied
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-['Poppins'] font-semibold text-xl text-[#181D27]">
                    {job.inProcess}
                  </span>
                  <span className="font-['Poppins'] font-normal text-xs text-[#717171]">
                    In Process
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-['Poppins'] font-semibold text-xl text-[#181D27]">
                    {job.qualified}
                  </span>
                  <span className="font-['Poppins'] font-normal text-xs text-[#717171]">
                    Qualified
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col gap-3">
                <div className="w-full h-px bg-[#F0F0F0]" />
                <div className="flex justify-between items-center">
                  <button className="font-['Poppins'] font-normal text-xs text-[#0857A1] hover:underline transition-all">
                    View Details
                  </button>
                  <StatusBadge status={job.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="rounded-full border border-dashed border-gray-300 p-6 mb-4">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
              <path d="M46.6667 18.6667H9.33333C6.38781 18.6667 4 21.0545 4 24V44C4 46.9455 6.38781 49.3333 9.33333 49.3333H46.6667C49.6122 49.3333 52 46.9455 52 44V24C52 21.0545 49.6122 18.6667 46.6667 18.6667Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M37.3333 49.3333V13.3333C37.3333 11.9188 36.7714 10.5623 35.7712 9.5621C34.771 8.5619 33.4145 8 32 8H24C22.5855 8 21.229 8.5619 20.2288 9.5621C19.2286 10.5623 18.6667 11.9188 18.6667 13.3333V49.3333" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-gray-500 mb-4">
            No job posts created. Click on create to get started.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-[#0857A1] text-white rounded-[35px] hover:bg-[#074a8a] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3.33334V12.6667" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.33334 8H12.6667" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Create Job
          </button>
        </div>
      )}

      {open && <CreateJobModal onClose={() => setOpen(false)} />}
    </div>
  );
}
