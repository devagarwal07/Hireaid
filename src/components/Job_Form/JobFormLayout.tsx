import { useState } from "react";
import JobDescriptionStep from "./JobDescriptionStep";
import HiringPipelineStep from "./HiringPipelineStep";
import PreviewStep from "./PreviewStep";

type FormStep = "job-description" | "hiring-pipeline" | "preview";
type SectionId =
  | "overview"
  | "manager-location"
  | "workplace"
  | "employment-details"
  | "job-description"
  | "experience-skills";

interface FormData {
  jobTitle: string;
  jobType: string;
  location: string;
  department: string;
  salary: string;
  description: string;
  hiringManager: string;
  locationType: string;
  address: string;
  workplaceType: string;
  remoteWorkPolicy: string;
  employmentType: string;
  experienceLevel: string;
  educationLevel: string;
  requiredSkills: string[];
  preferredSkills: string[];
  yearsOfExperience: string;
  responsibilities: string;
}

const formSteps = [
  { id: "job-description", label: "Step 1: Job Description" },
  { id: "hiring-pipeline", label: "Step 2: Hiring Pipeline" },
  { id: "preview", label: "Step 3: Preview and Post" },
];

export default function JobFormLayout() {
  const [currentStep, setCurrentStep] = useState<FormStep>("job-description");
  const [activeSection, setActiveSection] = useState<SectionId>("overview");

  const [formData, setFormData] = useState<FormData>({
    // Overview
    jobTitle: "HR Talent Acquisition Specialist",
    jobType: "Full-time",
    location: "San Francisco, CA",
    department: "Human Resources",
    salary: "$80,000 - $100,000",
    description:
      "We are looking for an experienced HR Talent Acquisition Specialist to join our team...",

    // Manager & Location
    hiringManager: "John Doe",
    locationType: "On-site",
    address: "123 Main St, San Francisco, CA",

    // Workplace
    workplaceType: "Office",
    remoteWorkPolicy: "Flexible",

    // Employment Details
    employmentType: "Permanent",
    experienceLevel: "Mid-Senior",
    educationLevel: "Bachelor's Degree",

    // Experience & Skills
    requiredSkills: ["Recruitment", "Interviewing", "Sourcing"],
    preferredSkills: ["HRIS", "ATS"],
    yearsOfExperience: "3-5 years",
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Tabs">
            {formSteps.map((step, index) => {
              const isActive = currentStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id as FormStep)}
                  className="flex-1 text-left relative group"
                >
                  {/* Top blue bar for active tab */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 ${
                      isActive ? "bg-blue-600" : "bg-transparent"
                    }`}
                  ></div>

                  {/* Content */}
                  <div className="pt-4 pb-3">
                    <div
                      className={`text-xs font-medium mb-1 ${
                        isActive ? "text-blue-600" : "text-gray-900"
                      }`}
                    >
                      Step {index + 1}
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        isActive ? "text-blue-600" : "text-gray-900"
                      }`}
                    >
                      {step.label
                        .replace("Step 1: ", "")
                        .replace("Step 2: ", "")
                        .replace("Step 3: ", "")}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          {currentStep === "job-description" && (
            <JobDescriptionStep
              formData={formData}
              setFormData={setFormData}
              onNext={handleNext}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          )}

          {currentStep === "hiring-pipeline" && (
            <HiringPipelineStep
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}

          {currentStep === "preview" && (
            <PreviewStep formData={formData} onPrevious={handlePrevious} />
          )}
        </div>
      </div>
    </div>
  );
}
