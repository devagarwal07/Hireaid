// JobDashboardPage.tsx
import React from "react";
import InterviewSchedule from "@/components/job_details/InterviewSchedule";
import JobList from "@/components/job_details/JobList";

const JobDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-page-bg">
      {/* Main content area with padding */}
      <div className="pt-6 pb-10 px-6">
        {/* Grid layout: Job List (flexible) | Interview Schedule (fixed 463px) */}
        <div className="w-full flex gap-6">
          {/* Main content area */}
          <main className="flex-1 min-w-0">
            {/* AI Powered Hero Banner */}
            <div className="flex gap-6 mb-6">
              <div className="flex-1 rounded-2xl bg-gradient-to-r from-[#e8fffb] to-white p-6 border border-border-light">
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <div className="text-xs uppercase text-primary font-semibold mb-1 tracking-wide">
                      AI POWERED
                    </div>

                    <h2 className="font-semibold text-2xl text-text-primary mb-2 leading-tight">
                      Get AI based metric recommendations and insights
                    </h2>

                    <p className="text-sm text-text-secondary mb-4 max-w-[650px]">
                      Personalized metrics based on your hiring funnel and role.
                    </p>

                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary bg-white text-primary font-medium text-sm hover:bg-hover-bg transition-colors duration-200"
                    >
                      Try it now
                    </button>
                  </div>

                  {/* Stats card on right side of hero */}
                  <div className="w-[280px] bg-white rounded-xl p-4 shadow-sm border border-border-light">
                    {/* Title */}
                    <p className="font-normal text-xs text-text-muted mb-3">
                      HR Quality and Training Specialist
                    </p>
                    <p className="font-normal text-xs text-text-muted mb-3">
                      Entertainment
                    </p>

                    <div className="flex items-center gap-4">
                      {/* Gradient Circle */}
                      <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-br from-[#0D9488] via-[#0891B2] to-[#1E40AF] flex items-center justify-center shadow-lg">
                        <span className="font-bold text-2xl text-white">50</span>
                      </div>

                      {/* Stats Badges */}
                      <div className="flex-1 flex flex-col gap-2">
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-medium bg-error-bg text-error">
                          12 PRE SCREENING
                        </span>

                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-medium bg-info-light text-info">
                          13 SCHEDULED FOR INTERVIEW
                        </span>

                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-medium bg-success-bg text-success-text">
                          25 COMPLETED INTERVIEW
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job List Section */}
            <section className="bg-white rounded-2xl border border-border-light">
              <JobList />
            </section>
          </main>

          {/* Right sidebar - Interview Schedule */}
          <aside className="hidden lg:block shrink-0">
            <div className="sticky top-6">
              <InterviewSchedule />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default JobDashboardPage;
