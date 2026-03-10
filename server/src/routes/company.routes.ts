import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { protect } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.use(protect);

// ─── GET /api/companies ──────────────────────────────────────

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const { status, search, page = "1", limit = "50" } = req.query;

        const where: any = {};
        if (status && status !== "all") where.status = status;
        if (search) {
            where.OR = [
                { companyName: { contains: search as string } },
                { adminName: { contains: search as string } },
                { email: { contains: search as string } },
            ];
        }

        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const [companies, total] = await Promise.all([
            prisma.company.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip,
                take: parseInt(limit as string),
            }),
            prisma.company.count({ where }),
        ]);

        res.json({
            success: true,
            data: companies,
            pagination: {
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                total,
                pages: Math.ceil(total / parseInt(limit as string)),
            },
        });
    })
);

// ─── GET /api/companies/:id ──────────────────────────────────

router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const company = await prisma.company.findUnique({
            where: { id: req.params.id },
            include: { settings: true },
        });

        if (!company) throw ApiError.notFound("Company not found");

        res.json({ success: true, data: company });
    })
);

// ─── POST /api/companies ─────────────────────────────────────

router.post(
    "/",
    asyncHandler(async (req, res) => {
        const company = await prisma.company.create({
            data: {
                companyName: req.body.companyName,
                adminName: req.body.adminName,
                designation: req.body.designation,
                email: req.body.email,
                contactNumber: req.body.contactNumber || "",
                location: req.body.location || "",
                department: req.body.department || "",
                contactAddress: req.body.contactAddress || "",
                status: req.body.status || "active",
            },
        });

        res.status(201).json({ success: true, data: company });
    })
);

// ─── PUT /api/companies/:id ──────────────────────────────────

router.put(
    "/:id",
    asyncHandler(async (req, res) => {
        const existing = await prisma.company.findUnique({ where: { id: req.params.id } });
        if (!existing) throw ApiError.notFound("Company not found");

        const company = await prisma.company.update({
            where: { id: req.params.id },
            data: req.body,
        });

        res.json({ success: true, data: company });
    })
);

// ─── DELETE /api/companies/:id ───────────────────────────────

router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
        const existing = await prisma.company.findUnique({ where: { id: req.params.id } });
        if (!existing) throw ApiError.notFound("Company not found");

        await prisma.company.delete({ where: { id: req.params.id } });
        res.json({ success: true, message: "Company deleted" });
    })
);

export default router;
