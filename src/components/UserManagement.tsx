import React, { useState } from "react";
import AddNewUser from "@/components/AddNewUser";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
}

const UserManagement: React.FC = () => {
  const [users] = useState<User[]>([
    {
      id: "1",
      username: "John Doe",
      email: "John.doe@hireaide.com",
      role: "SuperAdmin",
      status: "Active",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddNewUser, setShowAddNewUser] = useState(false);

  if (showAddNewUser) {
    return <AddNewUser onBack={() => setShowAddNewUser(false)} />;
  }

  return (
    <div
      className="bg-white rounded-lg p-6 border border-gray-200"
      style={{ boxShadow: "0 2px 11px rgba(0,0,0,0.08)" }}
    >
      <h2 className="text-2xl font-semibold text-[#181D27] mb-6">
        User Management
      </h2>
      <hr className="border-t border-gray-200 mb-6" />

      {/* Action Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Add New Users Card */}
        <button
          onClick={() => setShowAddNewUser(true)}
          className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-left group"
        >
          <div className="w-12 h-12 rounded-full bg-[#EBF2FF] flex items-center justify-center flex-shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0857A1"
              strokeWidth="2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-[#181D27] mb-1">
              Add New Users
            </h3>
            <p className="text-sm text-[#626262]">
              Quickly add new users to your account with ease.
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

        {/* Manage Access Privileges Card */}
        <button className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-left group">
          <div className="w-12 h-12 rounded-full bg-[#EBF2FF] flex items-center justify-center flex-shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0857A1"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-[#181D27] mb-1">
              Manage Access Privileges
            </h3>
            <p className="text-sm text-[#626262]">
              Control and manage user access privileges effortlessly
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
      </div>

      {/* Users Section */}
      <div>
        <h3 className="text-lg font-semibold text-[#181D27] mb-4">Users</h3>

        {/* Grey Container */}
        <div className="bg-[#FAFAFA] border border-gray-200 rounded-lg p-4">
          {/* Search and Filter Bar */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-[#626262]">Showing 1 created role</p>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filters Button */}
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-[#626262] hover:bg-gray-50 transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filters
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#F3F4F6] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#626262] uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#626262] uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#626262] uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#626262] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#626262] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-[#0857A1]">
                        {user.username}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-[#181D27]">
                        {user.email}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-3 py-1 text-xs font-medium text-[#0857A1] bg-[#EBF2FF] rounded-full">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-[#181D27]">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <button className="text-[#626262] hover:text-[#0857A1] transition-colors">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button className="text-[#626262] hover:text-[#0857A1] transition-colors">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </button>
                        <button className="text-[#626262] hover:text-[#0857A1] transition-colors">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="19" cy="12" r="1" />
                            <circle cx="5" cy="12" r="1" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
