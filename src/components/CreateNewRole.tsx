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

interface FormErrors {
  roleName?: string;
  permissions?: string;
}

const CreateNewRole: React.FC<CreateNewRoleProps> = ({ onBack }) => {
  const [roleName, setRoleName] = useState("");
  const [activeTab, setActiveTab] = useState<PermissionTab>("Job Description");
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(
    new Set()
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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

  const validateRoleName = (name: string): string | undefined => {
    if (!name.trim()) return "Role name is required";
    if (name.trim().length < 2) return "Role name must be at least 2 characters";
    return undefined;
  };

  const validatePermissions = (): string | undefined => {
    if (selectedPermissions.size === 0) return "Please select at least one permission";
    return undefined;
  };

  const isFormValid = (): boolean => {
    return roleName.trim().length >= 2 && selectedPermissions.size > 0;
  };

  const handleRoleNameChange = (value: string) => {
    setRoleName(value);
    if (errors.roleName) {
      setErrors((prev) => ({ ...prev, roleName: undefined }));
    }
  };

  const handleRoleNameBlur = () => {
    setTouched((prev) => ({ ...prev, roleName: true }));
    const error = validateRoleName(roleName);
    setErrors((prev) => ({ ...prev, roleName: error }));
  };

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
    // Clear permission error when user selects something
    if (errors.permissions && newSelected.size > 0) {
      setErrors((prev) => ({ ...prev, permissions: undefined }));
    }
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

  const handleCreateRole = () => {
    // Mark fields as touched
    setTouched({ roleName: true, permissions: true });

    const roleNameError = validateRoleName(roleName);
    const permissionsError = validatePermissions();

    setErrors({
      roleName: roleNameError,
      permissions: permissionsError,
    });

    if (!roleNameError && !permissionsError) {
      console.log("Creating role:", roleName, "with permissions:", Array.from(selectedPermissions));
      // Proceed with role creation
    }
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
          className="text-sm text-text-secondary hover:text-primary transition-colors flex items-center gap-1"
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
        <span className="text-sm text-text-secondary">User Management</span>
        <span className="text-sm text-text-secondary">/</span>
        <span className="text-sm text-text-secondary">Role Management</span>
        <span className="text-sm text-text-secondary">/</span>
        <span className="text-sm text-text-primary font-medium">
          Create New Role
        </span>
      </div>

      <hr className="border-t border-gray-200 mb-6" />

      {/* Role Name Input */}
      <div className="mb-6">
        <label className="block text-sm text-text-secondary mb-2">
          Enter Role Name
        </label>
        <div className="relative">
          <input
            type="text"
            value={roleName}
            onChange={(e) => handleRoleNameChange(e.target.value)}
            onBlur={handleRoleNameBlur}
            placeholder="Not Selected"
            className={`w-full px-4 py-3 border rounded-lg text-sm text-text-primary placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:border-transparent ${touched.roleName && errors.roleName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
              }`}
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
        {touched.roleName && errors.roleName ? (
          <p className="text-xs text-red-500 mt-1">{errors.roleName}</p>
        ) : (
          <p className="text-xs text-text-secondary mt-1">Required</p>
        )}
      </div>

      {/* Permissions Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-text-primary">
            Permissions
          </h3>
          {touched.permissions && errors.permissions && (
            <span className="text-xs text-red-500">{errors.permissions}</span>
          )}
        </div>

        {/* Grey Bordered Container */}
        <div className={`border rounded-lg overflow-hidden ${touched.permissions && errors.permissions ? "border-red-300" : "border-gray-200"
          }`}>
          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-gray-200 bg-muted-bg px-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-1 py-3 text-sm font-medium transition-colors relative ${activeTab === tab
                    ? "text-primary"
                    : "text-text-secondary hover:text-text-primary"
                  }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
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
                            className="text-sm font-medium text-text-primary cursor-pointer"
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
                                  className="text-sm text-text-secondary cursor-pointer"
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
                    <p className="text-sm text-text-placeholder italic">
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
        <button
          onClick={handleCreateRole}
          disabled={!isFormValid()}
          className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${isFormValid()
              ? "bg-primary text-white hover:bg-primary-dark"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Create Role
        </button>
      </div>
    </div>
  );
};

export default CreateNewRole;

