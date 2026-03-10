import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import { env } from "../config/env.js";

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }

    // Prisma errors
    if (err.constructor.name === "PrismaClientKnownRequestError") {
        const prismaErr = err as any;
        if (prismaErr.code === "P2002") {
            res.status(409).json({
                success: false,
                message: `Duplicate value for field: ${prismaErr.meta?.target}`,
            });
            return;
        }
        if (prismaErr.code === "P2025") {
            res.status(404).json({
                success: false,
                message: "Record not found",
            });
            return;
        }
    }

    // Log unexpected errors
    if (env.NODE_ENV === "development") {
        console.error("Unhandled Error:", err);
    }

    res.status(500).json({
        success: false,
        message: env.NODE_ENV === "development" ? err.message : "Internal server error",
    });
}
