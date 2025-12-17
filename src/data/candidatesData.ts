// Shared candidate data for the application

export interface CandidateNote {
    id: string;
    author: string;
    authorPhoto?: string;
    content: string;
    timestamp: string;
    isAISummary?: boolean;
}

export interface Candidate {
    id: string;
    name: string;
    role: string;
    photo: string;
    applicationDate: string;
    status: "Pending Interview" | "Interview Scheduled" | "Interview Completed" | "Pending 360 Evaluation" | "Cancelled by System";
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    isRecommendedByAI: boolean;
    isTop10Rated: boolean;
    resumeScore: number | null;
    overallScore: number;
    aiScore: number;
    interviewScheduled: boolean;
    scheduledTime?: string;
    scheduledDate?: string;
    evaluationTags: { label: string; color: string }[];
    skills: string[];
    statistics: { label: string; score: number; color: string }[];
    aiRecommendation: {
        points: { text: string; positive: boolean }[];
    };
    strengths: string[];
    improvements: string[];
    careerOverview: string[];
    currentWork: string[];
    previousRoles: { company: string; description: string }[];
    hiringSteps: { label: string; score: number | null; status: "completed" | "current" | "pending" }[];
    interviewCompleted: boolean;
    notes?: CandidateNote[];
    interviewData?: {
        conductedBy: string;
        date: string;
        time: string;
        duration: string;
        evaluationTags: string[];
        strengths: string[];
        improvements: string[];
        questions: {
            question: string;
            score: number;
            criteria: { text: string; checked: boolean }[];
        }[];
    };
}

// Default evaluation tags
const defaultEvaluationTags = [
    { label: "5-7 Years", color: "orange" },
    { label: "Relevant awards and experiences", color: "green" },
    { label: "English_Fluency", color: "green" },
    { label: "Knowledge of HR policies and regulatory requirements", color: "blue" },
    { label: "Matches Job Description Very well", color: "green" },
    { label: "Hands on knowledge", color: "green" },
    { label: "Great Communication Skills", color: "green" },
    { label: "Advanced Excel skills", color: "orange" },
];

// Default skills
const defaultSkills = [
    "Quality Assessment",
    "Auditing",
    "L&D Experience",
    "Advanced Excel skills",
    "Competency with Google tools",
    "Knowledge of HR policies and regulatory requirements",
    "English_Fluency",
    "Hindi_Proficiency",
    "Remote_Work_Ready",
];

// Default statistics
const defaultStatistics = [
    { label: "Problem Solving", score: 9.5, color: "#1e3a5f" },
    { label: "Communication", score: 8.5, color: "#3b82f6" },
    { label: "Technical Skills", score: 7.5, color: "#3b82f6" },
    { label: "Leadership", score: 8, color: "#3b82f6" },
    { label: "Experience", score: 7, color: "#3b82f6" },
    { label: "Organizational", score: 6.5, color: "#3b82f6" },
    { label: "Experience", score: 4, color: "#3b82f6" },
    { label: "Job Description", score: 3.5, color: "#3b82f6" },
    { label: "Skills", score: 3, color: "#3b82f6" },
];

// Default AI recommendation
const defaultAiRecommendation = {
    points: [
        { text: "The candidate articulated their thoughts and experiences clearly and confidently.", positive: true },
        { text: "Their background aligned well with the role's requirements and responsibilities.", positive: true },
        { text: "They demonstrated structured thinking and logical reasoning during technical/problem-solving questions.", positive: true },
        { text: "The candidate showed values, attitude, and mindset aligned with the team and company culture.", positive: true },
        { text: "Time management during answers could be improved to cover more ground efficiently.", positive: false },
    ],
};

// Default strengths
const defaultStrengths = [
    "The candidate articulated their thoughts and experiences clearly and confidently.",
    "Their background aligned well with the role's requirements and responsibilities.",
    "They demonstrated structured thinking and logical reasoning during technical/problem-solving questions.",
    "The candidate showed values, attitude, and mindset aligned with the team and company culture.",
    "They were genuinely interested in the role and asked insightful questions about the team, product, or mission.",
];

