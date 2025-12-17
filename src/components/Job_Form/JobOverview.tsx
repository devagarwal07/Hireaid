import { useState } from "react";
import AISuggestionCard from "./AiSuggestionCard";
import Button from "@/components/Button";

// Info icon component
const InfoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-400"
  >
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8 7V11M8 5V5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
}

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  required = true,
  error,
  touched,
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const showError = touched && error && !value.trim();
  const hasValue = value.trim().length > 0;

  const getBorderColor = () => {
    if (showError) return "border-red-500";
    if (isFocused) return "border-blue-500";
    return "border-gray-200";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm text-gray-700">{label}</label>
        <InfoIcon />
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-4 py-3 rounded-lg text-sm transition-colors focus:outline-none border ${getBorderColor()} ${hasValue ? "text-gray-900" : "text-gray-500"
          } placeholder-gray-400`}
        placeholder={placeholder}
      />
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-gray-400">{required ? "Required" : ""}</span>
        {showError && (
          <span className="text-xs text-red-500 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6" cy="6" r="5.5" stroke="currentColor" />
              <path d="M6 3.5V6.5M6 8V8.5" stroke="currentColor" strokeLinecap="round" />
            </svg>
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
}

const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = true,
  error,
  touched,
}: SelectFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const showError = touched && error && !value;
  const hasValue = value.length > 0;

  const getBorderColor = () => {
    if (showError) return "border-red-500";
    if (isFocused) return "border-blue-500";
    return "border-gray-200";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm text-gray-700">{label}</label>
        <InfoIcon />
      </div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-3 rounded-lg text-sm appearance-none transition-colors focus:outline-none border ${getBorderColor()} ${hasValue ? "text-gray-900" : "text-gray-500"
            } bg-white`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-gray-400">{required ? "Required" : ""}</span>
        {showError && (
          <span className="text-xs text-red-500 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6" cy="6" r="5.5" stroke="currentColor" />
              <path d="M6 3.5V6.5M6 8V8.5" stroke="currentColor" strokeLinecap="round" />
            </svg>
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default function JobOverview() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobId, setJobId] = useState("");
  const [industry, setIndustry] = useState("");
  const [areaOfWork, setAreaOfWork] = useState("");
  const [hiringManager, setHiringManager] = useState("");
  const [hiringLocation, setHiringLocation] = useState("");

  // Track which fields have been touched (blurred)
  const [touched, setTouched] = useState({
    jobTitle: false,
    jobId: false,
    industry: false,
    areaOfWork: false,
  });

  const allFilled = Boolean(
    jobTitle.trim() && jobId.trim() && industry.trim() && areaOfWork.trim()
  );

  const industryOptions = [
    { value: "hr", label: "Human Resources" },
    { value: "engineering", label: "Engineering" },
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
    { value: "finance", label: "Finance" },
  ];

  const areaOfWorkOptions = [
    { value: "recruitment", label: "Recruitment" },
    { value: "operations", label: "Operations" },
    { value: "product", label: "Product" },
    { value: "development", label: "Development" },
    { value: "management", label: "Management" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Complete Job Description</h3>
        <Button
          type="button"
          variant="tertiary"
          className="text-sm px-0 py-0 h-auto"
        >
          Show Preview
        </Button>
      </div>

      <div className="border border-gray-200 rounded-lg p-6 bg-white">
        <div className="grid grid-cols-2 gap-6">
          <InputField
            label="Job Title"
            value={jobTitle}
            onChange={(val) => {
              setJobTitle(val);
              setTouched((prev) => ({ ...prev, jobTitle: true }));
            }}
            placeholder="Enter Job Title"
            error="Field cannot be left blank"
            touched={touched.jobTitle}
          />

          <InputField
            label="Job ID/Requisition ID"
            value={jobId}
            onChange={(val) => {
              setJobId(val);
              setTouched((prev) => ({ ...prev, jobId: true }));
            }}
            placeholder="Enter Job ID"
            error="Field cannot be left blank"
            touched={touched.jobId}
          />

          <SelectField
            label="Industry/Department"
            value={industry}
            onChange={(val) => {
              setIndustry(val);
              setTouched((prev) => ({ ...prev, industry: true }));
            }}
            options={industryOptions}
            placeholder="Select Industry"
            error="Field cannot be left blank"
            touched={touched.industry}
          />

          <SelectField
            label="Area of Work"
            value={areaOfWork}
            onChange={(val) => {
              setAreaOfWork(val);
              setTouched((prev) => ({ ...prev, areaOfWork: true }));
            }}
            options={areaOfWorkOptions}
            placeholder="Select Area of Work"
            error="Field cannot be left blank"
            touched={touched.areaOfWork}
          />
        </div>

        {/* After the main fields — show AI suggestion UI when all 4 are filled */}
        {allFilled && (
          <div className="mt-6 space-y-4">
            {/* Banner image — replace src with your public image path */}
            <div className="rounded-md border border-blue-200 bg-blue-50 p-3 flex items-center gap-3">
              <img
                src="/images/generating-smart-suggestions.png"
                alt="generating"
                className="h-8 w-auto"
              />
              <span className="text-sm text-blue-700">Generating smart suggestions...</span>
            </div>

            {/* AI Assistant card */}
            <AISuggestionCard
              jobTitle={jobTitle}
              areaOfWork={areaOfWork}
              suggestedTitle="Senior HR Recruiter"
              suggestedArea="Talent acquisition"
            />
          </div>
        )}

        <hr className="my-6 border-gray-200" />

        <h4 className="text-lg font-medium mb-4">Manager and location</h4>
        <div className="grid grid-cols-2 gap-6">
          <InputField
            label="Hiring Manager"
            value={hiringManager}
            onChange={setHiringManager}
            placeholder="Enter Hiring Manager"
            required={false}
          />

          <InputField
            label="Hiring Location"
            value={hiringLocation}
            onChange={setHiringLocation}
            placeholder="Enter Hiring Location"
            required={false}
          />
        </div>
      </div>
    </div>
  );
}
