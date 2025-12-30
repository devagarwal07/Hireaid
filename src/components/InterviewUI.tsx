// src/components/interview_screen/InterviewUI.tsx
import React, { useState } from "react";
import RightSideBar from "@/components/interview_screen/RightSideBar";
import AssistantPanel from "@/components/interview_screen/AssistantPanel";
import PageHeader from "@/components/ui/PageHeader";
import { DisclaimerModal } from "@/components/interview_screen/DisclaimerModal";
import { ScreenShareView } from "@/components/interview_screen/ScreenShareView";
import type { Candidate } from "@/components/interview_screen/InterviewHeader";
import { useAppContext } from "@/context/AppContext";

export default function InterviewUI(): React.ReactElement {
  const { currentInterview } = useAppContext();
  const [started, setStarted] = useState(false);

  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);
  const [showScreenShare, setShowScreenShare] = useState(false);

  // Step state for the Submit / Next / Save flow
  const [step, setStep] = useState<number>(0);
  const totalSteps = 3; // set this to however many steps you want; final step index will be totalSteps

  const candidate: Candidate = {
    name: currentInterview.candidateName,
    role: currentInterview.candidateRole,
    time: currentInterview.scheduledTime,
  };

  function handleStartInterview() {
    if (!hasAcceptedDisclaimer) {
      setShowDisclaimer(true);
    } else {
      setStarted(true);
    }
    console.log("Start interview clicked for", candidate.name);
  }

  function handleSidebarClose() {
    setStarted(false);
    console.log("sidebar closed / interview ended");
  }

  function handleAssistantSend(text: string) {
    console.log("AssistantPanel send:", text);
  }

  // Called when user clicks "Submit" or "Next"
  function handleNext() {
    // If not at final step, advance
    if (step < totalSteps) {
      setStep((s) => s + 1);
      console.log("Moved to step", step + 1);
    } else {
      // If somehow called on final step, treat as save
      handleSave();
    }
  }

  // Final "Save" handler: navigate to InterviewPrepDashboard
  function handleSave() {
    console.log(
      "Saving interview prep and navigating to InterviewPrepDashboard"
    );
    // Simple navigation — works in client-side and server-side setups.
    // If you prefer router-based navigation, replace with router.push('/interview-prep-dashboard') accordingly.
    window.location.href = "/interview-prep-dashboard";
  }

  // Expose a single action handler to the RightSideBar
  function handleActionButton() {
    if (step < totalSteps) {
      // intermediate
      handleNext();
    } else {
      // final
      handleSave();
    }
  }

  function handleDisclaimerAgree() {
    setHasAcceptedDisclaimer(true);
    setShowDisclaimer(false);
    setStarted(true);
  }

  function handleDisclaimerClose() {
    setShowDisclaimer(false);
  }

  return (
    // Full viewport background (pale bluish)
    <div className="min-h-screen bg-page-bg relative">
      {/* Screen Share View Overlay - covers entire screen including Topbar and PageHeader */}
      {showScreenShare && (
        <ScreenShareView
          candidateName={candidate.name}
          onSubmit={() => {
            setShowScreenShare(false);
            // Mark Question 2 as evaluated and move to next question
            setStep((s) => s + 1);
          }}
        />
      )}

      {/* Main content area */}
      <div className="w-full px-6 pb-6">
        {/* Breadcrumb header with candidate info and buttons */}
        <div className="mb-4">
          <PageHeader
            config={{
              breadcrumbs: [
                { label: "Interview Schedule", path: "/job-dashboard" },
                { label: "Interview" },
              ],
              title: candidate.name,
              showPersonIcon: true,
              showTime: true,
              time: candidate.time,
              buttons: [
                {
                  label: "AI Assistant",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  variant: "secondary",
                  onClick: () => console.log("AI Assistant pressed"),
                },
                {
                  label: "Interview Structure",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 2V8H20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  variant: "secondary",
                  onClick: () => console.log("Structure pressed"),
                },
                {
                  label: "End Interview",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 3h6v6M21 3l-7 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  variant: "danger",
                  onClick: () => {
                    console.log("End Interview pressed");
                    handleSidebarClose();
                  },
                },
              ],
            }}
          />
        </div>

        {/* Two column layout: Left (Video + Assistant) | Right (Interview Structure) */}
        <div className="flex gap-4 items-start overflow-hidden">
          {/* LEFT COLUMN: Video + AI Assistant Panel */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {/* VIDEO CARD */}
            <div className="bg-white border border-[#eef3fa] rounded-2xl shadow-sm overflow-hidden">
              <div
                className="relative bg-[#1a1a2e] flex items-center justify-center text-white"
                style={{ height: "400px" }}
              >
                {/* Video placeholder - in real app this would be a video element */}
                <div className="absolute top-3 left-3 text-xs text-white bg-black/40 px-2 py-1 rounded flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  View
                </div>
                <span className="text-4xl font-medium">{candidate.name}</span>
                {/* Bottom video controls bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#2d2d3a] px-4 py-2 flex items-center justify-center gap-4">
                  <button className="p-2 hover:bg-white/10 rounded-lg text-white/80 text-xs flex flex-col items-center gap-1">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                    </svg>
                    <span>Audio</span>
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg text-white/80 text-xs flex flex-col items-center gap-1">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M23 7l-7 5 7 5V7z" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                    <span>Video</span>
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg text-white/80 text-xs flex flex-col items-center gap-1">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>Participants</span>
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg text-white/80 text-xs flex flex-col items-center gap-1">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>Chat</span>
                  </button>
                  <button className="p-2 bg-red-500 hover:bg-red-600 rounded-lg text-white text-xs flex flex-col items-center gap-1">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                    </svg>
                    <span>End</span>
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg text-white/80 text-xs flex flex-col items-center gap-1">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <span>More</span>
                  </button>
                </div>
              </div>
            </div>

            {/* AI ASSISTANT PANEL */}
            <AssistantPanel
              candidate={candidate}
              onSend={handleAssistantSend}
            />
          </div>

          {/* RIGHT COLUMN: Interview Structure Sidebar */}
          <div className="w-[477px] flex-shrink-0">
            <RightSideBar
              candidate={candidate}
              started={started}
              currentStep={step}
              totalSteps={totalSteps}
              onActionButton={() => handleActionButton()}
              onStartInterview={() => {
                handleStartInterview();
                console.log("sidebar started");
              }}
              onExpand={() => console.log("expand pressed")}
              onShowScreenShare={() => setShowScreenShare(true)}
            />
          </div>
        </div>
      </div>

      <DisclaimerModal
        open={showDisclaimer}
        onClose={handleDisclaimerClose}
        onAgree={handleDisclaimerAgree}
      />
    </div>
  );
}
