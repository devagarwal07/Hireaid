import React, { useState } from "react";

interface CreateNewRoleProps {
  onBack: () => void;
}

type PermissionTab =
  | "Job Description"
  | "Schedule"
  | "Candidate Details"
  | "Interview"
  | "Reports";

interface Permission {
  id: string;
  label: string;
  children?: Permission[];
}

const CreateNewRole: React.FC<CreateNewRoleProps> = ({ onBack }) => {
  const [roleName, setRoleName] = useState("");
  const [activeTab, setActiveTab] = useState<PermissionTab>("Job Description");
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(
    new Set()
  );

  const permissions: Record<PermissionTab, Permission[]> = {
    "Job Description": [
      {
        id: "job-description",
        label: "Job Description",
        children: [
          { id: "create-jd", label: "Create JD" },
          { id: "edit-jd", label: "Edit JD" },
          {
            id: "create-edit-hiring-pipeline",
            label: "Create/Edit Hiring Pipeline",
          },
          { id: "post-jd", label: "Post JD" },
        ],
      },
    ],
    Schedule: [
      {
        id: "schedule",
        label: "Schedule",
        children: [
          { id: "schedule-interview", label: "Schedule Interview" },
          { id: "invite-users", label: "Invite Users" },
        ],
      },
    ],
    "Candidate Details": [
      {
        id: "candidate-details",
        label: "Candidate Details",
        children: [
          { id: "upload-resume", label: "Upload resume" },
          { id: "view-candidate-details", label: "View Candidate details" },
          { id: "view-candidate-scores", label: "View Candidate scores" },
        ],
      },
    ],
    Interview: [],
    Reports: [],
  };

  const tabs: PermissionTab[] = [
    "Job Description",
    "Schedule",
    "Candidate Details",
    "Interview",
    "Reports",
  ];

  const handleCheckboxChange = (permissionId: string, parent?: Permission) => {
    const newSelected = new Set(selectedPermissions);

    if (newSelected.has(permissionId)) {
      newSelected.delete(permissionId);
      // If parent is unchecked, uncheck all children
      if (parent?.children) {
        parent.children.forEach((child) => newSelected.delete(child.id));
      }
    } else {
      newSelected.add(permissionId);
    }

    setSelectedPermissions(newSelected);
  };

  const isParentChecked = (parent: Permission): boolean => {
    if (!parent.children) return selectedPermissions.has(parent.id);
    return parent.children.every((child) => selectedPermissions.has(child.id));
  };

  const isParentIndeterminate = (parent: Permission): boolean => {
    if (!parent.children) return false;
    const checkedChildren = parent.children.filter((child) =>
      selectedPermissions.has(child.id)
    );
    return (
      checkedChildren.length > 0 &&
      checkedChildren.length < parent.children.length
    );
  };

  return (
    <div
      className="bg-white rounded-lg p-6 border border-gray-200"
      style={{ boxShadow: "0 2px 11px rgba(0,0,0,0.08)" }}
    >
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={onBack}
          className="text-sm text-[#626262] hover:text-[#0857A1] transition-colors flex items-center gap-1"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm text-[#626262]">User Management</span>
        <span className="text-sm text-[#626262]">/</span>
        <span className="text-sm text-[#626262]">Role Management</span>
        <span className="text-sm text-[#626262]">/</span>
        <span className="text-sm text-[#181D27] font-medium">
          Create New Role
        </span>
      </div>

      <hr className="border-t border-gray-200 mb-6" />

      {/* Role Name Input */}
      <div className="mb-6">
        <label className="block text-sm text-[#626262] mb-2">
          Enter Role Name
        </label>
        <div className="relative">
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Not Selected"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-[#181D27] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </div>
        </div>
        <p className="text-xs text-[#626262] mt-1">Required</p>
      </div>

      {/* Permissions Section */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-[#181D27] mb-4">
          Permissions
        </h3>

        {/* Grey Bordered Container */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-gray-200 bg-[#F9FAFB] px-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-1 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab
                    ? "text-[#0038CE]"
                    : "text-[#626262] hover:text-[#181D27]"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0038CE]" />
                )}
              </button>
            ))}
          </div>

          {/* All Permissions List - Scrollable */}
          <div className="space-y-8 p-6 bg-white">
            {tabs.map((tabName) => (
              <div key={tabName} id={`section-${tabName}`}>
                <div className="space-y-4">
                  {permissions[tabName].length > 0 ? (
                    permissions[tabName].map((permission) => (
                      <div key={permission.id}>
                        {/* Parent Checkbox */}
                        <div className="flex items-center gap-3 mb-3">
                          <input
                            type="checkbox"
                            id={permission.id}
                            checked={isParentChecked(permission)}
                            ref={(el) => {
                              if (el) {
                                el.indeterminate =
                                  isParentIndeterminate(permission);
                              }
                            }}
                            onChange={() =>
                              handleCheckboxChange(permission.id, permission)
                            }
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor={permission.id}
                            className="text-sm font-medium text-[#181D27] cursor-pointer"
                          >
                            {permission.label}
                          </label>
                        </div>

                        {/* Child Checkboxes */}
                        {permission.children && (
                          <div className="ml-7 space-y-3">
                            {permission.children.map((child) => (
                              <div
                                key={child.id}
                                className="flex items-center gap-3"
                              >
                                <input
                                  type="checkbox"
                                  id={child.id}
                                  checked={selectedPermissions.has(child.id)}
                                  onChange={() =>
                                    handleCheckboxChange(child.id)
                                  }
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label
                                  htmlFor={child.id}
                                  className="text-sm text-[#626262] cursor-pointer"
                                >
                                  {child.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-[#9CA3AF] italic">
                      No permissions available
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Role Button */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-[#0857A1] text-white text-sm font-medium rounded-lg hover:bg-[#064680] transition-colors">
          Create Role
        </button>
      </div>
    </div>
  );
};

export default CreateNewRole;
