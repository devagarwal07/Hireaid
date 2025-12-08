export type QuestionCardState = 'default' | 'active' | 'analysis-error' | 'failed';

export type QuestionStatus = 'idle' | 'analyzing' | 'analysis-complete' | 'not-audible';

export interface Metric {
  label: string;
  value: number;
  color: string;
}

export interface QuestionCardProps {
  state?: QuestionCardState;
  index: number;
  title: string;
  evaluatedSummary?: string;
  feedbackPoints?: string[];
  metrics?: Metric[];
  errorMessage?: string;
  onReload?: () => void;
  status?: QuestionStatus;
  statusText?: string;
}

// Circular Progress Component
function CircularProgress({ value, color, size = 56 }: { value: number; color: string; size?: number }) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(100, Math.max(0, value));
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-slate-800">{value}</span>
      </div>
    </div>
  );
}

export function QuestionCard({
  state = 'default',
  index,
  title,
  evaluatedSummary,
  feedbackPoints,
  metrics,
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
      className={`rounded-2xl border px-4 py-3 transition shadow-[0_16px_40px_rgba(15,23,42,0.08)] ${isActive
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

          {/* Circular Progress Metrics */}
          {metrics && metrics.length > 0 && (
            <div className="mt-3 flex items-center justify-around gap-2">
              {metrics.map((metric, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <CircularProgress value={metric.value} color={metric.color} size={52} />
                  <span className="text-[10px] text-slate-600 text-center leading-tight max-w-[60px]">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {feedbackPoints && feedbackPoints.length > 0 ? (
            <ul className="mt-3 space-y-1.5 text-[11px]">
              {feedbackPoints.map((point, i) => {
                const isPositive = point.toLowerCase().includes('good') ||
                  point.toLowerCase().includes('excellent') ||
                  point.toLowerCase().includes('strong') ||
                  point.toLowerCase().includes('clear') ||
                  !point.toLowerCase().includes('improve');
                return (
                  <li key={i} className="flex items-start gap-2">
                    {isPositive ? (
                      <span className="mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-[#10B981]">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    ) : (
                      <span className="mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-[#F59E0B]">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4 2V4.5M4 6V5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    )}
                    <span className={isPositive ? "text-slate-700" : "text-amber-700"}>{point}</span>
                  </li>
                );
              })}
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