// Default improvements
const defaultImprovements = [
    "The candidate could improve clarity and structure when explaining their past work or problem-solving approach.",
    "They lacked depth in certain technical areas relevant to the role.",
    "Some responses were generic and didn't showcase specific examples or outcomes.",
    "There was limited engagement or curiosity shown through follow-up questions.",
    "Time management during answers could be improved to cover more ground efficiently.",
];

// Sample candidates data - matching the JobCandidates list
export const candidatesData: Record<string, Candidate> = {
    // Candidate 1: Marcus Greg - Interview NOT Scheduled
    "1": {
        id: "1",
        name: "Marcus Greg",
        role: "Product Designer",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
        applicationDate: "20-07-25",
        status: "Pending Interview",
        email: "marcus.greg@email.com",
        phone: "+1 (555) 111-2222",
        location: "Los Angeles",
        linkedin: "marcusgreg.io",
        isRecommendedByAI: true,
        isTop10Rated: true,
        resumeScore: 9.5,
        overallScore: 9.2,
        aiScore: 9.0,
        interviewScheduled: false,
        evaluationTags: defaultEvaluationTags,
        skills: defaultSkills,
        statistics: defaultStatistics,
        aiRecommendation: defaultAiRecommendation,
        strengths: defaultStrengths,
        improvements: defaultImprovements,
        careerOverview: [
            "60 months relevant experience in product design",
            "Strong background in UX/UI design",
        ],
        currentWork: [
            "Lead Product Designer at DesignCo",
            "Leading design system initiatives",
        ],
        previousRoles: [
            { company: "Google", description: "Led product design for cloud services." },
            { company: "Airbnb", description: "Designed user experiences for booking platform." },
        ],
        hiringSteps: [
            { label: "360 Resume Evaluation", score: 9.5, status: "completed" },
            { label: "Interview Round 1", score: null, status: "current" },
            { label: "Technical Test", score: null, status: "pending" },
            { label: "Interview Round 2", score: null, status: "pending" },
        ],
        interviewCompleted: false,
    },

    // Candidate 2: Samuel Baker - Interview Completed
    "2": {
        id: "2",
        name: "Samuel Baker",
        role: "HR Quality & Training Specialist Role",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        applicationDate: "24-07-25",
        status: "Interview Completed",
        email: "samuel.baker@email.com",
        phone: "+1 (312) 471-5436",
        location: "New York",
        linkedin: "samuelbaker.xyz",
        isRecommendedByAI: true,
        isTop10Rated: true,
        resumeScore: 8.4,
        overallScore: 8.8,
        aiScore: 8.8,
        interviewScheduled: true,
        scheduledTime: "11:30 am - 12:30 pm",
        scheduledDate: "11-07-25",
        evaluationTags: defaultEvaluationTags,
        skills: defaultSkills,
        statistics: defaultStatistics,
        aiRecommendation: defaultAiRecommendation,
        strengths: defaultStrengths,
        improvements: defaultImprovements,
        careerOverview: [
            "48 months relevant experience in product management",
            "Almost nil experience in business development",
        ],
        currentWork: [
            "Senior Product Manager at Newton School",
            "Designing tutor centric ed-tech dashboards",
        ],
        previousRoles: [
            { company: "Meesho", description: "Improved the discoverability of our free products by 52%." },
            { company: "Procol", description: "Designed an interface that automated and centralised quality checks for B2B clients." },
        ],
        hiringSteps: [
            { label: "360 Resume Evaluation", score: 8.4, status: "completed" },
            { label: "Interview Round 1", score: 8.4, status: "completed" },
            { label: "Technical Test", score: null, status: "current" },
            { label: "Interview Round 2", score: null, status: "pending" },
        ],
        interviewCompleted: true,
        interviewData: {
            conductedBy: "John Doe",
            date: "8-07-25",
            time: "10:00 am - 12:30 pm",
            duration: "4 hours",
            evaluationTags: ["Showed clear technical knowledge", "Brilliant communication skills", "Leadership"],
            strengths: defaultStrengths,
            improvements: defaultImprovements,
            questions: [
                {
                    question: "Can you tell me a bit about yourself",
                    score: 8.4,
                    criteria: [
                        { text: "The candidate articulated their thoughts and experiences clearly and confidently.", checked: true },
                        { text: "Their background aligned well with the role's requirements and responsibilities.", checked: true },
                        { text: "They demonstrated structured thinking and logical reasoning.", checked: true },
                        { text: "The candidate showed values aligned with the team and company culture.", checked: true },
                        { text: "Time management during answers could be improved.", checked: false },
                    ],
                },
            ],
        },
        notes: [
            {
                id: "note-1",
                author: "John Doe",
                authorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
                content: "The candidate communicated clearly, strong domain knowledge, seems confident. Could be a good culture fit.",
                timestamp: "28 Jul, 09:00 PM",
            },
            {
                id: "note-2",
                author: "Philip Sam",
                authorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
                content: "I felt the answers were a bit rehearsed. Practical experience seemed limited. May struggle with execution.",
                timestamp: "28 Jul, 08:00 PM",
            },
            {
                id: "note-3",
                author: "Jordan Blue",
                authorPhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=50&h=50&fit=crop&crop=face",
                content: "Good enthusiasm and learning mindset. But needs mentorship in technical areas. Overall promising if paired with the right team.",
                timestamp: "28 Jul, 07:00 PM",
            },
        ],
    },

    // Candidate 3: Samuel Baker (another one) - Interview Scheduled
    "3": {
        id: "3",
        name: "Samuel Baker",
        role: "Team Lead Position",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        applicationDate: "22-07-25",
        status: "Interview Scheduled",
        email: "s.baker@email.com",
        phone: "+1 (555) 333-4444",
        location: "Chicago",
        linkedin: "sbaker.profile",
        isRecommendedByAI: true,
        isTop10Rated: false,
        resumeScore: 8.4,
        overallScore: 8.2,
        aiScore: 8.0,
        interviewScheduled: true,
        scheduledTime: "2:00 pm - 3:00 pm",
        scheduledDate: "15-07-25",
        evaluationTags: [
            { label: "4-6 Years", color: "orange" },
            { label: "Team Management", color: "green" },
            { label: "Leadership Skills", color: "green" },
        ],
        skills: ["Team Management", "Leadership", "Project Management", "Agile"],
        statistics: defaultStatistics,
        aiRecommendation: defaultAiRecommendation,
        strengths: defaultStrengths,
        improvements: defaultImprovements,
        careerOverview: ["36 months experience in team leadership"],
        currentWork: ["Team Lead at TechCorp"],
        previousRoles: [{ company: "StartupX", description: "Led a team of 10 engineers." }],
        hiringSteps: [
            { label: "360 Resume Evaluation", score: 8.4, status: "completed" },
            { label: "Interview Round 1", score: null, status: "current" },
            { label: "Technical Test", score: null, status: "pending" },
            { label: "Interview Round 2", score: null, status: "pending" },
        ],
        interviewCompleted: false,
    },

    // Candidate 4: Klein Morgan - Pending 360 Evaluation
    "4": {
        id: "4",
        name: "Klein Morgan",
        role: "Data Analyst",
        photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
        applicationDate: "18-07-25",
        status: "Pending 360 Evaluation",
        email: "klein.morgan@email.com",
        phone: "+1 (555) 555-6666",
        location: "Seattle",
        linkedin: "kleinmorgan.dev",
        isRecommendedByAI: false,
        isTop10Rated: false,
        resumeScore: null,
        overallScore: 0,
        aiScore: 0,
        interviewScheduled: false,
        evaluationTags: [{ label: "2-4 Years", color: "orange" }],
        skills: ["Data Analysis", "SQL", "Python", "Tableau"],
        statistics: [],
        aiRecommendation: { points: [] },
        strengths: [],
        improvements: [],
        careerOverview: ["Under evaluation"],
        currentWork: ["Data Analyst at DataCo"],
        previousRoles: [],
        hiringSteps: [
            { label: "360 Resume Evaluation", score: null, status: "current" },
            { label: "Interview Round 1", score: null, status: "pending" },
            { label: "Technical Test", score: null, status: "pending" },
            { label: "Interview Round 2", score: null, status: "pending" },
        ],
        interviewCompleted: false,
    },

    // Candidate 5: Alvin Rodriguez - Pending 360 Evaluation
    "5": {
        id: "5",
        name: "Alvin Rodriguez",
        role: "Business Analyst",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
        applicationDate: "16-07-25",
        status: "Pending 360 Evaluation",
        email: "alvin.rodriguez@email.com",
        phone: "+1 (555) 777-8888",
        location: "Boston",
        linkedin: "alvinrodriguez.io",
        isRecommendedByAI: false,
        isTop10Rated: false,
        resumeScore: null,
        overallScore: 0,
        aiScore: 0,
        interviewScheduled: false,
        evaluationTags: [
            { label: "1-3 Years", color: "orange" },
            { label: "Data Analysis", color: "green" },
        ],
        skills: ["Business Analysis", "Excel", "Presentation Skills"],
        statistics: [],
        aiRecommendation: { points: [] },
        strengths: [],
        improvements: [],
        careerOverview: ["Under evaluation"],
        currentWork: ["Business Analyst at ConsultingFirm"],
        previousRoles: [],
        hiringSteps: [
            { label: "360 Resume Evaluation", score: null, status: "current" },
            { label: "Interview Round 1", score: null, status: "pending" },
            { label: "Technical Test", score: null, status: "pending" },
            { label: "Interview Round 2", score: null, status: "pending" },
        ],
        interviewCompleted: false,
    },

    // Candidate 6: Philip Drew - Not Recommended / Cancelled
    "6": {
        id: "6",
        name: "Philip Drew",
        role: "Junior Developer",
        photo: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=200&h=200&fit=crop&crop=face",
        applicationDate: "10-07-25",
        status: "Cancelled by System",
        email: "philip.drew@email.com",
        phone: "+1 (555) 999-0000",
        location: "Miami",
        linkedin: "philipdrew.dev",
        isRecommendedByAI: false,
        isTop10Rated: false,
        resumeScore: 5.5,
        overallScore: 5.0,
        aiScore: 4.5,
        interviewScheduled: false,
        evaluationTags: [{ label: "1-2 Years", color: "red" }],
        skills: ["JavaScript", "HTML", "CSS"],
        statistics: defaultStatistics.map(s => ({ ...s, score: s.score * 0.5 })),
        aiRecommendation: {
            points: [
                { text: "Limited experience for the role requirements.", positive: false },
                { text: "Communication skills need improvement.", positive: false },
            ],
        },
        strengths: ["Shows enthusiasm and willingness to learn."],
        improvements: [
            "Lacks required experience.",
            "Technical skills below expectations.",
            "Communication needs improvement.",
        ],
        careerOverview: ["12 months experience"],
        currentWork: ["Junior Developer at SmallCo"],
        previousRoles: [],
        hiringSteps: [
            { label: "360 Resume Evaluation", score: 5.5, status: "completed" },
            { label: "Interview Round 1", score: null, status: "pending" },
            { label: "Technical Test", score: null, status: "pending" },
            { label: "Interview Round 2", score: null, status: "pending" },
        ],
        interviewCompleted: false,
    },

    // Candidate 7: Emily Johnson - Interview Scheduled for Sep 26, 2024
    "7": {
        id: "7",
        name: "Emily Johnson",
        role: "Senior Product Manager Role",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
        applicationDate: "20-07-25",
        status: "Interview Scheduled",
        email: "emily.johnson@gmail.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco",
        linkedin: "emilyjohnson.io",
        isRecommendedByAI: true,
        isTop10Rated: false,
        resumeScore: 8.4,
        overallScore: 8.8,
        aiScore: 8.8,
        interviewScheduled: true,
        scheduledTime: "9:00 am - 10:00 am",
        scheduledDate: "26-09-24",
        evaluationTags: defaultEvaluationTags,
        skills: defaultSkills,
        statistics: defaultStatistics,
        aiRecommendation: defaultAiRecommendation,
        strengths: defaultStrengths,
        improvements: defaultImprovements,
        careerOverview: [
            "60 months relevant experience in product management",
            "Strong background in agile methodologies",
        ],
        currentWork: [
            "Product Lead at TechStart Inc",
            "Leading cross-functional product teams",
        ],
        previousRoles: [
            { company: "Google", description: "Led product development for cloud services, increasing user adoption by 40%." },
            { company: "Meta", description: "Designed and launched new features for business tools platform." },
            { company: "Amazon", description: "Managed product roadmap for AWS enterprise solutions." },
        ],
        hiringSteps: [
            { label: "360 Resume Evaluation", score: 8.4, status: "completed" },
            { label: "Interview Round 1", score: null, status: "current" },
            { label: "Technical Test", score: null, status: "pending" },
            { label: "Interview Round 2", score: null, status: "pending" },
        ],
        interviewCompleted: false,
        notes: [
            {
                id: "note-e1",
                author: "John Doe",
                authorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
                content: "The candidate presents a well-structured resume that highlights strong academic background, relevant professional experience, and clearly demonstrated skills. Achievements are quantified, showcasing impact and results, while the overall format is clean, concise, and easy to follow.",
                timestamp: "10:00 AM",
            },
            {
                id: "note-e2",
                author: "Philip Sam",
                authorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
                content: "The candidate presents a well-structured resume that highlights strong academic background, relevant professional experience, and clearly demonstrated skills. Achievements are quantified, showcasing impact and results.",
                timestamp: "10:00 AM",
            },
            {
                id: "note-e3",
                author: "Jordan Blue",
                authorPhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=50&h=50&fit=crop&crop=face",
                content: "The candidate presents a well-structured resume that highlights strong academic background, relevant professional experience, and clearly demonstrated skills.",
                timestamp: "10:00 AM",
            },
        ],
    },
};

