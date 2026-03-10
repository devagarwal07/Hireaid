import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // ─── Create default admin user ─────────────────────────────
    const hashedPassword = await bcrypt.hash("admin123", 12);
    const adminUser = await prisma.user.upsert({
        where: { email: "john.doe@hireaide.com" },
        update: {},
        create: {
            email: "john.doe@hireaide.com",
            password: hashedPassword,
            firstName: "John",
            lastName: "Doe",
            role: "SuperAdmin",
            status: "Active",
            notificationsCount: 9,
        },
    });
    console.log("✅ Admin user created:", adminUser.email);

    // ─── Create companies ──────────────────────────────────────
    const companiesData = [
        { companyName: "TechCorp Solutions", adminName: "John Anderson", designation: "CEO", email: "john.anderson@techcorp.com", status: "active" },
        { companyName: "Innovate Labs", adminName: "Sarah Mitchell", designation: "Founder & CTO", email: "sarah.mitchell@innovatelabs.com", status: "active" },
        { companyName: "Digital Dynamics", adminName: "Michael Chen", designation: "Managing Director", email: "michael.chen@digitaldynamics.com", status: "pending" },
        { companyName: "NextGen Enterprises", adminName: "Emily Rodriguez", designation: "VP of Operations", email: "emily.rodriguez@nextgen.com", status: "active" },
        { companyName: "CloudWorks Inc", adminName: "David Thompson", designation: "CEO", email: "david.thompson@cloudworks.com", status: "inactive" },
        { companyName: "Smart Systems Ltd", adminName: "Jennifer Liu", designation: "Chief Operating Officer", email: "jennifer.liu@smartsystems.com", status: "active" },
        { companyName: "Fusion Technologies", adminName: "Robert Martinez", designation: "Founder", email: "robert.martinez@fusiontech.com", status: "active" },
        { companyName: "Alpha Industries", adminName: "Amanda Foster", designation: "President", email: "amanda.foster@alphaindustries.com", status: "pending" },
        { companyName: "Quantum Solutions", adminName: "James Wilson", designation: "Managing Partner", email: "james.wilson@quantumsol.com", status: "active" },
        { companyName: "Vertex Group", adminName: "Lisa Patel", designation: "CEO", email: "lisa.patel@vertexgroup.com", status: "active" },
    ];

    for (const c of companiesData) {
        await prisma.company.create({ data: c });
    }
    console.log("✅ Companies seeded:", companiesData.length);

    // ─── Create jobs ────────────────────────────────────────────
    const jobsData = [
        { title: "Product Designer", department: "Entertainment", status: "open", icon: "design", applied: 24, inProcess: 12, qualified: 8 },
        { title: "Data Engineer", department: "Finance", status: "open", icon: "data", applied: 18, inProcess: 9, qualified: 5 },
        { title: "HR Talent Acquisition Specialist", department: "Human Resources", status: "open", icon: "people", applied: 32, inProcess: 15, qualified: 10 },
        { title: "Fullstack Developer", department: "Finance", status: "on-hold", icon: "code", applied: 45, inProcess: 20, qualified: 12 },
        { title: "Business Analyst", department: "Finance", status: "on-hold", icon: "analyze", applied: 28, inProcess: 14, qualified: 7 },
        { title: "Frontend Developer", department: "Finance", status: "closed", icon: "frontend", applied: 36, inProcess: 18, qualified: 9 },
    ];

    const createdJobs = [];
    for (const j of jobsData) {
        const job = await prisma.job.create({ data: j });
        createdJobs.push(job);
    }
    console.log("✅ Jobs seeded:", jobsData.length);

    // ─── Default data arrays ────────────────────────────────────
    const defaultEvaluationTags = JSON.stringify([
        { label: "5-7 Years", color: "orange" },
        { label: "Relevant awards and experiences", color: "green" },
        { label: "English_Fluency", color: "green" },
        { label: "Knowledge of HR policies and regulatory requirements", color: "blue" },
        { label: "Matches Job Description Very well", color: "green" },
        { label: "Hands on knowledge", color: "green" },
        { label: "Great Communication Skills", color: "green" },
        { label: "Advanced Excel skills", color: "orange" },
    ]);

    const defaultSkills = JSON.stringify([
        "Quality Assessment", "Auditing", "L&D Experience", "Advanced Excel skills",
        "Competency with Google tools", "Knowledge of HR policies and regulatory requirements",
        "English_Fluency", "Hindi_Proficiency", "Remote_Work_Ready",
    ]);

    const defaultStatistics = JSON.stringify([
        { label: "Problem Solving", score: 9.5, color: "#1e3a5f" },
        { label: "Communication", score: 8.5, color: "#3b82f6" },
        { label: "Technical Skills", score: 7.5, color: "#3b82f6" },
        { label: "Leadership", score: 8, color: "#3b82f6" },
        { label: "Experience", score: 7, color: "#3b82f6" },
        { label: "Organizational", score: 6.5, color: "#3b82f6" },
        { label: "Experience", score: 4, color: "#3b82f6" },
        { label: "Job Description", score: 3.5, color: "#3b82f6" },
        { label: "Skills", score: 3, color: "#3b82f6" },
    ]);

    const defaultAiRecommendation = JSON.stringify({
        points: [
            { text: "The candidate articulated their thoughts and experiences clearly and confidently.", positive: true },
            { text: "Their background aligned well with the role's requirements and responsibilities.", positive: true },
            { text: "They demonstrated structured thinking and logical reasoning during technical/problem-solving questions.", positive: true },
            { text: "The candidate showed values, attitude, and mindset aligned with the team and company culture.", positive: true },
            { text: "Time management during answers could be improved to cover more ground efficiently.", positive: false },
        ],
    });

    const defaultStrengths = JSON.stringify([
        "The candidate articulated their thoughts and experiences clearly and confidently.",
        "Their background aligned well with the role's requirements and responsibilities.",
        "They demonstrated structured thinking and logical reasoning during technical/problem-solving questions.",
        "The candidate showed values, attitude, and mindset aligned with the team and company culture.",
        "They were genuinely interested in the role and asked insightful questions about the team, product, or mission.",
    ]);

    const defaultImprovements = JSON.stringify([
        "The candidate could improve clarity and structure when explaining their past work or problem-solving approach.",
        "They lacked depth in certain technical areas relevant to the role.",
        "Some responses were generic and didn't showcase specific examples or outcomes.",
        "There was limited engagement or curiosity shown through follow-up questions.",
        "Time management during answers could be improved to cover more ground efficiently.",
    ]);

    const defaultHiringSteps = JSON.stringify([
        { label: "360 Resume Evaluation", score: null, status: "current" },
        { label: "Interview Round 1", score: null, status: "pending" },
        { label: "Technical Test", score: null, status: "pending" },
        { label: "Interview Round 2", score: null, status: "pending" },
    ]);

    // ─── Create candidates (linked to first job) ───────────────
    const firstJob = createdJobs[0];

    const candidatesData = [
        {
            name: "Marcus Greg", role: "Product Designer",
            photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
            applicationDate: "20-07-25", status: "Pending Interview",
            email: "marcus.greg@email.com", phone: "+1 (555) 111-2222",
            location: "Los Angeles", linkedin: "marcusgreg.io",
            isRecommendedByAI: true, isTop10Rated: true,
            resumeScore: 9.5, overallScore: 9.2, aiScore: 9.0,
            interviewScheduled: false, interviewCompleted: false,
            evaluationTags: defaultEvaluationTags, skills: defaultSkills,
            statistics: defaultStatistics, aiRecommendation: defaultAiRecommendation,
            strengths: defaultStrengths, improvements: defaultImprovements,
            careerOverview: JSON.stringify(["60 months relevant experience in product design", "Strong background in UX/UI design"]),
            currentWork: JSON.stringify(["Lead Product Designer at DesignCo", "Leading design system initiatives"]),
            previousRoles: JSON.stringify([
                { company: "Google", description: "Led product design for cloud services." },
                { company: "Airbnb", description: "Designed user experiences for booking platform." },
            ]),
            hiringSteps: JSON.stringify([
                { label: "360 Resume Evaluation", score: 9.5, status: "completed" },
                { label: "Interview Round 1", score: null, status: "current" },
                { label: "Technical Test", score: null, status: "pending" },
                { label: "Interview Round 2", score: null, status: "pending" },
            ]),
            jobId: firstJob.id,
        },
        {
            name: "Samuel Baker", role: "HR Quality & Training Specialist Role",
            photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
            applicationDate: "24-07-25", status: "Interview Completed",
            email: "samuel.baker@email.com", phone: "+1 (312) 471-5436",
            location: "New York", linkedin: "samuelbaker.xyz",
            isRecommendedByAI: true, isTop10Rated: true,
            resumeScore: 8.4, overallScore: 8.8, aiScore: 8.8,
            interviewScheduled: true, scheduledTime: "11:30 am - 12:30 pm", scheduledDate: "11-07-25",
            interviewCompleted: true,
            evaluationTags: defaultEvaluationTags, skills: defaultSkills,
            statistics: defaultStatistics, aiRecommendation: defaultAiRecommendation,
            strengths: defaultStrengths, improvements: defaultImprovements,
            careerOverview: JSON.stringify(["48 months relevant experience in product management", "Almost nil experience in business development"]),
            currentWork: JSON.stringify(["Senior Product Manager at Newton School", "Designing tutor centric ed-tech dashboards"]),
            previousRoles: JSON.stringify([
                { company: "Meesho", description: "Improved the discoverability of our free products by 52%." },
                { company: "Procol", description: "Designed an interface that automated and centralised quality checks for B2B clients." },
            ]),
            hiringSteps: JSON.stringify([
                { label: "360 Resume Evaluation", score: 8.4, status: "completed" },
                { label: "Interview Round 1", score: 8.4, status: "completed" },
                { label: "Technical Test", score: null, status: "current" },
                { label: "Interview Round 2", score: null, status: "pending" },
            ]),
            jobId: firstJob.id,
        },
        {
            name: "Samuel Baker", role: "Team Lead Position",
            photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
            applicationDate: "22-07-25", status: "Interview Scheduled",
            email: "s.baker@email.com", phone: "+1 (555) 333-4444",
            location: "Chicago", linkedin: "sbaker.profile",
            isRecommendedByAI: true, isTop10Rated: false,
            resumeScore: 8.4, overallScore: 8.2, aiScore: 8.0,
            interviewScheduled: true, scheduledTime: "2:00 pm - 3:00 pm", scheduledDate: "15-07-25",
            interviewCompleted: false,
            evaluationTags: JSON.stringify([
                { label: "4-6 Years", color: "orange" },
                { label: "Team Management", color: "green" },
                { label: "Leadership Skills", color: "green" },
            ]),
            skills: JSON.stringify(["Team Management", "Leadership", "Project Management", "Agile"]),
            statistics: defaultStatistics, aiRecommendation: defaultAiRecommendation,
            strengths: defaultStrengths, improvements: defaultImprovements,
            careerOverview: JSON.stringify(["36 months experience in team leadership"]),
            currentWork: JSON.stringify(["Team Lead at TechCorp"]),
            previousRoles: JSON.stringify([{ company: "StartupX", description: "Led a team of 10 engineers." }]),
            hiringSteps: JSON.stringify([
                { label: "360 Resume Evaluation", score: 8.4, status: "completed" },
                { label: "Interview Round 1", score: null, status: "current" },
                { label: "Technical Test", score: null, status: "pending" },
                { label: "Interview Round 2", score: null, status: "pending" },
            ]),
            jobId: firstJob.id,
        },
        {
            name: "Klein Morgan", role: "Data Analyst",
            photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
            applicationDate: "18-07-25", status: "Pending 360 Evaluation",
            email: "klein.morgan@email.com", phone: "+1 (555) 555-6666",
            location: "Seattle", linkedin: "kleinmorgan.dev",
            isRecommendedByAI: false, isTop10Rated: false,
            resumeScore: null, overallScore: 0, aiScore: 0,
            interviewScheduled: false, interviewCompleted: false,
            evaluationTags: JSON.stringify([{ label: "2-4 Years", color: "orange" }]),
            skills: JSON.stringify(["Data Analysis", "SQL", "Python", "Tableau"]),
            statistics: "[]", aiRecommendation: JSON.stringify({ points: [] }),
            strengths: "[]", improvements: "[]",
            careerOverview: JSON.stringify(["Under evaluation"]),
            currentWork: JSON.stringify(["Data Analyst at DataCo"]),
            previousRoles: "[]",
            hiringSteps: defaultHiringSteps,
            jobId: firstJob.id,
        },
        {
            name: "Alvin Rodriguez", role: "Business Analyst",
            photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
            applicationDate: "16-07-25", status: "Pending 360 Evaluation",
            email: "alvin.rodriguez@email.com", phone: "+1 (555) 777-8888",
            location: "Boston", linkedin: "alvinrodriguez.io",
            isRecommendedByAI: false, isTop10Rated: false,
            resumeScore: null, overallScore: 0, aiScore: 0,
            interviewScheduled: false, interviewCompleted: false,
            evaluationTags: JSON.stringify([{ label: "1-3 Years", color: "orange" }, { label: "Data Analysis", color: "green" }]),
            skills: JSON.stringify(["Business Analysis", "Excel", "Presentation Skills"]),
            statistics: "[]", aiRecommendation: JSON.stringify({ points: [] }),
            strengths: "[]", improvements: "[]",
            careerOverview: JSON.stringify(["Under evaluation"]),
            currentWork: JSON.stringify(["Business Analyst at ConsultingFirm"]),
            previousRoles: "[]",
            hiringSteps: defaultHiringSteps,
            jobId: firstJob.id,
        },
        {
            name: "Philip Drew", role: "Junior Developer",
            photo: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=200&h=200&fit=crop&crop=face",
            applicationDate: "10-07-25", status: "Cancelled by System",
            email: "philip.drew@email.com", phone: "+1 (555) 999-0000",
            location: "Miami", linkedin: "philipdrew.dev",
            isRecommendedByAI: false, isTop10Rated: false,
            resumeScore: 5.5, overallScore: 5.0, aiScore: 4.5,
            interviewScheduled: false, interviewCompleted: false,
            evaluationTags: JSON.stringify([{ label: "1-2 Years", color: "red" }]),
            skills: JSON.stringify(["JavaScript", "HTML", "CSS"]),
            statistics: JSON.stringify([
                { label: "Problem Solving", score: 4.75, color: "#1e3a5f" },
                { label: "Communication", score: 4.25, color: "#3b82f6" },
                { label: "Technical Skills", score: 3.75, color: "#3b82f6" },
                { label: "Leadership", score: 4, color: "#3b82f6" },
                { label: "Experience", score: 3.5, color: "#3b82f6" },
                { label: "Organizational", score: 3.25, color: "#3b82f6" },
                { label: "Experience", score: 2, color: "#3b82f6" },
                { label: "Job Description", score: 1.75, color: "#3b82f6" },
                { label: "Skills", score: 1.5, color: "#3b82f6" },
            ]),
            aiRecommendation: JSON.stringify({
                points: [
                    { text: "Limited experience for the role requirements.", positive: false },
                    { text: "Communication skills need improvement.", positive: false },
                ],
            }),
            strengths: JSON.stringify(["Shows enthusiasm and willingness to learn."]),
            improvements: JSON.stringify(["Lacks required experience.", "Technical skills below expectations.", "Communication needs improvement."]),
            careerOverview: JSON.stringify(["12 months experience"]),
            currentWork: JSON.stringify(["Junior Developer at SmallCo"]),
            previousRoles: "[]",
            hiringSteps: JSON.stringify([
                { label: "360 Resume Evaluation", score: 5.5, status: "completed" },
                { label: "Interview Round 1", score: null, status: "pending" },
                { label: "Technical Test", score: null, status: "pending" },
                { label: "Interview Round 2", score: null, status: "pending" },
            ]),
            jobId: firstJob.id,
        },
        {
            name: "Emily Johnson", role: "Senior Product Manager Role",
            photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
            applicationDate: "20-07-25", status: "Interview Scheduled",
            email: "emily.johnson@gmail.com", phone: "+1 (555) 123-4567",
            location: "San Francisco", linkedin: "emilyjohnson.io",
            isRecommendedByAI: true, isTop10Rated: false,
            resumeScore: 8.4, overallScore: 8.8, aiScore: 8.8,
            interviewScheduled: true, scheduledTime: "9:00 am - 10:00 am", scheduledDate: "26-09-24",
            interviewCompleted: false,
            evaluationTags: defaultEvaluationTags, skills: defaultSkills,
            statistics: defaultStatistics, aiRecommendation: defaultAiRecommendation,
            strengths: defaultStrengths, improvements: defaultImprovements,
            careerOverview: JSON.stringify(["60 months relevant experience in product management", "Strong background in agile methodologies"]),
            currentWork: JSON.stringify(["Product Lead at TechStart Inc", "Leading cross-functional product teams"]),
            previousRoles: JSON.stringify([
                { company: "Google", description: "Led product development for cloud services, increasing user adoption by 40%." },
                { company: "Meta", description: "Designed and launched new features for business tools platform." },
                { company: "Amazon", description: "Managed product roadmap for AWS enterprise solutions." },
            ]),
            hiringSteps: JSON.stringify([
                { label: "360 Resume Evaluation", score: 8.4, status: "completed" },
                { label: "Interview Round 1", score: null, status: "current" },
                { label: "Technical Test", score: null, status: "pending" },
                { label: "Interview Round 2", score: null, status: "pending" },
            ]),
            jobId: firstJob.id,
        },
    ];

    const createdCandidates = [];
    for (const c of candidatesData) {
        const candidate = await prisma.candidate.create({ data: c });
        createdCandidates.push(candidate);
    }
    console.log("✅ Candidates seeded:", candidatesData.length);

    // ─── Create notes for Samuel Baker (candidate 2) ───────────
    const samuelBaker = createdCandidates[1];
    await prisma.candidateNote.createMany({
        data: [
            {
                candidateId: samuelBaker.id,
                authorId: adminUser.id,
                content: "The candidate communicated clearly, strong domain knowledge, seems confident. Could be a good culture fit.",
                timestamp: "28 Jul, 09:00 PM",
            },
            {
                candidateId: samuelBaker.id,
                authorId: adminUser.id,
                content: "I felt the answers were a bit rehearsed. Practical experience seemed limited. May struggle with execution.",
                timestamp: "28 Jul, 08:00 PM",
            },
            {
                candidateId: samuelBaker.id,
                authorId: adminUser.id,
                content: "Good enthusiasm and learning mindset. But needs mentorship in technical areas. Overall promising if paired with the right team.",
                timestamp: "28 Jul, 07:00 PM",
            },
        ],
    });

    // ─── Create notes for Emily Johnson (candidate 7) ──────────
    const emilyJohnson = createdCandidates[6];
    await prisma.candidateNote.createMany({
        data: [
            {
                candidateId: emilyJohnson.id,
                authorId: adminUser.id,
                content: "The candidate presents a well-structured resume that highlights strong academic background, relevant professional experience, and clearly demonstrated skills.",
                timestamp: "10:00 AM",
            },
        ],
    });
    console.log("✅ Candidate notes seeded");

    // ─── Create interview for Samuel Baker ──────────────────────
    await prisma.interview.create({
        data: {
            jobId: firstJob.id,
            candidateId: samuelBaker.id,
            interviewerId: adminUser.id,
            date: "8-07-25",
            time: "10:00 am - 12:30 pm",
            duration: "4 hours",
            status: "completed",
            description: "Interview for HR Quality & Training Specialist Role",
            evaluationTags: JSON.stringify(["Showed clear technical knowledge", "Brilliant communication skills", "Leadership"]),
            strengths: defaultStrengths,
            improvements: defaultImprovements,
            questions: JSON.stringify([
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
            ]),
        },
    });
    console.log("✅ Interviews seeded");

    console.log("🎉 Database seeding completed!");
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
