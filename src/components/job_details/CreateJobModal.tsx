import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  onClose: () => void;
};

type Step = "select" | "upload" | "ai";

export default function CreateJobModal({ onClose }: Props) {
  const [step, setStep] = useState<Step>("select");
  const [selected, setSelected] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [aiPrompt, setAiPrompt] = useState(`Generate a comprehensive job description for the role of an HR Quality & Training Specialist. The description should include:

1. Job Title
2. Job Summary (2-3 lines)
3. Key Responsibilities (6-10 bullet points)
4. Required Qualifications and Skills (education, experience, certifications, soft skills)
5. Preferred Qualifications (optional)
6. Work Environment and Reporting Structure
7. Location (can be remote or hybrid if applicable)
8. Employment Type (e.g., full-time, contract)

The focus should be on responsibilities like improving process-quality, developing and delivering training programs for HR staff, monitoring compliance with HR standards, and supporting continuous improvement initiatives. Keep the tone professional and suitable for a mid to senior level corporate HR role.`);
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(name => name !== fileName));
  };

  const handleGenerateQuestions = () => {
    // Navigate to next step or close modal
    navigate("/job-form?mode=upload");
    onClose();
  };

  const handleProceedAI = () => {
    // Navigate to next step or close modal
    navigate("/job-form?mode=ai");
    onClose();
  };

  const handleProceed = () => {
    if (!selected) return;

    if (selected === "custom") {
      navigate("/job-form");
      onClose();
    } else if (selected === "upload") {
      setStep("upload");
    } else if (selected === "ai") {
      setStep("ai");
    }
  };

  const handleBack = () => {
    setStep("select");
    setSelected(null);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-lg max-w-[640px] w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#E2E2E2]">
          <div className="flex items-center gap-2">
            {step !== "select" && (
              <button
                onClick={handleBack}
                className="text-[#181D27] hover:text-[#0857A1] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            <h2 className="font-['Poppins'] font-semibold text-lg text-[#181D27]">
              {step === "select" && "Create Job"}
              {step === "upload" && "Create Job / Upload Existing JD"}
              {step === "ai" && "Create Job / Generate Using AI"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#717171] hover:text-[#181D27] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="p-6">
          {step === "select" && (
            <>
              <p className="font-['Poppins'] text-sm text-[#717171] mb-6">
                Select any one option to get started with job creation
              </p>

              {/* Options */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div
                  onClick={() => setSelected("custom")}
                  className={`cursor-pointer p-6 rounded-xl border transition-all ${
                    selected === "custom"
                      ? "border-[#0857A1] bg-[#F0F8FF]"
                      : "border-[#D5D7DA] hover:border-[#0857A1] hover:bg-[#F0F8FF]"
                  }`}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#E8F4FD] flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#0857A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.50023C18.8978 2.10243 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.10243 21.5 2.50023C21.8978 2.89804 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.10243 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="#0857A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-['Poppins'] text-sm text-center font-medium text-[#181D27]">
                      Create a Custom Job
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => setSelected("upload")}
                  className={`cursor-pointer p-6 rounded-xl border transition-all ${
                    selected === "upload"
                      ? "border-[#0857A1] bg-[#F0F8FF]"
                      : "border-[#D5D7DA] hover:border-[#0857A1] hover:bg-[#F0F8FF]"
                  }`}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#E8F4FD] flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="#0857A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-['Poppins'] text-sm text-center font-medium text-[#181D27]">
                      Upload Existing JD
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => setSelected("ai")}
                  className={`cursor-pointer p-6 rounded-xl border transition-all ${
                    selected === "ai"
                      ? "border-[#0857A1] bg-[#F0F8FF]"
                      : "border-[#D5D7DA] hover:border-[#0857A1] hover:bg-[#F0F8FF]"
                  }`}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#E8F4FD] flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#0857A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-['Poppins'] text-sm text-center font-medium text-[#181D27]">
                      Generate Job using AI
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end">
                <button
                  onClick={handleProceed}
                  disabled={!selected}
                  className={`px-5 py-2.5 rounded-lg font-['Poppins'] font-medium text-sm text-white transition-colors
                    ${selected ? "bg-[#0857A1] hover:bg-[#074a8a]" : "bg-[#CCCCCC] cursor-not-allowed"}
                  `}
                >
                  Proceed
                </button>
              </div>
            </>
          )}

          {step === "upload" && (
            <>
              <div className="mb-6">
                <label className="block font-['Poppins'] font-medium text-sm text-[#181D27] mb-3">
                  Upload Job Description File
                </label>
                
                {/* Upload Area */}
                <div className="border-2 border-dashed border-[#D5D7DA] rounded-lg p-8 text-center mb-4">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-3 text-[#989898]">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    multiple
                    accept=".pdf,.xls,.xlsx,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-block font-['Poppins'] font-medium text-sm text-[#0857A1] hover:underline mb-2"
                  >
                    Upload Document
                  </label>
                  <p className="font-['Poppins'] text-xs text-[#717171] mt-2">
                    Upload file formats to be in PDF or XLS format<br />
                    Maximum file size: 50MB - Maximum files allowed: 10
                  </p>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    {uploadedFiles.map((fileName, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-lg border border-[#EBEBEB]"
                      >
                        <div className="flex items-center gap-3">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#717171]">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="font-['Poppins'] text-sm text-[#181D27]">{fileName}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveFile(fileName)}
                          className="text-[#717171] hover:text-[#181D27] transition-colors"
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end">
                <button
                  onClick={handleGenerateQuestions}
                  disabled={uploadedFiles.length === 0}
                  className={`px-5 py-2.5 rounded-lg font-['Poppins'] font-medium text-sm text-white transition-colors
                    ${uploadedFiles.length > 0 ? "bg-[#0857A1] hover:bg-[#074a8a]" : "bg-[#CCCCCC] cursor-not-allowed"}
                  `}
                >
                  Generate Questions
                </button>
              </div>
            </>
          )}

          {step === "ai" && (
            <>
              <div className="mb-6">
                <label className="block font-['Poppins'] font-medium text-sm text-[#181D27] mb-3">
                  Generate Job Description
                </label>
                
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={12}
                  maxLength={500}
                  className="w-full p-4 border border-[#D5D7DA] rounded-lg font-['Poppins'] text-sm text-[#181D27] resize-none focus:outline-none focus:ring-2 focus:ring-[#0857A1] focus:border-transparent"
                  placeholder="Enter your prompt here..."
                />
                <div className="flex justify-end mt-2">
                  <span className="font-['Poppins'] text-xs text-[#717171]">
                    {aiPrompt.length}/500
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end">
                <button
                  onClick={handleProceedAI}
                  disabled={aiPrompt.trim().length === 0}
                  className={`px-5 py-2.5 rounded-lg font-['Poppins'] font-medium text-sm text-white transition-colors
                    ${aiPrompt.trim().length > 0 ? "bg-[#0857A1] hover:bg-[#074a8a]" : "bg-[#CCCCCC] cursor-not-allowed"}
                  `}
                >
                  Proceed
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
