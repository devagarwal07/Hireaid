import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { protect } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.use(protect);

// ─── POST /api/transcripts ──────────────────────────────────
// Save or create a transcript for an interview

router.post(
    "/",
    asyncHandler(async (req, res) => {
        const { interviewId, entries, summary } = req.body;

        if (!interviewId) {
            throw ApiError.badRequest("'interviewId' is required");
        }

        // Verify interview exists
        const interview = await prisma.interview.findUnique({ where: { id: interviewId } });
        if (!interview) {
            throw ApiError.notFound("Interview not found");
        }

        // Stringify entries if they're an array
        const entriesStr = typeof entries === "string" ? entries : JSON.stringify(entries || []);

        // Upsert: create if not exists, update if exists
        const transcript = await prisma.transcript.upsert({
            where: { interviewId },
            create: {
                interviewId,
                entries: entriesStr,
                summary: summary || "",
            },
            update: {
                entries: entriesStr,
                summary: summary || undefined,
            },
        });

        res.status(201).json({
            success: true,
            data: {
                ...transcript,
                entries: safeParseJSON(transcript.entries, []),
            },
        });
    })
);

// ─── GET /api/transcripts/:interviewId ──────────────────────
// Get transcript for an interview

router.get(
    "/:interviewId",
    asyncHandler(async (req, res) => {
        const transcript = await prisma.transcript.findUnique({
            where: { interviewId: req.params.interviewId },
        });

        if (!transcript) {
            // Return empty transcript instead of error - it just hasn't been created yet
            res.json({
                success: true,
                data: {
                    interviewId: req.params.interviewId,
                    entries: [],
                    summary: "",
                },
            });
            return;
        }

        res.json({
            success: true,
            data: {
                ...transcript,
                entries: safeParseJSON(transcript.entries, []),
            },
        });
    })
);

// ─── PUT /api/transcripts/:id ───────────────────────────────
// Update existing transcript (append entries, update summary)

router.put(
    "/:id",
    asyncHandler(async (req, res) => {
        const existing = await prisma.transcript.findUnique({ where: { id: req.params.id } });
        if (!existing) throw ApiError.notFound("Transcript not found");

        const data: any = {};

        // If entries provided, update them
        if (req.body.entries) {
            data.entries = typeof req.body.entries === "string"
                ? req.body.entries
                : JSON.stringify(req.body.entries);
        }

        // If appendEntries provided, merge with existing
        if (req.body.appendEntries) {
            const currentEntries = safeParseJSON(existing.entries, []);
            const newEntries = Array.isArray(req.body.appendEntries)
                ? req.body.appendEntries
                : [req.body.appendEntries];
            data.entries = JSON.stringify([...currentEntries, ...newEntries]);
        }

        // If summary provided, update it
        if (req.body.summary !== undefined) {
            data.summary = req.body.summary;
        }

        const transcript = await prisma.transcript.update({
            where: { id: req.params.id },
            data,
        });

        res.json({
            success: true,
            data: {
                ...transcript,
                entries: safeParseJSON(transcript.entries, []),
            },
        });
    })
);

function safeParseJSON(value: string, fallback: any) {
    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
}

export default router;
