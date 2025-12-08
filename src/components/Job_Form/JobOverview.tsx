import { useState } from "react";
import AISuggestionCard from "./AiSuggestionCard";
import Button from "@/components/Button";

export default function JobOverview() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobId, setJobId] = useState("");
  const [industry, setIndustry] = useState("");
  const [areaOfWork, setAreaOfWork] = useState("");

  const allFilled = Boolean(
    jobTitle.trim() && jobId.trim() && industry.trim() && areaOfWork.trim()
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Complete Job Description</h3>
        <Button
          type="button"
          variant="tertiary"
          className="text-sm px-0 py-0 h-auto"
        >
          Show Preview
        </Button>
      </div>

      <div className="border rounded-lg p-6 bg-white">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-2">Job Title</label>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full border rounded-md p-3 text-sm"
              placeholder="Enter Job Title"
            />
            <p className="text-xs text-gray-400 mt-1">Required</p>
          </div>

          <div>
            <label className="block text-sm mb-2">Job ID/Requisition ID</label>
            <input
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              className="w-full border rounded-md p-3 text-sm"
              placeholder="Enter Job ID"
            />
            <p className="text-xs text-gray-400 mt-1">Required</p>
          </div>

          <div>
            <label className="block text-sm mb-2">Industry/Department</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full border rounded-md p-3 text-sm"
            >
              <option value="">Select Industry</option>
              <option value="hr">Human Resources</option>
              <option value="engineering">Engineering</option>
              <option value="sales">Sales</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">Required</p>
          </div>

          <div>
            <label className="block text-sm mb-2">Area of Work</label>
            <select
              value={areaOfWork}
              onChange={(e) => setAreaOfWork(e.target.value)}
              className="w-full border rounded-md p-3 text-sm"
            >
              <option value="">Select Area of Work</option>
              <option value="recruitment">Recruitment</option>
              <option value="operations">Operations</option>
              <option value="product">Product</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">Required</p>
          </div>
        </div>

        {/* After the main fields — show AI suggestion UI when all 4 are filled */}
        {allFilled && (
          <div className="mt-6 space-y-4">
            {/* Banner image — replace src with your public image path */}
            <div className="rounded-md border border-blue-200 bg-blue-50 p-3 flex items-center gap-3">
              <img
                src="/images/generating-smart-suggestions.png"
                alt="generating"
                className="h-8 w-auto"
              />
              <span className="text-sm text-blue-700">Generating smart suggestions...</span>
            </div>

            {/* AI Assistant card */}
            <AISuggestionCard
              jobTitle={jobTitle}
              areaOfWork={areaOfWork}
              suggestedTitle="Senior HR Recruiter"
              suggestedArea="Talent acquisition"
            />
          </div>
        )}

        <hr className="my-6" />

        <h4 className="text-lg font-medium mb-4">Manager and location</h4>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-2">Hiring Manager</label>
            <input className="w-full border rounded-md p-3 text-sm" placeholder="Enter Hiring Manager" />
          </div>

          <div>
            <label className="block text-sm mb-2">Hiring Location</label>
            <input className="w-full border rounded-md p-3 text-sm" placeholder="Enter Hiring Location" />
          </div>
        </div>
      </div>
    </div>
  );
}
