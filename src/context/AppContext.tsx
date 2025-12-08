import React, { createContext, useContext } from "react";

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
	user: User;
	currentInterview: Interview;
};

const defaultValue: AppContextValue = {
	user: {
		firstName: "John",
		lastName: "Doe",
		role: "Superadmin",
		initials: "JD",
		notificationsCount: 9,
	},
	currentInterview: {
		candidateName: "Samuel Baker",
		candidateRole: "Frontend Developer",
		scheduledTime: "10:05",
	},
};

const AppContext = createContext<AppContextValue>(defaultValue);

export function AppProvider({ children }: { children: React.ReactNode }) {
	// In the future you can lift real data here (API/auth/router, etc.)
	return <AppContext.Provider value={defaultValue}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
	return useContext(AppContext);
}

