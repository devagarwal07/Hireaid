// src/components/interview_screen/RightSideBar.tsx
import React, { useEffect, useState } from "react";
import RecommendedQuestion from "./RecommendedQuestion";
import AISuggestionsCard from "./AISuggestionsCard";
import { QuestionCard } from "./QuestionCard";
import { ConfirmationModal } from "./ConfirmationModal";
import { EndInterviewModal } from "./EndInterviewModal";

export type RightTab = "structure" | "resume";

type Candidate = {
  name: string;
  role?: string;
  time?: string;
};

type Metric = { label: string; value: number };
type Question = {
  id: number;
  title: string;
  body: string;
  evaluated?: boolean;
  score?: number; // 0-10 scale
  metrics?: Metric[];
  feedback?: string[];
};

type Props = {
  candidate: Candidate;
  started?: boolean; // parent toggles to start the interview
  onStartInterview?: (candidate?: Candidate) => void;
  onExpand?: () => void;

  // optional overrides / integrations (keeps compatibility with updated InterviewUI)
  currentStep?: number;
  totalSteps?: number;
  onActionButton?: () => void; // optional custom handler for the main action button
  onShowScreenShare?: () => void; // callback to show screen share view at parent level
  onEvaluateQuestion?: (index: number) => void; // callback to mark question as evaluated
};

