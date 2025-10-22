import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) return res.status(401).json({ message: "No token provided" });
    
    try {
        const jwtSecret = process.env.JWT_SECRET;
        
        if (!jwtSecret) {
            return res.status(500).json({ message: "JWT secret not configured" });
        }
    
        const decoded = jwt.verify(token, jwtSecret as string);
        req.user = decoded;
        next();
    } catch {
        return res.status(403).json({ message: "Invalid token" });
    }
};