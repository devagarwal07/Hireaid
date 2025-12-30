import React, { useRef, useState } from "react";
import { FiPaperclip, FiUpload } from "react-icons/fi";
import { RiArrowUpLine } from "react-icons/ri";

type Props = {
  text: string;
  setText: (v: string) => void;
  send: () => void;
  onAttachFile?: (file: File) => void;
  onUploadImage?: (file: File) => void;
};

export default function ChatInput({
  text,
  setText,
  send,
  onAttachFile,
  onUploadImage,
}: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<"idle" | "uploading" | "uploaded" | "failed">("idle");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    cb?: (f: File) => void
  ) => {
    const f = e.target.files?.[0];
    if (f) {
      setSelectedName(f.name);
      setIsUploading("uploading");
      cb?.(f);

      // simple fake state progression to mirror Figma upload states
      setTimeout(() => setIsUploading("uploaded"), 1000);
    }
    e.currentTarget.value = "";
  };

  return (
    <>
      {/* Hidden Pickers */}
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        onChange={(e) => handleFileChange(e, onAttachFile)}
      />
      <input
        ref={imageRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileChange(e, onUploadImage)}
      />

      {/* Container */}
      <div className="bg-white rounded-xl p-4 border border-[#DFDFDF] shadow-sm">
        {/* Input Field */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm placeholder-slate-400 focus:outline-none"
          placeholder="Ask anything..."
        />

        {/* Buttons Row */}
        <div className="mt-4 flex items-center justify-between">
          {/* Left Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-primary-light text-primary"
            >
              <FiPaperclip className="w-4 h-4" />
              Attach File
            </button>

            <button
              onClick={() => imageRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-primary-light text-primary"
            >
              <FiUpload className="w-4 h-4" />
              Upload Image
            </button>
          </div>

          {/* Send Button */}
          <button
            onClick={send}
            disabled={!text.trim()}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors
              ${
                text.trim()
                  ? "bg-primary hover:bg-[#2C77BD] text-white"
                  : "bg-neutral-dark text-white cursor-not-allowed"
              }`}
          >
            <RiArrowUpLine className="w-5 h-5" />
          </button>
        </div>

        {/* Upload states preview (simple visual based on selectedName + isUploading) */}
        {selectedName && (
          <div className="mt-4 space-y-2 text-xs">
            {isUploading === "uploading" && (
              <div className="flex items-center justify-between border border-[#E1E1E1] rounded-md px-3 py-2 bg-white">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <div className="absolute inset-0 rounded border border-border-input bg-white" />
                    <div className="absolute left-[10%] right-[35%] top-[45%] bottom-[15%] rounded bg-primary" />
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-text-primary leading-[18px]">{selectedName}</div>
                    <div className="flex items-center gap-2 text-[#535862] mt-0.5">
                      <span>Uploading</span>
                      <span className="w-px h-3 bg-[#D5D7DA]" />
                      <span className="flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full border border-[#A4A7AE]" />
                        <span>40%</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isUploading === "uploaded" && (
              <div className="flex items-center justify-between border border-[#E5E6E7] rounded-md px-3 py-2 bg-white">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <div className="absolute inset-0 rounded border border-border-input bg-white" />
                    <div className="absolute left-[10%] right-[35%] top-[45%] bottom-[15%] rounded bg-primary" />
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-text-primary leading-[18px]">{selectedName}</div>
                    <div className="flex items-center gap-2 text-[#535862] mt-0.5">
                      <span>Uploaded</span>
                      <span className="w-px h-3 bg-[#D5D7DA]" />
                      <span className="flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full border border-[#11A843]" />
                        <span>100%</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isUploading === "failed" && (
              <div className="flex items-center justify-between border border-[#E5E6E7] rounded-md px-3 py-2 bg-white">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <div className="absolute inset-0 rounded border border-border-input bg-white" />
                    <div className="absolute left-[10%] right-[35%] top-[45%] bottom-[15%] rounded bg-primary" />
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-text-primary leading-[18px]">{selectedName}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1 text-[#FF3636]">
                        <span className="w-4 h-4 rounded-full border border-[#FF3636]" />
                        <span>Upload failed</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
