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
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Preview and Post
      </h2>
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="font-medium text-lg mb-4">Job Preview</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-gray-900">
              {formData.jobTitle}
            </h4>
            <p className="text-gray-600">
              {formData.jobType} • {formData.location}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Department</h4>
              <p className="text-gray-600">{formData.department}</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                Experience Level
              </h4>
              <p className="text-gray-600">{formData.experienceLevel}</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                Employment Type
              </h4>
              <p className="text-gray-600">{formData.employmentType}</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-1">Workplace Type</h4>
              <p className="text-gray-600">{formData.workplaceType}</p>
            </div>

            {formData.salary && (
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Salary Range</h4>
                <p className="text-gray-600">{formData.salary}</p>
              </div>
            )}
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Job Description</h4>
            <div className="prose max-w-none">
              <p className="text-gray-600 whitespace-pre-line">
                {formData.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {formData.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {formData.preferredSkills.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Preferred Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {formData.preferredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onPrevious}
            className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Back
          </button>

          <div className="space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Save as Draft
            </button>

            <button
              type="button"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Post Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
