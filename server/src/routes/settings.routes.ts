import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { protect } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.use(protect);

// ─── GET /api/settings/admin ─────────────────────────────────

router.get(
    "/admin",
    asyncHandler(async (req, res) => {
        // For now, return the first company's settings (or create default)
        let company = await prisma.company.findFirst({
            include: { settings: true },
        });

        if (!company) {
            // Create a default company with settings
            company = await prisma.company.create({
                data: {
                    companyName: "HireAide Demo Company",
                    adminName: `${req.user!.firstName} ${req.user!.lastName}`,
                    designation: "General Manager",
                    email: req.user!.email,
                    contactNumber: "212-4587-890",
                    location: "San Francisco",
                    department: "Human Resources",
                    contactAddress: "4567 Corporate Plaza, Suite 900, San Francisco, CA 94105, USA",
                    settings: { create: { theme: 0 } },
                },
                include: { settings: true },
            });
        }

        res.json({
            success: true,
            data: {
                companyName: company.companyName,
                adminName: company.adminName,
                designation: company.designation,
                email: company.email,
                contactNumber: company.contactNumber,
                location: company.location,
                department: company.department,
                contactAddress: company.contactAddress,
                theme: company.settings?.theme || 0,
            },
        });
    })
);

// ─── PUT /api/settings/admin ─────────────────────────────────

router.put(
    "/admin",
    asyncHandler(async (req, res) => {
        let company = await prisma.company.findFirst();
        if (!company) throw ApiError.notFound("No company settings found");

        const updated = await prisma.company.update({
            where: { id: company.id },
            data: {
                companyName: req.body.companyName,
                adminName: req.body.adminName,
                designation: req.body.designation,
                email: req.body.email,
                contactNumber: req.body.contactNumber,
                location: req.body.location,
                department: req.body.department,
                contactAddress: req.body.contactAddress,
            },
        });

        // Update theme if provided
        if (req.body.theme !== undefined) {
            await prisma.companySettings.upsert({
                where: { companyId: company.id },
                update: { theme: req.body.theme },
                create: { companyId: company.id, theme: req.body.theme },
            });
        }

        res.json({ success: true, data: updated });
    })
);

export default router;
