import { useLocation, Link } from "react-router-dom";

export interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface BreadcrumbProps {
    items?: BreadcrumbItem[];
}

// Route to breadcrumb mapping
const routeBreadcrumbs: Record<string, BreadcrumbItem[]> = {
    "/interview": [
        { label: "Interview Schedule", path: "/job-dashboard" },
        { label: "Interview" },
    ],
    "/job-dashboard": [
        { label: "Dashboard", path: "/job-dashboard" },
    ],
    "/job-form": [
        { label: "Jobs List", path: "/job-dashboard" },
        { label: "Create new Job" },
    ],
    "/interview-prep-dashboard": [
        { label: "Interview Schedule", path: "/job-dashboard" },
        { label: "Interview Summary" },
    ],
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
    const location = useLocation();

    // Use provided items or get from route mapping
    const breadcrumbItems = items || routeBreadcrumbs[location.pathname] || [];

    if (breadcrumbItems.length === 0) return null;

    return (
        <nav className="flex items-center gap-2 text-sm">
            {breadcrumbItems.map((item, index) => (
                <span key={index} className="flex items-center gap-2">
                    {index > 0 && <span className="text-gray-400">/</span>}
                    {item.path ? (
                        <Link
                            to={item.path}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-800 font-medium">{item.label}</span>
                    )}
                </span>
            ))}
        </nav>
    );
}
