import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import InterviewUI from "./components/InterviewUI";
import InterviewPrepDashboard from "./components/InterviewPrepDashboard";
import JobDashboardPage from "@/pages/job_details/job_details";
import JobFormPage from "@/pages/job_details/Job_Form";
import JobCandidates from "@/pages/JobCandidates";
import CandidateDetails from "@/pages/CandidateDetails";
import PostInterviewReportPage from "@/pages/PostInterviewReportPage";
import CompaniesList from "./components/CompaniesList";
import CompanyDetails from "./components/CompanyDetails";
import CreateAccount from "@/pages/CreateAccount";
import ScheduleInterviewDemo from "@/pages/ScheduleInterviewDemo";
import ScheduledInterviews from "@/pages/ScheduledInterviews";
import InterviewPrepPending from "@/pages/InterviewPrepPending";
import { JobProvider } from "./context/JobContext";
import { CompanyProvider } from "./context/CompanyContext";

export default function App(): React.ReactElement {
  return (
    <JobProvider>
      <CompanyProvider>
        <MainNavigation>
          <Routes>
            <Route path="/" element={<Navigate to="/interview" replace />} />
            <Route path="/interview" element={<InterviewUI />} />
            <Route
              path="/interview-prep-dashboard"
              element={<InterviewPrepDashboard />}
            />
            <Route path="/job-dashboard" element={<JobDashboardPage />} />

            {/* NEW job creation route */}
            <Route path="/job-form" element={<JobFormPage />} />

            {/* Job Candidates route - dynamic based on job ID */}
            <Route path="/job/:id/candidates" element={<JobCandidates />} />

            {/* Candidate Details route */}
            <Route path="/job/:jobId/candidate/:candidateId" element={<CandidateDetails />} />

            {/* Post Interview Report - for completed interviews */}
            <Route path="/job/:jobId/candidate/:candidateId/report" element={<PostInterviewReportPage />} />

            {/* Interview Prep - for pending interviews */}
            <Route path="/job/:jobId/candidate/:candidateId/interview-prep" element={<InterviewPrepPending />} />

            {/* Scheduled Interviews - calendar view */}
            <Route path="/scheduled-interviews" element={<ScheduledInterviews />} />

            {/* Companies routes */}
            <Route path="/companies" element={<CompaniesList />} />
            <Route path="/company/:id" element={<CompanyDetails />} />
            <Route
              path="/companies/create-account"
              element={<CreateAccount />}
            />

            {/* Schedule Interview Demo */}
            <Route
              path="/schedule-interview"
              element={<ScheduleInterviewDemo />}
            />

            <Route
              path="*"
              element={
                <div style={{ padding: 24 }}>
                  Page not found — check your routes.
                </div>
              }
            />
          </Routes>
        </MainNavigation>
      </CompanyProvider>
    </JobProvider>
  );
}
