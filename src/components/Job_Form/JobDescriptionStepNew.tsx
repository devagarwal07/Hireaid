import { useState, useRef, useEffect } from "react";
import JobDescriptionPreviewModal from "./JobDescriptionPreviewModal";

type SectionId =
  | "overview"
  | "manager-location"
  | "workplace"
  | "employment-details"
  | "job-description"
  | "experience-skills"
  | "compensation-legal";

interface FormData {
  // Overview
  jobTitle: string;
  jobId: string;
  department: string;
  areaOfWork: string;
  // Manager & Location
  hiringManager: string;
  hiringLocation: string;
  // Workplace
  workType: string;
  travelRequirement: string;
  // Employment Details
  employerClient: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  jobExpirationDate: string;
  // Job Description
  jobSummary: string;
  keyResponsibilities: string;
  requiredQualifications: string;
  preferredQualifications: string;
  // Experience & Skills
  yearsOfExperience: string;
  bestFitScore: string;
  skills: string;
  // Compensation & Legal
  salaryRange: string;
  workAuthorization: string;
}

interface JobDescriptionStepProps {
  formData?: Partial<FormData>;
  setFormData?: (data: FormData) => void;
  onNext?: () => void;
  onSaveDraft?: () => void;
}

const defaultFormData: FormData = {
  jobTitle: "Quality Analysis Specialist",
  jobId: "2462",
  department: "Human Resources",
  areaOfWork: "Recruitment",
  hiringManager: "Drake Smith",
  hiringLocation: "New York",
  workType: "On-site",
  travelRequirement: "",
  employerClient: "CNN",
  employmentType: "Full Time",
  startDate: "12-04-25",
  endDate: "12-04-25",
  jobExpirationDate: "12-04-25",
  jobSummary: "Immediate Joiner needed",
  keyResponsibilities: "Hiring, Candidate Handling, Interview, Recruitment",
  requiredQualifications: "B.Tech, MBA",
  preferredQualifications: "B.Tech, MBA",
  yearsOfExperience: "3",
  bestFitScore: "80",
  skills: "",
  salaryRange: "$80,000 - $100,000",
  workAuthorization: "",
};

const sidebarSections = [
  { id: "overview", label: "Overview", count: 2 },
  { id: "manager-location", label: "Manager & Location" },
  { id: "workplace", label: "Workplace" },
  { id: "employment-details", label: "Employment details" },
  { id: "job-description", label: "Job Description" },
  { id: "experience-skills", label: "Experience & Skills" },
  { id: "compensation-legal", label: "Compensation & Legal" },
];

// Info Icon Component
const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-30">
    <circle cx="8" cy="8" r="6.5" stroke="#1E1E1E" strokeWidth="2" />
    <path d="M8 7V11" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="5" r="1" fill="#1E1E1E" />
  </svg>
);

// Calendar Icon Component
const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="#989898" strokeWidth="1.5" />
    <path d="M16 2V6" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 2V6" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 10H21" stroke="#989898" strokeWidth="1.5" />
  </svg>
);

