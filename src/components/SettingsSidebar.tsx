import React from "react";

type SettingsSection =
  | "admin"
  | "user-management"
  | "account-management"
  | "integrations"
  | "help"
  | "sign-out";

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const humanLockIcon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <rect x="16" y="11" width="7" height="8" rx="1" />
      <path d="M18 11V9a2 2 0 0 1 4 0v2" />
    </svg>
  );

  const menuItems = [
    {
      id: "admin" as SettingsSection,
      label: "Admin Settings",
      icon: humanLockIcon,
    },
    {
      id: "user-management" as SettingsSection,
      label: "User Management",
      icon: humanLockIcon,
    },
    {
      id: "account-management" as SettingsSection,
      label: "Account Management",
      icon: humanLockIcon,
    },
    {
      id: "integrations" as SettingsSection,
      label: "Integrations",
      icon: humanLockIcon,
    },
    {
      id: "help" as SettingsSection,
      label: "Help & Support",
      icon: humanLockIcon,
    },
    {
      id: "sign-out" as SettingsSection,
      label: "Sign Out",
      icon: humanLockIcon,
    },
  ];

  return (
    <div
      className="w-64 bg-white rounded-lg p-4 border border-gray-200"
      style={{ boxShadow: "0 2px 11px rgba(0,0,0,0.08)" }}
    >
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all ${
              activeSection === item.id
                ? "bg-badge-blue text-primary font-medium"
                : "text-text-secondary hover:bg-gray-50"
            }`}
          >
            <span
              className={
                activeSection === item.id ? "text-primary" : "text-text-secondary"
              }
            >
              {item.icon}
            </span>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SettingsSidebar;
export type { SettingsSection };
