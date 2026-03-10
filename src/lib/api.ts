// API client for Hireaid backend
// Base URL for all API calls

const API_BASE = "http://localhost:5001/api";

// Get stored auth token
function getToken(): string | null {
    return localStorage.getItem("hireaid_token");
}

// Set auth token
export function setToken(token: string): void {
    localStorage.setItem("hireaid_token", token);
}

// Remove auth token
export function removeToken(): void {
    localStorage.removeItem("hireaid_token");
}

// Get stored user
export function getStoredUser(): any | null {
    const user = localStorage.getItem("hireaid_user");
    return user ? JSON.parse(user) : null;
}

// Set stored user
export function setStoredUser(user: any): void {
    localStorage.setItem("hireaid_user", JSON.stringify(user));
}

// Remove stored user
export function removeStoredUser(): void {
    localStorage.removeItem("hireaid_user");
}

// Generic fetch wrapper with auth
async function apiFetch<T = any>(
    endpoint: string,
    options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; pagination?: any }> {
    const token = getToken();

    const headers: HeadersInit = {
        ...(options.headers || {}),
    };

    // Only set Content-Type for non-FormData requests
    if (!(options.body instanceof FormData)) {
        (headers as Record<string, string>)["Content-Type"] = "application/json";
    }

    if (token) {
        (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
}

// ─── Auth API ────────────────────────────────────────────────

export const authApi = {
    register: (body: { email: string; password: string; firstName: string; lastName: string }) =>
        apiFetch("/auth/register", { method: "POST", body: JSON.stringify(body) }),

    login: (body: { email: string; password: string }) =>
        apiFetch("/auth/login", { method: "POST", body: JSON.stringify(body) }),

    logout: () => apiFetch("/auth/logout", { method: "POST" }),

    me: () => apiFetch("/auth/me"),
};

// ─── Jobs API ────────────────────────────────────────────────

export const jobsApi = {
    list: (params?: { status?: string; department?: string; search?: string; page?: number; limit?: number }) => {
        const query = new URLSearchParams();
        if (params?.status) query.set("status", params.status);
        if (params?.department) query.set("department", params.department);
        if (params?.search) query.set("search", params.search);
        if (params?.page) query.set("page", String(params.page));
        if (params?.limit) query.set("limit", String(params.limit));
        return apiFetch(`/jobs?${query.toString()}`);
    },

    get: (id: string) => apiFetch(`/jobs/${id}`),

    create: (body: any) =>
        apiFetch("/jobs", { method: "POST", body: JSON.stringify(body) }),

    update: (id: string, body: any) =>
        apiFetch(`/jobs/${id}`, { method: "PUT", body: JSON.stringify(body) }),

    delete: (id: string) =>
        apiFetch(`/jobs/${id}`, { method: "DELETE" }),

    duplicate: (id: string) =>
        apiFetch(`/jobs/${id}/duplicate`, { method: "POST" }),
};

// ─── Candidates API ──────────────────────────────────────────

export const candidatesApi = {
    listByJob: (jobId: string, params?: { status?: string; search?: string; page?: number; limit?: number }) => {
        const query = new URLSearchParams();
        if (params?.status) query.set("status", params.status);
        if (params?.search) query.set("search", params.search);
        if (params?.page) query.set("page", String(params.page));
        if (params?.limit) query.set("limit", String(params.limit));
        return apiFetch(`/candidates/job/${jobId}?${query.toString()}`);
    },

    get: (id: string) => apiFetch(`/candidates/${id}`),

    create: (body: any) =>
        apiFetch("/candidates", { method: "POST", body: JSON.stringify(body) }),

    update: (id: string, body: any) =>
        apiFetch(`/candidates/${id}`, { method: "PUT", body: JSON.stringify(body) }),

    delete: (id: string) =>
        apiFetch(`/candidates/${id}`, { method: "DELETE" }),

    getNotes: (id: string) => apiFetch(`/candidates/${id}/notes`),

    addNote: (id: string, body: { content: string; isAISummary?: boolean }) =>
        apiFetch(`/candidates/${id}/notes`, { method: "POST", body: JSON.stringify(body) }),
};

// ─── Companies API ───────────────────────────────────────────

export const companiesApi = {
    list: (params?: { status?: string; search?: string; page?: number; limit?: number }) => {
        const query = new URLSearchParams();
        if (params?.status) query.set("status", params.status);
        if (params?.search) query.set("search", params.search);
        if (params?.page) query.set("page", String(params.page));
        if (params?.limit) query.set("limit", String(params.limit));
        return apiFetch(`/companies?${query.toString()}`);
    },

    get: (id: string) => apiFetch(`/companies/${id}`),

    create: (body: any) =>
        apiFetch("/companies", { method: "POST", body: JSON.stringify(body) }),

    update: (id: string, body: any) =>
        apiFetch(`/companies/${id}`, { method: "PUT", body: JSON.stringify(body) }),

    delete: (id: string) =>
        apiFetch(`/companies/${id}`, { method: "DELETE" }),
};

// ─── Interviews API ──────────────────────────────────────────

export const interviewsApi = {
    listScheduled: () => apiFetch("/interviews/scheduled"),

    get: (id: string) => apiFetch(`/interviews/${id}`),

    schedule: (body: { jobId: string; candidateId: string; date: string; time: string; duration?: string; description?: string }) =>
        apiFetch("/interviews/schedule", { method: "POST", body: JSON.stringify(body) }),

    getReport: (id: string) => apiFetch(`/interviews/${id}/report`),

    submitReport: (id: string, body: { evaluationTags?: string[]; strengths?: string[]; improvements?: string[]; questions?: any[] }) =>
        apiFetch(`/interviews/${id}/report`, { method: "POST", body: JSON.stringify(body) }),

    update: (id: string, body: any) =>
        apiFetch(`/interviews/${id}`, { method: "PUT", body: JSON.stringify(body) }),

    delete: (id: string) =>
        apiFetch(`/interviews/${id}`, { method: "DELETE" }),
};

// ─── Users API ───────────────────────────────────────────────

export const usersApi = {
    list: (params?: { search?: string; status?: string }) => {
        const query = new URLSearchParams();
        if (params?.search) query.set("search", params.search);
        if (params?.status) query.set("status", params.status);
        return apiFetch(`/users?${query.toString()}`);
    },

    create: (body: { email: string; firstName: string; lastName: string; role?: string; password?: string }) =>
        apiFetch("/users", { method: "POST", body: JSON.stringify(body) }),

    update: (id: string, body: any) =>
        apiFetch(`/users/${id}`, { method: "PUT", body: JSON.stringify(body) }),

    delete: (id: string) =>
        apiFetch(`/users/${id}`, { method: "DELETE" }),
};

// ─── Settings API ────────────────────────────────────────────

export const settingsApi = {
    getAdmin: () => apiFetch("/settings/admin"),

    updateAdmin: (body: any) =>
        apiFetch("/settings/admin", { method: "PUT", body: JSON.stringify(body) }),
};

// ─── Upload API ──────────────────────────────────────────────

export const uploadApi = {
    uploadResumes: (files: File[], candidateId?: string) => {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));
        if (candidateId) formData.append("candidateId", candidateId);
        return apiFetch("/upload/resumes", { method: "POST", body: formData });
    },

    listFiles: (candidateId?: string) => {
        const query = candidateId ? `?candidateId=${candidateId}` : "";
        return apiFetch(`/upload/files${query}`);
    },

    deleteFile: (id: string) =>
        apiFetch(`/upload/files/${id}`, { method: "DELETE" }),
};

