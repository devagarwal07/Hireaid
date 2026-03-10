import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { interviewsApi } from "@/lib/api";

type User = {
	firstName: string;
	lastName: string;
	role: string;
	initials: string;
	notificationsCount: number;
};

type Interview = {
	candidateName: string;
	candidateRole: string;
	scheduledTime: string;
};

type AppContextValue = {
	user: User | null;
	currentInterview: Interview | null;
	isLoading: boolean;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
	const { user: authUser, isAuthenticated, isLoading: authLoading } = useAuth();
	const [currentInterview, setCurrentInterview] = useState<Interview | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchInterview() {
			try {
				if (!isAuthenticated) return;

				// Optional: Fetch next scheduled interview
				const res = await interviewsApi.listScheduled();
				if (res.success && res.data && res.data.length > 0) {
					const next = res.data[0];
					setCurrentInterview({
						candidateName: next.candidate?.name || "Unknown Candidate",
						candidateRole: next.job?.title || "Unknown Role",
						scheduledTime: next.time || "TBD",
					});
				}
			} catch (err) {
				console.error("Failed to load generic scheduled interviews", err);
			} finally {
				setIsLoading(false);
			}
		}

		if (!authLoading) {
			fetchInterview();
		}
	}, [isAuthenticated, authLoading]);

	const user: User | null = authUser ? {
		firstName: authUser.firstName,
		lastName: authUser.lastName,
		role: authUser.role,
		initials: `${authUser.firstName?.[0] || ""}${authUser.lastName?.[0] || ""}`.toUpperCase(),
		notificationsCount: authUser.notificationsCount || 0,
	} : null;

	const value: AppContextValue = {
		user,
		currentInterview,
		isLoading: authLoading || isLoading,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useAppContext must be used within an AppProvider");
	}
	return context;
}
