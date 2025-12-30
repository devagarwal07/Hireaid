type Props = {
  small?: boolean; // future variant
  className?: string;
};

export default function VoicePart({ className = "" }: Props) {
  return (
	<div className={`bg-white rounded-xl border border-primary-light shadow-[4px_4px_40px_rgba(0,0,0,0.1)] p-3 mb-3 ${className}`}>
      {/* Header: small mark + label */}
      <div className="flex items-center gap-2 mb-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.5l1.8 3.65L17.8 7l-2.9 2.83L15.2 13 12 11.3 8.8 13l.3-3.17L6.2 7l3-0.85L12 2.5z" fill="#39C0E8" />
          <circle cx="19" cy="5" r="2" fill="#8FE3FF" />
        </svg>
        <span className="text-sm font-semibold text-secondary">HireAide AI</span>
      </div>

      {/* Listening row — compact */}
      <div className="flex items-center gap-3">
        <div className="waveform flex items-end gap-1 flex-shrink-0" style={{ width: 64, height: 22 }}>
          <div className="bar bg-[#3BA3F6] rounded-sm" style={{ animationDelay: "0s" }} />
          <div className="bar bg-[#5EC6FF] rounded-sm" style={{ animationDelay: "0.06s" }} />
          <div className="bar bg-[#1f87d1] rounded-sm" style={{ animationDelay: "0.12s" }} />
          <div className="bar bg-[#3BA3F6] rounded-sm" style={{ animationDelay: "0.02s" }} />
          <div className="bar bg-[#7fd1ff] rounded-sm" style={{ animationDelay: "0.08s" }} />
        </div>

        <span className="text-sm font-medium text-primary">AI Assistant is listening...</span>
      </div>
    </div>
  );
}
