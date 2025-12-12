import React, { useState } from "react";

interface AddNewUserProps {
  onBack?: () => void;
  onInvite?: (userData: UserFormData) => void;
}

interface UserFormData {
  username: string;
  email: string;
  role: string;
}

const AddNewUser: React.FC<AddNewUserProps> = ({ onBack, onInvite }) => {
  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    email: "",
    role: "",
  });

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInvite = () => {
    console.log("Inviting user:", formData);
    if (onInvite) onInvite(formData);
  };

  return (
    <div
      className="bg-white rounded-lg p-6 border border-gray-200"
      style={{ boxShadow: "0 2px 11px rgba(0,0,0,0.08)" }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#626262] hover:text-[#181D27] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm">User Management</span>
        </button>
        <span className="text-[#626262]">/</span>
        <span className="text-sm font-medium text-[#181D27]">Add new User</span>
      </div>
      <hr className="border-t border-gray-200 mb-6" />

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Enter User Name */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-[#626262]">
              Enter User Name
            </label>
            <svg
              className="w-4 h-4 text-[#9CA3AF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 16v-4m0-4h.01"
              />
            </svg>
          </div>
          <div className="relative">
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              placeholder="Enter Username"
              className="w-full px-4 py-3 pr-10 border border-[#E5E7EB] rounded-lg text-[#9CA3AF] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-1">Required</p>
        </div>

        {/* Enter Email */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-[#626262]">
              Enter Email
            </label>
            <svg
              className="w-4 h-4 text-[#9CA3AF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 16v-4m0-4h.01"
              />
            </svg>
          </div>
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter Email"
              className="w-full px-4 py-3 pr-10 border border-[#E5E7EB] rounded-lg text-[#9CA3AF] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-1">Required</p>
        </div>

        {/* Select Role */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-[#626262]">
              Select Role
            </label>
            <svg
              className="w-4 h-4 text-[#9CA3AF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 16v-4m0-4h.01"
              />
            </svg>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                const dropdown = document.getElementById("role-dropdown");
                if (dropdown) {
                  dropdown.classList.toggle("hidden");
                }
              }}
              className="w-full px-4 py-3 pr-10 border border-[#E5E7EB] rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-h-[48px] flex items-center"
            >
              {formData.role ? (
                <span className="inline-flex items-center px-3 py-1 bg-[#EBF2FF] text-[#0857A1] text-sm font-medium rounded-full">
                  {formData.role.charAt(0).toUpperCase() +
                    formData.role.slice(1)}
                </span>
              ) : (
                <span className="text-[#9CA3AF]">Not Selected</span>
              )}
            </button>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF] pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>

            {/* Custom Dropdown */}
            <div
              id="role-dropdown"
              className="hidden absolute z-10 w-full mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg"
            >
              <div className="p-2">
                {/* Superadmin Option */}
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange("role", "superadmin");
                    document
                      .getElementById("role-dropdown")
                      ?.classList.add("hidden");
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-gray-50 transition-colors ${
                    formData.role === "superadmin" ? "bg-[#EBF2FF]" : ""
                  }`}
                >
                  <div className="w-4 h-4 rounded-full border-2 border-[#9CA3AF] flex items-center justify-center flex-shrink-0">
                    {formData.role === "superadmin" && (
                      <div className="w-2 h-2 rounded-full bg-[#0857A1]"></div>
                    )}
                  </div>
                  <span className="text-sm text-[#181D27]">Superadmin</span>
                </button>

                {/* Recruiter Option */}
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange("role", "recruiter");
                    document
                      .getElementById("role-dropdown")
                      ?.classList.add("hidden");
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-gray-50 transition-colors ${
                    formData.role === "recruiter" ? "bg-[#EBF2FF]" : ""
                  }`}
                >
                  <div className="w-4 h-4 rounded-full border-2 border-[#9CA3AF] flex items-center justify-center flex-shrink-0">
                    {formData.role === "recruiter" && (
                      <div className="w-2 h-2 rounded-full bg-[#0857A1]"></div>
                    )}
                  </div>
                  <span className="text-sm text-[#181D27]">Recruiter</span>
                </button>

                {/* Interviewer Option */}
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange("role", "interviewer");
                    document
                      .getElementById("role-dropdown")
                      ?.classList.add("hidden");
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-gray-50 transition-colors ${
                    formData.role === "interviewer" ? "bg-[#EBF2FF]" : ""
                  }`}
                >
                  <div className="w-4 h-4 rounded-full border-2 border-[#9CA3AF] flex items-center justify-center flex-shrink-0">
                    {formData.role === "interviewer" && (
                      <div className="w-2 h-2 rounded-full bg-[#0857A1]"></div>
                    )}
                  </div>
                  <span className="text-sm text-[#181D27]">Interviewer</span>
                </button>

                {/* Add New Role */}
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 text-left bg-[#F3F4F6] rounded-full hover:bg-gray-300 transition-colors mt-1 w-fit"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0857A1"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span className="text-sm text-[#0857A1] font-medium">
                    Add New Role
                  </span>
                </button>
              </div>
            </div>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-1">Required</p>
        </div>
      </div>

      {/* Invite Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleInvite}
          className="px-6 py-2.5 bg-[#0857A1] hover:bg-[#176CBA] text-white rounded-full font-medium text-sm transition-colors"
        >
          Invite User
        </button>
      </div>
    </div>
  );
};

export default AddNewUser;
