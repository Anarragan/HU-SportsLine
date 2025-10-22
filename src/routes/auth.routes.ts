import { Router } from "express";
import { registerController, loginController, refreshTokenController, logoutController } from "../controllers/auth.controller.js";

const routerAuth: Router = Router();

routerAuth.post("/register", registerController); //bien
routerAuth.post("/login", loginController);
routerAuth.post("/refresh-token", refreshTokenController);
routerAuth.post("/logout", logoutController);

export { routerAuth };