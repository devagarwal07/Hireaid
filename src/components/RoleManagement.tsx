import React, { useState } from "react";
import CreateNewRole from "@/components/CreateNewRole";

interface Role {
  id: string;
  name: string;
  description: string;
}

interface RoleManagementProps {
  onBack: () => void;
}

const RoleManagement: React.FC<RoleManagementProps> = ({ onBack }) => {
  const [showCreateNewRole, setShowCreateNewRole] = useState(false);

  if (showCreateNewRole) {
    return <CreateNewRole onBack={() => setShowCreateNewRole(false)} />;
  }
  const roles: Role[] = [
    {
      id: "1",
      name: "SuperAdmin",
      description: "Access to all privileges",
    },
    {
      id: "2",
      name: "Interviewer",
      description: "Access to Schedule, Interview Prep",
    },
    {
      id: "3",
      name: "Recruiter",
      description:
        "Access to Job Creation, Candidate profiles, 360 evaluation, Hiring pipeline, Schedule creation, Interview reports",
    },
  ];

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
          User Management
        </button>
        <span className="text-sm text-text-secondary">/</span>
        <span className="text-sm text-text-primary font-medium">
          Role Management
        </span>
      </div>

      <hr className="border-t border-gray-200 mb-6" />

      {/* Create New Role Button */}
      <button
        onClick={() => setShowCreateNewRole(true)}
        className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-left group mb-6 w-full"
      >
        <div className="w-12 h-12 rounded-full bg-badge-blue flex items-center justify-center flex-shrink-0">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0857A1"
            strokeWidth="2"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-text-primary mb-1">
            Create New Role
          </h3>
          <p className="text-sm text-text-secondary">
            Create and define new user roles with ease
          </p>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#626262"
          strokeWidth="2"
          className="flex-shrink-0"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Roles Section */}
      <div>
        <h3 className="text-base font-semibold text-text-secondary mb-4">Roles</h3>

        {/* Roles Container */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {roles.map((role, index) => (
            <React.Fragment key={role.id}>
              <div className="flex items-center gap-4 p-4 bg-white hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-text-primary mb-1">
                    {role.name}
                  </h4>
                  <p className="text-sm text-text-secondary">{role.description}</p>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#626262"
                  strokeWidth="2"
                  className="flex-shrink-0 cursor-pointer hover:stroke-[#0857A1] transition-colors"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
              {index < roles.length - 1 && (
                <hr className="border-t border-gray-200 mx-4" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;
