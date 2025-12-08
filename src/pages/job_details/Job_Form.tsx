import { useState } from "react";
import CreateJobModal from "@/components/Job_Form/CreateJobForm";
import JobFormLayout from "@/components/Job_Form/JobFormLayout";

export default function JobFormPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold">Jobs List / Create new Job</h1>
          <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-semibold">HR Talent Acquisition Specialist</h2>
              </div>
              <div className="w-1/3 h-14 bg-[url('/images/header-pattern.png')] bg-right bg-no-repeat" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
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

      {showModal && <CreateJobModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
