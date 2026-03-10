import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { protect } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

// All job routes are protected
router.use(protect);

// ─── GET /api/jobs ───────────────────────────────────────────

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const { status, department, search, page = "1", limit = "50" } = req.query;

        const where: any = {};
        if (status && status !== "all") where.status = status;
        if (department) where.department = department;
        if (search) {
            where.OR = [
                { title: { contains: search as string } },
                { department: { contains: search as string } },
            ];
        }

        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const [jobs, total] = await Promise.all([
            prisma.job.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip,
                take: parseInt(limit as string),
                include: { _count: { select: { candidates: true } } },
            }),
            prisma.job.count({ where }),
        ]);

        res.json({
            success: true,
            data: jobs,
            pagination: {
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                total,
                pages: Math.ceil(total / parseInt(limit as string)),
            },
        });
    })
);

// ─── GET /api/jobs/:id ───────────────────────────────────────

router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const job = await prisma.job.findUnique({
            where: { id: req.params.id },
            include: { _count: { select: { candidates: true } } },
        });

        if (!job) throw ApiError.notFound("Job not found");

        res.json({ success: true, data: job });
    })
);

// ─── POST /api/jobs ──────────────────────────────────────────

router.post(
    "/",
    asyncHandler(async (req, res) => {
        const job = await prisma.job.create({
            data: {
                title: req.body.title,
                department: req.body.department,
                status: req.body.status || "open",
                icon: req.body.icon || "code",
                jobId: req.body.jobId,
                areaOfWork: req.body.areaOfWork,
                hiringManager: req.body.hiringManager,
                hiringLocation: req.body.hiringLocation,
                workType: req.body.workType,
                travelRequirement: req.body.travelRequirement,
                employerClient: req.body.employerClient,
                employmentType: req.body.employmentType,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                jobExpirationDate: req.body.jobExpirationDate,
                jobSummary: req.body.jobSummary,
                keyResponsibilities: req.body.keyResponsibilities,
                requiredQualifications: req.body.requiredQualifications,
                preferredQualifications: req.body.preferredQualifications,
                yearsOfExperience: req.body.yearsOfExperience,
                bestFitScore: req.body.bestFitScore,
                skills: req.body.skills,
                salaryRange: req.body.salaryRange,
                workAuthorization: req.body.workAuthorization,
            },
        });

        res.status(201).json({ success: true, data: job });
    })
);

// ─── PUT /api/jobs/:id ───────────────────────────────────────

router.put(
    "/:id",
    asyncHandler(async (req, res) => {
        const existing = await prisma.job.findUnique({ where: { id: req.params.id } });
        if (!existing) throw ApiError.notFound("Job not found");

        const job = await prisma.job.update({
            where: { id: req.params.id },
            data: req.body,
        });

        res.json({ success: true, data: job });
    })
);

// ─── DELETE /api/jobs/:id ────────────────────────────────────

router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
        const existing = await prisma.job.findUnique({ where: { id: req.params.id } });
        if (!existing) throw ApiError.notFound("Job not found");

        await prisma.job.delete({ where: { id: req.params.id } });
        res.json({ success: true, message: "Job deleted" });
    })
);

// ─── POST /api/jobs/:id/duplicate ────────────────────────────

router.post(
    "/:id/duplicate",
    asyncHandler(async (req, res) => {
        const original = await prisma.job.findUnique({ where: { id: req.params.id } });
        if (!original) throw ApiError.notFound("Job not found");

        const { id, createdAt, updatedAt, applied, inProcess, qualified, ...jobData } = original;

        const duplicated = await prisma.job.create({
            data: {
                ...jobData,
                title: `${original.title} (Copy)`,
                applied: 0,
                inProcess: 0,
                qualified: 0,
            },
        });

        res.status(201).json({ success: true, data: duplicated });
    })
);

export default router;
