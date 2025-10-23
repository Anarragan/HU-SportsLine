import type { Request, Response, NextFunction } from 'express';
import { db } from '../config/db.config.js';

export const checkUniqueProductCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ error: 'Product code is required' });
        }

        const existing = await db.products.findOne({ where: { code } });
        if (existing) {
            return res.status(409).json({ error: 'Product code already exists' });
        }

        next();
    } catch (error: any) {
        res.status(500).json({ error: 'Error validating product code', details: error.message });
    }
};
