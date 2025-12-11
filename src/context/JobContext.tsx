import { createContext, useContext, useState, type ReactNode } from "react";

// Job type definition
export interface Job {
    id: string | number;
    title: string;
    department: string;
    date: string;
    applied: number;
    inProcess: number;
    qualified: number;
    status: "open" | "on-hold" | "closed";
    icon: "design" | "data" | "people" | "code" | "analyze" | "frontend";
}

// Sample job data
const sampleJobs: Job[] = [
    {
        id: 1,
        title: "Product Designer",
        department: "Entertainment",
        date: "11-07-25",
        applied: 24,
        inProcess: 12,
        qualified: 8,
        status: "open",
        icon: "design",
    },
    {
        id: 2,
        title: "Data Engineer",
        department: "Finance",
        date: "11-07-25",
        applied: 18,
        inProcess: 9,
        qualified: 5,
        status: "open",
        icon: "data",
    },
    {
        id: 3,
        title: "HR Talent Acquisition Specialist",
        department: "Human Resources",
        date: "11-07-25",
        applied: 32,
        inProcess: 15,
        qualified: 10,
        status: "open",
        icon: "people",
    },
    {
        id: 4,
        title: "Fullstack Developer",
        department: "Finance",
        date: "11-07-25",
        applied: 45,
        inProcess: 20,
        qualified: 12,
        status: "on-hold",
        icon: "code",
    },
    {
        id: 5,
        title: "Business Analyst",
        department: "Finance",
        date: "11-07-25",
        applied: 28,
        inProcess: 14,
        qualified: 7,
        status: "on-hold",
        icon: "analyze",
    },
    {
        id: 6,
        title: "Frontend Developer",
        department: "Finance",
        date: "11-07-25",
        applied: 36,
        inProcess: 18,
        qualified: 9,
        status: "closed",
        icon: "frontend",
    },
];

interface JobContextType {
    jobs: Job[];
    addJob: (job: Omit<Job, "id" | "date" | "applied" | "inProcess" | "qualified">) => void;
    removeJob: (id: string | number) => void;
    updateJob: (id: string | number, updates: Partial<Job>) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: ReactNode }) {
    const [jobs, setJobs] = useState<Job[]>(sampleJobs);

    const addJob = (jobData: Omit<Job, "id" | "date" | "applied" | "inProcess" | "qualified">) => {
        const today = new Date();
        const dateStr = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear().toString().slice(-2)}`;

        const newJob: Job = {
            ...jobData,
            id: jobs.length + 1,
            date: dateStr,
            applied: 0,
            inProcess: 0,
            qualified: 0,
        };

        setJobs([newJob, ...jobs]);
    };

    const removeJob = (id: string | number) => {
        setJobs(jobs.filter((job) => job.id !== id));
    };

    const updateJob = (id: string | number, updates: Partial<Job>) => {
        setJobs(jobs.map((job) => (job.id === id ? { ...job, ...updates } : job)));
    };

    return (
        <JobContext.Provider value={{ jobs, addJob, removeJob, updateJob }}>
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
