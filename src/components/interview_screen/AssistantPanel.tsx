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
        className="rounded-2xl shadow-[0_2px_11px_rgba(0,0,0,0.08)] bg-gradient-to-br from-white via-[#F3FEFF] to-[#EAFCFF] border border-white/60 h-full flex flex-col"
      >
        {/* Tabs Header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-0 border-b border-[rgba(38,50,56,0.1)]">
          <div className="flex items-center gap-2">
            {/* AI Assistant tab */}
            <button
              type="button"
              onClick={() => setActiveTab("assistant")}
              className={`flex items-center gap-2 px-3 py-2 rounded-t-xl text-sm font-semibold border-b ${activeTab === "assistant"
                ? "border-[#A1E4F5] bg-white/70"
                : "border-transparent bg-transparent text-text-primary/80"
                }`}
            >
              <span className="inline-flex items-center gap-2">
                {/* AI Icon - always gradient */}
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.34072 3.11791C6.88144 1.53545 9.06784 1.48752 9.70894 2.97413L9.76319 3.11882L10.4929 5.25289C10.6601 5.74231 10.9304 6.19017 11.2854 6.56626C11.6404 6.94236 12.0719 7.23794 12.5509 7.43307L12.7471 7.50632L14.8811 8.23516C16.4634 8.77591 16.5114 10.9624 15.0257 11.6036L14.8811 11.6578L12.7471 12.3876C12.2575 12.5547 11.8095 12.8249 11.4333 13.1799C11.0571 13.535 10.7614 13.9666 10.5661 14.4457L10.4929 14.641L9.76409 16.776C9.22337 18.3584 7.03697 18.4064 6.39678 16.9206L6.34072 16.776L5.61192 14.6419C5.4448 14.1523 5.17462 13.7043 4.81959 13.328C4.46457 12.9517 4.03297 12.656 3.55392 12.4608L3.35861 12.3876L1.22465 11.6587C-0.358633 11.118 -0.406557 8.93144 1.07998 8.29122L1.22465 8.23516L3.35861 7.50632C3.848 7.33908 4.29584 7.06883 4.67192 6.71379C5.04799 6.35876 5.34356 5.92719 5.53868 5.44821L5.61192 5.25289L6.34072 3.11791ZM8.05241 3.70207L7.32361 5.83614C7.06897 6.58243 6.65473 7.26425 6.10973 7.83411C5.56472 8.40397 4.90206 8.84818 4.16788 9.13581L3.94183 9.2181L1.80787 9.94694L3.94183 10.6758C4.68808 10.9304 5.36987 11.3447 5.9397 11.8897C6.50953 12.4348 6.95371 13.0974 7.24132 13.8317L7.32361 14.0577L8.05241 16.1918L8.78121 14.0577C9.03584 13.3114 9.45009 12.6296 9.99509 12.0598C10.5401 11.4899 11.2028 11.0457 11.9369 10.7581L12.163 10.6767L14.2969 9.94694L12.163 9.2181C11.4167 8.96345 10.7349 8.54918 10.1651 8.00415C9.59529 7.45912 9.1511 6.79642 8.86349 6.06221L8.78211 5.83614L8.05241 3.70207ZM15.2862 1.6339e-07C15.4553 -2.13382e-07 15.6211 0.0474544 15.7646 0.136971C15.9082 0.226487 16.0237 0.354475 16.0981 0.50639L16.1415 0.612189L16.458 1.53997L17.3867 1.85646C17.5562 1.91406 17.7048 2.02069 17.8137 2.16284C17.9225 2.30499 17.9867 2.47626 17.9982 2.65495C18.0096 2.83363 17.9677 3.01169 17.8778 3.16655C17.788 3.32141 17.6542 3.44611 17.4934 3.52483L17.3867 3.56824L16.4589 3.88473L16.1425 4.81341C16.0848 4.9829 15.978 5.13144 15.8359 5.24022C15.6937 5.349 15.5224 5.41311 15.3437 5.42445C15.165 5.43578 14.987 5.39381 14.8322 5.30387C14.6774 5.21392 14.5528 5.08005 14.4742 4.91921L14.4308 4.81341L14.1143 3.88563L13.1857 3.56914C13.0161 3.51154 12.8675 3.40491 12.7587 3.26276C12.6498 3.12061 12.5856 2.94934 12.5742 2.77066C12.5627 2.59197 12.6046 2.41391 12.6945 2.25905C12.7843 2.10419 12.9182 1.9795 13.079 1.90077L13.1857 1.85736L14.1134 1.54087L14.4299 0.612189C14.4908 0.433529 14.6062 0.278432 14.7598 0.168645C14.9133 0.0588578 15.0974 -0.000113288 15.2862 1.6339e-07Z" fill="url(#paint0_linear_ai)" />
                  <defs>
                    <linearGradient id="paint0_linear_ai" x1="6" y1="-1.5" x2="14.8865" y2="18.0516" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2DD4BD" />
                      <stop offset="1" stopColor="#6990F9" />
                    </linearGradient>
                  </defs>
                </svg>
                <span
                  className={
                    activeTab === "assistant"
                      ? "bg-gradient-to-r from-[#19B9A3] to-[#6990F9] bg-clip-text text-transparent"
                      : "text-text-primary"
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
              className={`flex items-center gap-2 px-3 py-2 rounded-t-xl text-sm font-medium border-b ${activeTab === "notes" ? "border-primary text-primary" : "border-transparent text-text-primary"
                }`}
            >
              {/* Notes Icon - changes color on active */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.61 9.57L8.25 9.75L8.43 6.39L14.07 0.75L17.25 3.93L11.61 9.57Z" stroke={activeTab === "notes" ? "#0857A1" : "#626262"} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M8.385 2.25H2.865C2.70189 2.25 2.54546 2.31479 2.43013 2.43013C2.31479 2.54546 2.25 2.70189 2.25 2.865V15.135C2.25 15.2981 2.31479 15.4545 2.43013 15.5699C2.54546 15.6852 2.70189 15.75 2.865 15.75H15.135C15.2981 15.75 15.4545 15.6852 15.5699 15.5699C15.6852 15.4545 15.75 15.2981 15.75 15.135V9.615" stroke={activeTab === "notes" ? "#0857A1" : "#626262"} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>Notes</span>
            </button>

            {/* Live transcript tab */}
            <button
              type="button"
              onClick={() => setActiveTab("transcript")}
              className={`flex items-center gap-2 px-3 py-2 rounded-t-xl text-sm font-medium border-b ${activeTab === "transcript" ? "border-primary text-primary" : "border-transparent text-text-primary"
                }`}
            >
              {/* Transcript Icon - changes color on active */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.4408 8.93299C6.55801 8.81582 6.71695 8.75 6.88268 8.75C7.04841 8.75 7.20735 8.81582 7.32455 8.93299L9.82455 11.433C9.94172 11.5502 10.0075 11.7091 10.0075 11.8749C10.0075 12.0406 9.94172 12.1995 9.82455 12.3167L7.32455 14.8167C7.20668 14.9306 7.0488 14.9936 6.88493 14.9922C6.72106 14.9907 6.5643 14.925 6.44842 14.8091C6.33254 14.6932 6.26681 14.5365 6.26538 14.3726C6.26396 14.2087 6.32696 14.0509 6.4408 13.933L8.5033 11.8705L6.4408 9.80799C6.32363 9.69079 6.25781 9.53184 6.25781 9.36612C6.25781 9.20039 6.32363 9.04145 6.4408 8.92424V8.93299ZM13.7533 14.3705C13.7533 14.2047 13.6875 14.0458 13.5702 13.9285C13.453 13.8113 13.2941 13.7455 13.1283 13.7455H10.6283C10.4625 13.7455 10.3036 13.8113 10.1864 13.9285C10.0692 14.0458 10.0033 14.2047 10.0033 14.3705C10.0033 14.5363 10.0692 14.6952 10.1864 14.8124C10.3036 14.9296 10.4625 14.9955 10.6283 14.9955H13.1283C13.2941 14.9955 13.453 14.9296 13.5702 14.8124C13.6875 14.6952 13.7533 14.5363 13.7533 14.3705Z" fill={activeTab === "transcript" ? "#0857A1" : "#626262"} />
                <path fillRule="evenodd" clipRule="evenodd" d="M5 1.25C3.625 1.25 2.5 2.36875 2.5 3.75V16.25C2.5 17.625 3.61875 18.75 5 18.75H15C16.375 18.75 17.5 17.6313 17.5 16.25V6.875C17.5001 6.79287 17.4841 6.71151 17.4528 6.63559C17.4215 6.55966 17.3755 6.49065 17.3175 6.4325L12.3175 1.4325C12.2594 1.3745 12.1903 1.32853 12.1144 1.29721C12.0385 1.2659 11.9571 1.24985 11.875 1.25H5ZM3.75 3.75C3.75 3.41848 3.8817 3.10054 4.11612 2.86612C4.35054 2.6317 4.66848 2.5 5 2.5H11.25V6.875C11.25 7.04076 11.3158 7.19973 11.4331 7.31694C11.5503 7.43415 11.7092 7.5 11.875 7.5H16.25V16.25C16.25 16.5815 16.1183 16.8995 15.8839 17.1339C15.6495 17.3683 15.3315 17.5 15 17.5H5C4.66848 17.5 4.35054 17.3683 4.11612 17.1339C3.8817 16.8995 3.75 16.5815 3.75 16.25V3.75ZM15.3625 6.25L12.5 3.3875V6.25H15.3625Z" fill={activeTab === "transcript" ? "#0857A1" : "#626262"} />
              </svg>
              <span>Live Transcript</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-primary">
            <button
              type="button"
              className="hidden md:inline-flex text-[15px] font-semibold leading-[19px]"
            >
              Share Report
            </button>
            <button
              type="button"
              title="Open in new window"
              className="p-2 rounded-md hover:bg-white/60 text-primary"
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
              className="p-2 rounded-md hover:bg-white/60 text-primary"
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
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4 space-y-4">
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
              <p className="text-[14px] leading-[21px] text-text-primary">
                The candidate presents a well-structured resume that highlights strong academic background, relevant professional
                experience, and clearly demonstrated skills. Achievements are quantified, showcasing impact and results, while the
                overall format is clean, concise, and easy to follow.
              </p>
            </div>
          )}

          {/* TRANSCRIPT TAB */}
          {activeTab === "transcript" && (
            <div className="max-w-[787px] bg-white border border-[#E3E3E3] rounded-xl px-4 py-4 space-y-4">
              {/* Simple transcript aligned with Figma copy */}
              <div className="space-y-3">
                {/* John (You) */}
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-gray-400" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-medium text-text-primary">John Doe (You)</span>
                      <span className="px-2 py-[2px] rounded-full bg-[#DAEAFA] text-[12px] text-primary tracking-[-0.02em]">
                        00:10
                      </span>
                    </div>
                    <p className="text-[14px] text-text-secondary">Hi Philip, Good Morning</p>
                  </div>
                </div>

                {/* Phillip (Candidate) */}
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-gray-400" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-medium text-text-primary">Phillip Sam (Candidate 1)</span>
                      <span className="px-2 py-[2px] rounded-full bg-[#DAEAFA] text-[12px] text-primary tracking-[-0.02em]">
                        00:15
                      </span>
                    </div>
                    <p className="text-[14px] text-text-secondary">Hey John, Good morning. Good to meet you.</p>
                  </div>
                </div>

                {/* Question detected banner */}
                <div className="mt-3 rounded-md bg-primary-light px-3 py-3 flex flex-col gap-2">
                  <div className="text-[12px] font-medium text-primary">Question Detected</div>
                  <p className="text-[14px] text-text-primary">
                    Can you tell me a bit about yourself ?
                  </p>
                </div>

                {/* Answer detected block */}
                <div className="mt-4 rounded-md bg-primary-light px-3 py-3 flex flex-col gap-2">
                  <div className="text-[12px] font-medium text-primary">Answer Detected</div>
                  <p className="text-[14px] text-text-primary">
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
        <div className="px-4 pb-4 flex-shrink-0">
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
