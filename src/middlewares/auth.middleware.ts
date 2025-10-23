import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { verifyToken } from "../config/jwt.config.js";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader) {
      return res.status(401).json({ error: "Access token required" });
    }

    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ error: "Invalid Authorization header format" });
    }

    const payload = verifyToken(token);

    if (!payload) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    req.user = payload;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(403).json({ error: "Invalid or expired token" });
  }
};