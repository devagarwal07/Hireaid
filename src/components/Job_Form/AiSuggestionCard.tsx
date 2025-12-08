type Props = {
  jobTitle: string;
  areaOfWork: string;
  suggestedTitle?: string;
  suggestedArea?: string;
};

export default function AISuggestionCard({
  jobTitle,
  areaOfWork,
  suggestedTitle = "Senior HR Recruiter",
  suggestedArea = "Talent acquisition",
}: Props) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-gray-500 mb-1">AI Assistant</div>

          <div className="text-xs text-gray-400">Apply</div>

          <h3 className="mt-3 text-base font-semibold flex items-center gap-2">
            Job Title
          </h3>

          <p className="mt-2 text-sm text-gray-700">
            <strong>{jobTitle}</strong>
          </p>

          <div className="mt-3 text-sm text-gray-700">
            HR Quality &amp; Training specialist is not a very commonly used term — we recommend changing the title to something along the lines of{" "}
            <span className="font-semibold\">“{suggestedTitle}”</span>.
          </div>

          <h4 className="mt-4 text-sm font-medium">Area of work</h4>
          <p className="mt-1 text-sm text-gray-700">
            {areaOfWork} — Recruitment is narrowing down the scope of the request; it's better to use{" "}
            <span className="font-semibold">{suggestedArea}</span>.
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <button
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm"
            // in real app this should update the input or open an edit modal
            onClick={() => {
              // small UX hook — you can replace with prop callbacks
              alert(`Applied suggestion: "${suggestedTitle}" and area "${suggestedArea}"`);
            }}
          >
            Apply
          </button>

          <button
            className="px-3 py-1 rounded-md border text-sm"
            onClick={() => {
              // for now a simple inspect action — replace with actual handlers
              alert("Open assistant details (replace with real action)");
            }}
          >
            Assistant
          </button>
        </div>
      </div>
    </div>
  );
}
