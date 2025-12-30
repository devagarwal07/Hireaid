import React, { useState } from "react";
import Button from "@/components/Button";

interface AdminSettingsProps {
  onSave?: () => void;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ onSave }) => {
  const [formData, setFormData] = useState({
    companyName: "HireAide Demo Company",
    email: "oldphoneon@hireaide.com",
    location: "San Francisco",
    contactNumber: "212-4587-890",
    adminName: "Alice Johnson",
    designation: "General Manager",
    department: "Human Resources",
    contactAddress:
      "4567 Corporate Plaza, Suite 900, San Francisco, CA 94105, USA",
  });

  const [selectedTheme, setSelectedTheme] = useState(0);

  const themes = [
    { colors: ["#3B82F6", "#1E3A8A"] }, // Blue theme (selected)
    { colors: ["#10B981", "#065F46"] }, // Green theme
    { colors: ["#3B82F6", "#1E3A8A"] }, // Blue variant
    { colors: ["#10B981", "#065F46"] }, // Green variant
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving admin settings:", formData);
    if (onSave) onSave();
  };

  return (
    <div
      className="bg-white rounded-lg p-6 border border-gray-200"
      style={{ boxShadow: "0 2px 11px rgba(0,0,0,0.08)" }}
    >
      <h2 className="text-2xl font-semibold text-text-primary mb-4">
        Admin Settings
      </h2>
      <hr className="border-t border-gray-200 mb-4" />

      {/* Profile Image Section */}
      <div className="mb-6">
        <div className="relative w-24 h-24 rounded-full bg-black flex items-center justify-center">
          <span className="text-white text-xl font-bold">HYREAIDE</span>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-gray-200">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Select Theme
        </label>
        <div className="flex gap-4">
          {themes.map((theme, index) => (
            <button
              key={index}
              onClick={() => setSelectedTheme(index)}
              className="relative w-16 h-16 rounded-full overflow-hidden border-2 transition-all"
              style={{
                borderColor:
                  selectedTheme === index ? "#3B82F6" : "transparent",
              }}
            >
              <div className="w-full h-full flex">
                <div
                  className="w-1/2 h-full"
                  style={{ background: theme.colors[0] }}
                />
                <div
                  className="w-1/2 h-full"
                  style={{ background: theme.colors[1] }}
                />
              </div>
              {selectedTheme === index && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
        {/* Company Name */}
        <div>
          <div className="relative">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Company Name
            </label>
            <svg
              className="absolute right-0 top-0 w-4 h-4 text-text-placeholder"
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
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-text-secondary mt-1">Required</p>
        </div>

        {/* Company Admin Name */}
        <div>
          <div className="relative">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Company Admin Name
            </label>
            <svg
              className="absolute right-0 top-0 w-4 h-4 text-text-placeholder"
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
          <input
            type="text"
            value={formData.adminName}
            onChange={(e) => handleInputChange("adminName", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-text-secondary mt-1">Required</p>
        </div>

        {/* Email Address */}
        <div>
          <div className="relative">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Email Address
            </label>
            <svg
              className="absolute right-0 top-0 w-4 h-4 text-text-placeholder"
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
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-text-secondary mt-1">Required</p>
        </div>

        {/* Designation */}
        <div>
          <div className="relative">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Designation
            </label>
            <svg
              className="absolute right-0 top-0 w-4 h-4 text-text-placeholder"
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
          <input
            type="text"
            value={formData.designation}
            onChange={(e) => handleInputChange("designation", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-text-secondary mt-1">Required</p>
        </div>

        {/* Location */}
        <div>
          <div className="relative">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Location
            </label>
            <svg
              className="absolute right-0 top-0 w-4 h-4 text-text-placeholder"
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
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-text-secondary mt-1">Required</p>
        </div>

        {/* Department */}
        <div>
          <div className="relative">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Department
            </label>
            <svg
              className="absolute right-0 top-0 w-4 h-4 text-text-placeholder"
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
          <input
            type="text"
            value={formData.department}
            onChange={(e) => handleInputChange("department", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-text-secondary mt-1">Required</p>
        </div>

        {/* Contact Number */}
        <div>
          <div className="relative">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Contact Number
            </label>
            <svg
              className="absolute right-0 top-0 w-4 h-4 text-text-placeholder"
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
          <input
            type="tel"
            value={formData.contactNumber}
            onChange={(e) => handleInputChange("contactNumber", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-text-secondary mt-1">Required</p>
        </div>

        {/* Contact Address */}
        <div>
          <div className="relative">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Contact Address
            </label>
            <svg
              className="absolute right-0 top-0 w-4 h-4 text-text-placeholder"
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
          <input
            type="text"
            value={formData.contactAddress}
            onChange={(e) =>
              handleInputChange("contactAddress", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-text-secondary mt-1">Required</p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
