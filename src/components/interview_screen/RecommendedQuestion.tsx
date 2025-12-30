type Props = {
  text?: string;
  onAsk?: () => void;
};

export default function RecommendedQuestionCanvas({
  text = "Could you tell me what are the features in ADP Workforce Now you liked the most ?",
  onAsk,
}: Props) {
  return (
    <div className="w-full max-w-md p-2 bg-white rounded-2xl border border-blue-50 shadow-sm">
      {/* Header: tiny waveform + title */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="8" width="2" height="8" rx="1" fill="#3BA3F6" />
            <rect x="6" y="6" width="2" height="12" rx="1" fill="#5EC6FF" />
            <rect x="10" y="9" width="2" height="6" rx="1" fill="#1f87d1" />
            <rect x="14" y="5" width="2" height="14" rx="1" fill="#3BA3F6" />
            <rect x="18" y="8" width="2" height="8" rx="1" fill="#7FD1FF" />
          </svg>
        </div>

        <div className="text-xs font-semibold text-primary">Recommended follow up question</div>
      </div>

      {/* Big rounded card */}
      <div className="border-2 border-cyan-200 rounded-xl p-4 bg-white">
        <div className="flex items-start gap-4">
          {/* sparkle icon */}
          <div className="flex-shrink-0 pt-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3.5l1.2 2.42L15.8 7l-2.33 1.78L14 11.9 12 10.9 10 11.9l.53-3.12L8.2 7l2.6-.08L12 3.5z" fill="#39C0E8" />
              <circle cx="19" cy="5" r="1.6" fill="#8FE3FF" />
            </svg>
          </div>

          {/* question text */}
          <div className="flex-1">
            <div className="text-primary text-sm leading-6">{text}</div>
          </div>

          {/* Ask CTA */}
          <div className="flex items-start">
            <button
              onClick={() => onAsk?.()}
              className="text-sm font-medium text-primary hover:underline"
            >
              Ask Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
