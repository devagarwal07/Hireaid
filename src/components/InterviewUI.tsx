// src/components/interview_screen/InterviewUI.tsx
import React, { useState } from "react";
import RightSideBar from "@/components/interview_screen/RightSideBar";
import AssistantPanel from "@/components/interview_screen/AssistantPanel";
import InterviewHeader from "@/components/interview_screen/InterviewHeader";
import Topbar from "@/components/Topbar";
import { DisclaimerModal } from "@/components/interview_screen/DisclaimerModal";
import type { Candidate } from "@/components/interview_screen/InterviewHeader";
import { useAppContext } from "@/context/AppContext";

export default function InterviewUI(): React.ReactElement {
  const { user, currentInterview } = useAppContext();
  const [started, setStarted] = useState(false);

  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);

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
    console.log("Saving interview prep and navigating to InterviewPrepDashboard");
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
    // Full viewport background (pale bluish) that the main card sits on
    <div className="min-h-screen bg-[#E8EEFF]">
      {/* Topbar sits flush at the top of the page */}
      <Topbar
        userName={user.firstName}
        initials={user.initials}
        fullName={`${user.firstName} ${user.lastName}`}
        role={user.role}
        notificationsCount={user.notificationsCount}
        onNotifications={() => console.log("notifications")}
        onProfile={() => console.log("profile clicked")}
      />

      {/* Outer padding so UI breathes from screen edges */}
      <div className="w-full px-6 py-6 flex justify-center">
        {/* Main app card: white rounded container centered with max-width to match design frame */}
        <div className="w-full max-w-[1280px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.06)] overflow-hidden">
          {/* Top decorative strip inside the card (subtle blue decorative area like reference) */}
          <div className="w-full bg-gradient-to-r from-transparent via-white to-white">
            {/* empty — reserved for any decorative shapes / gradient */}
          </div>

          {/* CONTENT ROW: center, right sidebar (removed left sidebar since MainNavigation handles it) */}
          <div className="flex items-start gap-6 p-6">
            {/* CENTER COLUMN: header + video + assistant (fluid) */}
            <div className="flex-1 min-w-0 flex flex-col items-start">
              {/* Interview header (candidate + action buttons) */}
              <div className="w-full max-w-[1152px] mb-4">
                <InterviewHeader
                  candidate={candidate}
                  onAssistant={() => console.log("AI Assistant pressed")}
                  onStructure={() => console.log("Structure pressed")}
                  onEnd={() => {
                    console.log("End Interview pressed");
                    handleSidebarClose();
                  }}
                />
              </div>

              {/* Main stacked content: video card + assistant panel */}
              <div className="w-full max-w-[673px] grid gap-6">
                {/* VIDEO CARD: elevated, rounded, with white border + inner black video */}
                <div className="bg-white border border-[#eef3fa] rounded-2xl shadow-sm p-4" style={{ height: '375px' }}>
                  <div className="relative rounded-2xl bg-black flex items-center justify-center text-white text-4xl" style={{ height: '363px' }}>
                    {/* candidate name in center like reference */}
                    {candidate.name}
                    {/* small top-right control placeholder (mimic zoom view) */}
                    <div className="absolute top-3 right-3 text-xs text-slate-200 bg-black/30 px-2 py-1 rounded">View</div>
                  </div>
                </div>

                {/* ASSISTANT PANEL */}
                <AssistantPanel candidate={candidate} onSend={handleAssistantSend} />
              </div>
            </div>

            {/* RIGHT SIDEBAR: fixed width that visually matches reference (cards inside) */}
            <div className="w-[432px]">
              <div className="sticky top-24">
                <RightSideBar
                  candidate={candidate}
                  started={started}
                  // pass current step so RightSideBar can display "Submit/Next" vs "Save"
                  currentStep={step}
                  totalSteps={totalSteps}
                  onActionButton={() => handleActionButton()}
                  onStartInterview={() => {
                    handleStartInterview();
                    console.log("sidebar started");
                  }}
                  onExpand={() => console.log("expand pressed")}
                />
              </div>
            </div>
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
