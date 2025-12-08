import { useState } from "react";
import ChatInput from "@/components/interview_screen/Assisstant_panel/chat_input.tsx";

type Candidate = {
  name?: string;
  role?: string;
  time?: string;
};

type Props = {
  candidate?: Candidate; // no longer required
  onSend?: (text: string) => void;
  defaultTab?: "assistant" | "notes" | "transcript";
};

export default function AssistantPanel({ candidate, onSend, defaultTab = "assistant" }: Props) {
  const [activeTab, setActiveTab] = useState<"assistant" | "notes" | "transcript">(defaultTab);
  const [text, setText] = useState("");

  function send() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend?.(trimmed);
    setText("");
  }

  const firstName = candidate?.name?.split?.(" ")?.[0] ?? "there";

  return (
    <div className="w-full" style={{ height: '362px' }}>
      <div
        className="rounded-2xl shadow-[0_2px_11px_rgba(0,0,0,0.08)] bg-gradient-to-br from-white via-[#F3FEFF] to-[#EAFCFF] border border-white/60 h-full"
      >
        {/* Tabs Header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-0 border-b border-[rgba(38,50,56,0.1)]">
          <div className="flex items-center gap-2">
            {/* AI Assistant tab */}
            <button
              type="button"
              onClick={() => setActiveTab("assistant")}
              className={`flex items-center gap-2 px-3 py-2 rounded-t-xl text-sm font-semibold border-b ${
                activeTab === "assistant"
                  ? "border-[#A1E4F5] bg-white/70"
                  : "border-transparent bg-transparent text-[#181D27]/80"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{
                    background:
                      "linear-gradient(155.56deg,#2DD4BD 4.69%,#6990F9 94.79%)",
                  }}
                />
                <span
                  className={
                    activeTab === "assistant"
                      ? "bg-gradient-to-r from-[#19B9A3] to-[#6990F9] bg-clip-text text-transparent"
                      : "text-[#181D27]"
                  }
                >
                  AI Assistant
                </span>
              </span>
            </button>

            {/* Notes tab */}
            <button
              type="button"
              onClick={() => setActiveTab("notes")}
              className={`flex items-center gap-2 px-3 py-2 rounded-t-xl text-sm font-medium border-b ${
                activeTab === "notes" ? "border-[#0857A1] text-[#0857A1]" : "border-transparent text-[#181D27]"
              }`}
            >
              <span className="w-4 h-4 rounded-[4px] border border-[#0857A1]" />
              <span>Notes</span>
            </button>

            {/* Live transcript tab */}
            <button
              type="button"
              onClick={() => setActiveTab("transcript")}
              className={`flex items-center gap-2 px-3 py-2 rounded-t-xl text-sm font-medium border-b ${
                activeTab === "transcript" ? "border-[#0857A1] text-[#0857A1]" : "border-transparent text-[#181D27]"
              }`}
            >
              <span className="w-5 h-5 bg-[#626262] rounded" />
              <span>Live Transcript</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-[#0857A1]">
            <button
              type="button"
              className="hidden md:inline-flex text-[15px] font-semibold leading-[19px]"
            >
              Share Report
            </button>
            <button
              type="button"
              title="Open in new window"
              className="p-2 rounded-md hover:bg-white/60 text-[#0857A1]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 3H21V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 3L10 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              title="Close"
              className="p-2 rounded-md hover:bg-white/60 text-[#0857A1]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="px-4 pt-4 pb-4 space-y-4">
          {/* AI ASSISTANT TAB */}
          {activeTab === "assistant" && (
            <div className="max-w-[692px] bg-[#F3FEFF] border border-[#88E6FF] rounded-xl px-5 py-3">
              <p className="text-[#088E7D] text-[14px] leading-[1.2] font-semibold font-[Lato,ui-sans-serif]">
                Hi {firstName}, Lets get this interview started. Feel free to ask me any doubts you have during the interview,
                I will also provide Realtime feedback and evaluations for the candidates answers. You can also use this area to
                take notes.
              </p>
              <div className="mt-3 text-[11px] leading-[17px] text-[#7F7F7F] font-medium">
                9:40 AM
              </div>
            </div>
          )}

          {/* NOTES TAB */}
          {activeTab === "notes" && (
            <div className="max-w-[789px] bg-white border border-[#E3E3E3] rounded-xl px-4 py-4">
              <p className="text-[14px] leading-[21px] text-[#181D27]">
                The candidate presents a well-structured resume that highlights strong academic background, relevant professional
                experience, and clearly demonstrated skills. Achievements are quantified, showcasing impact and results, while the
                overall format is clean, concise, and easy to follow.
              </p>
            </div>
          )}

          {/* TRANSCRIPT TAB */}
          {activeTab === "transcript" && (
            <div className="max-w-[787px] bg-white border border-[#E3E3E3] rounded-xl px-4 py-4 space-y-4 max-h-[480px] overflow-y-auto">
              {/* Simple transcript aligned with Figma copy */}
              <div className="space-y-3">
                {/* John (You) */}
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-gray-400" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-medium text-[#181D27]">John Doe (You)</span>
                      <span className="px-2 py-[2px] rounded-full bg-[#DAEAFA] text-[12px] text-[#0857A1] tracking-[-0.02em]">
                        00:10
                      </span>
                    </div>
                    <p className="text-[14px] text-[#626262]">Hi Philip, Good Morning</p>
                  </div>
                </div>

                {/* Phillip (Candidate) */}
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-gray-400" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-medium text-[#181D27]">Phillip Sam (Candidate 1)</span>
                      <span className="px-2 py-[2px] rounded-full bg-[#DAEAFA] text-[12px] text-[#0857A1] tracking-[-0.02em]">
                        00:15
                      </span>
                    </div>
                    <p className="text-[14px] text-[#626262]">Hey John, Good morning. Good to meet you.</p>
                  </div>
                </div>

                {/* Question detected banner */}
                <div className="mt-3 rounded-md bg-[#F0F8FF] px-3 py-3 flex flex-col gap-2">
                  <div className="text-[12px] font-medium text-[#0857A1]">Question Detected</div>
                  <p className="text-[14px] text-[#181D27]">
                    Can you tell me a bit about yourself ?
                  </p>
                </div>

                {/* Answer detected block */}
                <div className="mt-4 rounded-md bg-[#F0F8FF] px-3 py-3 flex flex-col gap-2">
                  <div className="text-[12px] font-medium text-[#0857A1]">Answer Detected</div>
                  <p className="text-[14px] text-[#181D27]">
                    I have about 3 years of experience in Human Resources, mainly focusing on recruitment, employee engagement,
                    and performance management. I started my career as an HR coordinator, where I handled onboarding and payroll
                    support, and gradually moved into a generalist role that allowed me to work closely with both management and
                    employees.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Box (always visible) */}
        <div className="px-4 pb-4">
          <ChatInput
            text={text}
            setText={setText}
            send={send}
            onAttachFile={(f) => console.log("attached", f)}
            onUploadImage={(f) => console.log("image", f)}
          />
        </div>
      </div>
    </div>
  );
}
