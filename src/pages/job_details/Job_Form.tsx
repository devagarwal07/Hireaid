import { useState } from "react";
import CreateJobModal from "@/components/Job_Form/CreateJobForm";
import JobFormLayoutNew from "@/components/Job_Form/JobFormLayoutNew";
import PageHeader from "@/components/ui/PageHeader";

export default function JobFormPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-page-bg">
      <div className="w-full px-6">
        {/* Dynamic Page Header with breadcrumbs */}
        <div className="pb-4">
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
          <JobFormLayoutNew />
        </main>
      </div>

      {showModal && <CreateJobModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
