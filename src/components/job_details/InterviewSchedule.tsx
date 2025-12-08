export type Interview = {
  id: string | number;
  title: string;
  time: string; // e.g. "11:30 am - 12:30 pm"
  interviewer: string;
  accent?: string; // any Tailwind color or gradient class for the left accent
};

const defaultAccent = "from-[#d3f3ff] to-[#fff]";

const sample: Interview[] = [
  { id: 1, title: "Product Design Interview", time: "11:30 am - 12:30 pm", interviewer: "Tony Smith", accent: "from-[#fff1f0] to-[#fff]" },
  { id: 2, title: "Fullstack Engineer Interview", time: "11:30 am - 12:30 pm", interviewer: "Tony Smith", accent: "from-[#f6f0ff] to-[#fff]" },
  { id: 3, title: "Accountant Interview", time: "11:30 am - 12:30 pm", interviewer: "Tony Smith", accent: "from-[#fff7e6] to-[#fff]" },
  { id: 4, title: "HR Manager Interview", time: "11:30 am - 12:30 pm", interviewer: "Tony Smith", accent: "from-[#e6fffa] to-[#fff]" },
  { id: 5, title: "Data Analyst Interview", time: "11:30 am - 12:30 pm", interviewer: "Tony Smith", accent: "from-[#fff5f0] to-[#fff]" },
  { id: 6, title: "Frontend Developer Interview", time: "11:30 am - 12:30 pm", interviewer: "Tony Smith", accent: "from-[#fff5e6] to-[#fff]" },
];

export default function InterviewSchedule({
  items = sample,
  className = "",
}: {
  items?: Interview[];
  className?: string;
}) {
  return (
    <div className={`w-full max-w-[360px] bg-white rounded-2xl shadow-sm p-4 ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-700">Interview Schedule</h3>
        <a className="text-xs text-sky-600 hover:underline">View All</a>
      </div>

      <div className="h-[1px] bg-slate-100 mb-4" />

      <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
        {items.map((it) => (
          <button
            key={it.id}
            className="w-full flex items-center gap-3 rounded-lg p-3 bg-white border border-slate-100 hover:shadow-sm active:scale-[.997] transition-transform duration-75"
            aria-label={`Open ${it.title}`}
          >
            {/* left accent */}
            <div
              className={`w-1.5 h-14 rounded-full mr-2 shrink-0 bg-gradient-to-b ${it.accent ?? defaultAccent}`}
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.6)" }}
            />

            <div className="flex-1 text-left">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-slate-800">{it.title}</div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              <div className="mt-2 text-xs text-slate-500 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{it.time}</span>
              </div>

              <div className="mt-2 text-xs text-slate-500 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.795.69 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{it.interviewer}</span>
              </div>
            </div>
          </button>
        ))}

        {/* empty state if no items */}
        {items.length === 0 && (
          <div className="w-full h-[320px] flex flex-col items-center justify-center text-slate-400">
            <div className="mb-4 opacity-60">
              {/* simple calendar svg */}
              <svg width="96" height="72" viewBox="0 0 96 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="10" width="84" height="56" rx="6" stroke="#E6EEF8" strokeWidth="2" fill="#F9FBFF" />
                <rect x="6" y="22" width="84" height="6" rx="2" fill="#EEF6FF" />
                <circle cx="30" cy="40" r="4" fill="#D9EEF9" />
                <circle cx="48" cy="40" r="4" fill="#D9EEF9" />
                <circle cx="66" cy="40" r="4" fill="#D9EEF9" />
              </svg>
            </div>
            <div className="text-sm">No scheduled interviews. Add a job to proceed in interview creation.</div>
          </div>
        )}
      </div>
    </div>
  );
}