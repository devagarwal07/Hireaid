import { useState } from "react";
import CreateJobModal from "@/components/Job_Form/CreateJobForm";
import JobFormLayout from "@/components/Job_Form/JobFormLayout";
import PageHeader from "@/components/ui/PageHeader";

export default function JobFormPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Dynamic Page Header with breadcrumbs */}
        <div className="mb-6">
          <PageHeader
            config={{
              breadcrumbs: [
                { label: "Jobs List", path: "/job-dashboard" },
                { label: "Create new Job" },
              ],
              title: "HR Talent Acquisition Specialist",
              buttons: [],
            }}
          />
        </div>

        <main>
          <div className="mb-4 flex justify-between items-center">
            <div className="flex-1">{/* space for stepper if needed */}</div>
            <div>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 rounded-md bg-blue-600 text-white"
              >
                New Job
              </button>
            </div>
          </div>

          <JobFormLayout />
        </main>
      </div>

      {showModal && <CreateJobModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
