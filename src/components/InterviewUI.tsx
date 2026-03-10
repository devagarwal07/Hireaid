import React, { useState } from "react";
import RightSideBar from "@/components/interview_screen/RightSideBar";
import AssistantPanel from "@/components/interview_screen/AssistantPanel";
import PageHeader from "@/components/ui/PageHeader";
import { DisclaimerModal } from "@/components/interview_screen/DisclaimerModal";
import { ScreenShareView } from "@/components/interview_screen/ScreenShareView";
import type { Candidate } from "@/components/interview_screen/InterviewHeader";
import { useAppContext } from "@/context/AppContext";
import { VideoContainer } from "@/components/interview_screen/VideoCall";
import { dailyApi, aiApi } from "@/lib/api";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

export default function InterviewUI(): React.ReactElement {
  const { currentInterview } = useAppContext();
  const [started, setStarted] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);
  const [showScreenShare, setShowScreenShare] = useState(false);

  // Video call state
  const [roomUrl, setRoomUrl] = useState<string | null>(null);
  const [roomToken, setRoomToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Speech Recognition hook
  const { transcript, interimTranscript, startListening, stopListening, resetTranscript } = useSpeechRecognition();

  // AI Evaluation state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiEvaluation, setAiEvaluation] = useState<any | null>(null);

  // Step state for the Submit / Next / Save flow
  const [step, setStep] = useState<number>(0);
  const totalSteps = 3; // set this to however many steps you want; final step index will be totalSteps

  const candidate: Candidate = {
    name: currentInterview?.candidateName ?? "No Candidate",
    role: currentInterview?.candidateRole ?? "—",
    time: currentInterview?.scheduledTime ?? "—",
  };

  function handleStartInterview() {
    if (!hasAcceptedDisclaimer) {
      setShowDisclaimer(true);
    } else {
      setStarted(true);
      initializeCall();
    }
    console.log("Start interview clicked for", candidate.name);
  }

  async function initializeCall() {
    try {
      setError(null);
      // Create Daily room using our API
      const interviewId = (currentInterview as any)?._id || (currentInterview as any)?.id;
      const response = await dailyApi.createRoom(interviewId);
      if (response.success && response.data) {
        setRoomUrl(response.data.url);
        setRoomToken(response.data.token);
        // Important: check if it's a mock room because the user lacks an API key
        if (response.data.isMock) {
          (window as any).__isMockDailyRoom = true;
        } else {
          (window as any).__isMockDailyRoom = false;
        }
        // Start recording locally when room is ready
        startListening();
      } else {
        setError("Could not retrieve room URL from server.");
      }
    } catch (err: any) {
      console.error("Failed to initialize Daily room", err);
      setError(err.message || "Failed to initialize video call");
    }
  }

  function handleSidebarClose() {
    setStarted(false);
    setRoomUrl(null);
    setRoomToken(null);
    stopListening();
    console.log("sidebar closed / interview ended");
  }

  function handleAssistantSend(text: string) {
    console.log("AssistantPanel send:", text);
  }

  // Called when user clicks "Submit" or "Next"
  async function handleNext() {
    if (transcript && transcript.trim().length > 0) {
      setIsAnalyzing(true);
      try {
        // Assume we pass 'Question X' as the question for now, or you can extract it from actual question state
        const question = `Question ${step + 1} for role: ${candidate.role}`;

        const req = {
          candidateId: (currentInterview as any)?._id || (currentInterview as any)?.id, // Fallback if candidate ID is missing
          question: question,
          answer: transcript,
          role: candidate.role
        };

        console.log("Sending for AI Evaluation:", req);
        const response = await aiApi.analyzeAnswer(req);

        if (response.success && response.data) {
          setAiEvaluation(response.data.evaluation);
        }
      } catch (error) {
        console.error("Error analyzing answer:", error);
        // Fallback or show error
      } finally {
        setIsAnalyzing(false);
      }
    }

    // If not at final step, advance
    // Here we might eventually also want to trigger Gemini analysis for the current step's transcript
    if (step < totalSteps) {
      setStep((s) => s + 1);
      console.log("Moved to step", step + 1);
      // Reset transcript for the next question/step
      resetTranscript();
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
    initializeCall();
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
      <div className="w-full px-6 pb-6 mt-4">
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
            <div className="bg-white border border-border-light rounded-2xl shadow-sm overflow-hidden h-auto">
              {started && roomUrl ? (
                <VideoContainer url={roomUrl} token={roomToken ?? undefined} onLeave={handleSidebarClose} />
              ) : (
                <div
                  className="relative bg-gray-900 flex flex-col items-center justify-center text-white p-4"
                  style={{ height: "400px" }}
                >
                  {error ? (
                    <div className="text-red-400 bg-red-400/10 p-4 rounded-xl max-w-md text-center">
                      <p className="font-semibold mb-1">Error initializing video call</p>
                      <p className="text-sm opacity-80">{error}</p>
                      <button onClick={initializeCall} className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">Try Again</button>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z" />
                        </svg>
                      </div>
                      <span className="text-xl font-medium mb-2">Video call not started</span>
                      <span className="text-gray-400 text-sm">Click "Start Interview" to begin</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* AI ASSISTANT PANEL */}
            <AssistantPanel
              candidate={candidate}
              onSend={handleAssistantSend}
              transcript={transcript}
              interimTranscript={interimTranscript}
              aiEvaluation={aiEvaluation}
              isAnalyzing={isAnalyzing}
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
