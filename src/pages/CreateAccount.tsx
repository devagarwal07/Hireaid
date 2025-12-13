import React, { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import SettingsSidebar from "@/components/SettingsSidebar";
import AdminSettings from "@/components/AdminSettings";
import UserManagement from "@/components/UserManagement";
import Integrations from "@/components/Integrations";
import type { SettingsSection } from "@/components/SettingsSidebar";

const CreateAccount: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>("admin");

  const handleSectionChange = (section: SettingsSection) => {
    setActiveSection(section);

    // Handle sign out separately
    if (section === "sign-out") {
      console.log("Signing out...");
      // Add sign out logic here
      return;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "admin":
        return <AdminSettings />;
      case "user-management":
        return <UserManagement />;
      case "account-management":
        return (
          <div
            className="bg-white rounded-lg p-8 border border-gray-200"
            style={{ boxShadow: "0 2px 11px rgba(0,0,0,0.08)" }}
          >
            <h2 className="text-2xl font-semibold text-[#181D27]">
              Account Management
            </h2>
            <p className="text-[#626262] mt-4">
              Account management content coming soon...
            </p>
          </div>
        );
      case "integrations":
        return <Integrations />;
      case "help":
        return (
          <div
            className="bg-white rounded-lg p-8 border border-gray-200"
            style={{ boxShadow: "0 2px 11px rgba(0,0,0,0.08)" }}
          >
            <h2 className="text-2xl font-semibold text-[#181D27]">
              Help & Support
            </h2>
            <p className="text-[#626262] mt-4">
              Help and support content coming soon...
            </p>
          </div>
        );
      default:
        return <AdminSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4FF] p-6">
      {/* Breadcrumb and Title Section */}
      <PageHeader
        config={{
          breadcrumbs: [
            { label: "Companies List", path: "/companies" },
            { label: "Account" },
          ],
          title: "Create Account",
          buttons: [],
        }}
      />

      {/* All Settings Section */}
      <div
        className="bg-white rounded-lg p-6 mt-6"
        style={{ boxShadow: "0 2px 11px rgba(0,0,0,0.08)" }}
      >
        <h2 className="text-xl font-semibold text-[#626262] mb-4">
          All Settings
        </h2>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Settings Sidebar */}
          <SettingsSidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />

          {/* Content Area */}
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
