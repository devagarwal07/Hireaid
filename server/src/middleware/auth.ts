import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";
import { ApiError } from "../utils/ApiError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Extend Express Request to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                role: string;
                firstName: string;
                lastName: string;
            };
        }
    }
}

export const protect = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw ApiError.unauthorized("No token provided");
        }

        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = verifyToken(token);

        // Check if user still exists
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, email: true, role: true, firstName: true, lastName: true },
        });

        if (!user) {
            throw ApiError.unauthorized("User no longer exists");
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(ApiError.unauthorized("Invalid token"));
        }
    }
};

// Role-based access control middleware
export const restrictTo = (...roles: string[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(ApiError.unauthorized());
        }
        if (!roles.includes(req.user.role)) {
            return next(ApiError.forbidden("You do not have permission to perform this action"));
        }
        next();
    };
};
