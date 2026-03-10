import { Router } from "express";
// import { protect } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const router = Router();

// router.use(protect);

// ─── GET /api/openai/realtime-token ──────────────────────────

router.get(
    "/realtime-token",
    asyncHandler(async (req, res) => {
        if (!process.env.OPENAI_API_KEY) {
            throw new ApiError(500, "OPENAI_API_KEY is not configured");
        }

        try {
            // Generate an ephemeral token from OpenAI
            // https://platform.openai.com/docs/guides/realtime/overview
            const r = await fetch("https://api.openai.com/v1/realtime/sessions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "gpt-4o-realtime-preview-2024-12-17",
                    voices: ["alloy"]
                }),
            });

            if (!r.ok) {
                const errorData = await r.json();
                console.error("OpenAI Realtime session error:", errorData);
                throw new ApiError(500, "Failed to generate OpenAI Realtime session: " + JSON.stringify(errorData));
            }

            const data = await r.json() as any;

            // data.client_secret.value contains the ephemeral token
            res.json({
                success: true,
                data: {
                    client_secret: data.client_secret.value
                }
            });
        } catch (error: any) {
            console.error("OpenAI token error:", error);
            throw new ApiError(500, error.message || "Failed to generate AI session token");
        }
    })
);

export default router;
