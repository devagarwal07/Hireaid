import { useLocation } from "react-router-dom";
import Breadcrumb from "@/components/ui/Breadcrumb";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import HeaderBanner from "@/assets/images/header_banner.png";

// Icons for buttons
const AIAssistantIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const StructureIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const EndCallIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 16.92C23 17.19 22.96 17.47 22.88 17.74C22.8 18.01 22.67 18.27 22.5 18.52C22.17 18.99 21.79 19.34 21.34 19.57C20.9 19.8 20.41 19.92 19.88 19.92C19.11 19.92 18.29 19.73 17.42 19.34C16.55 18.95 15.68 18.44 14.81 17.81C13.93 17.17 13.1 16.47 12.31 15.69C11.53 14.9 10.83 14.07 10.2 13.2C9.58 12.33 9.07 11.46 8.69 10.6C8.31 9.73 8.12 8.9 8.12 8.11C8.12 7.59 8.23 7.1 8.45 6.66C8.67 6.21 9.01 5.82 9.47 5.48C10.03 5.06 10.64 4.85 11.29 4.85C11.54 4.85 11.79 4.9 12.02 5C12.26 5.1 12.47 5.25 12.64 5.47L14.78 8.47C14.95 8.68 15.07 8.87 15.16 9.05C15.25 9.22 15.3 9.39 15.3 9.55C15.3 9.75 15.23 9.94 15.1 10.13C14.97 10.32 14.79 10.52 14.57 10.72L13.9 11.42C13.8 11.52 13.75 11.64 13.75 11.79C13.75 11.86 13.76 11.93 13.78 12C13.81 12.07 13.84 12.13 13.86 12.19C14.03 12.49 14.32 12.87 14.72 13.33C15.13 13.79 15.57 14.26 16.05 14.74C16.54 15.22 17.01 15.67 17.47 16.08C17.93 16.48 18.31 16.76 18.62 16.93C18.67 16.95 18.73 16.98 18.8 17.01C18.88 17.04 18.95 17.05 19.03 17.05C19.19 17.05 19.31 17 19.41 16.9L20.08 16.24C20.29 16.03 20.49 15.85 20.68 15.73C20.87 15.6 21.06 15.53 21.27 15.53C21.43 15.53 21.6 15.57 21.78 15.66C21.96 15.75 22.15 15.87 22.36 16.03L25.41 18.21C25.63 18.38 25.78 18.58 25.87 18.81C25.95 19.04 26 19.27 26 19.52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PersonIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ClockIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export interface PageHeaderButton {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "danger";
}

export interface PageHeaderConfig {
    breadcrumbs?: BreadcrumbItem[];
    title: string;
    subtitle?: string;
    showPersonIcon?: boolean;
    showTime?: boolean;
    time?: string;
    buttons?: PageHeaderButton[];
}

// Route-based header configurations
const routeHeaderConfigs: Record<string, PageHeaderConfig> = {
    "/interview": {
        breadcrumbs: [
            { label: "Interview Schedule", path: "/job-dashboard" },
            { label: "Interview" },
        ],
        title: "Samuel Baker",
        showPersonIcon: true,
        showTime: true,
        time: "10:05",
        buttons: [
            { label: "AI Assistant", icon: <AIAssistantIcon />, variant: "secondary" },
            { label: "Interview Structure", icon: <StructureIcon />, variant: "secondary" },
            { label: "End Interview", icon: <EndCallIcon />, variant: "danger" },
        ],
    },
    "/job-dashboard": {
        breadcrumbs: [{ label: "Dashboard" }],
        title: "Jobs Dashboard",
        buttons: [],
    },
    "/job-form": {
        breadcrumbs: [
            { label: "Jobs List", path: "/job-dashboard" },
            { label: "Create new Job" },
        ],
        title: "HR Talent Acquisition Specialist",
        buttons: [],
    },
    "/interview-prep-dashboard": {
        breadcrumbs: [
            { label: "Interview Schedule", path: "/job-dashboard" },
            { label: "Interview Summary" },
        ],
        title: "Interview Complete",
        buttons: [],
    },
};

interface PageHeaderProps {
    config?: PageHeaderConfig;
}

export default function PageHeader({ config }: PageHeaderProps) {
    const location = useLocation();

    // Use provided config or get from route mapping
    const headerConfig = config || routeHeaderConfigs[location.pathname];

    if (!headerConfig) return null;

    const getButtonStyles = (variant: string = "secondary") => {
        switch (variant) {
            case "primary":
                return "bg-[#0857A1] text-white hover:bg-[#064a8a]";
            case "danger":
                return "bg-[#FFF0F0] text-[#E53935] border border-[#FFCDD2] hover:bg-[#FFEBEE]";
            case "secondary":
            default:
                return "bg-white text-[#0857A1] border border-[#E3EEFF] hover:bg-[#F5F9FF]";
        }
    };

    return (
        <div className="w-full rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden relative">
            {/* Background banner image */}
            <div
                className="absolute top-0 right-0 h-full w-1/2 bg-no-repeat bg-right bg-contain pointer-events-none"
                style={{ backgroundImage: `url(${HeaderBanner})` }}
            />

            {/* Content */}
            <div className="relative z-10 px-6 py-4">
                {/* Breadcrumb */}
                <Breadcrumb items={headerConfig.breadcrumbs} />

                {/* Main content row */}
                <div className="flex items-center justify-between mt-2">
                    {/* Left side - Title and info */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            {headerConfig.showPersonIcon && (
                                <span className="text-gray-500">
                                    <PersonIcon />
                                </span>
                            )}
                            <h1 className="text-2xl font-semibold text-[#1a1f36]">
                                {headerConfig.title}
                            </h1>
                        </div>

                        {headerConfig.showTime && headerConfig.time && (
                            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                                <ClockIcon />
                                <span>{headerConfig.time}</span>
                            </div>
                        )}

                        {headerConfig.subtitle && (
                            <p className="text-gray-500 text-sm">{headerConfig.subtitle}</p>
                        )}
                    </div>

                    {/* Right side - Action buttons */}
                    {headerConfig.buttons && headerConfig.buttons.length > 0 && (
                        <div className="flex items-center gap-3">
                            {headerConfig.buttons.map((button, index) => (
                                <button
                                    key={index}
                                    onClick={button.onClick}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${getButtonStyles(button.variant)}`}
                                >
                                    {button.icon}
                                    {button.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
