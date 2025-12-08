const items = [
  "Overview",
  "Manager & Location",
  "Workplace",
  "Employment details",
  "Job Description",
  "Experience & Skills",
  "Compensation & Legal",
];

export default function JobSidebar() {
  return (
    <div className="border rounded-lg p-4">
      <nav className="flex flex-col gap-4">
        {items.map((it) => (
          <button key={it} className="text-left flex items-center gap-3">
            <span className="h-4 w-4 rounded-full border" />
            <span className="text-sm">{it}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