export default function RightSideBar({
  candidate,
  started: startedProp,
  onStartInterview,
  onExpand,
  currentStep: externalCurrent,
  totalSteps: externalTotal,
  onActionButton,
  onShowScreenShare,
  onEvaluateQuestion,
}: Props): React.ReactElement {
  const [open, setOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<RightTab>("structure");
  const [current, setCurrent] = useState(0);

  // initial question data
  const initialQuestions: Question[] = [
    {
      id: 1,
      title: "Question 1",
      body: "Can you tell me a bit about yourself ?",
      evaluated: true, // start evaluated to show graphs
      score: 8.8,
      metrics: [
        { label: "Technical Skills", value: 90 },
        { label: "Problem Solving", value: 90 },
        { label: "Communication", value: 62 },
      ],
      feedback: ["Concise answer and to the point.", "Great communication skills", "Factually correct", "No excel experience"],
    },
    {
      id: 2,
      title: "Question 2",
      body: "What are your strengths and weaknesses ?",
      evaluated: false,
      score: 7.4,
      metrics: [
        { label: "Technical Skills", value: 75 },
        { label: "Problem Solving", value: 80 },
        { label: "Communication", value: 70 },
      ],
      feedback: ["Clear structure in answer", "Could provide more examples"],
    },
    {
      id: 3,
      title: "Question 3",
      body: "How do you handle conflict within the team ?",
      evaluated: false,
      score: 8.8,
      metrics: [
        { label: "Technical Skills", value: 90 },
        { label: "Problem Solving", value: 90 },
        { label: "Communication", value: 62 },
      ],
      feedback: [
        "The candidate articulated their thoughts and experiences clearly and confidently.",
        "Their background aligned well with the role's requirements and responsibilities.",
        "They demonstrated structured thinking and logical reasoning during technical/problem-solving questions.",
        "The candidate showed values, attitude, and mindset aligned with the team and company culture.",
        "Time management during answers could be improved to cover more ground efficiently."
      ],
    },
  ];

  // make questions reactive (so we can mark evaluated per-item)
  const [questionsState, setQuestionsState] = useState<Question[]>(initialQuestions);

  // local started state - controlled by prop if provided
  const [started, setStarted] = useState<boolean>(!!startedProp);

  // confirmation modal state
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showEndInterviewModal, setShowEndInterviewModal] = useState(false);

  // sync with prop changes
  useEffect(() => {
    if (typeof startedProp === "boolean") setStarted(startedProp);
  }, [startedProp]);

  // If parent provides currentStep / totalSteps, prefer those for label logic
  const lastIndex = (externalTotal && externalTotal > 0) ? externalTotal : questionsState.length - 1;
  const derivedCurrent = typeof externalCurrent === "number" ? externalCurrent : current;
  const q = questionsState[derivedCurrent] || questionsState[0];

  function goNext() {
    setCurrent((s) => Math.min(questionsState.length - 1, s + 1));
  }
  function goPrev() {
    setCurrent((s) => Math.max(0, s - 1));
  }

  function handleSaveNavigation() {
    // default navigation to InterviewPrepDashboard
    // If you use a router (next/router, react-router), replace this with router.push(...) in parent via onActionButton.
    window.location.href = "/interview-prep-dashboard";
  }

  function handleSubmitAndNext() {
    // Check if this is Question 2 (index 1) - show confirmation modal FIRST
    if (derivedCurrent === 1) {
      setShowConfirmationModal(true);
      return;
    }

    // Check if this is Question 3 (index 2) and it's evaluated - show end interview modal
    if (derivedCurrent === 2 && questionsState[derivedCurrent].evaluated) {
      setShowEndInterviewModal(true);
      return;
    }

    // If parent provided an action override, call it and return
    if (onActionButton) {
      onActionButton();
      return;
    }

    // if current question is not yet evaluated -> mark evaluated (show score)
    if (!questionsState[derivedCurrent].evaluated) {
      setQuestionsState((prev) => {
        const copy = [...prev];
        copy[derivedCurrent] = { ...copy[derivedCurrent], evaluated: true };
        return copy;
      });
      // optionally call parent
      onStartInterview?.(candidate);
      return;
    }

    // already evaluated
    if (derivedCurrent < lastIndex) {
      // advance to next question
      // if using externalCurrent, prefer parent to control navigation; otherwise update internal current
      if (typeof externalCurrent === "number") {
        // do nothing internal — parent is expected to handle step change
        onStartInterview?.(candidate);
      } else {
        setCurrent((s) => s + 1);
      }
      return;
    }

    // if we are on the last question and it's already evaluated -> Save
    handleSaveNavigation();
  }

  function handleConfirmSubmit() {
    // Close modal and show screen share view at parent level
    setShowConfirmationModal(false);

    // Mark Question 2 as evaluated immediately
    setQuestionsState((prev) => {
      const copy = [...prev];
      copy[derivedCurrent] = { ...copy[derivedCurrent], evaluated: true };
      return copy;
    });

    onShowScreenShare?.();
  }



  function startInterview() {
    setStarted(true);
    setCurrent(0);
    // reset evaluations if desired (keeps existing behavior)
    setQuestionsState((prev) => prev.map((p) => ({ ...p, evaluated: false })));
    onStartInterview?.(candidate);
  }

  // Decide action label:
  // - If current question not evaluated => "Submit"
  // - Else if evaluated and not last => "Next"
  // - Else if evaluated and last => "Save"
  const isEvaluated = !!q?.evaluated;
  const isLast = derivedCurrent >= lastIndex;
  const actionLabel = !isEvaluated ? "Submit & Next" : isLast ? "Save" : "Next";

  // Main button click handler: if parent supplied onActionButton, it will be called inside handleSubmitAndNext
  const onPrimaryClick = () => {
    // If parent explicitly passed onActionButton, let handleSubmitAndNext call it.
    // For "Save" label and no onActionButton provided, navigate to InterviewPrepDashboard.
    if (actionLabel === "Save" && !onActionButton) {
      // ensure current question marked evaluated before saving (if not)
      if (!isEvaluated) {
        setQuestionsState((prev) => {
          const copy = [...prev];
          copy[derivedCurrent] = { ...copy[derivedCurrent], evaluated: true };
          return copy;
        });
        // then navigate
        handleSaveNavigation();
        return;
      }
      handleSaveNavigation();
      return;
    }

    // For Submit / Next actions (and Save if overridden), call the unified handler
    handleSubmitAndNext();
  };

  return (
    <>
      <div className={`transform transition-all ${open ? "opacity-100" : "opacity-0 scale-95 pointer-events-none"} w-full`} aria-hidden={!open}>
        <div className="rounded-2xl shadow-[0_12px_30px_rgba(34,54,84,0.12)] overflow-hidden bg-white border border-[#e6f0ff]" style={{ minHeight: '600px' }}>
          <div className="h-full px-4 py-5 flex flex-col">
            {/* Header tabs */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveTab("structure")} className={`text-sm font-medium pb-2 ${activeTab === "structure" ? "text-[#0f4db2] border-b-2 border-[#dbeafe]" : "text-[#6b7280]"}`}>
                  Interview Structure
                </button>
                <button onClick={() => setActiveTab("resume")} className={`text-sm font-medium pb-2 ${activeTab === "resume" ? "text-[#0f4db2] border-b-2 border-[#dbeafe]" : "text-[#6b7280]"}`}>
                  Resume Details
                </button>
              </div>

              <div className="flex items-center gap-2 text-[#6b7280]">
                <button title="Open" className="p-1 rounded hover:bg-[#f3f7ff]" onClick={() => onExpand?.()}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </button>

                <button title="Close" className="p-1 rounded hover:bg-[#f3f7ff]" onClick={() => setOpen(false)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            <div className="border-b border-[#eef6ff] mb-3" />

            {/* If not started: show the initial start screen */}
            {!started ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-8">
                <div className="mb-6">
                  <div className="w-20 h-20 rounded-full bg-[#eef7ff] flex items-center justify-center mx-auto">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-[#0b61c9]">
                      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="#0b61c9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#0b61c9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-[#111827] mb-3">Hi there.</h3>
                <p className="text-sm text-[#6b7280] mb-6 leading-relaxed max-w-[260px]">
                  The interview questions are ready. Please click on the button below to start the interview process.
                </p>

                <button
                  onClick={startInterview}
                  className="px-8 py-3 rounded-full text-white font-semibold shadow-lg inline-flex items-center gap-2"
                  style={{ background: "linear-gradient(180deg,#0b61c9,#0a57b8)" }}
                >
                  Start Interview
                </button>
              </div>
            ) : (
              // Scrollable content (shown after start)
              <>
                <div className="flex-1 overflow-auto px-1 pb-4">
                  <div className="mb-3">
                    <div className="text-xs text-[#9aa4b2]">Warmup ({derivedCurrent + 1} out of {questionsState.length} Questions)</div>
                  </div>

                  {/* Question card using shared QuestionCard component */}
                  <div className="mb-4">
                    <QuestionCard
                      index={derivedCurrent + 1}
                      title={q?.body ?? "Question"}
                      state="active"
                      evaluatedSummary={`Score: ${q?.score?.toFixed(1) ?? '8.8'} / 10`}
                      feedbackPoints={q?.feedback ?? ["Concise answer and to the point.", "Great communication skills"]}
                      metrics={q?.metrics ? q.metrics.map(m => ({
                        label: m.label,
                        value: m.value,
                        color: m.label === "Technical Skills" ? "#10B981" :
                          m.label === "Problem Solving" ? "#6366F1" : "#F59E0B"
                      })) : [
                        { label: "Technical Skills", value: 90, color: "#10B981" },
                        { label: "Problem Solving", value: 90, color: "#6366F1" },
                        { label: "Communication", value: 62, color: "#F59E0B" }
                      ]}
                      status="analysis-complete"
                    />
                  </div>

                  {/* Recommended follow-up question */}
                  <RecommendedQuestion text="Could you tell me what are the features in ADP Workforce Now you liked the most ?" />

                  {/* AI suggestions module: listening state + chat-like display */}
                  <AISuggestionsCard variant="listening" />
                </div>

                {/* Footer */}
                <div className="pt-2 border-t border-[#f1f7ff]">
                  <div className="flex items-center justify-end">
                    <button
                      onClick={onPrimaryClick}
                      className="px-6 py-3 rounded-full text-white font-semibold shadow"
                      style={{ background: "linear-gradient(180deg,#0b61c9,#0a57b8)" }}
                    >
                      {actionLabel}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* End Interview Modal */}
        <EndInterviewModal
          open={showEndInterviewModal}
          onClose={() => setShowEndInterviewModal(false)}
          onConfirm={() => {
            setShowEndInterviewModal(false);
            handleSaveNavigation();
          }}
        />

        {/* End Interview Modal */}
        <EndInterviewModal
          open={showEndInterviewModal}
          onClose={() => setShowEndInterviewModal(false)}
          onConfirm={() => {
            setShowEndInterviewModal(false);
            handleSaveNavigation();
          }}
        />

        {/* Confirmation Modal */}
        <ConfirmationModal
          open={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={handleConfirmSubmit}
        />
      </div>
    </>
  );
}