// Interview structure template
export const interviewStructure = [
    {
        id: "warmup",
        title: "Warmup",
        questions: [
            { id: 1, text: "Can you tell me a bit about yourself", type: "Descriptive" as const, aiGenerated: true },
            { id: 2, text: "What are your strengths and weaknesses", type: "Descriptive" as const, aiGenerated: false },
        ],
    },
    {
        id: "technical",
        title: "Technical Evaluation",
        questions: [
            {
                id: 3,
                text: "What are the primary Options when it comes to handling a large team which works remotely spread across various countries. How would you handle such a situation?",
                type: "Descriptive" as const,
                aiGenerated: true,
            },
            {
                id: 4,
                text: "Which of the following tools can be used to handle finances in an international operation",
                type: "MCQ" as const,
                options: 4,
                aiGenerated: true,
            },
        ],
    },
    {
        id: "culture",
        title: "Culture Fit",
        questions: [
            { id: 5, text: "How do you handle conflict within the team?", type: "MCQ" as const, options: 4, aiGenerated: false },
        ],
    },
];

// Get candidate by ID
export const getCandidateById = (id: string): Candidate | undefined => {
    return candidatesData[id];
};

// Get all candidates
export const getAllCandidates = (): Candidate[] => {
    return Object.values(candidatesData);
};

// Get candidates with scheduled interviews (for Interview Schedule sidebar)
export const getScheduledInterviews = (): Candidate[] => {
    return Object.values(candidatesData).filter(c => c.interviewScheduled);
};
