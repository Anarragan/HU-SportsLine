import type { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export const validateSchemaMiddleware = (schema: ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if ( req.method === "POST" ) {
                schema.parse(req.body);
            } else if ( req.method === "PATCH" ) {
                schema.partial().parse(req.body);
            } else {
                schema.parse(req.params);
            }
            next();

        } catch (error: any) {
            next(error);
        }
    }
}