// Loader/Progress Icon Component
const LoaderIcon = ({ active }: { active?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle
      cx="9"
      cy="9"
      r="7.5"
      stroke={active ? "#0857A1" : "#D0D5DD"}
      strokeWidth="1.5"
      fill="none"
    />
    {active && (
      <path
        d="M9 1.5 A 7.5 7.5 0 0 1 16.5 9"
        stroke="#0857A1"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    )}
  </svg>
);

// AI Sparkle Icon
const AISparkleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M6.34072 3.11791C6.88144 1.53545 9.06784 1.48752 9.70894 2.97413L9.76319 3.11882L10.4929 5.25289C10.6601 5.74231 10.9304 6.19017 11.2854 6.56626C11.6404 6.94236 12.0719 7.23794 12.5509 7.43307L12.7471 7.50632L14.8811 8.23516C16.4634 8.77591 16.5114 10.9624 15.0257 11.6036L14.8811 11.6578L12.7471 12.3876C12.2575 12.5547 11.8095 12.8249 11.4333 13.1799C11.0571 13.535 10.7614 13.9666 10.5661 14.4457L10.4929 14.641L9.76409 16.776C9.22337 18.3584 7.03697 18.4064 6.39678 16.9206L6.34072 16.776L5.61192 14.6419C5.4448 14.1523 5.17462 13.7043 4.81959 13.328C4.46457 12.9517 4.03297 12.656 3.55392 12.4608L3.35861 12.3876L1.22465 11.6587C-0.358633 11.118 -0.406557 8.93144 1.07998 8.29122L1.22465 8.23516L3.35861 7.50632C3.848 7.33908 4.29584 7.06883 4.67192 6.71379C5.04799 6.35876 5.34356 5.92719 5.53868 5.44821L5.61192 5.25289L6.34072 3.11791ZM8.05241 3.70207L7.32361 5.83614C7.06897 6.58243 6.65473 7.26425 6.10973 7.83411C5.56472 8.40397 4.90206 8.84818 4.16788 9.13581L3.94183 9.2181L1.80787 9.94694L3.94183 10.6758C4.68808 10.9304 5.36987 11.3447 5.9397 11.8897C6.50953 12.4348 6.95371 13.0974 7.24132 13.8317L7.32361 14.0577L8.05241 16.1918L8.78121 14.0577C9.03584 13.3114 9.45009 12.6296 9.99509 12.0598C10.5401 11.4899 11.2028 11.0457 11.9369 10.7581L12.163 10.6767L14.2969 9.94694L12.163 9.2181C11.4167 8.96345 10.7349 8.54918 10.1651 8.00415C9.59529 7.45912 9.1511 6.79642 8.86349 6.06221L8.78211 5.83614L8.05241 3.70207ZM15.2862 1.6339e-07C15.4553 -2.13382e-07 15.6211 0.0474544 15.7646 0.136971C15.9082 0.226487 16.0237 0.354475 16.0981 0.50639L16.1415 0.612189L16.458 1.53997L17.3867 1.85646C17.5562 1.91406 17.7048 2.02069 17.8137 2.16284C17.9225 2.30499 17.9867 2.47626 17.9982 2.65495C18.0096 2.83363 17.9677 3.01169 17.8778 3.16655C17.788 3.32141 17.6542 3.44611 17.4934 3.52483L17.3867 3.56824L16.4589 3.88473L16.1425 4.81341C16.0848 4.9829 15.978 5.13144 15.8359 5.24022C15.6937 5.349 15.5224 5.41311 15.3437 5.42445C15.165 5.43578 14.987 5.39381 14.8322 5.30387C14.6774 5.21392 14.5528 5.08005 14.4742 4.91921L14.4308 4.81341L14.1143 3.88563L13.1857 3.56914C13.0161 3.51154 12.8675 3.40491 12.7587 3.26276C12.6498 3.12061 12.5856 2.94934 12.5742 2.77066C12.5627 2.59197 12.6046 2.41391 12.6945 2.25905C12.7843 2.10419 12.9182 1.9795 13.079 1.90077L13.1857 1.85736L14.1134 1.54087L14.4299 0.612189C14.4908 0.433529 14.6062 0.278432 14.7598 0.168645C14.9133 0.0588578 15.0974 -0.000113288 15.2862 1.6339e-07Z"
      fill="url(#paint0_linear_ai)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_ai"
        x1="6"
        y1="-1.5"
        x2="14.8865"
        y2="18.0516"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2DD4BD" />
        <stop offset="1" stopColor="#6990F9" />
      </linearGradient>
    </defs>
  </svg>
);

