import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobDescriptionStepNew from "./JobDescriptionStepNew";
import HiringPipelineStep from "./HiringPipelineStep";
import PreviewAndPostStep from "./PreviewAndPostStep";
import { useJobs } from "@/context/JobContext";

type FormStep = "job-description" | "hiring-pipeline" | "preview";

interface FormData {
  // Overview
  jobTitle: string;
  jobId: string;
  department: string;
  areaOfWork: string;
  // Manager & Location
  hiringManager: string;
  hiringLocation: string;
  // Workplace
  workType: string;
  travelRequirement: string;
  // Employment Details
  employerClient: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  jobExpirationDate: string;
  // Job Description
  jobSummary: string;
  keyResponsibilities: string;
  requiredQualifications: string;
  preferredQualifications: string;
  // Experience & Skills
  yearsOfExperience: string;
  bestFitScore: string;
  skills: string;
  // Compensation & Legal
  salaryRange: string;
  workAuthorization: string;
  // Legacy fields
  jobType: string;
  location: string;
  salary: string;
  description: string;
  locationType: string;
  address: string;
  workplaceType: string;
  remoteWorkPolicy: string;
  experienceLevel: string;
  educationLevel: string;
  requiredSkills: string[];
  preferredSkills: string[];
  responsibilities: string;
}

const formSteps = [
  { id: "job-description", label: "Job Description", step: 1 },
  { id: "hiring-pipeline", label: "Hiring Pipeline", step: 2 },
  { id: "preview", label: "Preview & Post", step: 3 },
];

export default function JobFormLayoutNew() {
  const navigate = useNavigate();
  const { addJob } = useJobs();
  const [currentStep, setCurrentStep] = useState<FormStep>("job-description");

  const [formData, setFormData] = useState<FormData>({
    // New Overview fields
    jobTitle: "HR Talent Acquisition Specialist",
    jobId: "2462",
    department: "Human Resources",
    areaOfWork: "Recruitment",
    // Manager & Location
    hiringManager: "John Doe",
    hiringLocation: "San Francisco, CA",
    // Workplace
    workType: "On-site",
    travelRequirement: "",
    // Employment Details
    employerClient: "",
    employmentType: "Full Time",
    startDate: "",
    endDate: "",
    jobExpirationDate: "",
    // Job Description
    jobSummary: "",
    keyResponsibilities: "",
    requiredQualifications: "",
    preferredQualifications: "",
    // Experience & Skills
    yearsOfExperience: "3-5 years",
    bestFitScore: "",
    skills: "",
    // Compensation & Legal
    salaryRange: "$80,000 - $100,000",
    workAuthorization: "",
    // Legacy fields
    jobType: "Full-time",
    location: "San Francisco, CA",
    salary: "$80,000 - $100,000",
    description:
      "We are looking for an experienced HR Talent Acquisition Specialist to join our team...",
    locationType: "On-site",
    address: "123 Main St, San Francisco, CA",
    workplaceType: "Office",
    remoteWorkPolicy: "Flexible",
    experienceLevel: "Mid-Senior",
    educationLevel: "Bachelor's Degree",
    requiredSkills: ["Recruitment", "Interviewing", "Sourcing"],
    preferredSkills: ["HRIS", "ATS"],
    responsibilities: "",
  });

  const handleNext = () => {
    const currentIndex = formSteps.findIndex((step) => step.id === currentStep);
    if (currentIndex < formSteps.length - 1) {
      setCurrentStep(formSteps[currentIndex + 1].id as FormStep);
    }
  };

  const handlePrevious = () => {
    const currentIndex = formSteps.findIndex((step) => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(formSteps[currentIndex - 1].id as FormStep);
    }
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", formData);
    // TODO: Implement save draft functionality
  };

  const currentStepIndex = formSteps.findIndex((step) => step.id === currentStep);

  return (
    <div className="bg-[#F9FAFB]">
      {/* Main Content */}
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-[0px_2px_11px_rgba(0,0,0,0.08)] overflow-hidden">
          {/* Step Progress Indicator - Inside the card */}
          <div className="px-8 py-5">
            <div className="flex items-center justify-between">
              {formSteps.map((step, index) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStepIndex > index;

                return (
                  <div key={step.id} className="flex items-center flex-1">
                    {/* Step Item */}
                    <div className="flex items-center gap-2">
                      {/* Circle with number */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${isActive || isCompleted
                          ? "bg-[#0857A1] text-white"
                          : "bg-[#D0E8FF] text-[#0857A1]"
                          }`}
                      >
                        {step.step}
                      </div>
                      {/* Label */}
                      <span
                        className={`text-sm font-medium whitespace-nowrap ${isActive ? "text-[#0857A1]" : "text-[#344054]"
                          }`}
                      >
                        {step.label}
                      </span>
                    </div>

                    {/* Connector Line */}
                    {index < formSteps.length - 1 && (
                      <div
                        className={`flex-1 h-[2px] mx-6 rounded-full ${currentStepIndex > index ? "bg-[#0857A1]" : "bg-[#E4E7EC]"
                          }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="px-8 pt-4 pb-8">
            {currentStep === "job-description" && (
              <JobDescriptionStepNew
                formData={formData}
                setFormData={(data) => setFormData(data as FormData)}
                onNext={handleNext}
                onSaveDraft={handleSaveDraft}
              />
            )}

            {currentStep === "hiring-pipeline" && (
              <HiringPipelineStep onNext={handleNext} onPrevious={handlePrevious} />
            )}

            {currentStep === "preview" && (
              <PreviewAndPostStep
                onPrevious={handlePrevious}
                onPost={() => {
                  // Save the job to context
                  addJob({
                    title: formData.jobTitle,
                    department: formData.department,
                    status: "open",
                    icon: "people",
                  });
                  // Navigate to job dashboard
                  navigate("/job-dashboard");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}