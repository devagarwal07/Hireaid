import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { protect, restrictTo } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.use(protect);
router.use(restrictTo("SuperAdmin", "Admin"));

// ─── GET /api/users ──────────────────────────────────────────

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const { search, status } = req.query;

        const where: any = {};
        if (status && status !== "all") where.status = status;
        if (search) {
            where.OR = [
                { firstName: { contains: search as string } },
                { lastName: { contains: search as string } },
                { email: { contains: search as string } },
            ];
        }

        const users = await prisma.user.findMany({
            where,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                status: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
        });

        res.json({ success: true, data: users });
    })
);

// ─── POST /api/users ─────────────────────────────────────────

router.post(
    "/",
    asyncHandler(async (req, res) => {
        const { email, password, firstName, lastName, role } = req.body;

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) throw ApiError.conflict("Email already exists");

        const hashedPassword = await bcrypt.hash(password || "default123", 12);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role: role || "User",
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                status: true,
                createdAt: true,
            },
        });

        res.status(201).json({ success: true, data: user });
    })
);

// ─── PUT /api/users/:id ──────────────────────────────────────

router.put(
    "/:id",
    asyncHandler(async (req, res) => {
        const existing = await prisma.user.findUnique({ where: { id: req.params.id } });
        if (!existing) throw ApiError.notFound("User not found");

        const data: any = { ...req.body };

        // Hash password if being updated
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 12);
        }

        const user = await prisma.user.update({
            where: { id: req.params.id },
            data,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                status: true,
                createdAt: true,
            },
        });

        res.json({ success: true, data: user });
    })
);

// ─── DELETE /api/users/:id ───────────────────────────────────

router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
        if (req.params.id === req.user!.id) {
            throw ApiError.badRequest("Cannot delete your own account");
        }

        const existing = await prisma.user.findUnique({ where: { id: req.params.id } });
        if (!existing) throw ApiError.notFound("User not found");

        await prisma.user.delete({ where: { id: req.params.id } });
        res.json({ success: true, message: "User deleted" });
    })
);

export default router;
