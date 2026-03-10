import { Router } from "express";
// import { protect } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const router = Router();

// router.use(protect);

// ─── POST /api/daily/room ────────────────────────────────────

router.post(
    "/room",
    asyncHandler(async (req, res) => {
        const { interviewId } = req.body;

        // If no DAILY_API_KEY, return mock data for development
        if (!process.env.DAILY_API_KEY) {
            const mockRoomName = `hireaid-mock-${interviewId || Math.random().toString(36).substring(7)}`;
            res.json({
                success: true,
                data: {
                    url: `https://hireaid.daily.co/${mockRoomName}`,
                    token: "mock-token-for-development",
                    roomName: mockRoomName,
                    isMock: true,
                },
            });
            return;
        }

        const roomName = `hireaid-${interviewId || Math.random().toString(36).substring(7)}`;

        try {
            // Create a Daily room
            const roomResponse = await fetch("https://api.daily.co/v1/rooms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
                },
                body: JSON.stringify({
                    name: roomName,
                    properties: {
                        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2, // 2 hours
                        enable_prejoin_ui: false,
                        start_video_off: false,
                        start_audio_off: false,
                    },
                }),
            });

            if (!roomResponse.ok) {
                const error = await roomResponse.json() as any;
                console.error("Daily.co room creation error:", error);

                // If room already exists, that's fine, we can still generate a token for it
                if (error.error !== "invalid-request-error" || !error.info?.includes("already exists")) {
                    throw new ApiError(500, "Failed to create Daily room: " + (error.info || error.error));
                }
            }

            const roomData = roomResponse.ok ? (await roomResponse.json() as any) : { url: `https://YOUR_DAILY_DOMAIN.daily.co/${roomName}` }; // Replace YOUR_DAILY_DOMAIN if we had it, but we'll fetch token anyway

            // Generate meeting token for the user
            const tokenResponse = await fetch("https://api.daily.co/v1/meeting-tokens", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
                },
                body: JSON.stringify({
                    properties: {
                        room_name: roomName,
                        user_name: req.user ? `${req.user.firstName} ${req.user.lastName}` : "Candidate",
                        is_owner: true,
                    },
                }),
            });

            if (!tokenResponse.ok) {
                const error = await tokenResponse.json();
                console.error("Daily.co token creation error:", error);
                throw new ApiError(500, "Failed to create Daily token.");
            }

            const tokenData = await tokenResponse.json() as any;

            // Note: Since we don't have the user's daily domain, we rely on the client providing the domain 
            // or we extract it from roomData if creation was successful.
            let roomUrl = roomData.url || "";
            if (!roomUrl && process.env.DAILY_DOMAIN) {
                roomUrl = `https://${process.env.DAILY_DOMAIN}.daily.co/${roomName}`;
            }

            res.json({
                success: true,
                data: {
                    url: roomUrl,
                    token: tokenData.token,
                    roomName: roomName
                },
            });
        } catch (error: any) {
            console.error("Daily integration error:", error);
            throw new ApiError(500, error.message || "Failed to initialize video call");
        }
    })
);

export default router;
