// Types for route configuration

// Types for route configuration
export interface BreadcrumbItem {
    label: string;
    path?: string;
}

export interface RouteConfig {
    path: string;
    title: string;
    breadcrumbs: BreadcrumbItem[];
    // For dynamic routes like /job/:id/candidates
    isDynamic?: boolean;
    // Parent route for nested routes
    parent?: string;
}

// Centralized route definitions with breadcrumb metadata
export const ROUTES = {
    // Main routes
    HOME: "/",
    INTERVIEW: "/interview",
    JOB_DASHBOARD: "/job-dashboard",
    JOB_FORM: "/job-form",
    INTERVIEW_PREP_DASHBOARD: "/interview-prep-dashboard",
    SCHEDULED_INTERVIEWS: "/scheduled-interviews",
    SCHEDULE_INTERVIEW: "/schedule-interview",

    // Company routes
    COMPANIES: "/companies",
    COMPANY_DETAILS: "/company/:id",
    CREATE_ACCOUNT: "/companies/create-account",

    // Job routes (dynamic)
    JOB_CANDIDATES: "/job/:id/candidates",
    CANDIDATE_DETAILS: "/job/:jobId/candidate/:candidateId",
    POST_INTERVIEW_REPORT: "/job/:jobId/candidate/:candidateId/report",
    INTERVIEW_PREP: "/job/:jobId/candidate/:candidateId/interview-prep",
} as const;

// Route configuration with breadcrumbs and titles
export const routeConfigs: Record<string, RouteConfig> = {
    [ROUTES.INTERVIEW]: {
        path: ROUTES.INTERVIEW,
        title: "Interview",
        breadcrumbs: [
            { label: "Interview Schedule", path: ROUTES.JOB_DASHBOARD },
            { label: "Interview" },
        ],
    },
    [ROUTES.JOB_DASHBOARD]: {
        path: ROUTES.JOB_DASHBOARD,
        title: "Jobs Dashboard",
        breadcrumbs: [{ label: "Dashboard" }],
    },
    [ROUTES.JOB_FORM]: {
        path: ROUTES.JOB_FORM,
        title: "Create New Job",
        breadcrumbs: [
            { label: "Jobs List", path: ROUTES.JOB_DASHBOARD },
            { label: "Create new Job" },
        ],
    },
    [ROUTES.INTERVIEW_PREP_DASHBOARD]: {
        path: ROUTES.INTERVIEW_PREP_DASHBOARD,
        title: "Interview Summary",
        breadcrumbs: [
            { label: "Interview Schedule", path: ROUTES.JOB_DASHBOARD },
            { label: "Interview Summary" },
        ],
    },
    [ROUTES.SCHEDULED_INTERVIEWS]: {
        path: ROUTES.SCHEDULED_INTERVIEWS,
        title: "Scheduled Interviews",
        breadcrumbs: [
            { label: "Dashboard", path: ROUTES.JOB_DASHBOARD },
            { label: "Scheduled Interviews" },
        ],
    },
    [ROUTES.COMPANIES]: {
        path: ROUTES.COMPANIES,
        title: "Companies",
        breadcrumbs: [{ label: "Companies" }],
    },
    [ROUTES.CREATE_ACCOUNT]: {
        path: ROUTES.CREATE_ACCOUNT,
        title: "Create Account",
        breadcrumbs: [
            { label: "Companies", path: ROUTES.COMPANIES },
            { label: "Create Account" },
        ],
    },
};

// Helper function to get breadcrumbs for current path
export function getBreadcrumbsForPath(pathname: string): BreadcrumbItem[] {
    // Check exact match first
    if (routeConfigs[pathname]) {
        return routeConfigs[pathname].breadcrumbs;
    }

    // Check for dynamic routes
    // /job/:id/candidates pattern
    if (pathname.match(/^\/job\/[^/]+\/candidates$/)) {
        return [
            { label: "Jobs List", path: ROUTES.JOB_DASHBOARD },
            { label: "Candidates" },
        ];
    }

    // /job/:jobId/candidate/:candidateId pattern
    if (pathname.match(/^\/job\/[^/]+\/candidate\/[^/]+$/)) {
        const parts = pathname.split("/");
        const jobId = parts[2];
        return [
            { label: "Jobs List", path: ROUTES.JOB_DASHBOARD },
            { label: "Candidates", path: `/job/${jobId}/candidates` },
            { label: "Candidate Details" },
        ];
    }

    // /job/:jobId/candidate/:candidateId/report pattern
    if (pathname.match(/^\/job\/[^/]+\/candidate\/[^/]+\/report$/)) {
        const parts = pathname.split("/");
        const jobId = parts[2];
        const candidateId = parts[4];
        return [
            { label: "Jobs List", path: ROUTES.JOB_DASHBOARD },
            { label: "Candidates", path: `/job/${jobId}/candidates` },
            { label: "Candidate", path: `/job/${jobId}/candidate/${candidateId}` },
            { label: "Interview Report" },
        ];
    }

    // /job/:jobId/candidate/:candidateId/interview-prep pattern
    if (pathname.match(/^\/job\/[^/]+\/candidate\/[^/]+\/interview-prep$/)) {
        const parts = pathname.split("/");
        const jobId = parts[2];
        const candidateId = parts[4];
        return [
            { label: "Jobs List", path: ROUTES.JOB_DASHBOARD },
            { label: "Candidates", path: `/job/${jobId}/candidates` },
            { label: "Candidate", path: `/job/${jobId}/candidate/${candidateId}` },
            { label: "Interview Prep" },
        ];
    }

    // /company/:id pattern
    if (pathname.match(/^\/company\/[^/]+$/)) {
        return [
            { label: "Companies", path: ROUTES.COMPANIES },
            { label: "Company Details" },
        ];
    }

    return [];
}

// Helper function for navigation - generates dynamic route paths
export function generatePath(route: string, params: Record<string, string>): string {
    let path = route;
    Object.entries(params).forEach(([key, value]) => {
        path = path.replace(`:${key}`, value);
    });
    return path;
}

// Route titles for page headers
export function getTitleForPath(pathname: string): string {
    if (routeConfigs[pathname]) {
        return routeConfigs[pathname].title;
    }
    return "";
}
