import { useRef, useEffect } from "react";

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

interface JobDescriptionStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
}

export default function JobDescriptionStep({
  formData,
  setFormData,
  onNext,
  activeSection,
  setActiveSection,
}: JobDescriptionStepProps) {
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Set up intersection observer to track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    // Observe all sections
    const currentRefs = sectionRefs.current;
    Object.values(currentRefs).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(currentRefs).forEach((section) => {
        if (section) observer.unobserve(section);
      });
      observer.disconnect();
    };
  }, [setActiveSection]);

  // Scroll to section when breadcrumb is clicked
  const scrollToSection = (sectionId: SectionId) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const breadcrumbs = [
    { id: "overview", label: "Overview" },
    { id: "manager-location", label: "Manager & Location" },
    { id: "workplace", label: "Workplace" },
    { id: "employment-details", label: "Employment Details" },
    { id: "job-description", label: "Job Description" },
    { id: "experience-skills", label: "Experience & Skills" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>

      {/* Sticky Breadcrumbs */}
      <div className="sticky top-0 z-10 bg-white pt-2 pb-4 mb-6 border-b border-gray-200">
        <nav
          className="flex overflow-x-auto scrollbar-hide"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center space-x-4">
            {breadcrumbs.map((breadcrumb, index) => {
              const isActive = activeSection === breadcrumb.id;
              const isCompleted =
                breadcrumbs.findIndex((b) => b.id === activeSection) > index;

              return (
                <li key={breadcrumb.id} className="flex items-center">
                  <button
                    onClick={() => scrollToSection(breadcrumb.id as SectionId)}
                    className={`px-4 py-2 text-sm ${
                      isActive
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    } ${isCompleted ? "text-green-600" : ""} border-l-4`}
                  >
                    {breadcrumb.label}
                  </button>
                  {index < breadcrumbs.length - 1 && (
                    <svg
                      className="h-5 w-5 text-gray-300 mx-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {/* Form Content */}
      <div className="space-y-8">
        <div className="space-y-12">
          {/* Overview Section */}
          <div
            id="overview"
            ref={(el) => {
              if (el) sectionRefs.current["overview"] = el;
            }}
            className="space-y-6 pt-2"
          >
            <h3 className="text-lg font-medium text-gray-900">Job Overview</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
              <div>
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="jobType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Job Type
                </label>
                <select
                  id="jobType"
                  value={formData.jobType}
                  onChange={(e) =>
                    setFormData({ ...formData, jobType: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="salary"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Salary Range
                </label>
                <input
                  type="text"
                  id="salary"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Manager & Location Section */}
          <div
            id="manager-location"
            ref={(el) => {
              if (el) sectionRefs.current["manager-location"] = el;
            }}
            className="space-y-6 pt-12 border-t border-gray-200"
          >
            <h3 className="text-lg font-medium text-gray-900">
              Hiring Manager & Location Details
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
              <div>
                <label
                  htmlFor="hiringManager"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Hiring Manager
                </label>
                <input
                  type="text"
                  id="hiringManager"
                  value={formData.hiringManager}
                  onChange={(e) =>
                    setFormData({ ...formData, hiringManager: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="locationType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location Type
                </label>
                <select
                  id="locationType"
                  value={formData.locationType}
                  onChange={(e) =>
                    setFormData({ ...formData, locationType: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>On-site</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div className="lg:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Workplace Section */}
          <div
            id="workplace"
            ref={(el) => {
              if (el) sectionRefs.current["workplace"] = el;
            }}
            className="space-y-6 pt-12 border-t border-gray-200"
          >
            <h3 className="text-lg font-medium text-gray-900">Workplace</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
              <div>
                <label
                  htmlFor="workplaceType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Workplace Type
                </label>
                <select
                  id="workplaceType"
                  value={formData.workplaceType}
                  onChange={(e) =>
                    setFormData({ ...formData, workplaceType: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Office</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="remoteWorkPolicy"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Remote Work Policy
                </label>
                <select
                  id="remoteWorkPolicy"
                  value={formData.remoteWorkPolicy}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      remoteWorkPolicy: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Flexible</option>
                  <option>Strict</option>
                  <option>Not Applicable</option>
                </select>
              </div>
            </div>
          </div>

          {/* Employment Details Section */}
          <div
            id="employment-details"
            ref={(el) => {
              if (el) sectionRefs.current["employment-details"] = el;
            }}
            className="space-y-6 pt-12 border-t border-gray-200"
          >
            <h3 className="text-lg font-medium text-gray-900">
              Employment Details
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
              <div>
                <label
                  htmlFor="employmentType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Employment Type
                </label>
                <select
                  id="employmentType"
                  value={formData.employmentType}
                  onChange={(e) =>
                    setFormData({ ...formData, employmentType: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Permanent</option>
                  <option>Contract</option>
                  <option>Temporary</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="experienceLevel"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Experience Level
                </label>
                <select
                  id="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      experienceLevel: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Entry Level</option>
                  <option>Mid-Senior</option>
                  <option>Senior</option>
                  <option>Executive</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="educationLevel"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Education Level
                </label>
                <select
                  id="educationLevel"
                  value={formData.educationLevel}
                  onChange={(e) =>
                    setFormData({ ...formData, educationLevel: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>High School</option>
                  <option>Bachelor's Degree</option>
                  <option>Master's Degree</option>
                  <option>PhD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job Description Section */}
          <div
            id="job-description"
            ref={(el) => {
              if (el) sectionRefs.current["job-description"] = el;
            }}
            className="space-y-6 pt-12 border-t border-gray-200"
          >
            <h3 className="text-lg font-medium text-gray-900">
              Job Description
            </h3>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={6}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="responsibilities"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Responsibilities
              </label>
              <textarea
                id="responsibilities"
                rows={6}
                value={formData.responsibilities}
                onChange={(e) =>
                  setFormData({ ...formData, responsibilities: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Experience & Skills Section */}
          <div
            id="experience-skills"
            ref={(el) => {
              if (el) sectionRefs.current["experience-skills"] = el;
            }}
            className="space-y-6 pt-12 border-t border-gray-200"
          >
            <h3 className="text-lg font-medium text-gray-900">
              Experience & Skills
            </h3>
            <div>
              <label
                htmlFor="yearsOfExperience"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Years of Experience
              </label>
              <input
                type="text"
                id="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    yearsOfExperience: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t border-gray-200">
          <div className="space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Save as Draft
            </button>
          </div>

          <button
            type="button"
            onClick={onNext}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Continue to Hiring Pipeline
          </button>
        </div>
      </div>
    </div>
  );
}
