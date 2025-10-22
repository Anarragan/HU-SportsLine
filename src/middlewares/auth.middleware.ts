import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { verifyToken } from "../config/jwt.config.js";
import { CryptoService } from "../services/crypto.service.js";

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
        const encryptedToken = req.headers['authorization']?.split(' ')[1];
        
        if (!encryptedToken) {
            return res.status(401).json({ error: 'Access token required' });
        }
        // 🔹 1. Convertir el token (string JSON) a objeto antes de descifrar
        let encryptedObj;
        
        try {
            encryptedObj = JSON.parse(encryptedToken);
        } catch (e) {
            return res.status(400).json({ error: 'Invalid token format' });
        }
        // 🔹 2. Descifrar el JWT real
        const decryptedToken = CryptoService.decryptMessage(encryptedObj);
        // 🔹 3. Verificar la validez del JWT
        const payload = verifyToken(decryptedToken);
        
        if (!payload) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        // 🔹 4. Guardar el usuario en la request
        (req as any).user = payload;
        
        next();
    } catch (error: any) {
        console.error('Token verification error:', error);
        res.status(500).json({ error: 'Internal authentication error' });
    }
};