import { useParams, useNavigate } from "react-router-dom";
import { useCompanies } from "@/context/CompanyContext";

export default function CompanyDetails() {
    const { id } = useParams<{ id: string }>();
    const { companies } = useCompanies();
    const navigate = useNavigate();

    const company = companies.find((c) => c.id.toString() === id);

    if (!company) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 bg-page-bg">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">Company Not Found</h1>
                    <p className="text-gray-600 mb-6">The company you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate("/companies")}
                        className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-md font-medium text-sm transition-colors"
                    >
                        Back to Companies List
                    </button>
                </div>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
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
        <div className="flex flex-col h-full bg-page-bg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/companies")}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        aria-label="Back to companies"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15 18L9 12L15 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <h1 className="text-[28px] font-semibold text-text-primary">Company Details</h1>
                </div>
                <button
                    onClick={() => navigate("/companies")}
                    className="px-5 py-2.5 bg-neutral hover:bg-neutral-hover text-text-primary rounded-md font-medium text-sm transition-colors"
                >
                    Back to List
                </button>
            </div>

            {/* Company Info Card */}
            <div className="bg-white rounded-md border border-border-light p-8 mb-6">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-text-primary mb-2">{company.companyName}</h2>
                        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full capitalize ${getStatusColor(company.status)}`}>
                            {company.status}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Company Admin</label>
                        <p className="text-base text-gray-900">{company.adminName}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Designation</label>
                        <p className="text-base text-gray-900">{company.designation}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                        <p className="text-base text-gray-900">{company.email}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Creation Date</label>
                        <p className="text-base text-gray-900">{company.creationDate}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Company ID</label>
                        <p className="text-base text-gray-900">{company.id}</p>
                    </div>
                </div>
            </div>

            {/* Additional sections can be added here */}
            <div className="bg-white rounded-md border border-border-light p-8">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Additional Information</h3>
                <p className="text-gray-600">More company details and metrics will be displayed here.</p>
            </div>
        </div>
    );
}
