import { useState, useEffect } from "react";

interface FormData {
  jobTitle: string;
  jobId: string;
  department: string;
  areaOfWork: string;
  hiringManager: string;
  hiringLocation: string;
  workType: string;
  travelRequirement: string;
  employerClient: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  jobExpirationDate: string;
  jobSummary: string;
  keyResponsibilities: string;
  requiredQualifications: string;
  preferredQualifications: string;
  yearsOfExperience: string;
  bestFitScore: string;
  skills: string;
  salaryRange: string;
  workAuthorization: string;
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  formData?: Partial<FormData>;
};

type TabType = "default" | "linkedin" | "indeed";

export default function JobDescriptionPreviewModal({ isOpen, onClose, formData }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("default");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger animation after a brief delay to ensure the element is in the DOM
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  // Map form data to preview format - using useMemo to ensure reactivity
  const previewData = {
    title: formData?.jobTitle || "",
    jobCode: formData?.jobId || "",
    effectiveDate: formData?.jobExpirationDate || formData?.startDate || "",
    flsaStatus: "E", // Default value, can be added to form later
    eeo6Code: "3 = Professional/Non-faculty", // Default value, can be added to form later
    purpose: formData?.jobSummary || "",
    dutiesAndResponsibilities: formData?.keyResponsibilities || "",
    reportingRelationships: {
      reportsTo: formData?.hiringManager ? `General review of work performance and results by ${formData.hiringManager}` : "",
      supervision: "N/A",
      supervisionOther: formData?.hiringLocation ? `Location: ${formData.hiringLocation}` : "",
    },
    requiredEducation: formData?.department || formData?.areaOfWork || "",
    requiredEducationOther: formData?.requiredQualifications || "",
    requiredExperience: formData?.yearsOfExperience ? `${formData.yearsOfExperience} years of experience${formData?.skills ? `. Skills: ${formData.skills}` : ""}` : formData?.skills || "",
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-[999] transition-opacity duration-300" onClick={onClose}>
      <div
        className={`bg-white shadow-xl w-[800px] h-full flex flex-col ml-auto transform transition-transform duration-300 ease-in-out rounded-l-2xl ${isAnimating ? 'translate-x-0' : 'translate-x-full'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#181D27] px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h2 className="font-semibold text-lg text-white">
              Job Description Preview
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("default")}
                className={`pb-1 px-1 font-medium text-sm transition-colors ${activeTab === "default"
                    ? "text-white border-b-2 border-white"
                    : "text-gray-300 hover:text-white"
                  }`}
              >
                Default
              </button>
              <button
                onClick={() => setActiveTab("linkedin")}
                className={`pb-1 px-1 font-medium text-sm transition-colors ${activeTab === "linkedin"
                    ? "text-white border-b-2 border-white"
                    : "text-gray-300 hover:text-white"
                  }`}
              >
                LinkedIn
              </button>
              <button
                onClick={() => setActiveTab("indeed")}
                className={`pb-1 px-1 font-medium text-sm transition-colors ${activeTab === "indeed"
                    ? "text-white border-b-2 border-white"
                    : "text-gray-300 hover:text-white"
                  }`}
              >
                Indeed
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="bg-white border border-border-light rounded-lg p-6">
            <h1 className="font-bold text-2xl text-text-primary mb-2">
              {previewData.title || "Job Title"}
            </h1>
            <h2 className="font-bold text-lg text-text-primary mb-6">
              Job Description
            </h2>

            {/* Job Details */}
            <div className="space-y-3 mb-6">
              <div>
                <span className="font-bold text-sm text-text-primary">TITLE:</span>{" "}
                <span className="text-sm text-text-primary">{previewData.title || ""}</span>
              </div>
              <div>
                <span className="font-bold text-sm text-text-primary">JOB CODE:</span>{" "}
                <span className="text-sm text-text-primary">{previewData.jobCode || ""}</span>
              </div>
              <div>
                <span className="font-bold text-sm text-text-primary">EFFECTIVE DATE:</span>{" "}
                <span className="text-sm text-text-primary">{previewData.effectiveDate || ""}</span>
              </div>
              <div>
                <span className="font-bold text-sm text-text-primary">FLSA STATUS:</span>{" "}
                <span className="text-sm text-text-primary">{previewData.flsaStatus}</span>
              </div>
              <div>
                <span className="font-bold text-sm text-text-primary">EEO6 CODE:</span>{" "}
                <span className="text-sm text-text-primary">{previewData.eeo6Code}</span>
              </div>
            </div>

            {/* PURPOSE */}
            {previewData.purpose && (
              <div className="mb-6">
                <h3 className="font-bold text-base text-text-primary mb-2">
                  PURPOSE:
                </h3>
                <p className="text-sm text-text-primary leading-relaxed">
                  {previewData.purpose}
                </p>
              </div>
            )}

            {/* DUTIES AND RESPONSIBILITIES */}
            {previewData.dutiesAndResponsibilities && (
              <div className="mb-6">
                <h3 className="font-bold text-base text-text-primary mb-2">
                  DUTIES AND RESPONSIBILITIES:
                </h3>
                <div className="text-sm text-text-primary leading-relaxed whitespace-pre-line">
                  {previewData.dutiesAndResponsibilities}
                </div>
              </div>
            )}

            {/* REPORTING RELATIONSHIPS */}
            {(previewData.reportingRelationships.reportsTo || previewData.reportingRelationships.supervisionOther) && (
              <div className="mb-6">
                <h3 className="font-bold text-base text-text-primary mb-2">
                  REPORTING RELATIONSHIPS:
                </h3>
                <div className="space-y-2">
                  {previewData.reportingRelationships.reportsTo && (
                    <div>
                      <span className="font-bold text-sm text-text-primary">REPORTS TO:</span>{" "}
                      <span className="text-sm text-text-primary">
                        {previewData.reportingRelationships.reportsTo}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="font-bold text-sm text-text-primary">SUPERVISION:</span>{" "}
                    <span className="text-sm text-text-primary">
                      {previewData.reportingRelationships.supervision}
                    </span>
                  </div>
                  {previewData.reportingRelationships.supervisionOther && (
                    <div>
                      <span className="font-bold text-sm text-text-primary">SUPERVISION-OTHER:</span>{" "}
                      <span className="text-sm text-text-primary">
                        {previewData.reportingRelationships.supervisionOther}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* REQUIRED EDUCATION */}
            {previewData.requiredEducation && (
              <div className="mb-6">
                <h3 className="font-bold text-base text-text-primary mb-2">
                  REQUIRED EDUCATION:
                </h3>
                <p className="text-sm text-text-primary leading-relaxed">
                  {previewData.requiredEducation}
                </p>
              </div>
            )}

            {/* REQUIRED EDUCATION-OTHER */}
            {previewData.requiredEducationOther && (
              <div className="mb-6">
                <h3 className="font-bold text-base text-text-primary mb-2">
                  REQUIRED EDUCATION-OTHER:
                </h3>
                <p className="text-sm text-text-primary leading-relaxed">
                  {previewData.requiredEducationOther}
                </p>
              </div>
            )}

            {/* REQUIRED EXPERIENCE/COMPETENCIES-OTHER */}
            {previewData.requiredExperience && (
              <div className="mb-6">
                <h3 className="font-bold text-base text-text-primary mb-2">
                  REQUIRED EXPERIENCE/COMPETENCIES-OTHER:
                </h3>
                <p className="text-sm text-text-primary leading-relaxed">
                  {previewData.requiredExperience}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-border-light">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg font-medium text-sm text-white bg-primary hover:bg-primary-dark transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

