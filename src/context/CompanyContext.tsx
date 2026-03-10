import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { companiesApi } from "@/lib/api";

export interface Company {
    id: string;
    companyName: string;
    adminName: string;
    designation: string;
    email: string;
    creationDate: string;
    status: "active" | "inactive" | "pending";
}

const formatDate = (isoStr: string) => {
    const d = new Date(isoStr);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
};

interface CompanyContextType {
    companies: Company[];
    isLoading: boolean;
    addCompany: (company: Omit<Company, "id" | "creationDate">) => Promise<void>;
    removeCompany: (id: string | number) => Promise<void>;
    updateCompany: (id: string | number, updates: Partial<Company>) => Promise<void>;
    refreshCompanies: () => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const refreshCompanies = async () => {
        try {
            setIsLoading(true);
            const res = await companiesApi.list();
            if (res.success && res.data) {
                const mapped = res.data.map((c: any) => ({
                    ...c,
                    creationDate: formatDate(c.createdAt),
                    id: String(c.id)
                }));
                setCompanies(mapped);
            }
        } catch (err) {
            console.error("Failed to load companies:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshCompanies();
    }, []);

    const addCompany = async (companyData: Omit<Company, "id" | "creationDate">) => {
        try {
            const res = await companiesApi.create(companyData);
            if (res.success) {
                await refreshCompanies();
            }
        } catch (err) {
            console.error("Failed to create company", err);
        }
    };

    const removeCompany = async (id: string | number) => {
        try {
            const res = await companiesApi.delete(String(id));
            if (res.success) {
                setCompanies((prev) => prev.filter((c) => String(c.id) !== String(id)));
            }
        } catch (err) {
            console.error("Failed to delete company", err);
        }
    };

    const updateCompany = async (id: string | number, updates: Partial<Company>) => {
        try {
            const res = await companiesApi.update(String(id), updates);
            if (res.success) {
                await refreshCompanies();
            }
        } catch (err) {
            console.error("Failed to update company", err);
        }
    };

    return (
        <CompanyContext.Provider value={{ companies, isLoading, addCompany, removeCompany, updateCompany, refreshCompanies }}>
            {children}
        </CompanyContext.Provider>
    );
}

export function useCompanies() {
    const context = useContext(CompanyContext);
    if (context === undefined) {
        throw new Error("useCompanies must be used within a CompanyProvider");
    }
    return context;
}
