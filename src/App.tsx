import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import InterviewUI from "./components/InterviewUI";
import InterviewPrepDashboard from "./components/InterviewPrepDashboard";
import JobDashboardPage from "@/pages/job_details/job_details";
import JobFormPage from "@/pages/job_details/Job_Form";
import { JobProvider } from "./context/JobContext";

export default function App(): React.ReactElement {
  return (
    <JobProvider>
      <MainNavigation>
        <Routes>
          <Route path="/" element={<Navigate to="/interview" replace />} />
          <Route path="/interview" element={<InterviewUI />} />
          <Route path="/interview-prep-dashboard" element={<InterviewPrepDashboard />} />
          <Route path="/job-dashboard" element={<JobDashboardPage />} />

          {/* NEW job creation route */}
          <Route path="/job-form" element={<JobFormPage />} />

          <Route
            path="*"
            element={<div style={{ padding: 24 }}>Page not found — check your routes.</div>}
          />
        </Routes>
      </MainNavigation>
    </JobProvider>
  );
}
