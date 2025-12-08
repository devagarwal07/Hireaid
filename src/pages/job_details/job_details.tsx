// JobDashboardPage.tsx
import React from "react";
import PageHeader from "@/components/ui/PageHeader";
import InterviewSchedule from "@/components/job_details/InterviewSchedule";
import JobList from "@/components/job_details/JobList";

const JobDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top_left,_#f5f8ff,_#ffffff)]">
      {/* Top padding so header doesn't hug the top */}
      <div className="pt-6 pb-10 px-6">
        {/* Grid: main | right (removed left sidebar since MainNavigation handles it) */}
        <div className="w-full grid grid-cols-[1fr_360px] gap-8">
          {/* Main area */}
          <main>
            {/* Dynamic Page Header with breadcrumbs */}
            <div className="mb-6">
              <PageHeader
                config={{
                  breadcrumbs: [{ label: "Dashboard" }],
                  title: "Jobs Dashboard",
                  buttons: [],
                }}
              />
            </div>

            {/* HERO + small stats on the right of hero */}
            <div className="flex gap-8 mb-8 items-start">
              {/* Left hero (flexible) */}
              <div className="flex-1 rounded-2xl bg-gradient-to-r from-[#e8fffb] to-white p-6 shadow-inner">
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <div className="text-xs uppercase text-sky-500 font-semibold mb-1">
                      AI Powered
                    </div>

                    <h2 className="text-2xl font-semibold mb-2 leading-tight">
                      Get AI based metric recommendations and insights
                    </h2>

                    <p className="text-sm text-slate-500 mb-4 max-w-[650px]">
                      Personalized metrics based on your hiring funnel and role.
                    </p>

                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-sky-200 bg-white shadow-sm text-sky-700 hover:bg-sky-50 transition"
                    >
                      Try it now
                    </button>
                  </div>

                  {/* Stats card — right side of hero */}
                  <div className="w-[280px] bg-white rounded-xl p-4 shadow-sm flex flex-col justify-center">
                    <div className="text-xs text-slate-400 mb-2">
                      HR Quality and Training Specialist
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-200 to-emerald-200 flex items-center justify-center text-xl font-semibold">
                        50
                      </div>

                      <div className="flex-1 text-sm">
                        <div className="mb-1">
                          <span className="px-2 py-0.5 rounded-full text-[11px] bg-rose-100 text-rose-600">
                            12 PRE SCREENING
                          </span>
                        </div>

                        <div className="my-1">
                          <span className="px-2 py-0.5 rounded-full text-[11px] bg-sky-100 text-sky-600">
                            13 SCHEDULED FOR INTERVIEW
                          </span>
                        </div>

                        <div className="mt-1">
                          <span className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-100 text-emerald-600">
                            25 COMPLETED INTERVIEW
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end stats card */}
                </div>
              </div>
            </div>

            {/* Job List card — centered content area with proper padding */}
            <section>

              {/* Use your JobList component directly — it handles empty state & create button */}
              <div className="mt-6">
                <JobList />
              </div>
            </section>
          </main>

          {/* Right schedule column — fixed width and sticky */}
          <aside className="hidden md:block">
            <div className="sticky top-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[520px]">
                <InterviewSchedule />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default JobDashboardPage;
