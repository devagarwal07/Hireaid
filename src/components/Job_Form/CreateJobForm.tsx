import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";

type Props = {
  onClose: () => void;
};

export default function CreateJobModal({ onClose }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const options = [
    { id: "custom", title: "Create a Custom Job", icon: "/icons/edit-blue.svg" },
    { id: "upload", title: "Upload Existing JD", icon: "/icons/upload-blue.svg" },
    { id: "ai", title: "Generate Job using AI", icon: "/icons/magic-blue.svg" },
  ];

  function handleProceed() {
    if (!selected) return;
    // simple routing map for each option
    if (selected === "custom") navigate("/job-form/custom");
    else if (selected === "upload") navigate("/job-form/upload");
    else if (selected === "ai") navigate("/job-form/ai");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
      <div className="bg-white w-[520px] rounded-xl p-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Create Job</h2>
          <button className="text-gray-500 hover:text-black" onClick={onClose}>
            ✕
          </button>
        </div>

        <p className="text-gray-600 mb-6">Select any one option to get started with job creation</p>

        {/* Options */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {options.map((opt) => (
            <div
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`cursor-pointer p-4 rounded-xl border transition ${
                selected === opt.id ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <img src={opt.icon} className="w-10 h-10" alt="" />
                <p className="text-sm text-center font-medium">{opt.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <Button
            onClick={handleProceed}
            disabled={!selected}
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
}