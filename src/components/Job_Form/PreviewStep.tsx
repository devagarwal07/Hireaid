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

interface PreviewStepProps {
  formData: FormData;
  onPrevious: () => void;
}

export default function PreviewStep({
  formData,
  onPrevious,
}: PreviewStepProps) {
  return (
    <div className="flex gap-6">
      {/* Left side - Preview */}
      <div className="flex-1">
        {/* Preview header with tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-6">
              <span className="text-gray-900 font-medium">Preview</span>
              <div className="flex gap-4">
                <button className="px-4 py-1.5 text-sm text-gray-700 hover:text-gray-900">
                  Default
                </button>
                <button className="px-4 py-1.5 text-sm text-gray-700 hover:text-gray-900">
                  LinkedIn
                </button>
                <button className="px-4 py-1.5 text-sm text-blue-600 border-b-2 border-blue-600 font-medium">
                  Indeed
                </button>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Edit
            </button>
          </div>

          {/* Job preview card */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {formData.jobTitle}
            </h2>
            <a
              href="#"
              className="text-blue-600 hover:underline text-sm mb-3 inline-block"
            >
              Neuraleap Hire ↗
            </a>
            <div className="mb-4">
              <p className="text-gray-700">{formData.locationType}</p>
              <p className="text-gray-700">{formData.salary} a month</p>
            </div>
            <div className="flex gap-3 mb-6">
              <button className="px-6 py-2.5 text-white bg-blue-600 rounded-md font-medium hover:bg-blue-700">
                Apply now
              </button>
              <button className="p-2.5 border border-gray-300 rounded-md hover:bg-gray-50">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
              <button className="p-2.5 border border-gray-300 rounded-md hover:bg-gray-50">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>

            {/* Job details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Job details
              </h3>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 text-gray-600 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Pay</h4>
                    <p className="text-gray-700">{formData.salary} a month</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 text-gray-600 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Job type</h4>
                    <p className="text-gray-700">{formData.employmentType}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - AI Insights */}
      <div className="w-[400px]">
        <div className="bg-teal-50 rounded-lg border border-teal-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Apply
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Job Title</h4>
              <p className="text-sm text-gray-700">
                • HR Quality & Training specialist is not a very commonly used
                term we recommend changing the title to something along the
                lines of "
                <span className="font-semibold">Senior HR Recruiter</span>"
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Area of work</h4>
              <p className="text-sm text-gray-700">
                • Recruitment is a narrowing down the scope of the request, its
                better to use "
                <span className="font-semibold">Talent acquisition</span>"
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onPrevious}
            className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-md font-medium hover:bg-gray-50"
          >
            Save as Draft
          </button>
          <button className="px-6 py-2.5 text-white bg-blue-600 rounded-md font-medium hover:bg-blue-700">
            Post Job
          </button>
        </div>
      </div>
    </div>
  );
}
