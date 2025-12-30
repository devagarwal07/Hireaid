// src/components/InterviewHeader.tsx

export type Candidate = {
  name: string;
  role?: string;
  time?: string;
};

type Props = {
  candidate: Candidate;
  onAssistant?: () => void;
  onStructure?: () => void;
  onEnd?: () => void;
};

export default function InterviewHeader({
  candidate,
  onAssistant,
  onStructure,
  onEnd,
}: Props) {
  return (
    <div className="w-full flex justify-center" style={{ background: '#f3f8ff' }}>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden px-8 py-4" style={{ width: '1152px', height: '136px' }}>
        <div className="flex items-center justify-between w-full h-full">
          {/* LEFT SECTION */}
          <div className="flex flex-col gap-1.5">
            <div className="text-sm text-gray-500">
              Interview Schedule <span className="mx-1">/</span>
              <span className="font-medium text-gray-700">Interview</span>
            </div>

            <div className="flex items-center gap-2.5 mt-0.5">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#e7f0ff] text-[#0a6adf] text-lg font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-[#0a6adf]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-lg font-semibold text-gray-900">{candidate.name}</span>

                <span className="inline-flex items-center rounded-full border border-[#d4e4f7] bg-[#eef5fd] px-2 h-6 text-sm font-medium text-[#0a6adf]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 text-[#0a6adf]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                  <span className="ml-1 leading-tight">
                    {candidate.time ?? "—"}
                  </span>
                </span>
              </div>

            </div>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onAssistant}
              className="relative inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full border text-sm font-medium transition-colors
                         bg-white border-[#67B4FB] text-[#3576B2]
                         hover:bg-primary-light hover:border-[#67B4FB]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0857A1]
                         active:bg-primary active:border-primary active:text-white
                         disabled:bg-neutral disabled:border-[#CCCCCC] disabled:text-[#767676]"
            >
              <span className="relative inline-flex items-center justify-center w-5 h-5 flex-none">
                <span
                  className="absolute inset-[10%] rounded-full"
                  style={{
                    background:
                      "linear-gradient(155.56deg, #2DD4BD 4.69%, #6990F9 94.79%)",
                  }}
                />
              </span>
              <span className="text-[16px] leading-6">AI Assistant</span>
            </button>

            <button
              type="button"
              onClick={onStructure}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border text-[14px] leading-5 font-medium
                         bg-white border-[#C8C8C8] text-primary
                         hover:bg-primary-light hover:border-[#C8C8C8]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
              </svg>
              Interview Structure
            </button>

            <button
              type="button"
              onClick={onEnd}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border text-[16px] leading-6 font-medium transition-colors
                         bg-white border-[#FFB1B1] text-[#FF3636]
                         hover:bg-[#FFF2F0] hover:border-[#FFB1B1]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#AA0404]
                         active:bg-[#AA0404] active:border-[#AA0404] active:text-white
                         disabled:bg-neutral disabled:border-[#CCCCCC] disabled:text-[#767676]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 flex-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6.75 8.25l10.5 7.5M6.75 15.75l10.5-7.5"
                />
              </svg>
              <span>End Interview</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
