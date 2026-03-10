import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Import routes
import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.routes.js";
import candidateRoutes from "./routes/candidate.routes.js";
import companyRoutes from "./routes/company.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import userRoutes from "./routes/user.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import dailyRoutes from "./routes/daily.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import transcriptRoutes from "./routes/transcript.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ─── Security ────────────────────────────────────────────────
app.use(helmet());

// ─── CORS ────────────────────────────────────────────────────
app.use(
    cors({
        origin: env.CORS_ORIGIN,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// ─── Rate limiting ───────────────────────────────────────────
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window per IP
    message: { success: false, message: "Too many requests, please try again later" },
});
app.use("/api/", limiter);

// ─── Body parsing ────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ─── Logging ─────────────────────────────────────────────────
if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// ─── Static files (uploads) ──────────────────────────────────
app.use("/uploads", express.static(path.resolve(env.UPLOAD_DIR)));

// ─── API Routes ──────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/daily", dailyRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/transcripts", transcriptRoutes);

// ─── Health check ────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
    res.json({ success: true, message: "Hireaid API is running", timestamp: new Date().toISOString() });
});

// ─── 404 handler ─────────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// ─── Global error handler ────────────────────────────────────
app.use(errorHandler);

// ─── Start server ────────────────────────────────────────────
app.listen(env.PORT, () => {
    console.log(`
  🚀 Hireaid API Server
  ────────────────────────────────
  Environment: ${env.NODE_ENV}
  Port:        ${env.PORT}
  CORS:        ${env.CORS_ORIGIN}
  Database:    SQLite (${env.DATABASE_URL})
  ────────────────────────────────
  API Base:    http://localhost:${env.PORT}/api
  Health:      http://localhost:${env.PORT}/api/health
  `);
});

export default app;
