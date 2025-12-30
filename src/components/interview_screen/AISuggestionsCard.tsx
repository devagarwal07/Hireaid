type AISuggestionVariant = "listening" | "submitting" | "success" | "observation";

type Props = {
  variant?: AISuggestionVariant;
  primaryLabel?: string;
  onPrimaryAction?: () => void;
};

const headlineByVariant: Record<AISuggestionVariant, string> = {
  listening: "AI Assistant is listening...",
  submitting: "Submitting candidate answer",
  success: "Successfully Submitted & Evaluated",
  observation: "Observation by AI",
};

export default function AISuggestionsCard({
  variant = "listening",
  primaryLabel = "Submit & Next",
  onPrimaryAction,
}: Props) {
  const headline = headlineByVariant[variant];

  const description =
    variant === "observation"
      ? "The answer the Candidate gave is most likely plagiarised, Ask Interviewee to share his screen while answering the next question and pay attention to his eye movement."
      : undefined;

  const showDescription = Boolean(description);

  return (
    <div className="w-full bg-white shadow-[4px_4px_40px_rgba(0,0,0,0.1)] rounded-2xl border border-[#EFEFEF] px-4 py-4 mb-3">
      {/* Header: HireAide AI */}
      <div className="flex flex-col gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span
            className="w-4 h-4 rounded"
            style={{
              background:
                "linear-gradient(155.56deg,#2DD4BD 4.69%,#6990F9 94.79%)",
            }}
          />
          <span className="text-[12px] font-medium text-text-primary">
            HireAide AI
          </span>
        </div>
        <span className="h-px w-full bg-black/10" />
      </div>

      {/* Body headline */}
      <div className="flex items-start gap-2 mb-4">
        <div className="w-5 h-5 rounded bg-[linear-gradient(155.56deg,#19B9A3_4.69%,#6990F9_94.79%)] flex items-center justify-center text-white text-[10px]">
          {/* simple audio spectrum glyph substitute */}
          <div className="flex items-end gap-[2px]">
            <span className="w-[2px] h-[8px] bg-white/80" />
            <span className="w-[2px] h-[11px] bg-white/70" />
            <span className="w-[2px] h-[6px] bg-white/90" />
          </div>
        </div>

        <div className="flex-1">
          <p
            className="text-[14px] font-medium leading-[21px] bg-gradient-to-r from-[#19B9A3] to-[#6990F9] bg-clip-text text-transparent"
          >
            {headline}
          </p>
          {showDescription && (
            <p className="mt-2 text-[14px] leading-[21px] text-[#FF3737]">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