// Text Input Component
const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  showInfo = true,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  showInfo?: boolean;
}) => (
  <div className="flex flex-col gap-[6px]">
    <div className="flex justify-between items-center">
      <label className="text-sm font-normal text-[#626262] leading-[21px]">{label}</label>
      {showInfo && <InfoIcon />}
    </div>
    <div className="flex flex-col gap-[5px]">
      <div className="flex items-center px-4 py-[15px] bg-white border border-[#C8C8C8] rounded-[10px] h-[50px]">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 text-sm font-normal text-[#181D27] leading-[21px] outline-none bg-transparent"
        />
      </div>
      <span className="text-xs font-normal text-[#181D27] opacity-60 leading-[18px]">Required</span>
    </div>
  </div>
);

// Dropdown Component
const Dropdown = ({
  label,
  value,
  onChange,
  options,
  showInfo = true,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  showInfo?: boolean;
}) => (
  <div className="flex flex-col gap-[6px]">
    <div className="flex justify-between items-center">
      <label className="text-sm font-normal text-[#626262] leading-[21px]">{label}</label>
      {showInfo && <InfoIcon />}
    </div>
    <div className="flex flex-col gap-[5px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex items-center justify-between px-4 py-[15px] bg-white border border-[#C8C8C8] rounded-[10px] h-[50px] cursor-pointer text-sm font-normal text-[#181D27] leading-5 outline-none appearance-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M6 9L12 15L18 9\' stroke=\'%23989898\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <span className="text-xs font-normal text-[#181D27] opacity-60 leading-[18px]">Required</span>
    </div>
  </div>
);

// Date Input Component
const DateInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) => (
  <div className="flex flex-col gap-[6px]">
    <div className="flex justify-between items-center">
      <label className="text-sm font-normal text-[#626262] leading-[21px]">{label}</label>
    </div>
    <div className="flex flex-col gap-[5px]">
      <div className="flex items-center px-4 py-[15px] bg-white border border-[#C8C8C8] rounded-[10px] h-[50px]">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 text-sm font-normal text-[#181D27] leading-5 outline-none bg-transparent"
        />
        <CalendarIcon />
      </div>
      <span className="text-xs font-normal text-[#181D27] opacity-60 leading-[18px]">Required</span>
    </div>
  </div>
);

// Section Card Component
const SectionCard = ({
  title,
  children,
  id,
  sectionRef,
}: {
  title: string;
  children: React.ReactNode;
  id: string;
  sectionRef?: (el: HTMLElement | null) => void;
}) => (
  <div
    id={id}
    ref={sectionRef}
    className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] p-5"
  >
    <div className="flex flex-col gap-[15px]">
      <h3 className="text-xl font-medium text-[#181D27] leading-[30px]">{title}</h3>
      <div className="w-full h-[1px] bg-[rgba(0,0,0,0.1)]" />
      {children}
    </div>
  </div>
);

// AI Suggestion Card Component
const AISuggestionCard = () => (
  <div className="bg-[#F3FEFF] border border-[#88E6FF] rounded-[10px] p-5 flex flex-col gap-3">
    {/* Header */}
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-[6px]">
        <AISparkleIcon />
        <span className="text-base font-medium leading-6 bg-gradient-to-br from-[#19B9A3] to-[#6990F9] bg-clip-text text-transparent">
          AI Assistant
        </span>
      </div>
      <button className="text-sm font-semibold text-[#0857A1] leading-4 font-['Raleway']">
        Apply
      </button>
    </div>

    {/* Job Title Suggestion */}
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-[#626262] leading-[21px]">Job Title</span>
      <p className="text-sm font-normal text-[#181D27] leading-[150%]">
        • HR Quality & Training specialist is not a very commonly used term we recommend changing the
        title to something along the lines of "<strong>Senior HR Recruiter</strong>"
      </p>
    </div>

    {/* Area of Work Suggestion */}
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-[#626262] leading-[21px]">Area of work</span>
      <p className="text-sm font-normal text-[#181D27] leading-[150%]">
        • Recruitment is a narrowing down the scope of the request, its better to use "
        <strong>Talent acquisition</strong>"
      </p>
    </div>
  </div>
);

// Sidebar Item Component
const SidebarItem = ({
  label,
  active,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  count?: number;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2.5 w-full transition-colors relative ${active ? "bg-[#F0F9FF]" : "hover:bg-[#F9FAFB]"
      }`}
  >
    {/* Left border indicator for active state */}
    {active && (
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#0857A1] rounded-r-full" />
    )}
    <LoaderIcon active={active} />
    <span
      className={`text-sm leading-5 ${active ? "font-medium text-[#0857A1]" : "font-normal text-[#344054]"
        }`}
    >
      {label}
    </span>
    {count && (
      <span className="text-sm font-medium bg-gradient-to-br from-[#2DD4BD] to-[#6990F9] bg-clip-text text-transparent">
        {count}
      </span>
    )}
  </button>
);

export default function JobDescriptionStepNew({
  formData: propFormData,
  setFormData: propSetFormData,
  onNext,
  onSaveDraft,
}: JobDescriptionStepProps) {
  const [formData, setLocalFormData] = useState<FormData>({
    ...defaultFormData,
    ...propFormData,
  });
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Sync formData with propFormData when it changes from parent
  useEffect(() => {
    if (propFormData) {
      setLocalFormData(prev => ({
        ...prev,
        ...propFormData,
      }));
    }
  }, [propFormData]);

  const updateFormData = (updates: Partial<FormData>) => {
    const newData = { ...formData, ...updates };
    setLocalFormData(newData);
    propSetFormData?.(newData);
  };

  // Intersection observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { root: null, rootMargin: "-100px 0px -50% 0px", threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: SectionId) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-medium text-[#181D27] leading-7">
          Complete Job Description
        </h2>
        <button
          onClick={() => setIsPreviewOpen(true)}
          className="text-base font-medium text-[#0857A1] opacity-80 leading-6 hover:opacity-100 transition-opacity"
        >
          Show Preview
        </button>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-[220px] flex-shrink-0 bg-white border border-[#E4E7EC] rounded-xl overflow-hidden h-fit sticky top-4">
          <div className="flex flex-col py-2">
            {sidebarSections.map((section) => (
              <SidebarItem
                key={section.id}
                label={section.label}
                active={activeSection === section.id}
                count={section.count}
                onClick={() => scrollToSection(section.id as SectionId)}
              />
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-300px)] pr-2">
          {/* Overview Section */}
          <SectionCard
            title="Overview"
            id="overview"
            sectionRef={(el) => {
              sectionRefs.current["overview"] = el;
            }}
          >
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <div className="flex-1">
                  <TextInput
                    label="Job Title"
                    value={formData.jobTitle}
                    onChange={(val) => updateFormData({ jobTitle: val })}
                  />
                </div>
                <div className="flex-1">
                  <TextInput
                    label="Job ID/Requisition ID"
                    value={formData.jobId}
                    onChange={(val) => updateFormData({ jobId: val })}
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex-1">
                  <Dropdown
                    label="Industry/Department"
                    value={formData.department}
                    onChange={(val) => updateFormData({ department: val })}
                    options={["Human Resources", "Engineering", "Sales", "Marketing"]}
                  />
                </div>
                <div className="flex-1">
                  <Dropdown
                    label="Area of Work"
                    value={formData.areaOfWork}
                    onChange={(val) => updateFormData({ areaOfWork: val })}
                    options={["Recruitment", "Talent Acquisition", "Training", "Development"]}
                  />
                </div>
              </div>
              <AISuggestionCard />
            </div>
          </SectionCard>

          {/* Manager & Location Section */}
          <SectionCard
            title="Manager and location"
            id="manager-location"
            sectionRef={(el) => {
              sectionRefs.current["manager-location"] = el;
            }}
          >
            <div className="flex gap-5">
              <div className="flex-1">
                <TextInput
                  label="Hiring Manager"
                  value={formData.hiringManager}
                  onChange={(val) => updateFormData({ hiringManager: val })}
                />
              </div>
              <div className="flex-1">
                <TextInput
                  label="Hiring Location"
                  value={formData.hiringLocation}
                  onChange={(val) => updateFormData({ hiringLocation: val })}
                />
              </div>
            </div>
          </SectionCard>

          {/* Workplace Section */}
          <SectionCard
            title="Workplace"
            id="workplace"
            sectionRef={(el) => {
              sectionRefs.current["workplace"] = el;
            }}
          >
            <div className="flex flex-col gap-5">
              <Dropdown
                label="Work Type"
                value={formData.workType}
                onChange={(val) => updateFormData({ workType: val })}
                options={["On-site", "Remote", "Hybrid"]}
              />
              <Dropdown
                label="Travel Requirement"
                value={formData.travelRequirement || "NA"}
                onChange={(val) => updateFormData({ travelRequirement: val })}
                options={["NA", "Occasional", "Frequent"]}
              />
            </div>
          </SectionCard>

          {/* Employment Details Section */}
          <SectionCard
            title="Employment Details"
            id="employment-details"
            sectionRef={(el) => {
              sectionRefs.current["employment-details"] = el;
            }}
          >
            <div className="flex flex-col gap-5">
              <Dropdown
                label="Employer / Client"
                value={formData.employerClient}
                onChange={(val) => updateFormData({ employerClient: val })}
                options={["CNN", "ABC", "NBC"]}
              />
              <Dropdown
                label="Employment Type"
                value={formData.employmentType}
                onChange={(val) => updateFormData({ employmentType: val })}
                options={["Full Time", "Part Time", "Contract"]}
              />
              <div className="flex gap-5">
                <div className="flex-1">
                  <DateInput
                    label="Start Date"
                    value={formData.startDate}
                    onChange={(val) => updateFormData({ startDate: val })}
                  />
                </div>
                <div className="flex-1">
                  <DateInput
                    label="End Date"
                    value={formData.endDate}
                    onChange={(val) => updateFormData({ endDate: val })}
                  />
                </div>
                <div className="flex-1">
                  <DateInput
                    label="Job Expiration Date"
                    value={formData.jobExpirationDate}
                    onChange={(val) => updateFormData({ jobExpirationDate: val })}
                  />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Job Description Section */}
          <SectionCard
            title="Job Description"
            id="job-description"
            sectionRef={(el) => {
              sectionRefs.current["job-description"] = el;
            }}
          >
            <div className="flex flex-col gap-5">
              <TextInput
                label="Job Summary"
                value={formData.jobSummary}
                onChange={(val) => updateFormData({ jobSummary: val })}
              />
              <TextInput
                label="Key Responsibilities"
                value={formData.keyResponsibilities}
                onChange={(val) => updateFormData({ keyResponsibilities: val })}
              />
              <TextInput
                label="Required Qualifications"
                value={formData.requiredQualifications}
                onChange={(val) => updateFormData({ requiredQualifications: val })}
              />
              <TextInput
                label="Preferred Qualifications"
                value={formData.preferredQualifications}
                onChange={(val) => updateFormData({ preferredQualifications: val })}
              />
            </div>
          </SectionCard>

          {/* Experience & Skills Section */}
          <SectionCard
            title="Experience & Skills"
            id="experience-skills"
            sectionRef={(el) => {
              sectionRefs.current["experience-skills"] = el;
            }}
          >
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <div className="flex-1">
                  <TextInput
                    label="Years of Experience"
                    value={formData.yearsOfExperience}
                    onChange={(val) => updateFormData({ yearsOfExperience: val })}
                  />
                </div>
                <div className="flex-1">
                  <TextInput
                    label="Best Fit Score"
                    value={formData.bestFitScore}
                    onChange={(val) => updateFormData({ bestFitScore: val })}
                  />
                </div>
              </div>
              <TextInput
                label="Skills"
                value={formData.skills || "NA"}
                onChange={(val) => updateFormData({ skills: val })}
              />
            </div>
          </SectionCard>

          {/* Compensation & Legal Section */}
          <SectionCard
            title="Compensation & Legal"
            id="compensation-legal"
            sectionRef={(el) => {
              sectionRefs.current["compensation-legal"] = el;
            }}
          >
            <div className="flex flex-col gap-5">
              <TextInput
                label="Salary Range"
                value={formData.salaryRange}
                onChange={(val) => updateFormData({ salaryRange: val })}
              />
              <Dropdown
                label="Work Authorization"
                value={formData.workAuthorization || "NA"}
                onChange={(val) => updateFormData({ workAuthorization: val })}
                options={["NA", "US Citizen", "Green Card", "H1B"]}
              />
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-end items-center gap-3 pt-6 mt-4 border-t border-[#E4E7EC]">
        <button
          onClick={onSaveDraft}
          className="flex items-center px-5 py-3 bg-[#F4F5F5] rounded-full hover:bg-[#E8E9EA] transition-colors"
        >
          <span className="text-sm font-medium text-[#515B60]">Save as Draft</span>
        </button>
        <button
          onClick={onNext}
          className="flex items-center justify-center px-6 py-3 bg-[#0857A1] rounded-full min-w-[100px] hover:bg-[#074785] transition-colors"
        >
          <span className="text-sm font-medium text-white">Next</span>
        </button>
      </div>

      {/* Preview Modal */}
      <JobDescriptionPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        formData={formData}
      />
    </div>
  );
}
