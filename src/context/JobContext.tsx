import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { jobsApi } from "@/lib/api";

export interface Job {
    id: string;
    title: string;
    department: string;
    date: string;
    applied: number;
    inProcess: number;
    qualified: number;
    status: "open" | "on-hold" | "closed";
    icon: "design" | "data" | "people" | "code" | "analyze" | "frontend";
}

const formatDate = (isoStr: string) => {
    const d = new Date(isoStr);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear().toString().slice(-2)}`;
};

interface JobContextType {
    jobs: Job[];
    isLoading: boolean;
    getJobById: (id: string | number) => Job | undefined;
    addJob: (job: Omit<Job, "id" | "date" | "applied" | "inProcess" | "qualified">) => Promise<void>;
    removeJob: (id: string | number) => Promise<void>;
    updateJob: (id: string | number, updates: Partial<Job>) => Promise<void>;
    duplicateJob: (id: string | number) => Promise<void>;
    refreshJobs: () => Promise<void>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: ReactNode }) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const refreshJobs = async () => {
        try {
            setIsLoading(true);
            const res = await jobsApi.list();
            if (res.success && res.data) {
                const mapped = res.data.map((j: any) => ({
                    ...j,
                    date: formatDate(j.createdAt),
                    id: String(j.id)
                }));
                setJobs(mapped);
            }
        } catch (err) {
            console.error("Failed to load jobs:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshJobs();
    }, []);

    const getJobById = (id: string | number): Job | undefined => {
        return jobs.find((job) => String(job.id) === String(id));
    };

    const addJob = async (jobData: Omit<Job, "id" | "date" | "applied" | "inProcess" | "qualified">) => {
        try {
            const res = await jobsApi.create(jobData);
            if (res.success) {
                await refreshJobs();
            }
        } catch (err) {
            console.error("Failed to create job", err);
        }
    };

    const removeJob = async (id: string | number) => {
        try {
            const res = await jobsApi.delete(String(id));
            if (res.success) {
                setJobs((prev) => prev.filter((j) => String(j.id) !== String(id)));
            }
        } catch (err) {
            console.error("Failed to delete job", err);
        }
    };

    const updateJob = async (id: string | number, updates: Partial<Job>) => {
        try {
            const res = await jobsApi.update(String(id), updates);
            if (res.success) {
                await refreshJobs();
            }
        } catch (err) {
            console.error("Failed to update job", err);
        }
    };

    const duplicateJob = async (id: string | number) => {
        try {
            const res = await jobsApi.duplicate(String(id));
            if (res.success) {
                await refreshJobs();
            }
        } catch (err) {
            console.error("Failed to duplicate job", err);
        }
    };

    return (
        <JobContext.Provider value={{ jobs, isLoading, getJobById, addJob, removeJob, updateJob, duplicateJob, refreshJobs }}>
            {children}
        </JobContext.Provider>
    );
}

export function useJobs() {
    const context = useContext(JobContext);
    if (context === undefined) {
        throw new Error("useJobs must be used within a JobProvider");
    }
    return context;
}
