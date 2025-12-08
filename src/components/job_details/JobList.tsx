import { useState } from "react";
import CreateJobModal from "./CreateJobModal";

export default function JobList() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-xl p-6 border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Job List</h2>
      <div className="w-full border-b mb-6"></div>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full border border-dashed border-gray-300 p-6 mb-4">
          <img
            src="/icons/job-empty.svg"
            className="h-14 w-14 opacity-60"
            alt=""
          />
        </div>

        <p className="text-gray-500 mb-4">
          No job posts created. Click on create to get started.
        </p>

        <button
          onClick={() => setOpen(true)}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700"
        >
          + Create Job
        </button>
      </div>

      {open && <CreateJobModal onClose={() => setOpen(false)} />}
    </div>
  );
}