// ─── Health API ──────────────────────────────────────────────

export const healthApi = {
    check: () => apiFetch("/health"),
};

// ─── Daily API ───────────────────────────────────────────────

export const dailyApi = {
    createRoom: (interviewId?: string) =>
        apiFetch("/daily/room", { method: "POST", body: JSON.stringify({ interviewId }) }),
};

// ─── AI API (Google Gemini) ───────────────────────────────────

export const aiApi = {
    getSession: () => apiFetch("/ai/session"),

    analyzeAnswer: (body: { question: string; answer: string; jobRole?: string; jobDescription?: string }) =>
        apiFetch("/ai/analyze-answer", { method: "POST", body: JSON.stringify(body) }),

    generateQuestions: (body: { jobRole: string; jobDescription?: string; skills?: string[]; count?: number }) =>
        apiFetch("/ai/generate-questions", { method: "POST", body: JSON.stringify(body) }),

    transcriptSummary: (body: { transcript: string | any[]; jobRole?: string }) =>
        apiFetch("/ai/transcript-summary", { method: "POST", body: JSON.stringify(body) }),

    chat: (body: { message: string; context?: any }) =>
        apiFetch("/ai/chat", { method: "POST", body: JSON.stringify(body) }),
};

// ─── Transcripts API ─────────────────────────────────────────

export const transcriptsApi = {
    save: (body: { interviewId: string; entries: any[]; summary?: string }) =>
        apiFetch("/transcripts", { method: "POST", body: JSON.stringify(body) }),

    get: (interviewId: string) => apiFetch(`/transcripts/${interviewId}`),

    update: (id: string, body: { entries?: any[]; appendEntries?: any[]; summary?: string }) =>
        apiFetch(`/transcripts/${id}`, { method: "PUT", body: JSON.stringify(body) }),
};
