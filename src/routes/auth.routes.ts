import { Router } from "express";
import { registerController, loginController, refreshTokenController, logoutController } from "../controllers/auth.controller.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { registerSchema, loginSchema } from "../schema/auth.schema.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const routerAuth: Router = Router();

routerAuth.post("/register", validateSchemaMiddleware(registerSchema), registerController);
routerAuth.post("/login", validateSchemaMiddleware(loginSchema), loginController);
routerAuth.post("/refresh-token", refreshTokenController);
routerAuth.post("/logout", logoutController);

export { routerAuth };