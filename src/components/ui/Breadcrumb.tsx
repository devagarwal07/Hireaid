import { useLocation, Link } from "react-router-dom";
import { getBreadcrumbsForPath, type BreadcrumbItem } from "@/routes";

// Re-export BreadcrumbItem for backwards compatibility
export type { BreadcrumbItem };

interface BreadcrumbProps {
    items?: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    const location = useLocation();

    // Use provided items or get from centralized route config
    const breadcrumbItems = items || getBreadcrumbsForPath(location.pathname);

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

