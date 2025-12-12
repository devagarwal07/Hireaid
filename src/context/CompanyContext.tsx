import { createContext, useContext, useState, type ReactNode } from "react";

// Company type definition
export interface Company {
    id: string | number;
    companyName: string;
    adminName: string;
    designation: string;
    email: string;
    creationDate: string;
    status: "active" | "inactive" | "pending";
}

// Sample company data
const sampleCompanies: Company[] = [
    {
        id: 1,
        companyName: "TechCorp Solutions",
        adminName: "John Anderson",
        designation: "CEO",
        email: "john.anderson@techcorp.com",
        creationDate: "15-01-2024",
        status: "active",
    },
    {
        id: 2,
        companyName: "Innovate Labs",
        adminName: "Sarah Mitchell",
        designation: "Founder & CTO",
        email: "sarah.mitchell@innovatelabs.com",
        creationDate: "22-03-2024",
        status: "active",
    },
    {
        id: 3,
        companyName: "Digital Dynamics",
        adminName: "Michael Chen",
        designation: "Managing Director",
        email: "michael.chen@digitaldynamics.com",
        creationDate: "10-05-2024",
        status: "pending",
    },
    {
        id: 4,
        companyName: "NextGen Enterprises",
        adminName: "Emily Rodriguez",
        designation: "VP of Operations",
        email: "emily.rodriguez@nextgen.com",
        creationDate: "05-06-2024",
        status: "active",
    },
    {
        id: 5,
        companyName: "CloudWorks Inc",
        adminName: "David Thompson",
        designation: "CEO",
        email: "david.thompson@cloudworks.com",
        creationDate: "18-07-2024",
        status: "inactive",
    },
    {
        id: 6,
        companyName: "Smart Systems Ltd",
        adminName: "Jennifer Liu",
        designation: "Chief Operating Officer",
        email: "jennifer.liu@smartsystems.com",
        creationDate: "02-08-2024",
        status: "active",
    },
    {
        id: 7,
        companyName: "Fusion Technologies",
        adminName: "Robert Martinez",
        designation: "Founder",
        email: "robert.martinez@fusiontech.com",
        creationDate: "25-09-2024",
        status: "active",
    },
    {
        id: 8,
        companyName: "Alpha Industries",
        adminName: "Amanda Foster",
        designation: "President",
        email: "amanda.foster@alphaindustries.com",
        creationDate: "12-10-2024",
        status: "pending",
    },
    {
        id: 9,
        companyName: "Quantum Solutions",
        adminName: "James Wilson",
        designation: "Managing Partner",
        email: "james.wilson@quantumsol.com",
        creationDate: "08-11-2024",
        status: "active",
    },
    {
        id: 10,
        companyName: "Vertex Group",
        adminName: "Lisa Patel",
        designation: "CEO",
        email: "lisa.patel@vertexgroup.com",
        creationDate: "20-11-2024",
        status: "active",
    },
];

interface CompanyContextType {
    companies: Company[];
    addCompany: (company: Omit<Company, "id" | "creationDate">) => void;
    removeCompany: (id: string | number) => void;
    updateCompany: (id: string | number, updates: Partial<Company>) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
    const [companies, setCompanies] = useState<Company[]>(sampleCompanies);

    const addCompany = (companyData: Omit<Company, "id" | "creationDate">) => {
        const today = new Date();
        const dateStr = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;

        const newCompany: Company = {
            ...companyData,
            id: companies.length + 1,
            creationDate: dateStr,
        };

        setCompanies([newCompany, ...companies]);
    };

    const removeCompany = (id: string | number) => {
        setCompanies(companies.filter((company) => company.id !== id));
    };

    const updateCompany = (id: string | number, updates: Partial<Company>) => {
        setCompanies(companies.map((company) => (company.id === id ? { ...company, ...updates } : company)));
    };

    return (
        <CompanyContext.Provider value={{ companies, addCompany, removeCompany, updateCompany }}>
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
