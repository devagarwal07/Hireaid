import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import InterviewUI from "./components/InterviewUI";
import InterviewPrepDashboard from "./components/InterviewPrepDashboard";
import JobDashboardPage from "@/pages/job_details/job_details";
import JobFormPage from "@/pages/job_details/Job_Form";
import CompaniesList from "./components/CompaniesList";
import CompanyDetails from "./components/CompanyDetails";
import CreateAccount from "@/pages/CreateAccount";
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

            {/* Companies routes */}
            <Route path="/companies" element={<CompaniesList />} />
            <Route path="/company/:id" element={<CompanyDetails />} />
            <Route
              path="/companies/create-account"
              element={<CreateAccount />}
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
