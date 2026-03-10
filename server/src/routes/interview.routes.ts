import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { protect } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.use(protect);

// ─── GET /api/interviews/scheduled ───────────────────────────

router.get(
    "/scheduled",
    asyncHandler(async (_req, res) => {
        const interviews = await prisma.interview.findMany({
            where: { status: "scheduled" },
            include: {
                candidate: {
                    select: { id: true, name: true, role: true, photo: true },
                },
                job: {
                    select: { id: true, title: true, department: true },
                },
                interviewer: {
                    select: { id: true, firstName: true, lastName: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        // Parse JSON fields
        const parsed = interviews.map((i) => ({
            ...i,
            evaluationTags: safeParseJSON(i.evaluationTags, []),
            strengths: safeParseJSON(i.strengths, []),
            improvements: safeParseJSON(i.improvements, []),
            questions: safeParseJSON(i.questions, []),
        }));

        res.json({ success: true, data: parsed });
    })
);

// ─── POST /api/interviews/schedule ───────────────────────────

router.post(
    "/schedule",
    asyncHandler(async (req, res) => {
        const { jobId, candidateId, date, time, duration, description } = req.body;

        // Verify candidate exists
        const candidate = await prisma.candidate.findUnique({ where: { id: candidateId } });
        if (!candidate) throw ApiError.notFound("Candidate not found");

        // Create interview
        const interview = await prisma.interview.create({
            data: {
                jobId,
                candidateId,
                interviewerId: req.user!.id,
                date,
                time,
                duration: duration || "",
                description: description || "",
                status: "scheduled",
            },
        });

        // Update candidate status
        await prisma.candidate.update({
            where: { id: candidateId },
            data: {
                interviewScheduled: true,
                scheduledTime: time,
                scheduledDate: date,
                status: "Interview Scheduled",
            },
        });

        res.status(201).json({ success: true, data: interview });
    })
);

// ─── GET /api/interviews/:id ─────────────────────────────────

router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const interview = await prisma.interview.findUnique({
            where: { id: req.params.id },
            include: {
                candidate: true,
                job: true,
                interviewer: {
                    select: { id: true, firstName: true, lastName: true },
                },
            },
        });

        if (!interview) throw ApiError.notFound("Interview not found");

        res.json({
            success: true,
            data: {
                ...interview,
                evaluationTags: safeParseJSON(interview.evaluationTags, []),
                strengths: safeParseJSON(interview.strengths, []),
                improvements: safeParseJSON(interview.improvements, []),
                questions: safeParseJSON(interview.questions, []),
            },
        });
    })
);

// ─── GET /api/interviews/:id/report ──────────────────────────

router.get(
    "/:id/report",
    asyncHandler(async (req, res) => {
        const interview = await prisma.interview.findUnique({
            where: { id: req.params.id },
            include: {
                candidate: true,
                job: { select: { id: true, title: true } },
                interviewer: { select: { id: true, firstName: true, lastName: true } },
            },
        });

        if (!interview) throw ApiError.notFound("Interview not found");

        res.json({
            success: true,
            data: {
                ...interview,
                evaluationTags: safeParseJSON(interview.evaluationTags, []),
                strengths: safeParseJSON(interview.strengths, []),
                improvements: safeParseJSON(interview.improvements, []),
                questions: safeParseJSON(interview.questions, []),
            },
        });
    })
);

// ─── POST /api/interviews/:id/report ─────────────────────────

router.post(
    "/:id/report",
    asyncHandler(async (req, res) => {
        const interview = await prisma.interview.findUnique({ where: { id: req.params.id } });
        if (!interview) throw ApiError.notFound("Interview not found");

        const updated = await prisma.interview.update({
            where: { id: req.params.id },
            data: {
                status: "completed",
                evaluationTags: JSON.stringify(req.body.evaluationTags || []),
                strengths: JSON.stringify(req.body.strengths || []),
                improvements: JSON.stringify(req.body.improvements || []),
                questions: JSON.stringify(req.body.questions || []),
            },
        });

        // Update candidate status
        await prisma.candidate.update({
            where: { id: interview.candidateId },
            data: {
                interviewCompleted: true,
                status: "Interview Completed",
            },
        });

        res.json({ success: true, data: updated });
    })
);

// ─── PUT /api/interviews/:id ─────────────────────────────────

router.put(
    "/:id",
    asyncHandler(async (req, res) => {
        const existing = await prisma.interview.findUnique({ where: { id: req.params.id } });
        if (!existing) throw ApiError.notFound("Interview not found");

        const data: any = { ...req.body };
        // Stringify JSON fields if needed
        for (const field of ["evaluationTags", "strengths", "improvements", "questions"]) {
            if (data[field] && typeof data[field] !== "string") {
                data[field] = JSON.stringify(data[field]);
            }
        }

        const interview = await prisma.interview.update({
            where: { id: req.params.id },
            data,
        });

        res.json({ success: true, data: interview });
    })
);

// ─── DELETE /api/interviews/:id ──────────────────────────────

router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
        const existing = await prisma.interview.findUnique({ where: { id: req.params.id } });
        if (!existing) throw ApiError.notFound("Interview not found");

        await prisma.interview.delete({ where: { id: req.params.id } });
        res.json({ success: true, message: "Interview deleted" });
    })
);

function safeParseJSON(value: string, fallback: any) {
    try { return JSON.parse(value); } catch { return fallback; }
}

export default router;
