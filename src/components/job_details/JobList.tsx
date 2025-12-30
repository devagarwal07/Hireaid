import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateJobModal from "./CreateJobModal";
import { useJobs, type Job } from "@/context/JobContext";

// Icon components for different job types
const JobIcon = ({ type }: { type: Job["icon"] }) => {
  const iconMap = {
    design: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17L12 22L22 17" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12L12 17L22 12" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    data: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3V21H21" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 14L11 10L15 14L21 8" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    people: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    code: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 18L22 12L16 6" stroke="#2ED5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 6L2 12L8 18" stroke="#2ED5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    analyze: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 14.5L11.5 10L15 13.5L21 7.5" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 7.5H21V11.5" stroke="#2ED5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    frontend: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#2ED5BD" strokeWidth="1.5" />
        <path d="M3 9H21" stroke="#2ED5BD" strokeWidth="1.5" />
        <path d="M9 21V9" stroke="#2ED5BD" strokeWidth="1.5" />
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
          <rect x="3.5" y="3.25" width="2" height="6.5" rx="0.5" fill="#F0A123" />
          <rect x="7.5" y="3.25" width="2" height="6.5" rx="0.5" fill="#F0A123" />
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
        className="text-xs font-medium"
        style={{ color: config.color, lineHeight: "140%" }}
      >
        {config.label}
      </span>
    </div>
  );
};

export default function JobList() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | number | null>(null);
  const [jobToDelete, setJobToDelete] = useState<string | number | null>(null);

  // Use jobs from context
  const { jobs, duplicateJob, updateJob, removeJob } = useJobs();
  const hasJobs = jobs.length > 0;
  const jobToDeleteData = jobToDelete ? jobs.find(j => j.id === jobToDelete) : null;

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full px-4 py-0">
      {/* Header Section */}
      <div className="flex justify-between items-center py-3 border-b border-border-light">
        <h2 className="font-semibold text-xl text-text-primary">
          Job List
        </h2>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center gap-1.5 px-3 h-10 bg-primary rounded-[35px] hover:bg-primary-dark transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3.33334V12.6667" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.33334 8H12.6667" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-medium text-sm text-white">Create Job</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex justify-between items-center py-4">
        <span className="font-normal text-sm text-text-muted">
          Showing {filteredJobs.length} created jobs
        </span>
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="flex items-center gap-2 px-3 h-10 bg-white border border-border-input rounded-[45px] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] w-[208px]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#989898" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-sm text-text-primary bg-transparent outline-none placeholder:text-[#989898]"
            />
          </div>
          {/* Filter Button */}
          <button className="flex items-center justify-center gap-1 px-3.5 h-10 bg-[#F2F2F2] border border-border-input rounded-[36px] hover:bg-[#E8E8E8] transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="#989898" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-medium text-sm text-text-secondary">Filters</span>
          </button>
        </div>
      </div>

      {/* Job Cards Grid or Empty State */}
      {hasJobs ? (
        <div className="grid gap-4 py-4 w-full" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(392px, 1fr))' }}>
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col p-4 gap-4 w-full h-[206px] bg-white border border-border-light rounded-lg"
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
                    <span className="font-semibold text-sm text-text-primary">
                      {job.title}
                    </span>
                    <div className="flex items-center gap-2">
                      {/* Department */}
                      <div className="flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.3333 4.66667H2.66667C1.93029 4.66667 1.33334 5.26362 1.33334 6V12.6667C1.33334 13.403 1.93029 14 2.66667 14H13.3333C14.0697 14 14.6667 13.403 14.6667 12.6667V6C14.6667 5.26362 14.0697 4.66667 13.3333 4.66667Z" stroke="#717171" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10.6667 14V3.33333C10.6667 2.97971 10.5262 2.64057 10.2761 2.39052C10.0261 2.14048 9.68696 2 9.33334 2H6.66667C6.31305 2 5.97391 2.14048 5.72386 2.39052C5.47381 2.64057 5.33334 2.97971 5.33334 3.33333V14" stroke="#717171" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-normal text-xs text-text-muted">
                          {job.department}
                        </span>
                      </div>
                      {/* Separator */}
                      <div className="w-1 h-1 rounded-full bg-[#AEAEAE]" />
                      {/* Date */}
                      <div className="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.6667 2.66667H3.33334C2.59696 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59696 14.6667 3.33334 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z" stroke="#717171" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10.6667 1.33334V4.00001" stroke="#717171" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M5.33334 1.33334V4.00001" stroke="#717171" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M2 6.66667H14" stroke="#717171" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-normal text-xs text-text-muted">
                          {job.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Options Menu */}
                <div className="relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === job.id ? null : job.id)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="9" cy="4" r="1.5" fill="#989898" />
                      <circle cx="9" cy="9" r="1.5" fill="#989898" />
                      <circle cx="9" cy="14" r="1.5" fill="#989898" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {openMenuId === job.id && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setOpenMenuId(null)}
                      />
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            navigate(`/job/${job.id}/candidates`);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          Edit Job
                        </button>
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            duplicateJob(job.id);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          Duplicate JD
                        </button>
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            updateJob(job.id, { status: 'closed' });
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M15 9l-6 6M9 9l6 6" />
                          </svg>
                          Close Opening
                        </button>
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            setJobToDelete(job.id);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3,6 5,6 21,6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                          Delete Job
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-xl text-text-primary">
                    {job.applied}
                  </span>
                  <span className="font-normal text-xs text-text-muted">
                    Applied
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-xl text-text-primary">
                    {job.inProcess}
                  </span>
                  <span className="font-normal text-xs text-text-muted">
                    In Process
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-xl text-text-primary">
                    {job.qualified}
                  </span>
                  <span className="font-normal text-xs text-text-muted">
                    Qualified
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col gap-3">
                <div className="w-full h-px bg-[#F0F0F0]" />
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => navigate(`/job/${job.id}/candidates`)}
                    className="font-normal text-xs text-primary hover:underline transition-all"
                  >
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
              <path d="M46.6667 18.6667H9.33333C6.38781 18.6667 4 21.0545 4 24V44C4 46.9455 6.38781 49.3333 9.33333 49.3333H46.6667C49.6122 49.3333 52 46.9455 52 44V24C52 21.0545 49.6122 18.6667 46.6667 18.6667Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M37.3333 49.3333V13.3333C37.3333 11.9188 36.7714 10.5623 35.7712 9.5621C34.771 8.5619 33.4145 8 32 8H24C22.5855 8 21.229 8.5619 20.2288 9.5621C19.2286 10.5623 18.6667 11.9188 18.6667 13.3333V49.3333" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-gray-500 mb-4">
            No job posts created. Click on create to get started.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-primary text-white rounded-[35px] hover:bg-primary-dark transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3.33334V12.6667" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3.33334 8H12.6667" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Create Job
          </button>
        </div>
      )}

      {open && <CreateJobModal onClose={() => setOpen(false)} />}

      {/* Delete Confirmation Modal */}
      {jobToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setJobToDelete(null)}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-xl shadow-2xl w-[400px] max-w-[90vw] p-6">
            {/* Warning Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-text-primary text-center mb-2">
              Delete Job
            </h3>

            {/* Message */}
            <p className="text-sm text-gray-500 text-center mb-6">
              Are you sure you want to delete <span className="font-medium text-text-primary">"{jobToDeleteData?.title}"</span>? This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setJobToDelete(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  removeJob(jobToDelete);
                  setJobToDelete(null);
                }}
                className="flex-1 px-4 py-2.5 bg-red-600 rounded-lg text-sm font-medium text-white hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
