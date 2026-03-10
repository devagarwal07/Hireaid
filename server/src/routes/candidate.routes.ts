import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { protect } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.use(protect);

// ─── GET /api/jobs/:jobId/candidates ─────────────────────────

router.get(
    "/job/:jobId",
    asyncHandler(async (req, res) => {
        const { status, search, page = "1", limit = "50" } = req.query;

        const where: any = { jobId: req.params.jobId };
        if (status && status !== "all") where.status = status;
        if (search) {
            where.OR = [
                { name: { contains: search as string } },
                { email: { contains: search as string } },
                { role: { contains: search as string } },
            ];
        }

        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const [candidates, total] = await Promise.all([
            prisma.candidate.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip,
                take: parseInt(limit as string),
            }),
            prisma.candidate.count({ where }),
        ]);

        // Parse JSON fields for response
        const parsed = candidates.map(parseCandidate);

        res.json({
            success: true,
            data: parsed,
            pagination: {
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                total,
                pages: Math.ceil(total / parseInt(limit as string)),
            },
        });
    })
);

// ─── GET /api/candidates/:id ─────────────────────────────────

router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const candidate = await prisma.candidate.findUnique({
            where: { id: req.params.id },
            include: {
                notes: {
                    include: {
                        author: {
                            select: { id: true, firstName: true, lastName: true },
                        },
                    },
                    orderBy: { createdAt: "desc" },
                },
                interviews: {
                    include: {
                        interviewer: {
                            select: { id: true, firstName: true, lastName: true },
                        },
                    },
                },
            },
        });

        if (!candidate) throw ApiError.notFound("Candidate not found");

        const parsed = parseCandidate(candidate);

        // Parse interview data
        if (parsed.interviews) {
            parsed.interviews = parsed.interviews.map((interview: any) => ({
                ...interview,
                evaluationTags: safeParseJSON(interview.evaluationTags, []),
                strengths: safeParseJSON(interview.strengths, []),
                improvements: safeParseJSON(interview.improvements, []),
                questions: safeParseJSON(interview.questions, []),
            }));
        }

        res.json({ success: true, data: parsed });
    })
);

// ─── POST /api/candidates ────────────────────────────────────

router.post(
    "/",
    asyncHandler(async (req, res) => {
        const data = { ...req.body };

        // Stringify JSON fields if they're objects
        const jsonFields = [
            "evaluationTags", "skills", "statistics", "aiRecommendation",
            "strengths", "improvements", "careerOverview", "currentWork",
            "previousRoles", "hiringSteps",
        ];

        for (const field of jsonFields) {
            if (data[field] && typeof data[field] !== "string") {
                data[field] = JSON.stringify(data[field]);
            }
        }

        const candidate = await prisma.candidate.create({ data });

        res.status(201).json({ success: true, data: parseCandidate(candidate) });
    })
);

// ─── PUT /api/candidates/:id ─────────────────────────────────

router.put(
    "/:id",
    asyncHandler(async (req, res) => {
        const existing = await prisma.candidate.findUnique({ where: { id: req.params.id } });
        if (!existing) throw ApiError.notFound("Candidate not found");

        const data = { ...req.body };

        const jsonFields = [
            "evaluationTags", "skills", "statistics", "aiRecommendation",
            "strengths", "improvements", "careerOverview", "currentWork",
            "previousRoles", "hiringSteps",
        ];

        for (const field of jsonFields) {
            if (data[field] && typeof data[field] !== "string") {
                data[field] = JSON.stringify(data[field]);
            }
        }

        const candidate = await prisma.candidate.update({
            where: { id: req.params.id },
            data,
        });

        res.json({ success: true, data: parseCandidate(candidate) });
    })
);

// ─── DELETE /api/candidates/:id ──────────────────────────────

router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
        const existing = await prisma.candidate.findUnique({ where: { id: req.params.id } });
        if (!existing) throw ApiError.notFound("Candidate not found");

        await prisma.candidate.delete({ where: { id: req.params.id } });
        res.json({ success: true, message: "Candidate deleted" });
    })
);

// ─── POST /api/candidates/:id/notes ──────────────────────────

router.post(
    "/:id/notes",
    asyncHandler(async (req, res) => {
        const candidate = await prisma.candidate.findUnique({ where: { id: req.params.id } });
        if (!candidate) throw ApiError.notFound("Candidate not found");

        const note = await prisma.candidateNote.create({
            data: {
                candidateId: req.params.id,
                authorId: req.user!.id,
                content: req.body.content,
                timestamp: req.body.timestamp || new Date().toLocaleString(),
                isAISummary: req.body.isAISummary || false,
            },
            include: {
                author: {
                    select: { id: true, firstName: true, lastName: true },
                },
            },
        });

        res.status(201).json({ success: true, data: note });
    })
);

// ─── GET /api/candidates/:id/notes ───────────────────────────

router.get(
    "/:id/notes",
    asyncHandler(async (req, res) => {
        const notes = await prisma.candidateNote.findMany({
            where: { candidateId: req.params.id },
            include: {
                author: {
                    select: { id: true, firstName: true, lastName: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        res.json({ success: true, data: notes });
    })
);

// ─── Helpers ─────────────────────────────────────────────────

function safeParseJSON(value: string, fallback: any = []) {
    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
}

function parseCandidate(candidate: any) {
    return {
        ...candidate,
        evaluationTags: safeParseJSON(candidate.evaluationTags, []),
        skills: safeParseJSON(candidate.skills, []),
        statistics: safeParseJSON(candidate.statistics, []),
        aiRecommendation: safeParseJSON(candidate.aiRecommendation, {}),
        strengths: safeParseJSON(candidate.strengths, []),
        improvements: safeParseJSON(candidate.improvements, []),
        careerOverview: safeParseJSON(candidate.careerOverview, []),
        currentWork: safeParseJSON(candidate.currentWork, []),
        previousRoles: safeParseJSON(candidate.previousRoles, []),
        hiringSteps: safeParseJSON(candidate.hiringSteps, []),
    };
}

export default router;
