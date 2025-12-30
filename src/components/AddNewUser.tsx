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

interface FormErrors {
  username?: string;
  email?: string;
  role?: string;
}

const AddNewUser: React.FC<AddNewUserProps> = ({ onBack, onInvite }) => {
  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    email: "",
    role: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (field: keyof UserFormData, value: string): string | undefined => {
    switch (field) {
      case "username":
        if (!value.trim()) return "Username is required";
        if (value.trim().length < 2) return "Username must be at least 2 characters";
        return undefined;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!validateEmail(value)) return "Please enter a valid email address";
        return undefined;
      case "role":
        if (!value) return "Please select a role";
        return undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as (keyof UserFormData)[]).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const isFormValid = (): boolean => {
    return (
      formData.username.trim().length >= 2 &&
      validateEmail(formData.email) &&
      formData.role !== ""
    );
  };

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof UserFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleInvite = () => {
    // Mark all fields as touched
    setTouched({ username: true, email: true, role: true });

    if (validateForm()) {
      console.log("Inviting user:", formData);
      if (onInvite) onInvite(formData);
    }
  };

  const getInputClassName = (field: keyof UserFormData) => {
    const baseClass = "w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white";
    const hasError = touched[field] && errors[field];
    return `${baseClass} ${hasError
      ? "border-red-500 text-red-700 focus:ring-red-500"
      : "border-border-card text-text-placeholder focus:ring-blue-500"
      }`;
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
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
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
        <span className="text-text-secondary">/</span>
        <span className="text-sm font-medium text-text-primary">Add new User</span>
      </div>
      <hr className="border-t border-gray-200 mb-6" />

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Enter User Name */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-text-secondary">
              Enter User Name
            </label>
            <svg
              className="w-4 h-4 text-text-placeholder"
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
              onBlur={() => handleBlur("username")}
              placeholder="Enter Username"
              className={getInputClassName("username")}
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-placeholder"
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
          {touched.username && errors.username ? (
            <p className="text-xs text-red-500 mt-1">{errors.username}</p>
          ) : (
            <p className="text-xs text-text-placeholder mt-1">Required</p>
          )}
        </div>

        {/* Enter Email */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-text-secondary">
              Enter Email
            </label>
            <svg
              className="w-4 h-4 text-text-placeholder"
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
              onBlur={() => handleBlur("email")}
              placeholder="Enter Email"
              className={getInputClassName("email")}
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-placeholder"
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
          {touched.email && errors.email ? (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          ) : (
            <p className="text-xs text-text-placeholder mt-1">Required</p>
          )}
        </div>

        {/* Select Role */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-text-secondary">
              Select Role
            </label>
            <svg
              className="w-4 h-4 text-text-placeholder"
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
              onBlur={() => handleBlur("role")}
              className={`w-full px-4 py-3 pr-10 border rounded-lg text-left focus:outline-none focus:ring-2 focus:border-transparent bg-white min-h-[48px] flex items-center ${touched.role && errors.role
                  ? "border-red-500 focus:ring-red-500"
                  : "border-border-card focus:ring-blue-500"
                }`}
            >
              {formData.role ? (
                <span className="inline-flex items-center px-3 py-1 bg-badge-blue text-primary text-sm font-medium rounded-full">
                  {formData.role.charAt(0).toUpperCase() +
                    formData.role.slice(1)}
                </span>
              ) : (
                <span className="text-text-placeholder">Not Selected</span>
              )}
            </button>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-placeholder pointer-events-none"
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
              className="hidden absolute z-10 w-full mt-1 bg-white border border-border-card rounded-lg shadow-lg"
            >
              <div className="p-2">
                {/* Superadmin Option */}
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange("role", "superadmin");
                    setTouched((prev) => ({ ...prev, role: true }));
                    setErrors((prev) => ({ ...prev, role: undefined }));
                    document
                      .getElementById("role-dropdown")
                      ?.classList.add("hidden");
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-gray-50 transition-colors ${formData.role === "superadmin" ? "bg-badge-blue" : ""
                    }`}
                >
                  <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center flex-shrink-0">
                    {formData.role === "superadmin" && (
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <span className="text-sm text-text-primary">Superadmin</span>
                </button>

                {/* Recruiter Option */}
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange("role", "recruiter");
                    setTouched((prev) => ({ ...prev, role: true }));
                    setErrors((prev) => ({ ...prev, role: undefined }));
                    document
                      .getElementById("role-dropdown")
                      ?.classList.add("hidden");
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-gray-50 transition-colors ${formData.role === "recruiter" ? "bg-badge-blue" : ""
                    }`}
                >
                  <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center flex-shrink-0">
                    {formData.role === "recruiter" && (
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <span className="text-sm text-text-primary">Recruiter</span>
                </button>

                {/* Interviewer Option */}
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange("role", "interviewer");
                    setTouched((prev) => ({ ...prev, role: true }));
                    setErrors((prev) => ({ ...prev, role: undefined }));
                    document
                      .getElementById("role-dropdown")
                      ?.classList.add("hidden");
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-gray-50 transition-colors ${formData.role === "interviewer" ? "bg-badge-blue" : ""
                    }`}
                >
                  <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center flex-shrink-0">
                    {formData.role === "interviewer" && (
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <span className="text-sm text-text-primary">Interviewer</span>
                </button>

                {/* Add New Role */}
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 text-left bg-muted-bg rounded-full hover:bg-gray-300 transition-colors mt-1 w-fit"
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
                  <span className="text-sm text-primary font-medium">
                    Add New Role
                  </span>
                </button>
              </div>
            </div>
          </div>
          {touched.role && errors.role ? (
            <p className="text-xs text-red-500 mt-1">{errors.role}</p>
          ) : (
            <p className="text-xs text-text-placeholder mt-1">Required</p>
          )}
        </div>
      </div>

      {/* Invite Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleInvite}
          disabled={!isFormValid()}
          className={`px-6 py-2.5 rounded-full font-medium text-sm transition-colors ${isFormValid()
              ? "bg-primary hover:bg-primary-hover transition-colors duration-200 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Invite User
        </button>
      </div>
    </div>
  );
};

export default AddNewUser;

