import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface EnvConfig {
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    PORT: number;
    NODE_ENV: string;
    CORS_ORIGIN: string;
    UPLOAD_DIR: string;
}

function getEnvVar(key: string, fallback?: string): string {
    const value = process.env[key] || fallback;
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}

export const env: EnvConfig = {
    DATABASE_URL: getEnvVar("DATABASE_URL", "file:./dev.db"),
    JWT_SECRET: getEnvVar("JWT_SECRET"),
    JWT_EXPIRES_IN: getEnvVar("JWT_EXPIRES_IN", "7d"),
    PORT: parseInt(getEnvVar("PORT", "5000"), 10),
    NODE_ENV: getEnvVar("NODE_ENV", "development"),
    CORS_ORIGIN: getEnvVar("CORS_ORIGIN", "http://localhost:5173"),
    UPLOAD_DIR: getEnvVar("UPLOAD_DIR", "./uploads"),
};
