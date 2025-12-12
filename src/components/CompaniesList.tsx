import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompanies, type Company } from "@/context/CompanyContext";

export default function CompaniesList() {
  const { companies } = useCompanies();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const itemsPerPage = 10;

  // Filter companies based on search and status
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || company.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompanies = filteredCompanies.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleCompanyDetails = (companyId: string | number) => {
    navigate(`/company/${companyId}`);
  };

  const getStatusColor = (status: Company["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F0F4FF] p-6">
      {/* Main content card with white background */}
      <div className="bg-white rounded-lg border-2 border-[#E5E5E5] shadow-sm p-6">
        <div className="border border-[#D1D5DB] rounded-lg">
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5E5]">
            <div>
              <h1 className="text-[24px] font-semibold text-[#181D27]">
                Companies List
              </h1>
              <p className="text-sm text-[#626262] mt-1">
                Showing {filteredCompanies.length} out of {companies.length}{" "}
                created accounts
              </p>
            </div>
            <button
              onClick={() => navigate("/companies/create-account")}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0857A1] hover:bg-[#176CBA] text-white rounded-full font-medium text-sm transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 3.5V12.5M3.5 8H12.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Create Account
            </button>
          </div>

          {/* Search and Filter bar */}
          <div className="flex items-center justify-end gap-3 px-6 py-4">
            {/* Search bar */}
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="w-full px-4 py-2 pl-10 border border-[#E2E2E2] rounded-full focus:outline-none focus:ring-2 focus:ring-[#0857A1] bg-white text-sm"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 14L10.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Filter button */}
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="flex items-center gap-2 px-4 py-2 border border-[#E2E2E2] rounded-full hover:bg-gray-50 transition-colors bg-white text-sm font-medium"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 4H14M4 8H12M6 12H10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Filter
              </button>

              {/* Filter dropdown menu */}
              {showFilterMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E2E2E2] rounded-lg shadow-lg z-10">
                  <div className="p-2">
                    <div className="text-sm font-medium text-gray-700 px-2 py-1">
                      Status
                    </div>
                    {["all", "active", "inactive", "pending"].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setStatusFilter(status);
                          setCurrentPage(1); // Reset to first page on filter
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100 capitalize ${
                          statusFilter === status
                            ? "bg-gray-100 font-medium"
                            : ""
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden px-6">
            <div className="overflow-x-auto rounded-lg border border-[#E2E2E2]">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b border-[#E2E2E2]">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sr. No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company Admin Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Designation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Creation Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#E2E2E2]">
                  {currentCompanies.length > 0 ? (
                    currentCompanies.map((company, index) => (
                      <tr
                        key={company.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {String(startIndex + index + 1).padStart(2, "0")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#0857A1]">
                          {company.companyName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {company.adminName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {company.designation}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {company.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {company.creationDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${getStatusColor(
                              company.status
                            )}`}
                          >
                            {company.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => handleCompanyDetails(company.id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="View company details"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="10"
                                cy="5"
                                r="1.5"
                                fill="currentColor"
                              />
                              <circle
                                cx="10"
                                cy="10"
                                r="1.5"
                                fill="currentColor"
                              />
                              <circle
                                cx="10"
                                cy="15"
                                r="1.5"
                                fill="currentColor"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-12 text-center text-sm text-gray-500"
                      >
                        No companies found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {filteredCompanies.length > 0 && (
            <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-[#E5E5E5]">
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium border border-[#E2E2E2] rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium border border-[#E2E2E2] rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
