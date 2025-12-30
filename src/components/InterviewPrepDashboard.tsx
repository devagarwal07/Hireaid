import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/ui/PageHeader";
import { useAppContext } from "@/context/AppContext";

export interface Question {
  id: number;
  title: string;
  bullets: string[];
}

export interface TagProps {
  children: React.ReactNode;
  bg?: string;
  color?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  bg = "bg-green-50",
  color = "text-green-700",
}) => (
  <span className={`px-3 py-1 text-sm rounded-full ${bg} ${color} shadow-sm`}>
    {children}
  </span>
);

export interface ScorePillProps {
  score?: string | number;
}

export const ScorePill: React.FC<ScorePillProps> = ({ score = "8.4" }) => (
  <div className="flex flex-col items-center">
    <div className="w-20 h-20 rounded-md border border-gray-100 flex items-center justify-center bg-white">
      <div className="text-2xl font-bold text-emerald-600">{score}</div>
    </div>
    <div className="text-xs text-gray-400 mt-2">/10 Score</div>
  </div>
);

export interface QuestionCardProps {
  question: Question;
  score?: string | number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  score = "8.4",
}) => (
  <div className="border border-gray-100 rounded-lg p-3">
    <div className="flex items-start gap-4">
      <div className="w-36 flex-shrink-0">
        <ScorePill score={score} />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">{question.title}</div>
          <button
            className="text-gray-400"
            aria-label={`toggle-${question.id}`}
          >
            ▾
          </button>
        </div>

        <div className="border-l border-gray-100 pl-4 mt-3">
          <ul className="text-sm text-gray-700 space-y-2">
            {question.bullets.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span
                  className={`flex items-center justify-center w-5 h-5 rounded-full ${idx === question.bullets.length - 1
                    ? "text-red-500"
                    : "text-emerald-600"
                    }`}
                >
                  {idx === question.bullets.length - 1 ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M12 9v4"
                        stroke="#ef4444"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 17h.01"
                        stroke="#ef4444"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="#10B981"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span
                  className={`${idx === question.bullets.length - 1
                    ? "text-red-600"
                    : "text-gray-700"
                    }`}
                >
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export interface InterviewPrepDashboardProps {
  score?: string | number;
  questions?: Question[];
}

const defaultQuestions = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  title: `Question ${i + 1}: Can you tell me a bit about yourself`,
  bullets: [
    "The candidate articulated their thoughts and experiences clearly and confidently.",
    "Their background aligned well with the role's requirements and responsibilities.",
    "They demonstrated structured thinking and logical reasoning during technical/problem-solving questions.",
    "The candidate showed values, attitude, and mindset aligned with the team and company culture.",
    "Time management during answers could be improved to cover more ground efficiently.",
  ],
})) as Question[];

const InterviewPrepDashboard: React.FC<InterviewPrepDashboardProps> = ({
  score = "8.4",
  questions = defaultQuestions,
}) => {
  const { user, currentInterview } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-page-bg">
      {/* Main content area */}
      <div className="w-full px-6 pb-6">
        {/* Page Header */}
        <div className="mb-4">
          <PageHeader
            config={{
              breadcrumbs: [
                { label: "Interview Schedule", path: "/job-dashboard" },
                { label: "Interview" },
              ],
              title: `${currentInterview.candidateName} Report`,
              showPersonIcon: true,
              showTime: true,
              time: `${currentInterview.scheduledTime} - Conducted by ${user.firstName} ${user.lastName}`,
              buttons: [
                {
                  label: "Go to Candidates List",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 18l6-6-6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  variant: "secondary",
                  onClick: () => navigate("/job/1/candidates"),
                },
              ],
            }}
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-text-primary">
            Interview Prep Dashboard - Interview Completed
          </h1>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-4">
                <ScorePill score={score} />

                <div className="flex flex-col gap-3">
                  <div className="flex gap-2 items-center text-sm text-gray-600">
                    <span className="font-medium">Interview Report</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2 max-w-[680px]">
                    <Tag>Showed clear technical knowledge</Tag>
                    <Tag bg="bg-sky-50" color="text-sky-700">
                      Brilliant communication skills
                    </Tag>
                    <Tag bg="bg-yellow-50" color="text-amber-700">
                      Leadership
                    </Tag>
                    <Tag bg="bg-violet-50" color="text-violet-700">
                      Provided examples of prior work experience which fits job
                      description
                    </Tag>
                    <Tag bg="bg-red-50" color="text-red-700">
                      Some answers believed to use AI assistance
                    </Tag>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <button className="text-sky-600">Add Notes</button>
              <button className="text-sky-600">Edit Evaluation</button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <button className="flex items-center gap-2 text-sky-600 border-b-2 border-sky-200 pb-2">
            <span className="text-sm font-medium">AI Summary</span>
          </button>

          <button className="flex items-center gap-2 text-gray-500 pb-2">
            <span className="text-sm">Interview Transcript</span>
          </button>

          <button className="flex items-center gap-2 text-gray-500 pb-2">
            <span className="text-sm">Interviewer Notes</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                {" "}
                Strengths
              </div>
            </div>

            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2">
              <li>
                The candidate articulated their thoughts and experiences clearly
                and confidently.
              </li>
              <li>
                Their background aligned well with the role's requirements and
                responsibilities.
              </li>
              <li>
                They demonstrated structured thinking and logical reasoning
                during technical/problem-solving questions.
              </li>
              <li>
                The candidate showed values, attitude, and mindset aligned with
                the team and company culture.
              </li>
              <li>
                They were genuinely interested in the role and asked insightful
                questions about the team, product, or mission.
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                {" "}
                What Needs Improvement
              </div>
            </div>

            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2">
              <li>
                Some answers could improve clarity and structure when explaining
                their past work or problem-solving approach.
              </li>
              <li>
                They lacked depth in certain technical areas relevant to the
                role.
              </li>
              <li>
                Some responses were generic and didn't showcase specific
                examples or outcomes.
              </li>
              <li>
                There was limited engagement or curiosity shown through
                follow-up questions.
              </li>
              <li>
                Time management during answers could be improved to cover more
                ground efficiently.
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Per Question Evaluation</h3>
            <button className="text-sm text-sky-600">Collapse</button>
          </div>

          <div className="space-y-4">
            {questions.map((q) => (
              <QuestionCard key={q.id} question={q} score={score} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrepDashboard;
