export type QuestionCardState = 'default' | 'active' | 'analysis-error' | 'failed';

export type QuestionStatus = 'idle' | 'analyzing' | 'analysis-complete' | 'not-audible';

export interface QuestionCardProps {
  state?: QuestionCardState;
  index: number;
  title: string;
  evaluatedSummary?: string;
  feedbackPoints?: string[];
  errorMessage?: string;
  onReload?: () => void;
  status?: QuestionStatus;
  statusText?: string;
}

export function QuestionCard({
  state = 'default',
  index,
  title,
  evaluatedSummary,
  feedbackPoints,
  errorMessage,
  onReload,
  status,
  statusText,
}: QuestionCardProps) {
  const isActive = state === 'active';
  const isError = state === 'analysis-error' || state === 'failed';

  const resolvedStatusText = (() => {
    if (!status) return undefined;
    if (statusText) return statusText;
    if (status === 'analyzing') return 'Analysing candidate answer...';
    if (status === 'analysis-complete') return 'Analysis completed';
    if (status === 'not-audible') return 'Candidate is not audible';
    return undefined;
  })();

  return (
    <div
      className={`rounded-2xl border px-4 py-3 transition shadow-[0_16px_40px_rgba(15,23,42,0.08)] ${
        isActive
          ? 'border-[#0857A1] bg-white'
          : isError
          ? 'border-[#FCA5A5] bg-[#FFF5F5]'
          : 'border-[#E5E7EB] bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
            <span>Question {index}</span>
          </div>
          <p className="text-sm font-medium text-slate-900">{title}</p>
        </div>

        {isActive ? (
          <span className="mt-1 inline-flex items-center rounded-full bg-[#E0ECFF] px-2.5 py-1 text-[11px] font-semibold text-[#0857A1]">
            Active
          </span>
        ) : null}
      </div>

      {evaluatedSummary && !isError && (
        <div className="mt-3 rounded-2xl bg-[#F5F7FF] p-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E5F3FF] px-2.5 py-1 text-[10px] font-semibold">
            <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-r from-[#2DD4BD] to-[#6990F9]" />
            <span className="bg-gradient-to-r from-[#19B9A3] to-[#6990F9] bg-clip-text text-transparent">
              Evaluated Score
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-700">{evaluatedSummary}</p>
          {feedbackPoints && feedbackPoints.length > 0 ? (
            <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
              {feedbackPoints.map((point, i) => (
                <li key={i} className="flex gap-1.5">
                  <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}

      {/* Inline status row for analysing / completed / not-audible */}
      {!isError && !evaluatedSummary && status && resolvedStatusText && (
        <div className="mt-2 flex items-center gap-2 rounded-lg bg-white px-2 py-1.5">
          {status === 'not-audible' ? (
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#FFB4A5] text-[#FF7E5D]">
              !
            </span>
          ) : (
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-[#2DD4BD] to-[#6990F9]" />
          )}
          <span
            className={
              status === 'not-audible'
                ? 'text-[11px] font-medium text-[#FF3636]'
                : 'text-[11px] font-medium bg-gradient-to-r from-[#19B9A3] to-[#6990F9] bg-clip-text text-transparent'
            }
          >
            {resolvedStatusText}
          </span>
        </div>
      )}

      {isError && (
        <div className="mt-3 flex items-start justify-between gap-3 rounded-2xl bg-white px-3 py-2">
          <div>
            <p className="text-xs font-semibold text-[#B91C1C]">
              {state === 'failed' ? 'Failed to load analysis' : 'Analysis incomplete'}
            </p>
            <p className="mt-1 text-[11px] text-[#9B1C1C]">
              {errorMessage ?? 'Something went wrong while analyzing this question.'}
            </p>
          </div>
          {onReload && (
            <button
              type="button"
              onClick={onReload}
              className="mt-1 inline-flex items-center rounded-full bg-[#FEE2E2] px-2.5 py-1 text-[11px] font-semibold text-[#B91C1C] hover:bg-[#FECACA]"
            >
              Reload Question
            </button>
          )}
        </div>
      )}
    </div>
  );
}
