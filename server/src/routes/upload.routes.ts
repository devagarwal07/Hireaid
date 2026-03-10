import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();
const prisma = new PrismaClient();

router.use(protect);

// ─── POST /api/upload/resumes ────────────────────────────────

router.post(
    "/resumes",
    upload.array("files", 10),
    asyncHandler(async (req, res) => {
        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            res.status(400).json({ success: false, message: "No files uploaded" });
            return;
        }

        // Save file records to database
        const savedFiles = await Promise.all(
            files.map((file) =>
                prisma.uploadedFile.create({
                    data: {
                        filename: file.filename,
                        originalName: file.originalname,
                        mimetype: file.mimetype,
                        size: file.size,
                        path: file.path,
                        candidateId: req.body.candidateId || null,
                    },
                })
            )
        );

        res.status(201).json({
            success: true,
            data: savedFiles.map((f) => ({
                id: f.id,
                name: f.originalName,
                size: formatFileSize(f.size),
                filename: f.filename,
            })),
        });
    })
);

// ─── GET /api/upload/files ───────────────────────────────────

router.get(
    "/files",
    asyncHandler(async (req, res) => {
        const { candidateId } = req.query;

        const where: any = {};
        if (candidateId) where.candidateId = candidateId;

        const files = await prisma.uploadedFile.findMany({
            where,
            orderBy: { createdAt: "desc" },
        });

        res.json({
            success: true,
            data: files.map((f) => ({
                id: f.id,
                name: f.originalName,
                size: formatFileSize(f.size),
                filename: f.filename,
                createdAt: f.createdAt,
            })),
        });
    })
);

// ─── DELETE /api/upload/files/:id ────────────────────────────

router.delete(
    "/files/:id",
    asyncHandler(async (req, res) => {
        const file = await prisma.uploadedFile.findUnique({ where: { id: req.params.id } });
        if (!file) {
            res.status(404).json({ success: false, message: "File not found" });
            return;
        }

        // Delete from DB (file on disk can be cleaned up separately)
        await prisma.uploadedFile.delete({ where: { id: req.params.id } });

        res.json({ success: true, message: "File deleted" });
    })
);

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + "B";
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + "KB";
    return (bytes / (1024 * 1024)).toFixed(1) + "MB";
}

export default router;
