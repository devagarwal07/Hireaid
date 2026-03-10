import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { signToken } from "../utils/jwt.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();
const prisma = new PrismaClient();

// ─── Validation schemas ──────────────────────────────────────

const registerSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        role: z.string().optional(),
    }),
});

const loginSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email"),
        password: z.string().min(1, "Password is required"),
    }),
});

// ─── POST /api/auth/register ─────────────────────────────────

router.post(
    "/register",
    validate(registerSchema),
    asyncHandler(async (req, res) => {
        const { email, password, firstName, lastName, role } = req.body;

        // Check if user exists
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            throw ApiError.conflict("Email already registered");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role: role || "User",
            },
        });

        // Generate token
        const token = signToken({ userId: user.id, email: user.email, role: user.role });

        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    initials: `${user.firstName[0]}${user.lastName[0]}`,
                    notificationsCount: user.notificationsCount,
                },
                token,
            },
        });
    })
);

// ─── POST /api/auth/login ────────────────────────────────────

router.post(
    "/login",
    validate(loginSchema),
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw ApiError.unauthorized("Invalid email or password");
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw ApiError.unauthorized("Invalid email or password");
        }

        // Generate token
        const token = signToken({ userId: user.id, email: user.email, role: user.role });

        res.json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    initials: `${user.firstName[0]}${user.lastName[0]}`,
                    notificationsCount: user.notificationsCount,
                },
                token,
            },
        });
    })
);

// ─── POST /api/auth/logout ───────────────────────────────────

router.post(
    "/logout",
    asyncHandler(async (_req, res) => {
        // With JWT, logout is handled client-side by removing the token
        res.json({ success: true, message: "Logged out successfully" });
    })
);

// ─── GET /api/auth/me ────────────────────────────────────────

router.get(
    "/me",
    protect,
    asyncHandler(async (req, res) => {
        const user = await prisma.user.findUnique({
            where: { id: req.user!.id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                status: true,
                notificationsCount: true,
                createdAt: true,
            },
        });

        if (!user) {
            throw ApiError.notFound("User not found");
        }

        res.json({
            success: true,
            data: {
                ...user,
                initials: `${user.firstName[0]}${user.lastName[0]}`,
            },
        });
    })
);

export default router;
